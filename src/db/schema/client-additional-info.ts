import { pgTable, uuid, varchar, text } from 'drizzle-orm/pg-core';
import { client } from './client.js';

export const clientAdditionalInfo = pgTable('client_additional_Info', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull().references(() => client.id),
  type: varchar('type', { length: 100 }).notNull(),
  content: text('content').notNull(),
});

export type ClientAdditionalInfo = typeof clientAdditionalInfo.$inferSelect;
export type NewClientAdditionalInfo = typeof clientAdditionalInfo.$inferInsert;
