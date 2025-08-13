import { pgTable, uuid, varchar, text, date, timestamp, boolean, integer, decimal } from 'drizzle-orm/pg-core';

// User table
export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  email: varchar('email', { length: 50 }).notNull(),
  password: varchar('password', { length: 128 }).notNull(),
  photo: varchar('photo', { length: 255 }).notNull(),
  type: varchar('type', { length: 20 }).notNull().default('owner'),
});

// Company table
export const company = pgTable('company', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }),
});

// Location table
export const location = pgTable('location', {
  id: uuid('id').primaryKey().defaultRandom(),
  companyId: uuid('company_id').notNull().references(() => company.id),
  name: varchar('name', { length: 100 }).notNull(),
  address: varchar('address', { length: 255 }),
  city: varchar('city', { length: 50 }),
  postalCode: varchar('postal_code', { length: 10 }),
});

// User location junction table
export const userLocation = pgTable('user_location', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => user.id),
  locationId: uuid('location_id').notNull().references(() => location.id),
});

// Client table
export const client = pgTable('client', {
  id: uuid('id').primaryKey().defaultRandom(),
  companyId: uuid('company_id').references(() => company.id),
  locationId: uuid('location_id').notNull().references(() => location.id),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 50 }),
  phone: varchar('phone', { length: 20 }),
  notes: text('notes'),
  dateOfBirth: date('date_of_birth'),
  notificationPhone: boolean('notification_phone').notNull().default(false),
  notificationEmail: boolean('notification_email').notNull().default(false),
});

// Service table
export const service = pgTable('service', {
  id: uuid('id').primaryKey().defaultRandom(),
  companyId: uuid('company_id').notNull().references(() => company.id),
  locationId: uuid('location_id').references(() => location.id),
  name: varchar('name', { length: 100 }).notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
});

// Appointment table
export const appointment = pgTable('appointment', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => user.id),
  locationId: uuid('location_id').notNull().references(() => location.id),
  clientId: uuid('client_id').notNull().references(() => client.id),
  serviceId: uuid('service_id').notNull().references(() => service.id),
  date: date('date').notNull(),
  datetimeStart: timestamp('datetime_start').notNull(),
  datetimeEnd: timestamp('datetime_end').notNull(),
  description: text('description'),
  notifiedByPhone: boolean('notified_by_phone').notNull().default(false),
  notifiedByEmail: boolean('notified_by_email').notNull().default(false),
});

// Permission table
export const permission = pgTable('permission', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
});

// Role table
export const role = pgTable('role', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }),
});

// Role permission junction table
export const rolePermission = pgTable('role_permission', {
  id: uuid('id').primaryKey().defaultRandom(),
  roleId: uuid('role_id').notNull().references(() => role.id),
  permissionId: uuid('permission_id').notNull().references(() => permission.id),
});

// User location role junction table
export const userLocationRole = pgTable('user_location_role', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => user.id),
  locationId: uuid('location_id').notNull().references(() => location.id),
  roleId: uuid('role_id').notNull().references(() => role.id),
});

// Client additional info table
export const clientAdditionalInfo = pgTable('client_additional_Info', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull().references(() => client.id),
  type: varchar('type', { length: 100 }).notNull(),
  content: text('content').notNull(),
});

// Client additional info document table
export const clientAdditionalInfoDocument = pgTable('client_additional_info_document', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientAdditionalInfoId: uuid('client_additional_info_id').notNull().references(() => clientAdditionalInfo.id),
  documentPath: varchar('document_path', { length: 255 }).notNull(),
  documentType: varchar('document_type', { length: 100 }).notNull(),
});

// Export all types
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type Company = typeof company.$inferSelect;
export type NewCompany = typeof company.$inferInsert;

export type Location = typeof location.$inferSelect;
export type NewLocation = typeof location.$inferInsert;

export type UserLocation = typeof userLocation.$inferSelect;
export type NewUserLocation = typeof userLocation.$inferInsert;

export type Client = typeof client.$inferSelect;
export type NewClient = typeof client.$inferInsert;

export type Service = typeof service.$inferSelect;
export type NewService = typeof service.$inferInsert;

export type Appointment = typeof appointment.$inferSelect;
export type NewAppointment = typeof appointment.$inferInsert;

export type Permission = typeof permission.$inferSelect;
export type NewPermission = typeof permission.$inferInsert;

export type Role = typeof role.$inferSelect;
export type NewRole = typeof role.$inferInsert;

export type RolePermission = typeof rolePermission.$inferSelect;
export type NewRolePermission = typeof rolePermission.$inferInsert;

export type UserLocationRole = typeof userLocationRole.$inferSelect;
export type NewUserLocationRole = typeof userLocationRole.$inferInsert;

export type ClientAdditionalInfo = typeof clientAdditionalInfo.$inferSelect;
export type NewClientAdditionalInfo = typeof clientAdditionalInfo.$inferInsert;

export type ClientAdditionalInfoDocument = typeof clientAdditionalInfoDocument.$inferSelect;
export type NewClientAdditionalInfoDocument = typeof clientAdditionalInfoDocument.$inferInsert;
