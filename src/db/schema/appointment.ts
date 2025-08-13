import { pgTable, uuid, date, timestamp, text, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from './user.ts';
import { location } from './location.ts';
import { client } from './client.ts';
import { service } from './service.ts';
import { appointmentStatus } from './appointment-status.ts';

export const appointment = pgTable('appointment', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => user.id),
  locationId: uuid('location_id').notNull().references(() => location.id),
  clientId: uuid('client_id').notNull().references(() => client.id),
  serviceId: uuid('service_id').notNull().references(() => service.id),
  statusId: uuid('status_id').references(() => appointmentStatus.id),
  date: date('date').notNull(),
  datetimeStart: timestamp('datetime_start').notNull(),
  datetimeEnd: timestamp('datetime_end').notNull(),
  description: text('description'),
  notifiedByPhone: boolean('notified_by_phone').notNull().default(false),
  notifiedByEmail: boolean('notified_by_email').notNull().default(false),
});

export const appointmentRelations = relations(appointment, ({ one }) => ({
  user: one(user, {
    fields: [appointment.userId],
    references: [user.id],
  }),
  location: one(location, {
    fields: [appointment.locationId],
    references: [location.id],
  }),
  client: one(client, {
    fields: [appointment.clientId],
    references: [client.id],
  }),
  service: one(service, {
    fields: [appointment.serviceId],
    references: [service.id],
  }),
  status: one(appointmentStatus, {
    fields: [appointment.statusId],
    references: [appointmentStatus.id],
  }),
}));

export type Appointment = typeof appointment.$inferSelect;
export type NewAppointment = typeof appointment.$inferInsert;
