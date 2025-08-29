import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
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
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on port ${address.split(":")[2]}`);
});