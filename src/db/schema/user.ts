import { pgTable, uuid, varchar, text } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  email: varchar('email', { length: 50 }).notNull(),
  password: varchar('password', { length: 128 }).notNull(),
  photo: varchar('photo', { length: 255 }).notNull(),
  type: varchar('type', { length: 20 }).notNull().default('owner'),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
