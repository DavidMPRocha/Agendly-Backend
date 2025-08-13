import { client } from '../connection.ts';

export async function seedUser(companyId: string) {
  try {
    console.log('👤 Starting user seeding...');
    
    const result = await client`
      INSERT INTO "user" (company_id, first_name, last_name, email, password, photo, type)
      VALUES (${companyId}, 'Admin', 'User', 'admin@agendly.com', 'hashed_password_here', 'default-avatar.png', 'owner')
      RETURNING id
    `;
    
    const userId = result[0].id;
    console.log(`✅ Successfully seeded user with ID: ${userId}`);
    
    return userId;
  } catch (error) {
    console.error('❌ Error seeding user:', error);
    throw error;
  }
}
