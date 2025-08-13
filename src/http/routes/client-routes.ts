import type { FastifyPluginCallback } from 'fastify';
import { authenticateToken } from '../middleware/auth-middleware.ts';
import { getClient, listClients, createClient, updateClient, deleteClient } from '../controllers/client-controller.ts';
import { getClientSchema, listClientsSchema, createClientSchema, updateClientSchema, deleteClientSchema } from '../schemas/client-schemas.ts';

export const clientRoutes: FastifyPluginCallback = (app) => {
  // Rota para obter um cliente específico
  app.get('/clients/:id', {
    schema: getClientSchema,
    preHandler: authenticateToken,
    handler: getClient
  });

  // Rota para listar clientes
  app.get('/clients', {
    schema: listClientsSchema,
    preHandler: authenticateToken,
    handler: listClients
  });

  // Rota para criar um novo cliente
  app.post('/clients', {
    schema: createClientSchema,
    preHandler: authenticateToken,
    handler: createClient
  });

  // Rota para atualizar um cliente
  app.put('/clients/:id', {
    schema: updateClientSchema,
    preHandler: authenticateToken,
    handler: updateClient
  });

  // Rota para eliminar um cliente
  app.delete('/clients/:id', {
    schema: deleteClientSchema,
    preHandler: authenticateToken,
    handler: deleteClient
  });
};
