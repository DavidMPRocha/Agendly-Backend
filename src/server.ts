import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import { env } from "./env.ts"
import { authRoutes } from "./http/routes/auth-routes.ts"
import { userRoutes } from "./http/routes/user-routes.ts"
import { clientRoutes } from "./http/routes/client-routes.ts"
import { serviceRoutes } from "./http/routes/service-routes.ts"

const app = fastify();

app.register(fastifyCors, {
  origin: "*"
});

// Open routes
app.register(authRoutes);

// Protected routes
app.register(userRoutes);
app.register(clientRoutes);
app.register(serviceRoutes);

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on port ${address.split("]:")[1]}`);
});