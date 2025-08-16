import type { FastifyReply, FastifyRequest } from 'fastify';
import { eq, and, sql } from 'drizzle-orm';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/schema.ts';
import { withErrorHandler } from '../middleware/error-handler.ts';
import { ClientSchema } from '../schemas/client-schemas.ts';

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
  const { 
    name, 
    email, 
    phone, 
    phone2,
    date_of_birth, 
    obs1,
    obs2,
    obs3,
    gender,
    cc,
    nif,
    country,
    state,
    city,
    address,
    zip,
    invoce_notes,
    favorite_collaborator,
    notification_phone, 
    notification_email,
    location_id
  } = request.body as ClientSchema;

  const newClient = await db.insert(schema.client).values({
    company_id: request.user.company_id,
    location_id,
    name,
    email,
    phone,
    phone2,
    date_of_birth: date_of_birth || null,
    obs1,
    obs2,
    obs3,
    gender,
    cc,
    nif,
    country,
    state,
    city,
    address,
    zip,
    invoce_notes,
    favorite_collaborator,
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
  const { 
    name, 
    email, 
    phone, 
    phone2,
    date_of_birth, 
    obs1,
    obs2,
    obs3,
    gender,
    cc,
    nif,
    country,
    state,
    city,
    address,
    zip,
    invoce_notes,
    favorite_collaborator,
    notification_phone, 
    notification_email, 
    location_id 
  } = request.body as ClientSchema;

  const updateData: any = {};
  if (name) updateData.name = name;
  if (email !== undefined) updateData.email = email;
  if (phone !== undefined) updateData.phone = phone;
  if (phone2 !== undefined) updateData.phone2 = phone2;
  if (date_of_birth !== undefined) updateData.date_of_birth = date_of_birth || null;
  if (obs1 !== undefined) updateData.obs1 = obs1;
  if (obs2 !== undefined) updateData.obs2 = obs2;
  if (obs3 !== undefined) updateData.obs3 = obs3;
  if (gender !== undefined) updateData.gender = gender;
  if (cc !== undefined) updateData.cc = cc;
  if (nif !== undefined) updateData.nif = nif;
  if (country !== undefined) updateData.country = country;
  if (state !== undefined) updateData.state = state;
  if (city !== undefined) updateData.city = city;
  if (address !== undefined) updateData.address = address;
  if (zip !== undefined) updateData.zip = zip;
  if (invoce_notes !== undefined) updateData.invoce_notes = invoce_notes;
  if (favorite_collaborator !== undefined) updateData.favorite_collaborator = favorite_collaborator;
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

// Controller para retornar dados do dashboard sobre os clientes
async function dashboardClientHandler(request: FastifyRequest, reply: FastifyReply) {
  const { company_id } = request.query as { company_id: string };

  // Total de clientes da company
  const total_clients = await db
    .select({ count: sql<number>`count(*)` })
    .from(schema.client)
    .where(eq(schema.client.company_id, company_id));

  // Total de clientes com status = 1 (ativos)
  const total_clients_active = await db
    .select({ count: sql<number>`count(*)` })
    .from(schema.client)
    .where(and(
      eq(schema.client.company_id, company_id),
      eq(schema.client.status, 1)
    ));

  const total_clients_new = await db
    .select({ count: sql<number>`count(*)` })
    .from(schema.client)
    .where(and(
      eq(schema.client.company_id, company_id),
      sql`created_at >= NOW() - INTERVAL '30 days'`
    ));

  return reply.send({
    total_clients: total_clients[0]?.count || 0,
    total_clients_active: total_clients_active[0]?.count || 0,
    total_clients_new: total_clients_new[0]?.count || 0,
    retention_rate: 0,
  });
}

export const dashboardClient = withErrorHandler(dashboardClientHandler, 'dashboard cliente');
