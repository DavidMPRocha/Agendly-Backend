import { client } from '../connection.ts';

export async function seedUserLocation(userId: string, locationId: string) {
  try {
    console.log('🔗 Starting user_location seeding...');
    
    await client`
      INSERT INTO user_location (user_id, location_id)
      VALUES (${userId}, ${locationId})
    `;
    
    console.log(`✅ Successfully linked user ${userId} to location ${locationId}`);
  } catch (error) {
    console.error('❌ Error seeding user_location:', error);
    throw error;
  }
}
