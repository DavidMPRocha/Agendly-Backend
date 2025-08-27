import type { FastifyPluginCallback } from 'fastify';
import { basicHealthCheck, detailedHealthCheck, databaseHealthCheck } from '../controllers/health-controller.ts';
import { healthSchemas } from '../schemas/health-schemas.ts';

export const healthRoutes: FastifyPluginCallback = (app) => {
  // Health check básico (rápido) - para load balancers e verificações frequentes
  app.get('/health', {
    schema: healthSchemas.basicHealthCheck,
    handler: basicHealthCheck
  });

  // Health check detalhado - para debugging e monitoramento
  app.get('/health/detailed', {
    schema: healthSchemas.detailedHealthCheck,
    handler: detailedHealthCheck
  });

  // Health check apenas do banco de dados
  app.get('/health/database', {
    schema: healthSchemas.databaseHealthCheck,
    handler: databaseHealthCheck
  });

  // Health check simples para compatibilidade (mantém o endpoint original)
  app.get('/health/simple', {
    schema: healthSchemas.simpleHealthCheck,
    handler: (request, reply) => {
      reply.send('OK');
    }
  });
};
