import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { clientAdditionalInfo } from './client-additional-info.ts';

export const clientAdditionalInfoDocument = pgTable('client_additional_info_document', {
  id: uuid('id').primaryKey().defaultRandom(),
  client_additional_info_id: uuid('client_additional_info_id').notNull().references(() => clientAdditionalInfo.id),
  document_path: varchar('document_path', { length: 255 }).notNull(),
  document_type: varchar('document_type', { length: 100 }).notNull(),
});

export type ClientAdditionalInfoDocument = typeof clientAdditionalInfoDocument.$inferSelect;
export type NewClientAdditionalInfoDocument = typeof clientAdditionalInfoDocument.$inferInsert;
