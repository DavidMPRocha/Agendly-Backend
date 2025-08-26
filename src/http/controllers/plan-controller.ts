import type { FastifyReply, FastifyRequest } from 'fastify';
import { eq, and, desc } from 'drizzle-orm';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/schema.ts';
import { withErrorHandler } from '../middleware/error-handler.ts';

// Controller para listar todos os planos
async function getPlansHandler(request: FastifyRequest, reply: FastifyReply) {
  const { company_id } = request.query as { company_id?: string };

  let query = db.select().from(schema.plan);

  if (company_id) {
    query = query.where(eq(schema.plan.company_id, company_id));
  }

  const plans = await query.orderBy(desc(schema.plan.created_at));

  return reply.send({
    plans
  });
}

export const getPlans = withErrorHandler(getPlansHandler, 'listar planos');

// Controller para obter um plano específico
async function getPlanHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const plans = await db.select().from(schema.plan).where(eq(schema.plan.id, id));
  
  if (plans.length === 0) {
    return reply.status(404).send({
      error: 'Plano não foi encontrado'
    });
  }

  return reply.send({
    plan: plans[0]
  });
}

export const getPlan = withErrorHandler(getPlanHandler, 'procurar plano');

// Controller para criar um novo plano
async function createPlanHandler(request: FastifyRequest, reply: FastifyReply) {
  const {
    company_id,
    plan_type_id,
    status_id,
    start_date,
    end_date,
    price_paid,
    payment_method,
    payment_reference,
    auto_renewal,
    notes
  } = request.body as {
    company_id: string;
    plan_type_id: string;
    status_id: string;
    start_date: string;
    end_date: string;
    price_paid: number;
    payment_method?: string;
    payment_reference?: string;
    auto_renewal?: boolean;
    notes?: string;
  };

  const newPlan = await db.insert(schema.plan).values({
    company_id,
    plan_type_id,
    status_id,
    start_date: new Date(start_date),
    end_date: new Date(end_date),
    price_paid,
    payment_method,
    payment_reference,
    auto_renewal: auto_renewal ?? false,
    notes
  }).returning();

  return reply.status(201).send({
    message: 'Plano criado com sucesso',
    plan: newPlan[0]
  });
}

export const createPlan = withErrorHandler(createPlanHandler, 'criar plano');

// Controller para atualizar um plano
async function updatePlanHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const {
    plan_type_id,
    status_id,
    start_date,
    end_date,
    price_paid,
    payment_method,
    payment_reference,
    auto_renewal,
    notes
  } = request.body as {
    plan_type_id?: string;
    status_id?: string;
    start_date?: string;
    end_date?: string;
    price_paid?: number;
    payment_method?: string;
    payment_reference?: string;
    auto_renewal?: boolean;
    notes?: string;
  };

  const updateData: any = {};
  if (plan_type_id) updateData.plan_type_id = plan_type_id;
  if (status_id) updateData.status_id = status_id;
  if (start_date) updateData.start_date = new Date(start_date);
  if (end_date) updateData.end_date = new Date(end_date);
  if (price_paid !== undefined) updateData.price_paid = price_paid;
  if (payment_method !== undefined) updateData.payment_method = payment_method;
  if (payment_reference !== undefined) updateData.payment_reference = payment_reference;
  if (auto_renewal !== undefined) updateData.auto_renewal = auto_renewal;
  if (notes !== undefined) updateData.notes = notes;

  const updatedPlan = await db
    .update(schema.plan)
    .set(updateData)
    .where(eq(schema.plan.id, id))
    .returning();

  if (updatedPlan.length === 0) {
    return reply.status(404).send({
      error: 'Plano não foi encontrado'
    });
  }

  return reply.send({
    message: 'Plano modificado com sucesso',
    plan: updatedPlan[0]
  });
}

export const updatePlan = withErrorHandler(updatePlanHandler, 'modificar plano');

// Controller para deletar um plano (soft delete)
async function deletePlanHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const deletedPlan = await db
    .update(schema.plan)
    .set({ is_active: false })
    .where(eq(schema.plan.id, id))
    .returning();

  if (deletedPlan.length === 0) {
    return reply.status(404).send({
      error: 'Plano não foi encontrado'
    });
  }

  return reply.send({
    message: 'Plano deletado com sucesso'
  });
}

export const deletePlan = withErrorHandler(deletePlanHandler, 'deletar plano');

// Controller para obter planos por empresa
async function getPlansByCompanyHandler(request: FastifyRequest, reply: FastifyReply) {
  const { company_id } = request.params as { company_id: string };

  const plans = await db
    .select()
    .from(schema.plan)
    .where(and(
      eq(schema.plan.company_id, company_id),
      eq(schema.plan.is_active, true)
    ))
    .orderBy(desc(schema.plan.created_at));

  return reply.send({
    plans
  });
}

export const getPlansByCompany = withErrorHandler(getPlansByCompanyHandler, 'listar planos da empresa');
