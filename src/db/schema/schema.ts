import { client } from "./client.ts";
import { permission } from "./permission.ts";
import { appointment } from "./appointment.ts";
import { appointmentStatus } from "./appointment-status.ts";
import { company } from "./company.ts";
import { location } from "./location.ts";
import { service } from "./service.ts";
import { serviceLocation } from "./service-location.ts";
import { userLocation } from "./user-location.ts";
import { user } from "./user.ts";
import { role } from "./role.ts";
import { rolePermission } from "./role-permission.ts";
import { userLocationRole } from "./user-location-role.ts";
import { clientAdditionalInfo } from "./client-additional-info.ts";
import { clientAdditionalInfoDocument } from "./client-additional-info-document.ts";
import { planType } from "./plan-type.ts";
import { planStatus } from "./plan-status.ts";
import { plan } from "./plan.ts";

// Re-export all tables
export { user, company, location, userLocation, client, service, serviceLocation, appointment, appointmentStatus, permission, role, rolePermission, userLocationRole, clientAdditionalInfo, clientAdditionalInfoDocument, planType, planStatus, plan };

// Schema object
export const schema = {
  user,
  company,
  location,
  userLocation,
  client,
  service,
  serviceLocation,
  appointment,
  appointmentStatus,
  permission,
  role,
  rolePermission,
  userLocationRole,
  clientAdditionalInfo,
  clientAdditionalInfoDocument,
  planType,
  planStatus,
  plan,
};
