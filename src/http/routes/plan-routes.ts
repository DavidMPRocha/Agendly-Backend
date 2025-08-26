import type { FastifyPluginCallback } from 'fastify';
import { authenticateToken } from '../middleware/auth-middleware.ts';
import { 
  getPlans, 
  getPlan, 
  createPlan, 
  updatePlan, 
  deletePlan, 
  getPlansByCompany 
} from '../controllers/plan-controller.ts';
import { 
  getPlansSchema, 
  getPlanSchema, 
  createPlanSchema, 
  updatePlanSchema, 
  deletePlanSchema, 
  getPlansByCompanySchema 
} from '../schemas/plan-schemas.ts';

export const planRoutes: FastifyPluginCallback = (app) => {
  // Rota para listar todos os planos (com filtro opcional por empresa)
  app.get('/plans', {
    schema: getPlansSchema,
    preHandler: authenticateToken,
    handler: getPlans
  });

  // Rota para obter um plano específico
  app.get('/plans/:id', {
    schema: getPlanSchema,
    preHandler: authenticateToken,
    handler: getPlan
  });

  // Rota para criar um novo plano
  app.post('/plans', {
    schema: createPlanSchema,
    preHandler: authenticateToken,
    handler: createPlan
  });

  // Rota para atualizar um plano
  app.put('/plans/:id', {
    schema: updatePlanSchema,
    preHandler: authenticateToken,
    handler: updatePlan
  });

  // Rota para deletar um plano (soft delete)
  app.delete('/plans/:id', {
    schema: deletePlanSchema,
    preHandler: authenticateToken,
    handler: deletePlan
  });

  // Rota para obter planos de uma empresa específica
  app.get('/companies/:company_id/plans', {
    schema: getPlansByCompanySchema,
    preHandler: authenticateToken,
    handler: getPlansByCompany
  });
};
