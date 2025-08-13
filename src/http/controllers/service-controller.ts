import type { FastifyReply, FastifyRequest } from 'fastify';
import { eq, and } from 'drizzle-orm';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/schema.ts';
import { withErrorHandler } from '../middleware/error-handler.ts';

// Controller para obter um serviço específico
async function getServiceHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const services = await db.select().from(schema.service).where(eq(schema.service.id, id));
  
  if (services.length === 0) {
    return reply.status(404).send({
      error: 'Serviço não encontrado'
    });
  }

  return reply.send({
    service: services[0]
  });
}

export const getService = withErrorHandler(getServiceHandler, 'buscar serviço');

// Controller para listar serviços
async function listServicesHandler(request: FastifyRequest, reply: FastifyReply) {
  const { company_id, location_id } = request.query as { company_id: string; location_id?: string };

  const whereConditions = [eq(schema.service.company_id, company_id)];
  
  if (location_id) {
    whereConditions.push(eq(schema.service.location_id, location_id));
  }

  const services = await db.select().from(schema.service).where(and(...whereConditions));

  return reply.send({
    services
  });
}

export const listServices = withErrorHandler(listServicesHandler, 'listar serviços');

// Controller para criar um novo serviço
async function createServiceHandler(request: FastifyRequest, reply: FastifyReply) {
  const { name, duration_minutes, price, description, location_id } = request.body as {
    name: string;
    duration_minutes: number;
    price: number;
    description?: string;
    location_id?: string;
  };

  const newService = await db.insert(schema.service).values({
    company_id: request.user.company_id,
    location_id,
    name,
    duration_minutes,
    price: price.toString(),
    description,
  }).returning();

  return reply.status(201).send({
    message: 'Serviço criado com sucesso',
    service: newService[0]
  });
}

export const createService = withErrorHandler(createServiceHandler, 'criar serviço');

// Controller para atualizar um serviço
async function updateServiceHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name, duration_minutes, price, description, location_id } = request.body as {
    name?: string;
    duration_minutes?: number;
    price?: number;
    description?: string;
    location_id?: string;
  };

  const updateData: any = {};
  if (name) updateData.name = name;
  if (duration_minutes !== undefined) updateData.duration_minutes = duration_minutes;
  if (price !== undefined) updateData.price = price.toString();
  if (description !== undefined) updateData.description = description;
  if (location_id !== undefined) updateData.location_id = location_id;

  const updatedService = await db
    .update(schema.service)
    .set(updateData)
    .where(eq(schema.service.id, id))
    .returning();

  if (updatedService.length === 0) {
    return reply.status(404).send({
      error: 'Serviço não encontrado'
    });
  }

  return reply.send({
    message: 'Serviço atualizado com sucesso',
    service: updatedService[0]
  });
}

export const updateService = withErrorHandler(updateServiceHandler, 'atualizar serviço');

// Controller para eliminar um serviço
async function deleteServiceHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const deletedService = await db
    .delete(schema.service)
    .where(eq(schema.service.id, id))
    .returning();

  if (deletedService.length === 0) {
    return reply.status(404).send({
      error: 'Serviço não encontrado'
    });
  }

  return reply.send({
    message: 'Serviço eliminado com sucesso'
  });
}

export const deleteService = withErrorHandler(deleteServiceHandler, 'eliminar serviço');
