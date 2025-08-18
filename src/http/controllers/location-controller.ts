import type { FastifyReply, FastifyRequest } from 'fastify';
import { eq, and } from 'drizzle-orm';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/schema.ts';
import { withErrorHandler } from '../middleware/error-handler.ts';

// Controller para obter uma localização específica
async function getLocationHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const locations = await db.select().from(schema.location).where(eq(schema.location.id, id));
  
  if (locations.length === 0) {
    return reply.status(404).send({
      error: 'Localização não foi encontrada'
    });
  }

  return reply.send({
    location: locations[0]
  });
}

export const getLocation = withErrorHandler(getLocationHandler, 'procurar localização');

// Controller para listar localizações
async function listLocationsHandler(request: FastifyRequest, reply: FastifyReply) {
  const { company_id } = request.query as { company_id: string };

  const locations = await db.select().from(schema.location).where(eq(schema.location.company_id, company_id));

  return reply.send({
    locations
  });
}

export const listLocations = withErrorHandler(listLocationsHandler, 'listar localizações');

// Controller para criar uma nova localização
async function createLocationHandler(request: FastifyRequest, reply: FastifyReply) {
  const { name, address, city, postal_code, company_id } = request.body as {
    name: string;
    address?: string;
    city?: string;
    postal_code?: string;
    company_id: string;
  };

  const newLocation = await db.insert(schema.location).values({
    company_id,
    name,
    address,
    city,
    postal_code,
  }).returning();

  return reply.status(201).send({
    message: 'Localização adicionada com sucesso',
    location: newLocation[0]
  });
}

export const createLocation = withErrorHandler(createLocationHandler, 'adicionar localização');

// Controller para atualizar uma localização
async function updateLocationHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name, address, city, postal_code } = request.body as {
    name?: string;
    address?: string;
    city?: string;
    postal_code?: string;
  };

  const updateData: any = {};
  if (name) updateData.name = name;
  if (address !== undefined) updateData.address = address;
  if (city !== undefined) updateData.city = city;
  if (postal_code !== undefined) updateData.postal_code = postal_code;

  const updatedLocation = await db
    .update(schema.location)
    .set(updateData)
    .where(eq(schema.location.id, id))
    .returning();

  if (updatedLocation.length === 0) {
    return reply.status(404).send({
      error: 'Localização não foi encontrada'
    });
  }

  return reply.send({
    message: 'Localização modificada com sucesso',
    location: updatedLocation[0]
  });
}

export const updateLocation = withErrorHandler(updateLocationHandler, 'modificar localização');

// Controller para eliminar uma localização
async function deleteLocationHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const deletedLocation = await db
    .delete(schema.location)
    .where(eq(schema.location.id, id))
    .returning();

  if (deletedLocation.length === 0) {
    return reply.status(404).send({
      error: 'Localização não foi encontrada'
    });
  }

  return reply.send({
    message: 'Localização removida com sucesso'
  });
}

export const deleteLocation = withErrorHandler(deleteLocationHandler, 'remover localização');
