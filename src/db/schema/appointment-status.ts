import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { appointment } from './appointment.ts';

export const appointmentStatus = pgTable('appointment_status', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 20 }).notNull(),
  description: varchar('description', { length: 255 }),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

export const appointmentStatusRelations = relations(appointmentStatus, ({ many }) => ({
  appointments: many(appointment),
}));

export type AppointmentStatus = typeof appointmentStatus.$inferSelect;
export type NewAppointmentStatus = typeof appointmentStatus.$inferInsert;
