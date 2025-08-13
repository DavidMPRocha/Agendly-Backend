import type { Config } from 'drizzle-kit';
import { env } from './src/env.ts';

export default {
  schema: './src/db/schema/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
