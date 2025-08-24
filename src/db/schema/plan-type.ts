import { pgTable, uuid, varchar, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const planType = pgTable('plan_type', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  price: integer('price').notNull(), // Preço em centavos
  duration_days: integer('duration_days').notNull(), // Duração do plano em dias
  max_users: integer('max_users').notNull(), // Número máximo de usuários
  max_locations: integer('max_locations').notNull(), // Número máximo de localizações
  features: text('features'), // JSON string com features do plano
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

export type PlanType = typeof planType.$inferSelect;
export type NewPlanType = typeof planType.$inferInsert;
