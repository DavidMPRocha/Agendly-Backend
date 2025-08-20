import type { FastifyPluginCallback } from 'fastify';
import { authenticateToken } from '../middleware/auth-middleware.ts';
import { 
  getAppointment, 
  listAppointments, 
  createAppointment, 
  updateAppointment, 
  deleteAppointment 
} from '../controllers/appointment-controller.ts';
import { 
  getAppointmentSchema, 
  listAppointmentsSchema, 
  createAppointmentSchema, 
  updateAppointmentSchema, 
  deleteAppointmentSchema 
} from '../schemas/appointment-schemas.ts';

export const appointmentRoutes: FastifyPluginCallback = (app) => {
  // Rota para obter um agendamento específico
  app.get('/appointments/:id', {
    schema: getAppointmentSchema,
    preHandler: authenticateToken,
    handler: getAppointment
  });

  // Rota para listar agendamentos
  app.get('/appointments', {
    schema: listAppointmentsSchema,
    preHandler: authenticateToken,
    handler: listAppointments
  });

  // Rota para criar um novo agendamento
  app.post('/appointments', {
    schema: createAppointmentSchema,
    preHandler: authenticateToken,
    handler: createAppointment
  });

  // Rota para atualizar um agendamento
  app.put('/appointments/:id', {
    schema: updateAppointmentSchema,
    preHandler: authenticateToken,
    handler: updateAppointment
  });

  // Rota para eliminar um agendamento
  app.delete('/appointments/:id', {
    schema: deleteAppointmentSchema,
    preHandler: authenticateToken,
    handler: deleteAppointment
  });
};
