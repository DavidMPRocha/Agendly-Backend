import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { clientAdditionalInfo } from './client-additional-info.ts';

export const clientAdditionalInfoDocument = pgTable('client_additional_info_document', {
  id: uuid('id').primaryKey().defaultRandom(),
  client_additional_info_id: uuid('client_additional_info_id').notNull().references(() => clientAdditionalInfo.id),
  document_path: varchar('document_path', { length: 255 }).notNull(),
  document_type: varchar('document_type', { length: 100 }).notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

export type ClientAdditionalInfoDocument = typeof clientAdditionalInfoDocument.$inferSelect;
export type NewClientAdditionalInfoDocument = typeof clientAdditionalInfoDocument.$inferInsert;
