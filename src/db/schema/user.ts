import { pgTable, uuid, varchar, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { company } from './company.ts';

export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  company_id: uuid('company_id').references(() => company.id),
  first_name: varchar('first_name', { length: 50 }).notNull(),
  last_name: varchar('last_name', { length: 50 }).notNull(),
  email: varchar('email', { length: 50 }).notNull(),
  password: varchar('password', { length: 128 }).notNull(),
  photo: varchar('photo', { length: 255 }).notNull(),
  type: varchar('type', { length: 20 }).notNull().default('owner'),
});

export const userRelations = relations(user, ({ one }) => ({
  company: one(company, {
    fields: [user.company_id],
    references: [company.id],
  }),
}));

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
