import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { company } from './company.ts';

export const location = pgTable('location', {
  id: uuid('id').primaryKey().defaultRandom(),
  company_id: uuid('company_id').notNull().references(() => company.id),
  name: varchar('name', { length: 100 }).notNull(),
  address: varchar('address', { length: 255 }),
  city: varchar('city', { length: 50 }),
  postal_code: varchar('postal_code', { length: 10 }),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

export type Location = typeof location.$inferSelect;
export type NewLocation = typeof location.$inferInsert;
