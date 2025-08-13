import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { user } from './user.ts';
import { location } from './location.ts';

export const userLocation = pgTable('user_location', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => user.id),
  locationId: uuid('location_id').notNull().references(() => location.id),
});

export type UserLocation = typeof userLocation.$inferSelect;
export type NewUserLocation = typeof userLocation.$inferInsert;
