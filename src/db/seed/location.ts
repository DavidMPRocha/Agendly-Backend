import { client } from '../connection.ts';

export async function seedLocation(companyId: string) {
  try {
    console.log('📍 Starting location seeding...');
    
    const result = await client`
      INSERT INTO location (company_id, name, address, city, postal_code)
      VALUES (${companyId}, 'Sede Principal', 'Rua das Flores, 123', 'Lisboa', '1000-001')
      RETURNING id
    `;
    
    const locationId = result[0].id;
    console.log(`✅ Successfully seeded location with ID: ${locationId}`);
    
    return locationId;
  } catch (error) {
    console.error('❌ Error seeding location:', error);
    throw error;
  }
}
