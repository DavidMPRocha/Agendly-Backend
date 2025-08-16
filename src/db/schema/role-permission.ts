import { pgTable, uuid, timestamp, boolean } from 'drizzle-orm/pg-core';
import { role } from './role.ts';
import { permission } from './permission.ts';

export const rolePermission = pgTable('role_permission', {
  id: uuid('id').primaryKey().defaultRandom(),
  role_id: uuid('role_id').notNull().references(() => role.id),
  permission_id: uuid('permission_id').notNull().references(() => permission.id),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

export type RolePermission = typeof rolePermission.$inferSelect;
export type NewRolePermission = typeof rolePermission.$inferInsert;
