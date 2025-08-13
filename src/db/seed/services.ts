import { client } from '../connection.ts';

export async function seedServices(companyId: string, locationId: string) {
  try {
    console.log('🛠️ Starting services seeding...');
    
    const services = [
      {
        name: 'Corte de Cabelo',
        durationMinutes: 30,
        price: 25.00,
        description: 'Corte de cabelo profissional'
      },
      {
        name: 'Barba',
        durationMinutes: 20,
        price: 15.00,
        description: 'Fazer a barba com toalha quente'
      },
      {
        name: 'Corte + Barba',
        durationMinutes: 45,
        price: 35.00,
        description: 'Corte de cabelo e barba completo'
      }
    ];
    
    for (const service of services) {
      await client`
        INSERT INTO service (company_id, location_id, name, duration_minutes, price, description)
        VALUES (${companyId}, ${locationId}, ${service.name}, ${service.durationMinutes}, ${service.price}, ${service.description})
      `;
    }
    
    console.log(`✅ Successfully seeded ${services.length} services`);
  } catch (error) {
    console.error('❌ Error seeding services:', error);
    throw error;
  }
}
