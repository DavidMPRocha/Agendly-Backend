import { pgTable, uuid, timestamp, boolean, integer, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { company } from './company.ts';
import { planType } from './plan-type.ts';
import { planStatus } from './plan-status.ts';

export const plan = pgTable('plan', {
  id: uuid('id').primaryKey().defaultRandom(),
  company_id: uuid('company_id').notNull().references(() => company.id),
  plan_type_id: uuid('plan_type_id').notNull().references(() => planType.id),
  status_id: uuid('status_id').notNull().references(() => planStatus.id),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date').notNull(),
  price_paid: integer('price_paid').notNull(), // Preço pago em centimos
  payment_method: text('payment_method'), // Método de pagamento
  payment_reference: text('payment_reference'), // Referência do pagamento
  auto_renewal: boolean('auto_renewal').notNull().default(false),
  notes: text('notes'), // Notas adicionais
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  is_active: boolean('is_active').notNull().default(true),
});

export const planRelations = relations(plan, ({ one }) => ({
  company: one(company, {
    fields: [plan.company_id],
    references: [company.id],
  }),
  planType: one(planType, {
    fields: [plan.plan_type_id],
    references: [planType.id],
  }),
  status: one(planStatus, {
    fields: [plan.status_id],
    references: [planStatus.id],
  }),
}));

export type Plan = typeof plan.$inferSelect;
export type NewPlan = typeof plan.$inferInsert;
