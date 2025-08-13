import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { user } from './user.ts';
import { location } from './location.ts';
import { role } from './role.ts';

export const userLocationRole = pgTable('user_location_role', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => user.id),
  locationId: uuid('location_id').notNull().references(() => location.id),
  roleId: uuid('role_id').notNull().references(() => role.id),
});

export type UserLocationRole = typeof userLocationRole.$inferSelect;
export type NewUserLocationRole = typeof userLocationRole.$inferInsert;
