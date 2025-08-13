import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const role = pgTable('role', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }),
});

export type Role = typeof role.$inferSelect;
export type NewRole = typeof role.$inferInsert;
