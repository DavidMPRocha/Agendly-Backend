import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { company } from './company.ts';
import { serviceLocation } from './service-location.ts';

export const location = pgTable('location', {
  id: uuid('id').primaryKey().defaultRandom(),
  company_id: uuid('company_id').notNull().references(() => company.id),
  name: varchar('name', { length: 100 }).notNull(),
  country: varchar('country', { length: 50 }),
  state: varchar('state', { length: 50 }),
  city: varchar('city', { length: 50 }),
  address: varchar('address', { length: 255 }),
  zip: varchar('zip', { length: 20 }),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

// Relações
export const locationRelations = relations(location, ({ many }) => ({
  serviceLocations: many(serviceLocation),
}));

export type Location = typeof location.$inferSelect;
export type NewLocation = typeof location.$inferInsert;
