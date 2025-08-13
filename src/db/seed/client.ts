import { client } from '../connection.ts';

export async function seedClient(companyId: string, locationId: string) {
  try {
    console.log('👥 Starting client seeding...');
    
    await client`
      INSERT INTO client (company_id, location_id, name, email, phone, notes, date_of_birth, notification_phone, notification_email)
      VALUES (${companyId}, ${locationId}, 'João Silva', 'joao.silva@email.com', '+351 912 345 678', 'Cliente preferencial', '1990-05-15', true, true)
    `;
    
    console.log(`✅ Successfully seeded client`);
  } catch (error) {
    console.error('❌ Error seeding client:', error);
    throw error;
  }
}