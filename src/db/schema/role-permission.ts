import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { role } from './role.ts';
import { permission } from './permission.ts';

export const rolePermission = pgTable('role_permission', {
  id: uuid('id').primaryKey().defaultRandom(),
  role_id: uuid('role_id').notNull().references(() => role.id),
  permission_id: uuid('permission_id').notNull().references(() => permission.id),
});

export type RolePermission = typeof rolePermission.$inferSelect;
export type NewRolePermission = typeof rolePermission.$inferInsert;
