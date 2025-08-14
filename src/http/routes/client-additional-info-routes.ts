import type { FastifyPluginCallback } from 'fastify';
import { authenticateToken } from '../middleware/auth-middleware.ts';
import { 
  getClientAdditionalInfo, 
  listClientAdditionalInfo, 
  createClientAdditionalInfo, 
  updateClientAdditionalInfo, 
  deleteClientAdditionalInfo 
} from '../controllers/client-additional-info-controller.ts';
import { 
  getClientAdditionalInfoSchema, 
  listClientAdditionalInfoSchema, 
  createClientAdditionalInfoSchema, 
  updateClientAdditionalInfoSchema, 
  deleteClientAdditionalInfoSchema 
} from '../schemas/client-additional-info-schemas.ts';

export const clientAdditionalInfoRoutes: FastifyPluginCallback = (app) => {
  // Rota para obter informações adicionais específicas
  app.get('/client-additional-info/:id', {
    schema: getClientAdditionalInfoSchema,
    preHandler: authenticateToken,
    handler: getClientAdditionalInfo
  });

  // Rota para listar informações adicionais de um cliente
  app.get('/client-additional-info', {
    schema: listClientAdditionalInfoSchema,
    preHandler: authenticateToken,
    handler: listClientAdditionalInfo
  });

  // Rota para criar novas informações adicionais
  app.post('/client-additional-info', {
    schema: createClientAdditionalInfoSchema,
    preHandler: authenticateToken,
    handler: createClientAdditionalInfo
  });

  // Rota para atualizar informações adicionais
  app.put('/client-additional-info/:id', {
    schema: updateClientAdditionalInfoSchema,
    preHandler: authenticateToken,
    handler: updateClientAdditionalInfo
  });

  // Rota para eliminar informações adicionais
  app.delete('/client-additional-info/:id', {
    schema: deleteClientAdditionalInfoSchema,
    preHandler: authenticateToken,
    handler: deleteClientAdditionalInfo
  });
};
