import { seedPermissions } from './permissions.ts';
import { seedCompany } from './company.ts';
import { seedLocation } from './location.ts';
import { seedUser } from './user.ts';
import { seedUserLocation } from './user-location.ts';
import { seedRole } from './role.ts';
import { seedRolePermissions } from './role-permissions.ts';
import { seedUserLocationRole } from './user-location-role.ts';
import { seedServices } from './services.ts';
import { seedAppointmentStatus } from './appointment-status.ts';
import { seedClient } from './client.ts';
import { seedPlanStatus } from './plan-status.ts';
import { seedPlanType } from './plan-type.ts';

export async function runSeeds() {
  try {
    console.log('🚀 Starting database seeding...\n');
    
    // Seed permissions first
    await seedPermissions();
    
    // Seed company
    const companyId = await seedCompany();
    
    // Seed location linked to company
    const locationId = await seedLocation(companyId);
    
    // Seed user
    const userId = await seedUser(companyId);
    
    // Seed user_location linking user and location
    await seedUserLocation(userId, locationId);
    
    // Seed role with all permissions
    const roleId = await seedRole(companyId);
    await seedRolePermissions(roleId);
    
    // Seed user_location_role with role, user and location
    await seedUserLocationRole(userId, locationId, roleId);
    
    // Seed services
    await seedServices(companyId, locationId);
    
    // Seed appointment statuses
    await seedAppointmentStatus();
    
    // Seed client
    await seedClient(companyId, locationId);
    
    // Seed plan statuses and types
    await seedPlanStatus();
    await seedPlanType();
    
    console.log('\n🎉 All seeds completed successfully!');
  } catch (error) {
    console.error('💥 Error during seeding:', error);
    process.exit(1);
  }
}

// Run seeds if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSeeds();
}
