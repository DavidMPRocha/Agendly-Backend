import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { appointment } from './appointment.ts';

export const appointmentStatus = pgTable('appointment_status', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 20 }).notNull(),
  description: varchar('description', { length: 255 }),
});

export const appointmentStatusRelations = relations(appointmentStatus, ({ many }) => ({
  appointments: many(appointment),
}));

export type AppointmentStatus = typeof appointmentStatus.$inferSelect;
export type NewAppointmentStatus = typeof appointmentStatus.$inferInsert;
