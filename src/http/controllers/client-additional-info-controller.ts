import type { FastifyReply, FastifyRequest } from 'fastify';
import { eq, and } from 'drizzle-orm';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/schema.ts';
import { withErrorHandler } from '../middleware/error-handler.ts';

// Controller para obter informações adicionais de um cliente específico
async function getClientAdditionalInfoHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const additionalInfo = await db.select().from(schema.clientAdditionalInfo).where(eq(schema.clientAdditionalInfo.id, id));
  
  if (additionalInfo.length === 0) {
    return reply.status(404).send({
      error: 'Informações adicionais não encontradas'
    });
  }

  return reply.send({
    additionalInfo: additionalInfo[0]
  });
}

export const getClientAdditionalInfo = withErrorHandler(getClientAdditionalInfoHandler, 'buscar informações adicionais do cliente');

// Controller para listar informações adicionais de um cliente
async function listClientAdditionalInfoHandler(request: FastifyRequest, reply: FastifyReply) {
  const { client_id } = request.query as { client_id: string };

  const additionalInfo = await db.select().from(schema.clientAdditionalInfo).where(eq(schema.clientAdditionalInfo.client_id, client_id));

  return reply.send({
    additionalInfo
  });
}

export const listClientAdditionalInfo = withErrorHandler(listClientAdditionalInfoHandler, 'listar informações adicionais do cliente');

// Controller para criar novas informações adicionais
async function createClientAdditionalInfoHandler(request: FastifyRequest, reply: FastifyReply) {
  const { client_id, type, content } = request.body as {
    client_id: string;
    type: string;
    content: string;
  };

  const newAdditionalInfo = await db.insert(schema.clientAdditionalInfo).values({
    client_id,
    type,
    content,
  }).returning();

  return reply.status(201).send({
    message: 'Informações adicionais criadas com sucesso',
    additionalInfo: newAdditionalInfo[0]
  });
}

export const createClientAdditionalInfo = withErrorHandler(createClientAdditionalInfoHandler, 'criar informações adicionais');

// Controller para atualizar informações adicionais
async function updateClientAdditionalInfoHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { type, content } = request.body as {
    type?: string;
    content?: string;
  };

  const updateData: any = {};
  if (type) updateData.type = type;
  if (content !== undefined) updateData.content = content;

  const updatedAdditionalInfo = await db
    .update(schema.clientAdditionalInfo)
    .set(updateData)
    .where(eq(schema.clientAdditionalInfo.id, id))
    .returning();

  if (updatedAdditionalInfo.length === 0) {
    return reply.status(404).send({
      error: 'Informações adicionais não encontradas'
    });
  }

  return reply.send({
    message: 'Informações adicionais atualizadas com sucesso',
    additionalInfo: updatedAdditionalInfo[0]
  });
}

export const updateClientAdditionalInfo = withErrorHandler(updateClientAdditionalInfoHandler, 'atualizar informações adicionais');

// Controller para eliminar informações adicionais
async function deleteClientAdditionalInfoHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const deletedAdditionalInfo = await db
    .delete(schema.clientAdditionalInfo)
    .where(eq(schema.clientAdditionalInfo.id, id))
    .returning();

  if (deletedAdditionalInfo.length === 0) {
    return reply.status(404).send({
      error: 'Informações adicionais não encontradas'
    });
  }

  return reply.send({
    message: 'Informações adicionais eliminadas com sucesso'
  });
}

export const deleteClientAdditionalInfo = withErrorHandler(deleteClientAdditionalInfoHandler, 'eliminar informações adicionais');
