import { client } from '../connection.ts';

export async function seedAppointmentStatuses() {
  try {
    console.log('📅 Starting appointment statuses seeding...');
    
    const statuses = [
      {
        name: 'Confirmado',
        description: 'Agendamento confirmado pelo cliente'
      },
      {
        name: 'Iniciado',
        description: 'Serviço em andamento'
      },
      {
        name: 'Pago',
        description: 'Serviço concluído e pago'
      },
      {
        name: 'Falta',
        description: 'Cliente não compareceu'
      },
      {
        name: 'Cancelado',
        description: 'Agendamento cancelado'
      }
    ];
    
    for (const status of statuses) {
      await client`
        INSERT INTO appointment_status (name, description)
        VALUES (${status.name}, ${status.description})
      `;
    }
    
    console.log(`✅ Successfully seeded ${statuses.length} appointment statuses`);
  } catch (error) {
    console.error('❌ Error seeding appointment statuses:', error);
    throw error;
  }
}
