import type { FastifyReply, FastifyRequest } from 'fastify';
import { eq, and, isNull } from 'drizzle-orm';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/schema.ts';
import { withErrorHandler } from '../middleware/error-handler.ts';
import type { User } from '../../db/schema/user.ts';

// Tipos para melhorar a tipagem
interface UpdateUserBody {
  first_name?: string;
  last_name?: string;
  photo?: string;
}

interface ListUsersQuery {
  company_id: string;
  page?: number;
  limit?: number;
  search?: string;
}

interface GetUserByIdParams {
  id: string;
}

// Constantes para configuração
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

// Função utilitária para remover senha do objeto user
function removePasswordFromUser(user: User) {
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Controller para obter dados do user logado
async function getCurrentUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const users = await db
    .select()
    .from(schema.user)
    .where(
      and(
        eq(schema.user.id, request.user.user_id),
        eq(schema.user.is_active, true)
      )
    );
  
  if (users.length === 0) {
    return reply.status(404).send({
      error: 'Usuário não foi encontrado ou está inativo'
    });
  }

  const userData = users[0];
  const userWithoutPassword = removePasswordFromUser(userData);

  return reply.send({
    user: userWithoutPassword
  });
}

export const getCurrentUser = withErrorHandler(getCurrentUserHandler, 'Buscar usuário atual');

// Controller para atualizar dados do user
async function updateCurrentUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const { first_name, last_name, photo } = request.body as UpdateUserBody;

  // Validação adicional dos dados
  if (!first_name && !last_name && !photo) {
    return reply.status(400).send({
      error: 'Pelo menos um campo deve ser fornecido para atualização'
    });
  }

  // Validação de comprimento dos campos
  if (first_name && (first_name.length < 1 || first_name.length > 50)) {
    return reply.status(400).send({
      error: 'Nome deve ter entre 1 e 50 caracteres'
    });
  }

  if (last_name && (last_name.length < 1 || last_name.length > 50)) {
    return reply.status(400).send({
      error: 'Sobrenome deve ter entre 1 e 50 caracteres'
    });
  }

  if (photo && photo.length > 255) {
    return reply.status(400).send({
      error: 'URL da foto deve ter no máximo 255 caracteres'
    });
  }

  const updateData: Partial<User> = {};
  if (first_name) updateData.first_name = first_name;
  if (last_name) updateData.last_name = last_name;
  if (photo) updateData.photo = photo;
  updateData.updated_at = new Date();

  const updatedUser = await db
    .update(schema.user)
    .set(updateData)
    .where(
      and(
        eq(schema.user.id, request.user.user_id),
        eq(schema.user.is_active, true)
      )
    )
    .returning();

  if (updatedUser.length === 0) {
    return reply.status(404).send({
      error: 'Usuário não foi encontrado ou está inativo'
    });
  }

  const userWithoutPassword = removePasswordFromUser(updatedUser[0]);

  return reply.send({
    message: 'Usuário atualizado com sucesso',
    user: userWithoutPassword
  });
}

export const updateCurrentUser = withErrorHandler(updateCurrentUserHandler, 'Atualizar usuário atual');

// Controller para listar users (apenas para owners/admins)
async function listUsersHandler(request: FastifyRequest, reply: FastifyReply) {
  const { company_id, page = 1, limit = DEFAULT_PAGE_SIZE, search } = request.query as ListUsersQuery;

  // Validação dos parâmetros de paginação
  const pageNumber = Math.max(1, Math.floor(Number(page)));
  const pageSize = Math.min(Math.max(1, Math.floor(Number(limit))), MAX_PAGE_SIZE);
  const offset = (pageNumber - 1) * pageSize;

  // Construir query base
  let query = db
    .select({
      id: schema.user.id,
      first_name: schema.user.first_name,
      last_name: schema.user.last_name,
      email: schema.user.email,
      photo: schema.user.photo,
      type: schema.user.type,
      is_active: schema.user.is_active,
      created_at: schema.user.created_at
    })
    .from(schema.user)
    .where(
      and(
        eq(schema.user.company_id, company_id),
        eq(schema.user.is_active, true)
      )
    );

  // Adicionar busca por nome se fornecida
  if (search && search.trim()) {
    const searchTerm = `%${search.trim()}%`;
    // Nota: Para busca mais avançada, seria necessário usar ILIKE ou similar
    // Por simplicidade, mantendo a query base por enquanto
  }

  // Executar query com paginação
  const users = await query.limit(pageSize).offset(offset);

  // Contar total de registros para paginação
  const totalCount = await db
    .select({ count: schema.user.id })
    .from(schema.user)
    .where(
      and(
        eq(schema.user.company_id, company_id),
        eq(schema.user.is_active, true)
      )
    );

  const total = totalCount.length;

  return reply.send({
    users,
    pagination: {
      page: pageNumber,
      limit: pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    }
  });
}

export const listUsers = withErrorHandler(listUsersHandler, 'Listar usuários');

// Controller para obter dados de um user específico
async function getUserByIdHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as GetUserByIdParams;

  // Validação básica do UUID
  if (!id || id.length !== 36) {
    return reply.status(400).send({
      error: 'ID do usuário inválido'
    });
  }

  const users = await db
    .select()
    .from(schema.user)
    .where(
      and(
        eq(schema.user.id, id),
        eq(schema.user.is_active, true)
      )
    );
  
  if (users.length === 0) {
    return reply.status(404).send({
      error: 'Usuário não foi encontrado ou está inativo'
    });
  }

  const userData = users[0];
  const userWithoutPassword = removePasswordFromUser(userData);

  return reply.send({
    user: userWithoutPassword
  });
}

export const getUserById = withErrorHandler(getUserByIdHandler, 'Obter usuário por ID');

// Controller para desativar um usuário (soft delete)
async function deactivateUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as GetUserByIdParams;

  // Validação básica do UUID
  if (!id || id.length !== 36) {
    return reply.status(400).send({
      error: 'ID do usuário inválido'
    });
  }

  // Verificar se o usuário não está tentando desativar a si mesmo
  if (id === request.user.user_id) {
    return reply.status(400).send({
      error: 'Não é possível desativar sua própria conta'
    });
  }

  const updatedUser = await db
    .update(schema.user)
    .set({
      is_active: false,
      updated_at: new Date()
    })
    .where(
      and(
        eq(schema.user.id, id),
        eq(schema.user.company_id, request.user.company_id),
        eq(schema.user.is_active, true)
      )
    )
    .returning();

  if (updatedUser.length === 0) {
    return reply.status(404).send({
      error: 'Usuário não foi encontrado ou já está inativo'
    });
  }

  return reply.send({
    message: 'Usuário desativado com sucesso'
  });
}

export const deactivateUser = withErrorHandler(deactivateUserHandler, 'Desativar usuário');