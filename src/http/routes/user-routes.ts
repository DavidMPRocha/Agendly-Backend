import type { FastifyPluginCallback } from 'fastify';
import { authenticateToken, requireOwnerOrAdmin } from '../middleware/auth-middleware.ts';
import { getCurrentUser, updateCurrentUser, listUsers, getUserById, deactivateUser } from '../controllers/user-controller.ts';
import { getUserByIdSchema, getUserSchema, listUsersSchema, updateUserSchema, deactivateUserSchema } from '../schemas/user-schemas.ts';

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
    preHandler: [authenticateToken, requireOwnerOrAdmin],
    handler: listUsers
  });

  // Rota para desativar um usuário (apenas para owners/admins)
  app.delete('/users/:id', {
    schema: deactivateUserSchema,
    preHandler: [authenticateToken, requireOwnerOrAdmin],
    handler: deactivateUser
  });

};
