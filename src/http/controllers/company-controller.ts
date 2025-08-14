import type { FastifyReply, FastifyRequest } from 'fastify';
import { eq } from 'drizzle-orm';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/schema.ts';
import { withErrorHandler } from '../middleware/error-handler.ts';

// Controller para obter uma empresa específica
async function getCompanyHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const companies = await db.select().from(schema.company).where(eq(schema.company.id, id));
  
  if (companies.length === 0) {
    return reply.status(404).send({
      error: 'Empresa não encontrada'
    });
  }

  return reply.send({
    company: companies[0]
  });
}

export const getCompany = withErrorHandler(getCompanyHandler, 'buscar empresa');

// Controller para atualizar uma empresa
async function updateCompanyHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name, description } = request.body as {
    name?: string;
    description?: string;
  };

  const updateData: any = {};
  if (name) updateData.name = name;
  if (description !== undefined) updateData.description = description;

  const updatedCompany = await db
    .update(schema.company)
    .set(updateData)
    .where(eq(schema.company.id, id))
    .returning();

  if (updatedCompany.length === 0) {
    return reply.status(404).send({
      error: 'Empresa não encontrada'
    });
  }

  return reply.send({
    message: 'Empresa atualizada com sucesso',
    company: updatedCompany[0]
  });
}

export const updateCompany = withErrorHandler(updateCompanyHandler, 'atualizar empresa');
