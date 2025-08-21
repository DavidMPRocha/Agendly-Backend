import { pgTable, uuid, date, timestamp, text, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from './user.ts';
import { location } from './location.ts';
import { client } from './client.ts';
import { service } from './service.ts';
import { appointmentStatus } from './appointment-status.ts';
import { company } from './company.ts';

export const appointment = pgTable('appointment', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => user.id),
  company_id: uuid('company_id').notNull().references(() => company.id),
  location_id: uuid('location_id').notNull().references(() => location.id),
  client_id: uuid('client_id').notNull().references(() => client.id),
  service_id: uuid('service_id').notNull().references(() => service.id),
  status_id: uuid('status_id').references(() => appointmentStatus.id),
  date: date('date').notNull(),
  datetime_start: timestamp('datetime_start').notNull(),
  datetime_end: timestamp('datetime_end').notNull(),
  description: text('description'),
  notified_by_phone: boolean('notified_by_phone').notNull().default(false),
  notified_by_email: boolean('notified_by_email').notNull().default(false),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

export const appointmentRelations = relations(appointment, ({ one }) => ({
  user: one(user, {
    fields: [appointment.user_id],
    references: [user.id],
  }),
  location: one(location, {
    fields: [appointment.location_id],
    references: [location.id],
  }),
  client: one(client, {
    fields: [appointment.client_id],
    references: [client.id],
  }),
  service: one(service, {
    fields: [appointment.service_id],
    references: [service.id],
  }),
  status: one(appointmentStatus, {
    fields: [appointment.status_id],
    references: [appointmentStatus.id],
  }),
}));

export type Appointment = typeof appointment.$inferSelect;
export type NewAppointment = typeof appointment.$inferInsert;
