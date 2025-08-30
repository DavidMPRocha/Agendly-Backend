import postgres from "postgres";
import { env } from "../env.ts";
import { schema } from "./schema/schema.ts";
import { drizzle } from "drizzle-orm/postgres-js";

// Configuração otimizada do pool de conexões
export const client = postgres(env.DATABASE_URL, {
  max: 20, // Máximo de conexões no pool
  idle_timeout: 20, // Tempo máximo que uma conexão pode ficar ociosa
  connect_timeout: 10, // Timeout para estabelecer conexão
  max_lifetime: 60 * 30, // Tempo máximo de vida de uma conexão (30 minutos)
  prepare: true, // Habilitar prepared statements
  ssl: env.IS_PRODUCTION ? { rejectUnauthorized: false } : false,
  onnotice: () => {}, // Suprimir notificações do PostgreSQL
  connection: {
    application_name: 'agendly-backend'
  }
});

export const db = drizzle(client, {
  schema,
  casing: 'snake_case',
});

// Função para fechar conexões graciosamente
export async function closeDatabase() {
  await client.end();
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Fechando conexões do banco...');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔄 Fechando conexões do banco...');
  await closeDatabase();
  process.exit(0);
});
  