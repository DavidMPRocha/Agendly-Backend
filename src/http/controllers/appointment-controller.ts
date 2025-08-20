import type { FastifyReply, FastifyRequest } from 'fastify';
import { eq, and, gte, lte } from 'drizzle-orm';
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
    location_id, 
    client_id, 
    service_id, 
    status_id, 
    date_from, 
    date_to, 
    user_id 
  } = request.query as {
    location_id?: string;
    client_id?: string;
    service_id?: string;
    status_id?: string;
    date_from?: string;
    date_to?: string;
    user_id?: string;
  };

  let conditions = [eq(schema.appointment.is_active, true)];

  // Se não especificar user_id, usar o user logado
  const targetUserId = user_id || request.user.user_id;
  conditions.push(eq(schema.appointment.user_id, targetUserId));

  if (location_id) {
    conditions.push(eq(schema.appointment.location_id, location_id));
  }

  if (client_id) {
    conditions.push(eq(schema.appointment.client_id, client_id));
  }

  if (service_id) {
    conditions.push(eq(schema.appointment.service_id, service_id));
  }

  if (status_id) {
    conditions.push(eq(schema.appointment.status_id, status_id));
  }

  if (date_from) {
    conditions.push(gte(schema.appointment.date, date_from));
  }

  if (date_to) {
    conditions.push(lte(schema.appointment.date, date_to));
  }

  const appointments = await db
    .select()
    .from(schema.appointment)
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
    location_id,
    client_id,
    service_id,
    status_id,
    date,
    datetime_start,
    datetime_end,
    description,
    notified_by_phone = false,
    notified_by_email = false
  } = request.body as {
    location_id: string;
    client_id: string;
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
    user_id: request.user.user_id,
    location_id,
    client_id,
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

  const deletedAppointment = await db
    .update(schema.appointment)
    .set({ is_active: false })
    .where(eq(schema.appointment.id, id))
    .returning();

  if (deletedAppointment.length === 0) {
    return reply.status(404).send({
      error: 'Agendamento não foi encontrado'
    });
  }

  return reply.send({
    message: 'Agendamento eliminado com sucesso'
  });
}

export const deleteAppointment = withErrorHandler(deleteAppointmentHandler, 'eliminar agendamento');
