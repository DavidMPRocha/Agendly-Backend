import { client } from '../connection.ts';

export async function seedCompany() {
  try {
    console.log('🏢 Starting company seeding...');
    
    const result = await client`
      INSERT INTO company (name, description)
      VALUES ('Agendly', 'Sistema de agendamento e gestão de negócios')
      RETURNING id
    `;
    
    const companyId = result[0].id;
    console.log(`✅ Successfully seeded company with ID: ${companyId}`);
    
    return companyId;
  } catch (error) {
    console.error('❌ Error seeding company:', error);
    throw error;
  }
}
