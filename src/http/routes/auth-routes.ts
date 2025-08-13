import type { FastifyPluginCallback } from 'fastify';
import { register, login } from '../controllers/auth-controller.ts';
import { registerSchema, loginSchema } from '../schemas/auth-schemas.ts';

export const authRoutes: FastifyPluginCallback = (app) => {
  app.post('/auth/register', {
    schema: registerSchema,
    handler: register
  });

  app.post('/auth/login', {
    schema: loginSchema,
    handler: login
  });
}
