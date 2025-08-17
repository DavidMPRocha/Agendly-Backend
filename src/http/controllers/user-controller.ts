import type { FastifyReply, FastifyRequest } from 'fastify';
import { eq } from 'drizzle-orm';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/schema.ts';
import { withErrorHandler } from '../middleware/error-handler.ts';

// Controller para obter dados do user logado
async function getCurrentUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const users = await db.select().from(schema.user).where(eq(schema.user.id, request.user.user_id));
  
  if (users.length === 0) {
    return reply.status(404).send({
      error: 'user não encontrado'
    });
  }

  const userData = users[0];
  const { password: _, ...userWithoutPassword } = userData;

  return reply.send({
    user: userWithoutPassword
  });
}

export const getCurrentUser = withErrorHandler(getCurrentUserHandler, 'buscar user atual');

// Controller para atualizar dados do user
async function updateCurrentUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const { first_name, last_name, photo } = request.body as {
    first_name?: string;
    last_name?: string;
    photo?: string;
  };

  const updateData: any = {};
  if (first_name) updateData.first_name = first_name;
  if (last_name) updateData.last_name = last_name;
  if (photo) updateData.photo = photo;

  const updatedUser = await db
    .update(schema.user)
    .set(updateData)
    .where(eq(schema.user.id, request.user.user_id))
    .returning();

  if (updatedUser.length === 0) {
    return reply.status(404).send({
      error: 'user não encontrado'
    });
  }

  const { password: _, ...userWithoutPassword } = updatedUser[0];

  return reply.send({
    message: 'user atualizado com sucesso',
    user: userWithoutPassword
  });
}


export const listUsers = withErrorHandler(listUsersHandler, 'listar users');

// Controller para obter dados de um user específico
async function getUserByIdHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const users = await db.select().from(schema.user).where(eq(schema.user.id, id));
  
  if (users.length === 0) {
    return reply.status(404).send({
      error: 'user não encontrado'
    });
  }

  const userData = users[0];
  const { password: _, ...userWithoutPassword } = userData;

  return reply.send({
    user: userWithoutPassword
  });
}

export const getUserById = withErrorHandler(getUserByIdHandler, 'obter user por id');


export const updateCurrentUser = withErrorHandler(updateCurrentUserHandler, 'atualizar user atual');

// Controller para listar users (apenas para owners/admins)
async function listUsersHandler(request: FastifyRequest, reply: FastifyReply) {
  const { company_id } = request.query as { company_id: string };

  const users = await db.select({
    id: schema.user.id,
    first_name: schema.user.first_name,
    last_name: schema.user.last_name,
    email: schema.user.email,
    photo: schema.user.photo,
    type: schema.user.type
  }).from(schema.user)
  .where(eq(schema.user.company_id, company_id));

  return reply.send({
    users
  });
}