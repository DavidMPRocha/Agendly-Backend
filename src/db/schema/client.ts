import { pgTable, uuid, varchar, text, date, boolean } from 'drizzle-orm/pg-core';
import { company } from './company.ts';
import { location } from './location.ts';

export const client = pgTable('client', {
  id: uuid('id').primaryKey().defaultRandom(),
  company_id: uuid('company_id').references(() => company.id),
  location_id: uuid('location_id').notNull().references(() => location.id),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 50 }),
  phone: varchar('phone', { length: 20 }),
  notes: text('notes'),
  date_of_birth: date('date_of_birth'),
  notification_phone: boolean('notification_phone').notNull().default(false),
  notification_email: boolean('notification_email').notNull().default(false),
});

export type Client = typeof client.$inferSelect;
export type NewClient = typeof client.$inferInsert;
