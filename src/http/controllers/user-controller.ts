import type { FastifyReply, FastifyRequest } from 'fastify';
import { eq, inArray, and } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/schema.ts';
import { withErrorHandler } from '../middleware/error-handler.ts';

// Controller para obter dados do user logado
async function getCurrentUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const users = await db.select().from(schema.user).where(eq(schema.user.id, request.user.user_id));
  
  if (users.length === 0) {
    return reply.status(404).send({
      error: 'User não foi encontrado'
    });
  }

  const userData = users[0];
  const { password: _, ...userWithoutPassword } = userData;

  return reply.send({
    user: userWithoutPassword
  });
}

export const getCurrentUser = withErrorHandler(getCurrentUserHandler, 'procurar user atual');

// Controller para atualizar dados do user
async function updateCurrentUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const { first_name, last_name, photo, phone, location_ids } = request.body as {
    first_name?: string;
    last_name?: string;
    photo?: string;
    phone?: string;
    location_ids?: string[];
  };

  const updateData: any = {};
  if (first_name) updateData.first_name = first_name;
  if (last_name) updateData.last_name = last_name;
  if (photo) updateData.photo = photo;
  if (phone) updateData.phone = phone;
  if (location_ids) {
    // Buscar as associações atuais do usuário
    const currentUserLocations = await db
      .select({ location_id: schema.userLocation.location_id })
      .from(schema.userLocation)
      .where(eq(schema.userLocation.user_id, request.user.user_id));

    const currentLocationIds = currentUserLocations.map(ul => ul.location_id);
    
    // Identificar locations a adicionar e remover
    const locationsToAdd = location_ids.filter(id => !currentLocationIds.includes(id));
    const locationsToRemove = currentLocationIds.filter(id => !location_ids.includes(id));

    // Remover apenas as associações que não existem mais
    if (locationsToRemove.length > 0) {
      await db.delete(schema.userLocation)
        .where(eq(schema.userLocation.user_id, request.user.user_id) && inArray(schema.userLocation.location_id, locationsToRemove));
    }

    // Adicionar apenas as novas associações
    if (locationsToAdd.length > 0) {
      await db.insert(schema.userLocation).values(locationsToAdd.map(location_id => ({
        user_id: request.user.user_id,
        location_id: location_id
      })));
    }
  }

  const updatedUser = await db
    .update(schema.user)
    .set(updateData)
    .where(eq(schema.user.id, request.user.user_id))
    .returning();

  if (updatedUser.length === 0) {
    return reply.status(404).send({
      error: 'user não foi encontrado'
    });
  }

  const { password: _, ...userWithoutPassword } = updatedUser[0];

  return reply.send({
    message: 'user modificado com sucesso',
    user: userWithoutPassword
  });
}

export const updateCurrentUser = withErrorHandler(updateCurrentUserHandler, 'modificar user atual');

// Controller para listar users (apenas para owners/admins)
async function listUsersHandler(request: FastifyRequest, reply: FastifyReply) {
  const { company_id } = request.query as { company_id: string };

  let users = await db.select({
    id: schema.user.id,
    first_name: schema.user.first_name,
    last_name: schema.user.last_name,
    email: schema.user.email,
    phone: schema.user.phone,
    photo: schema.user.photo,
    type: schema.user.type,
    status: schema.user.status
  }).from(schema.user)
  .where(and(eq(schema.user.company_id, company_id), eq(schema.user.is_active, true)));

  // Buscar todas as locations de todos os users em uma única query
  const userIds = users.map(u => u.id);
  
  if (userIds.length > 0) {
    const userLocations = await db
      .select({
        user_id: schema.userLocation.user_id,
        location: schema.location,
      })
      .from(schema.userLocation)
      .innerJoin(schema.location, eq(schema.userLocation.location_id, schema.location.id))
      .where(inArray(schema.userLocation.user_id, userIds));

    // Criar um mapa de user_id -> locations
    const locationMap = new Map();
    userLocations.forEach(sl => {
      if (!locationMap.has(sl.user_id)) {
        locationMap.set(sl.user_id, []);
      }
      locationMap.get(sl.user_id).push({
        id: sl.location.id,
        name: sl.location.name
      });
    });

    // Associar location_ids a cada user
    users = users.map(user => ({
      ...user,
      location_ids: locationMap.get(user.id) || []
    }));
  }

  return reply.send({
    users
  });
}

export const listUsers = withErrorHandler(listUsersHandler, 'listar users');

// Controller para obter dados de um user específico
async function getUserByIdHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const users = await db.select({
    id: schema.user.id,
    first_name: schema.user.first_name,
    last_name: schema.user.last_name,
    email: schema.user.email,
    photo: schema.user.photo,
    type: schema.user.type,
    status: schema.user.status
  }).from(schema.user).where(eq(schema.user.id, id));
  
  if (users.length === 0) {
    return reply.status(404).send({
      error: 'user não foi encontrado'
    });
  }

  const userData = users[0];
  // Buscar todas as locations do user
  const userLocations = await db
  .select({
    user_id: schema.userLocation.user_id,
    location: schema.location,
  })
  .from(schema.userLocation)
  .innerJoin(schema.location, eq(schema.userLocation.location_id, schema.location.id))
  .where(eq(schema.userLocation.user_id, userData.id));

  const userWithLocations = {
    ...userData,
    location_ids: userLocations.map(ul => ({
      id: ul.location.id,
      name: ul.location.name
    }))
  };

  return reply.send({
    user: userWithLocations
  });
}

export const getUserById = withErrorHandler(getUserByIdHandler, 'obter user por id');

// Controller para criar um novo user

async function createUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const { first_name, last_name, email, phone, photo, type, company_id, location_ids } = request.body as {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    photo?: string;
    type?: string;
    company_id?: string;
    location_ids?: string[];
  };

  const insertData: any = {};
  if (first_name) insertData.first_name = first_name;
  if (last_name) insertData.last_name = last_name;
  if (email) insertData.email = email;
  if (phone) insertData.phone = phone;
  if (photo) insertData.photo = photo;
  if (type) insertData.type = type;
  if (company_id) insertData.company_id = company_id;
  
  if(!photo) insertData.photo = 'default-avatar.png';

  // Hash the password using bcryptjs with SHA256
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('12345678', saltRounds);
  insertData.password = hashedPassword;

  let newUser = await db.insert(schema.user).values(insertData).returning();

  if (newUser.length === 0) {
    return reply.status(404).send({
      error: 'Erro ao criar user'
    });
  }

  if (location_ids) {
    await db.insert(schema.userLocation).values(location_ids.map(location_id => ({
      user_id: newUser[0].id,
      location_id: location_id
    })));
  }

  return reply.send({
    message: 'User criado com sucesso',
    user: newUser[0]
  });
}

export const createUser = withErrorHandler(createUserHandler, 'criar user');

// Controller para atualizar dados de um user específico
async function updateUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { first_name, last_name, photo, email, type, status, phone, location_ids } = request.body as {
    first_name?: string;
    last_name?: string;
    photo?: string;
    email?: string;
    type?: string;
    status?: number;
    phone?: string;
    location_ids?: string[];
  };
  console.log(request.body);

  const updateData: any = {};
  if (first_name) updateData.first_name = first_name;
  if (last_name) updateData.last_name = last_name;
  if (photo) updateData.photo = photo;
  if (email) updateData.email = email;
  if (type) updateData.type = type;
  if (status) updateData.status = status;
  if (phone) updateData.phone = phone;
  if (location_ids) {
    // Buscar as associações atuais do usuário
    const currentUserLocations = await db
      .select({ location_id: schema.userLocation.location_id })
      .from(schema.userLocation)
      .where(eq(schema.userLocation.user_id, id));

    const currentLocationIds = currentUserLocations.map(ul => ul.location_id);
    
    // Identificar locations a adicionar e remover
    const locationsToAdd = location_ids.filter(id => !currentLocationIds.includes(id));
    const locationsToRemove = currentLocationIds.filter(id => !location_ids.includes(id));

    // Remover apenas as associações que não existem mais
    if (locationsToRemove.length > 0) {
      await db.delete(schema.userLocation)
        .where(eq(schema.userLocation.user_id, id) && inArray(schema.userLocation.location_id, locationsToRemove));
    }

    // Adicionar apenas as novas associações
    if (locationsToAdd.length > 0) {
      await db.insert(schema.userLocation).values(locationsToAdd.map(location_id => ({
        user_id: id,
        location_id: location_id
      })));
    }
  }

  const updatedUser = await db
    .update(schema.user)
    .set(updateData)
    .where(eq(schema.user.id, id))
    .returning();

  if (updatedUser.length === 0) {
    return reply.status(404).send({
      error: 'user não foi encontrado'
    });
  }

  const { password: _, ...userWithoutPassword } = updatedUser[0];

  return reply.send({
    message: 'User editado com sucesso',
    user: userWithoutPassword
  });
}

export const updateUser = withErrorHandler(updateUserHandler, 'modificar user');

// Controller para desativar/ativar um user
async function deleteUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { is_active, status } = request.body as { is_active?: boolean; status?: number };
  const updateData: any = {};
  
  // Check if the values are defined (not undefined), not if they are truthy
  if (is_active !== undefined) updateData.is_active = is_active;
  if (status !== undefined) updateData.status = status;

  // Check if we have any data to update
  if (Object.keys(updateData).length === 0) {
    return reply.status(400).send({
      error: 'Nenhum dado fornecido para atualização'
    });
  }

  const updatedUser = await db
    .update(schema.user)
    .set(updateData)
    .where(eq(schema.user.id, id))
    .returning();

  if (updatedUser.length === 0) {
    return reply.status(404).send({
      error: 'User não foi encontrado'
    });
  }

  return reply.send({
    message: `User ${is_active !== undefined ? (is_active ? 'ativado' : 'desativado') : ''}${status !== undefined ? (status === 0 ? 'desativado' : 'ativado') : ''} com sucesso`
  });
}

export const deleteUser = withErrorHandler(deleteUserHandler, 'desativar/ativar user');
