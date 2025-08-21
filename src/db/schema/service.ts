import { pgTable, uuid, varchar, integer, decimal, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { company } from './company.ts';
import { serviceLocation } from './service-location.ts';

export const service = pgTable('service', {
  id: uuid('id').primaryKey().defaultRandom(),
  company_id: uuid('company_id').notNull().references(() => company.id),
  name: varchar('name', { length: 100 }).notNull(),
  duration_minutes: integer('duration_minutes').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  status: integer('status').notNull().default(1), // 0 = desativado, 1 = ativo
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

// Relações
export const serviceRelations = relations(service, ({ many }) => ({
  serviceLocations: many(serviceLocation),
}));

export type Service = typeof service.$inferSelect;
export type NewService = typeof service.$inferInsert;
