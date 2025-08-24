import { db } from '../connection.ts';
import { planType } from '../schema/plan-type.ts';

export async function seedPlanType() {
  console.log('📋 Seeding plan types...');
  
  const planTypes = [
    {
      name: 'Básico',
      description: 'Plano básico para pequenas empresas',
      price: 9900, // R$ 99,00 em centavos
      duration_days: 30,
      max_users: 5,
      max_locations: 2,
      features: JSON.stringify([
        'Agendamento básico',
        'Gestão de clientes',
        'Relatórios simples',
        'Suporte por email'
      ]),
    },
    {
      name: 'Profissional',
      description: 'Plano profissional para empresas em crescimento',
      price: 19900, // R$ 199,00 em centavos
      duration_days: 30,
      max_users: 15,
      max_locations: 5,
      features: JSON.stringify([
        'Todas as funcionalidades do Básico',
        'Relatórios avançados',
        'Integração com calendário',
        'Suporte prioritário',
        'Personalização de marca'
      ]),
    },
    {
      name: 'Empresarial',
      description: 'Plano empresarial para grandes empresas',
      price: 49900, // R$ 499,00 em centavos
      duration_days: 30,
      max_users: 50,
      max_locations: 15,
      features: JSON.stringify([
        'Todas as funcionalidades do Profissional',
        'API personalizada',
        'Suporte 24/7',
        'Treinamento da equipe',
        'Integração com sistemas externos',
        'Dashboard personalizado'
      ]),
    },
    {
      name: 'Enterprise',
      description: 'Plano enterprise para grandes corporações',
      price: 99900, // R$ 999,00 em centavos
      duration_days: 30,
      max_users: -1, // Ilimitado
      max_locations: -1, // Ilimitado
      features: JSON.stringify([
        'Todas as funcionalidades do Empresarial',
        'Infraestrutura dedicada',
        'Gerente de conta dedicado',
        'SLA garantido',
        'Customizações específicas',
        'Migração de dados gratuita'
      ]),
    },
  ];

  for (const plan of planTypes) {
    await db.insert(planType).values(plan).onConflictDoNothing();
  }

  console.log('✅ Plan types seeded successfully!');
}
