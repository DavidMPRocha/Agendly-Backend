import { pgTable, uuid, varchar, integer, decimal, text } from 'drizzle-orm/pg-core';
import { company } from './company.ts';
import { location } from './location.ts';

export const service = pgTable('service', {
  id: uuid('id').primaryKey().defaultRandom(),
  company_id: uuid('company_id').notNull().references(() => company.id),
  location_id: uuid('location_id').references(() => location.id),
  name: varchar('name', { length: 100 }).notNull(),
  duration_minutes: integer('duration_minutes').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
});

export type Service = typeof service.$inferSelect;
export type NewService = typeof service.$inferInsert;
