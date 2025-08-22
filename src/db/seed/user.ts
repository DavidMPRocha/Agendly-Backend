import { client } from '../connection.ts';
import bcrypt from 'bcryptjs';

export async function seedUser(companyId: string) {
  try {
    console.log('👤 Starting user seeding...');
    
    // Hash the default password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('12345678', saltRounds);
    
    const result = await client`
      INSERT INTO "user" (company_id, first_name, last_name, email, password, photo, type)
      VALUES (${companyId}, 'Admin', 'User', 'admin@agendly.com', ${hashedPassword}, 'default-avatar.png', 'owner')
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
