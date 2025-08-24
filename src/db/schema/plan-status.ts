import { pgTable, uuid, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const planStatus = pgTable('plan_status', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  description: text('description'),
  color: varchar('color', { length: 7 }), // Código hexadecimal da cor
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

export type PlanStatus = typeof planStatus.$inferSelect;
export type NewPlanStatus = typeof planStatus.$inferInsert;
