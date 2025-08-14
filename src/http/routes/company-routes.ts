import type { FastifyPluginCallback } from 'fastify';
import { authenticateToken } from '../middleware/auth-middleware.ts';
import { getCompany, updateCompany } from '../controllers/company-controller.ts';
import { getCompanySchema, updateCompanySchema } from '../schemas/company-schemas.ts';

export const companyRoutes: FastifyPluginCallback = (app) => {
  // Rota para obter uma empresa específica
  app.get('/companies/:id', {
    schema: getCompanySchema,
    preHandler: authenticateToken,
    handler: getCompany
  });

  // Rota para atualizar uma empresa
  app.put('/companies/:id', {
    schema: updateCompanySchema,
    preHandler: authenticateToken,
    handler: updateCompany
  });
};
