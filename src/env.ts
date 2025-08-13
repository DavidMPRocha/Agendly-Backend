// Validação simples de variáveis de ambiente
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3333;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

if (!DATABASE_URL.startsWith('postgresql://')) {
  throw new Error('DATABASE_URL must start with postgresql://');
}

export const env = {
  PORT,
  DATABASE_URL
};