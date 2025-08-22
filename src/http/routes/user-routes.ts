import type { FastifyPluginCallback } from 'fastify';
import { authenticateToken, requireOwnerOrAdmin } from '../middleware/auth-middleware.ts';
import { getCurrentUser, updateCurrentUser, listUsers, updateUser, getUserById, createUser, deleteUser } from '../controllers/user-controller.ts';
import { createUserSchema, getUserByIdSchema, getUserSchema, listUsersSchema, updateUserSchema, deleteUserSchema } from '../schemas/user-schemas.ts';

export const userRoutes: FastifyPluginCallback = (app) => {
  // Rota para obter dados do user logado
  app.get('/users/me', {
    schema: getUserSchema,
    preHandler: authenticateToken,
    handler: getCurrentUser
  });

  // Rota para atualizar dados do user logado
  app.put('/users/me', {
    schema: updateUserSchema,
    preHandler: authenticateToken,
    handler: updateCurrentUser
  });

  // Rota para obter dados de um user específico
  app.get('/users/:id', {
    schema: getUserByIdSchema,
    preHandler: authenticateToken,
    handler: getUserById
  });

  // Rota para listar todos os users (apenas para owners/admins)
  app.get('/users', {
    schema: listUsersSchema,
    preHandler: authenticateToken,
    handler: listUsers
  });
  
  // Rota para criar um novo user
  app.post('/users', {
    schema: createUserSchema,
    preHandler: authenticateToken,
    handler: createUser
  });

  // Rota para atualizar dados de um user específico
  app.put('/users/:id', {
    schema: updateUserSchema,
    preHandler: authenticateToken,
    handler: updateUser
  });   

  // Rota para desativar/ativar um user
  app.delete('/users/:id', {
    schema: deleteUserSchema,
    preHandler: authenticateToken,
    handler: deleteUser
  });
};
