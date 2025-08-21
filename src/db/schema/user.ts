import { pgTable, uuid, varchar, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';
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
  status: integer('status').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

export const userRelations = relations(user, ({ one }) => ({
  company: one(company, {
    fields: [user.company_id],
    references: [company.id],
  }),
}));

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
