import { client } from '../connection.ts';

export async function seedUserLocationRole(userId: string, locationId: string, roleId: string) {
  try {
    console.log('🔗 Starting user_location_role seeding...');
    
    await client`
      INSERT INTO user_location_role (user_id, location_id, role_id)
      VALUES (${userId}, ${locationId}, ${roleId})
    `;
    
    console.log(`✅ Successfully linked user ${userId}, location ${locationId}, and role ${roleId}`);
  } catch (error) {
    console.error('❌ Error seeding user_location_role:', error);
    throw error;
  }
}
