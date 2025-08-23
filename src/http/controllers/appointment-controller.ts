import type { FastifyReply, FastifyRequest } from 'fastify';
import { eq, and, gte, lte, sql } from 'drizzle-orm';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/schema.ts';
import { withErrorHandler } from '../middleware/error-handler.ts';

// Controller para obter um agendamento específico
async function getAppointmentHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  
  const appointments = await db.select().from(schema.appointment).where(eq(schema.appointment.id, id));
  
  if (appointments.length === 0) {
    return reply.status(404).send({
      error: 'Agendamento não foi encontrado'
    });
  }

  return reply.send({
    appointment: appointments[0]
  });
}

export const getAppointment = withErrorHandler(getAppointmentHandler, 'obter agendamento');

// Controller para listar agendamentos
async function listAppointmentsHandler(request: FastifyRequest, reply: FastifyReply) {
  const { 
    company_id,
    location_id, 
    client_id, 
    service_id, 
    status_id, 
    date_start, 
    date_end, 
    user_id 
  } = request.query as {
    company_id?: string;
    location_id?: string;
    client_id?: string;
    service_id?: string;
    status_id?: string;
    date_start?: string;
    date_end?: string;
    user_id?: string;
  };

  let conditions = [eq(schema.appointment.is_active, true)];

  if (company_id) {
    conditions.push(eq(schema.appointment.company_id, company_id));
  }

  if (location_id) {
    conditions.push(eq(schema.appointment.location_id, location_id));
  }

  if (client_id) {
    conditions.push(eq(schema.appointment.client_id, client_id));
  }

  if (user_id) {
    conditions.push(eq(schema.appointment.user_id, user_id));
  }

  if (service_id) {
    conditions.push(eq(schema.appointment.service_id, service_id));
  }

  if (status_id) {
    conditions.push(eq(schema.appointment.status_id, status_id));
  }

  if (date_start) {
    conditions.push(gte(schema.appointment.date, date_start));
  }

  if (date_end) {
    conditions.push(lte(schema.appointment.date, date_end));
  }

  const appointments = await db
    .select({
      id: schema.appointment.id,
      user_id: schema.appointment.user_id,
      company_id: schema.appointment.company_id,
      location_id: schema.appointment.location_id,
      client_id: schema.appointment.client_id,
      service_id: schema.appointment.service_id,
      status_id: schema.appointment.status_id,
      date: schema.appointment.date,
      datetime_start: schema.appointment.datetime_start,
      datetime_end: schema.appointment.datetime_end,
      description: schema.appointment.description,
      notified_by_phone: schema.appointment.notified_by_phone,
      notified_by_email: schema.appointment.notified_by_email,
      created_at: schema.appointment.created_at,
      updated_at: schema.appointment.updated_at,
      is_active: schema.appointment.is_active,
      // User data
      user_name: sql<string>`CONCAT(${schema.user.first_name}, ' ', ${schema.user.last_name})`,
      // Client data
      client_name: schema.client.name,
      // Service data
      service_name: schema.service.name,
      // Status data
      status_name: schema.appointmentStatus.name,
      // Location data
      location_name: schema.location.name,
    })
    .from(schema.appointment)
    .leftJoin(schema.user, eq(schema.appointment.user_id, schema.user.id))
    .leftJoin(schema.client, eq(schema.appointment.client_id, schema.client.id))
    .leftJoin(schema.service, eq(schema.appointment.service_id, schema.service.id))
    .leftJoin(schema.appointmentStatus, eq(schema.appointment.status_id, schema.appointmentStatus.id))
    .leftJoin(schema.location, eq(schema.appointment.location_id, schema.location.id))
    .where(and(...conditions))
    .orderBy(schema.appointment.datetime_start);

  return reply.send({
    appointments
  });
}

export const listAppointments = withErrorHandler(listAppointmentsHandler, 'listar agendamentos');

// Controller para criar um novo agendamento
async function createAppointmentHandler(request: FastifyRequest, reply: FastifyReply) {
  const {
    company_id,
    location_id,
    client_id,
    user_id,
    service_id,
    status_id,
    date,
    datetime_start,
    datetime_end,
    description,
    notified_by_phone = false,
    notified_by_email = false
  } = request.body as {
    company_id: string;
    location_id: string;
    client_id: string;
    user_id: string;
    service_id: string;
    status_id?: string;
    date: string;
    datetime_start: string;
    datetime_end: string;
    description?: string;
    notified_by_phone?: boolean;
    notified_by_email?: boolean;
  };

  const appointmentData = {
    company_id,
    location_id,
    client_id,
    user_id,
    service_id,
    status_id,
    date,
    datetime_start: new Date(datetime_start),
    datetime_end: new Date(datetime_end),
    description,
    notified_by_phone,
    notified_by_email
  };

  const newAppointment = await db
    .insert(schema.appointment)
    .values(appointmentData)
    .returning();

  return reply.status(201).send({
    message: 'Agendamento criado com sucesso',
    appointment: newAppointment[0]
  });
}

export const createAppointment = withErrorHandler(createAppointmentHandler, 'criar agendamento');

// Controller para atualizar um agendamento
async function updateAppointmentHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const {
    location_id,
    client_id,
    service_id,
    status_id,
    date,
    datetime_start,
    datetime_end,
    description,
    notified_by_phone,
    notified_by_email
  } = request.body as {
    location_id?: string;
    client_id?: string;
    service_id?: string;
    status_id?: string;
    date?: string;
    datetime_start?: string;
    datetime_end?: string;
    description?: string;
    notified_by_phone?: boolean;
    notified_by_email?: boolean;
  };

  const updateData: any = {};
  if (location_id) updateData.location_id = location_id;
  if (client_id) updateData.client_id = client_id;
  if (service_id) updateData.service_id = service_id;
  if (status_id) updateData.status_id = status_id;
  if (date) updateData.date = date;
  if (datetime_start) updateData.datetime_start = new Date(datetime_start);
  if (datetime_end) updateData.datetime_end = new Date(datetime_end);
  if (description !== undefined) updateData.description = description;
  if (notified_by_phone !== undefined) updateData.notified_by_phone = notified_by_phone;
  if (notified_by_email !== undefined) updateData.notified_by_email = notified_by_email;

  const updatedAppointment = await db
    .update(schema.appointment)
    .set(updateData)
    .where(eq(schema.appointment.id, id))
    .returning();

  if (updatedAppointment.length === 0) {
    return reply.status(404).send({
      error: 'Agendamento não foi encontrado'
    });
  }

  return reply.send({
    message: 'Agendamento atualizado com sucesso',
    appointment: updatedAppointment[0]
  });
}

export const updateAppointment = withErrorHandler(updateAppointmentHandler, 'atualizar agendamento');

// Controller para eliminar um agendamento (soft delete)
async function deleteAppointmentHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { is_active, status_id } = request.body as { is_active?: boolean; status_id?: string };

  const updateData: any = {};
  if (is_active !== undefined) updateData.is_active = is_active;
  if (status_id !== undefined) updateData.status_id = status_id;

  const deletedAppointment = await db
    .update(schema.appointment)
    .set(updateData)
    .where(eq(schema.appointment.id, id))
    .returning();

  if (deletedAppointment.length === 0) {
    return reply.status(404).send({
      error: 'Agendamento não foi encontrado'
    });
  }

  return reply.send({
    message: `Agendamento ${is_active !== undefined ? 'eliminado' : 'atualizado'}${status_id !== undefined ? `alterado de estado` : ''} com sucesso`
  });
}

export const deleteAppointment = withErrorHandler(deleteAppointmentHandler, 'eliminar agendamento');
