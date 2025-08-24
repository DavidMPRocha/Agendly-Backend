import { db } from '../connection.ts';
import { planStatus } from '../schema/plan-status.ts';

export async function seedPlanStatus() {
  console.log('📋 Seeding plan statuses...');
  
  const statuses = [
    {
      name: 'Ativo',
      description: 'Plano ativo e funcionando normalmente',
      color: '#10B981', // Verde
    },
    {
      name: 'Pendente',
      description: 'Plano aguardando pagamento ou ativação',
      color: '#F59E0B', // Amarelo
    },
    {
      name: 'Expirado',
      description: 'Plano expirado e não renovado',
      color: '#EF4444', // Vermelho
    },
    {
      name: 'Cancelado',
      description: 'Plano cancelado pelo usuário',
      color: '#6B7280', // Cinza
    },
    {
      name: 'Suspenso',
      description: 'Plano temporariamente suspenso',
      color: '#8B5CF6', // Roxo
    },
  ];

  for (const status of statuses) {
    await db.insert(planStatus).values(status).onConflictDoNothing();
  }

  console.log('✅ Plan statuses seeded successfully!');
}
