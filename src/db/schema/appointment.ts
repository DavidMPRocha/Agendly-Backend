import { pgTable, uuid, date, timestamp, text, boolean } from 'drizzle-orm/pg-core';
import { user } from './user.js';
import { location } from './location.js';
import { client } from './client.js';
import { service } from './service.js';

export const appointment = pgTable('appointment', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => user.id),
  locationId: uuid('location_id').notNull().references(() => location.id),
  clientId: uuid('client_id').notNull().references(() => client.id),
  serviceId: uuid('service_id').notNull().references(() => service.id),
  date: date('date').notNull(),
  datetimeStart: timestamp('datetime_start').notNull(),
  datetimeEnd: timestamp('datetime_end').notNull(),
  description: text('description'),
  notifiedByPhone: boolean('notified_by_phone').notNull().default(false),
  notifiedByEmail: boolean('notified_by_email').notNull().default(false),
});

export type Appointment = typeof appointment.$inferSelect;
export type NewAppointment = typeof appointment.$inferInsert;
