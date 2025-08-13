import { pgTable, uuid, varchar, integer, decimal, text } from 'drizzle-orm/pg-core';
import { company } from './company.js';
import { location } from './location.js';

export const service = pgTable('service', {
  id: uuid('id').primaryKey().defaultRandom(),
  companyId: uuid('company_id').notNull().references(() => company.id),
  locationId: uuid('location_id').references(() => location.id),
  name: varchar('name', { length: 100 }).notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
});

export type Service = typeof service.$inferSelect;
export type NewService = typeof service.$inferInsert;
