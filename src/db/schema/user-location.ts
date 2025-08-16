import { pgTable, uuid, timestamp, boolean } from 'drizzle-orm/pg-core';
import { user } from './user.ts';
import { location } from './location.ts';

export const userLocation = pgTable('user_location', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => user.id),
  location_id: uuid('location_id').notNull().references(() => location.id),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

export type UserLocation = typeof userLocation.$inferSelect;
export type NewUserLocation = typeof userLocation.$inferInsert;
