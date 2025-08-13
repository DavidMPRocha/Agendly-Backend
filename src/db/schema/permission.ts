import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const permission = pgTable('permission', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
});

export type Permission = typeof permission.$inferSelect;
export type NewPermission = typeof permission.$inferInsert;
