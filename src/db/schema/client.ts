import { pgTable, uuid, varchar, text, date, boolean, integer, timestamp } from 'drizzle-orm/pg-core';
import { company } from './company.ts';
import { location } from './location.ts';
import { user } from './user.ts';

export const client = pgTable('client', {
  id: uuid('id').primaryKey().defaultRandom(),
  company_id: uuid('company_id').notNull().references(() => company.id),
  location_id: uuid('location_id').references(() => location.id),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 50 }),
  phone: varchar('phone', { length: 20 }),
  phone2: varchar('phone2', { length: 20 }),
  date_of_birth: date('date_of_birth'),
  obs1: varchar('obs1', { length: 255 }),
  obs2: varchar('obs2', { length: 255 }),
  obs3: varchar('obs3', { length: 255 }),
  gender: varchar('gender', { length: 10 }),
  cc: varchar('cc', { length: 20 }),
  nif: varchar('nif', { length: 20 }),
  country: varchar('country', { length: 50 }),
  state: varchar('state', { length: 50 }),
  city: varchar('city', { length: 50 }),
  address: varchar('address', { length: 255 }),
  zip: varchar('zip', { length: 20 }),
  invoce_notes: varchar('invoce_notes', { length: 255 }),
  favorite_collaborator: uuid('favorite_collaborator').references(() => user.id),
  notification_phone: boolean('notification_phone').notNull().default(false),
  notification_email: boolean('notification_email').notNull().default(false),
  status: integer('status').notNull().default(1), // 0 = desativado, 1 = ativo, 2 = eliminado
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()).$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

export type Client = typeof client.$inferSelect;
export type NewClient = typeof client.$inferInsert;
