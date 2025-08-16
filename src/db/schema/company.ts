import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

export const company = pgTable('company', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

export type Company = typeof company.$inferSelect;
export type NewCompany = typeof company.$inferInsert;
