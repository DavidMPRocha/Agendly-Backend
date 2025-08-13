import { client } from '../connection.ts';

export const permissions = [
  // Role Management
  {
    name: 'Ver',
    category: 'role',
    description: 'Visualizar roles'
  },
  {
    name: 'Adicionar',
    category: 'role',
    description: 'Criar novos roles'
  },
  {
    name: 'Editar',
    category: 'role',
    description: 'Editar roles existentes'
  },
  {
    name: 'Eliminar',
    category: 'role',
    description: 'Eliminar roles'
  },

  // Location Management
  {
    name: 'Ver',
    category: 'location',
    description: 'Visualizar localizações'
  },
  {
    name: 'Adicionar',
    category: 'location',
    description: 'Criar novas localizações'
  },
  {
    name: 'Editar',
    category: 'location',
    description: 'Editar localizações existentes'
  },
  {
    name: 'Eliminar',
    category: 'location',
    description: 'Eliminar localizações'
  },

  // Collaborator Management
  {
    name: 'Ver',
    category: 'collaborator',
    description: 'Visualizar colaboradores'
  },
  {
    name: 'Adicionar',
    category: 'collaborator',
    description: 'Adicionar novos colaboradores'
  },
  {
    name: 'Editar',
    category: 'collaborator',
    description: 'Editar colaboradores existentes'
  },
  {
    name: 'Eliminar',
    category: 'collaborator',
    description: 'Eliminar colaboradores'
  },
  {
    name: 'Gerir',
    category: 'collaborator',
    description: 'Gerir colaboradores'
  },

  // Client Management
  {
    name: 'Ver',
    category: 'client',
    description: 'Visualizar clientes'
  },
  {
    name: 'Adicionar',
    category: 'client',
    description: 'Adicionar novos clientes'
  },
  {
    name: 'Editar',
    category: 'client',
    description: 'Editar clientes existentes'
  },
  {
    name: 'Eliminar',
    category: 'client',
    description: 'Eliminar clientes'
  },
  {
    name: 'Ver básico',
    category: 'client',
    description: 'Não mostra informações de contacto'
  },

  // Service Management
  {
    name: 'Ver',
    category: 'service',
    description: 'Visualizar serviços'
  },
  {
    name: 'Adicionar',
    category: 'service',
    description: 'Adicionar novos serviços'
  },
  {
    name: 'Editar',
    category: 'service',
    description: 'Editar serviços existentes'
  },
  {
    name: 'Eliminar',
    category: 'service',
    description: 'Eliminar serviços'
  },

  // Appointment Management
  {
    name: 'Ver',
    category: 'appointment',
    description: 'Visualizar agendamentos'
  },
  {
    name: 'Adicionar',
    category: 'appointment',
    description: 'Adicionar novos agendamentos'
  },
  {
    name: 'Editar',
    category: 'appointment',
    description: 'Editar agendamentos existentes'
  },
  {
    name: 'Eliminar',
    category: 'appointment',
    description: 'Eliminar agendamentos'
  }
];

export async function seedPermissions() {
  try {
    console.log('🌱 Starting permission seeding...');
    
    for (const permission of permissions) {
      await client`
        INSERT INTO permission (name, category, description)
        VALUES (${permission.name}, ${permission.category}, ${permission.description})
      `;
    }
    
    console.log(`✅ Successfully seeded ${permissions.length} permissions`);
  } catch (error) {
    console.error('❌ Error seeding permissions:', error);
    throw error;
  }
}
