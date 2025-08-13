import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { company } from './company.ts';

export const location = pgTable('location', {
  id: uuid('id').primaryKey().defaultRandom(),
  company_id: uuid('company_id').notNull().references(() => company.id),
  name: varchar('name', { length: 100 }).notNull(),
  address: varchar('address', { length: 255 }),
  city: varchar('city', { length: 50 }),
  postal_code: varchar('postal_code', { length: 10 }),
});

export type Location = typeof location.$inferSelect;
export type NewLocation = typeof location.$inferInsert;
