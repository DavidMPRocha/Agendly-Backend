import { client } from '../connection.ts';

export async function seedRolePermissions(roleId: string) {
  try {
    console.log('🔐 Starting role_permissions seeding...');
    
    // Get all permissions
    const permissions = await client`
      SELECT id FROM permission
    `;
    
    // Link role to all permissions
    for (const permission of permissions) {
      await client`
        INSERT INTO role_permission (role_id, permission_id)
        VALUES (${roleId}, ${permission.id})
      `;
    }
    
    console.log(`✅ Successfully linked role ${roleId} to ${permissions.length} permissions`);
  } catch (error) {
    console.error('❌ Error seeding role_permissions:', error);
    throw error;
  }
}
