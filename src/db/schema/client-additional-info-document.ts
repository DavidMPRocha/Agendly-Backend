import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { clientAdditionalInfo } from './client-additional-info.js';

export const clientAdditionalInfoDocument = pgTable('client_additional_info_document', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientAdditionalInfoId: uuid('client_additional_info_id').notNull().references(() => clientAdditionalInfo.id),
  documentPath: varchar('document_path', { length: 255 }).notNull(),
  documentType: varchar('document_type', { length: 100 }).notNull(),
});

export type ClientAdditionalInfoDocument = typeof clientAdditionalInfoDocument.$inferSelect;
export type NewClientAdditionalInfoDocument = typeof clientAdditionalInfoDocument.$inferInsert;
