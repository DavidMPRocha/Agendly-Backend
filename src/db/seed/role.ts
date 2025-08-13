import { client } from '../connection.ts';

export async function seedRole(companyId: string) {
  try {
    console.log('👑 Starting role seeding...');
    
    const result = await client`
      INSERT INTO role (company_id, name, description)
      VALUES (${companyId}, 'Administrador', 'Role com todas as permissões do sistema')
      RETURNING id
    `;
    
    const roleId = result[0].id;
    console.log(`✅ Successfully seeded role with ID: ${roleId}`);
    
    return roleId;
  } catch (error) {
    console.error('❌ Error seeding role:', error);
    throw error;
  }
}
