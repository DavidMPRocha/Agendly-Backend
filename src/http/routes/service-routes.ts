import type { FastifyPluginCallback } from 'fastify';
import { authenticateToken } from '../middleware/auth-middleware.ts';
import { getService, listServices, createService, updateService, deleteService } from '../controllers/service-controller.ts';
import { getServiceSchema, listServicesSchema, createServiceSchema, updateServiceSchema, deleteServiceSchema } from '../schemas/service-schemas.ts';

export const serviceRoutes: FastifyPluginCallback = (app) => {
  // Rota para obter um serviço específico
  app.get('/services/:id', {
    schema: getServiceSchema,
    preHandler: authenticateToken,
    handler: getService
  });

  // Rota para listar serviços
  app.get('/services', {
    schema: listServicesSchema,
    preHandler: authenticateToken,
    handler: listServices
  });

  // Rota para criar um novo serviço
  app.post('/services', {
    schema: createServiceSchema,
    preHandler: authenticateToken,
    handler: createService
  });

  // Rota para atualizar um serviço
  app.put('/services/:id', {
    schema: updateServiceSchema,
    preHandler: authenticateToken,
    handler: updateService
  });

  // Rota para eliminar um serviço
  app.delete('/services/:id', {
    schema: deleteServiceSchema,
    preHandler: authenticateToken,
    handler: deleteService
  });
};
