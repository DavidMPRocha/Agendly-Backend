// Validação robusta de variáveis de ambiente
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3333;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Validações obrigatórias
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

if (!DATABASE_URL.startsWith('postgresql://')) {
  throw new Error('DATABASE_URL must start with postgresql://');
}

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is required');
}

if (JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters long');
}

// Validações de porta
if (PORT < 1 || PORT > 65535) {
  throw new Error('PORT must be between 1 and 65535');
}

export const env = {
  PORT,
  DATABASE_URL,
  JWT_SECRET,
  NODE_ENV,
  IS_PRODUCTION: NODE_ENV === 'production',
  IS_DEVELOPMENT: NODE_ENV === 'development'
};