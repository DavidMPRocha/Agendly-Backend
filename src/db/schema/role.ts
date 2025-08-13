import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { company } from './company.ts';

export const role = pgTable('role', {
  id: uuid('id').primaryKey().defaultRandom(),
  company_id: uuid('company_id').references(() => company.id),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }),
});

export const roleRelations = relations(role, ({ one }) => ({
  company: one(company, {
    fields: [role.company_id],
    references: [company.id],
  }),
}));

export type Role = typeof role.$inferSelect;
export type NewRole = typeof role.$inferInsert;
