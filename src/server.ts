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

const app = fastify();

app.register(fastifyCors, {
  origin: ["*", "http://localhost:3000", "http://127.0.0.1:3000"],
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

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen({ port: env.PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on port ${address.split(":")[2]}`);
});