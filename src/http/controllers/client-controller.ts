import type { FastifyReply, FastifyRequest } from 'fastify';
import { eq, and } from 'drizzle-orm';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/schema.ts';
import { withErrorHandler } from '../middleware/error-handler.ts';

// Controller para obter um cliente específico
async function getClientHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const clients = await db.select().from(schema.client).where(eq(schema.client.id, id));
  
  if (clients.length === 0) {
    return reply.status(404).send({
      error: 'Cliente não encontrado'
    });
  }

  return reply.send({
    client: clients[0]
  });
}

export const getClient = withErrorHandler(getClientHandler, 'buscar cliente');

// Controller para listar clientes
async function listClientsHandler(request: FastifyRequest, reply: FastifyReply) {
  const { company_id, location_id } = request.query as { company_id: string; location_id?: string };

  const whereConditions = [eq(schema.client.company_id, company_id)];
  
  if (location_id) {
    whereConditions.push(eq(schema.client.location_id, location_id));
  }

  const clients = await db.select().from(schema.client).where(and(...whereConditions));

  return reply.send({
    clients
  });
}

export const listClients = withErrorHandler(listClientsHandler, 'listar clientes');

// Controller para criar um novo cliente
async function createClientHandler(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, phone, notes, date_of_birth, notification_phone, notification_email, location_id } = request.body as {
    name: string;
    email?: string;
    phone?: string;
    notes?: string;
    date_of_birth?: string;
    notification_phone?: boolean;
    notification_email?: boolean;
    location_id: string;
  };

  const newClient = await db.insert(schema.client).values({
    company_id: request.user.company_id,
    location_id,
    name,
    email,
    phone,
    notes,
    date_of_birth: date_of_birth || null,
    notification_phone: notification_phone ?? false,
    notification_email: notification_email ?? false,
  }).returning();

  return reply.status(201).send({
    message: 'Cliente criado com sucesso',
    client: newClient[0]
  });
}

export const createClient = withErrorHandler(createClientHandler, 'criar cliente');

// Controller para atualizar um cliente
async function updateClientHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name, email, phone, notes, date_of_birth, notification_phone, notification_email, location_id } = request.body as {
    name?: string;
    email?: string;
    phone?: string;
    notes?: string;
    date_of_birth?: string;
    notification_phone?: boolean;
    notification_email?: boolean;
    location_id?: string;
  };

  const updateData: any = {};
  if (name) updateData.name = name;
  if (email !== undefined) updateData.email = email;
  if (phone !== undefined) updateData.phone = phone;
  if (notes !== undefined) updateData.notes = notes;
  if (date_of_birth !== undefined) updateData.date_of_birth = date_of_birth || null;
  if (notification_phone !== undefined) updateData.notification_phone = notification_phone;
  if (notification_email !== undefined) updateData.notification_email = notification_email;
  if (location_id) updateData.location_id = location_id;

  const updatedClient = await db
    .update(schema.client)
    .set(updateData)
    .where(eq(schema.client.id, id))
    .returning();

  if (updatedClient.length === 0) {
    return reply.status(404).send({
      error: 'Cliente não encontrado'
    });
  }

  return reply.send({
    message: 'Cliente atualizado com sucesso',
    client: updatedClient[0]
  });
}

export const updateClient = withErrorHandler(updateClientHandler, 'atualizar cliente');

// Controller para eliminar um cliente
async function deleteClientHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const deletedClient = await db
    .delete(schema.client)
    .where(eq(schema.client.id, id))
    .returning();

  if (deletedClient.length === 0) {
    return reply.status(404).send({
      error: 'Cliente não encontrado'
    });
  }

  return reply.send({
    message: 'Cliente eliminado com sucesso'
  });
}

export const deleteClient = withErrorHandler(deleteClientHandler, 'eliminar cliente');
