import { pgTable, uuid, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { client } from './client.ts';

export const clientAdditionalInfo = pgTable('client_additional_Info', {
  id: uuid('id').primaryKey().defaultRandom(),
  client_id: uuid('client_id').notNull().references(() => client.id),
  type: varchar('type', { length: 100 }).notNull(),
  content: text('content').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

export type ClientAdditionalInfo = typeof clientAdditionalInfo.$inferSelect;
export type NewClientAdditionalInfo = typeof clientAdditionalInfo.$inferInsert;
