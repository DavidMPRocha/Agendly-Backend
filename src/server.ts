import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import { fastifyRateLimit } from "@fastify/rate-limit"
import { env } from "./env.ts"
import { authRoutes } from "./http/routes/auth-routes.ts"
import { userRoutes } from "./http/routes/user-routes.ts"
import { clientRoutes } from "./http/routes/client-routes.ts"
import { serviceRoutes } from "./http/routes/service-routes.ts"
import { companyRoutes } from "./http/routes/company-routes.ts"
import { locationRoutes } from "./http/routes/location-routes.ts"
import { clientAdditionalInfoRoutes } from "./http/routes/client-additional-info-routes.ts"
import { appointmentRoutes } from "./http/routes/appointment-routes.ts"
import { planRoutes } from "./http/routes/plan-routes.ts"
import { healthRoutes } from "./http/routes/health-routes.ts"

const app = fastify();

// Middleware para tratamento de erros não capturados
app.setErrorHandler((error: any, request: any, reply: any) => {
  reply.status(500).send({
    error: 'Internal Server Error',
    message: env.IS_PRODUCTION ? 'Something went wrong' : error.message,
    timestamp: new Date().toISOString()
  });
});

// Configuração de rate limiting
app.register(fastifyRateLimit, {
  max: 100, // Máximo de 100 requisições
  timeWindow: '1 minute', // Por minuto
  errorResponseBuilder: (request, context) => ({
    code: 429,
    error: 'Too Many Requests',
    message: `Rate limit exceeded, retry in ${context.after}`,
    date: new Date().toISOString(),
    expiresIn: context.after
  })
});

// Rate limiting específico para autenticação (mais restritivo)
app.register(fastifyRateLimit, {
  keyGenerator: (request) => request.ip,
  max: 5, // Máximo de 5 tentativas de login
  timeWindow: '15 minutes', // Por 15 minutos
  skipOnError: false,
  allowList: (request) => {
    // Permitir health checks
    return request.url === '/health' || request.url === '/health/detailed';
  }
});

// Configuração de CORS baseada no ambiente
const corsOrigins = env.IS_PRODUCTION 
  ? (process.env.CORS_ORIGIN?.split(',') || ['https://yourdomain.com'])
  : ["*", "http://localhost:3000", "http://127.0.0.1:3000"];

app.register(fastifyCors, {
  origin: corsOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

// Open routes
app.register(authRoutes);

// Protected routes
app.register(userRoutes);
app.register(clientRoutes);
app.register(serviceRoutes);
app.register(companyRoutes);
app.register(locationRoutes);
app.register(clientAdditionalInfoRoutes);
app.register(appointmentRoutes);
app.register(planRoutes);

// Health check routes (open routes - não precisam de autenticação)
app.register(healthRoutes);

app.listen({ port: env.PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error('Failed to start server', 'SERVER', err);
    process.exit(1);
  }
  
  const port = address.split(":")[2];
  
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`📊 Environment: ${env.NODE_ENV}`);
  console.log(`🔒 CORS Origins: ${corsOrigins.join(', ')}`);
});