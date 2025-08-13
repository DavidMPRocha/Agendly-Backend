import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const company = pgTable('company', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }),
});

export type Company = typeof company.$inferSelect;
export type NewCompany = typeof company.$inferInsert;
