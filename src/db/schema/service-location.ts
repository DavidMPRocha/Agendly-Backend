import { pgTable, uuid, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { service } from './service.ts';
import { location } from './location.ts';

export const serviceLocation = pgTable('service_location', {
  id: uuid('id').primaryKey().defaultRandom(),
  service_id: uuid('service_id').notNull().references(() => service.id, { onDelete: 'cascade' }),
  location_id: uuid('location_id').notNull().references(() => location.id, { onDelete: 'cascade' }),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

// Relações
export const serviceLocationRelations = relations(serviceLocation, ({ one }) => ({
  service: one(service, {
    fields: [serviceLocation.service_id],
    references: [service.id],
  }),
  location: one(location, {
    fields: [serviceLocation.location_id],
    references: [location.id],
  }),
}));

export type ServiceLocation = typeof serviceLocation.$inferSelect;
export type NewServiceLocation = typeof serviceLocation.$inferInsert;
