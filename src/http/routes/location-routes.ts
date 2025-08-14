import type { FastifyPluginCallback } from 'fastify';
import { authenticateToken } from '../middleware/auth-middleware.ts';
import { getLocation, listLocations, createLocation, updateLocation, deleteLocation } from '../controllers/location-controller.ts';
import { getLocationSchema, listLocationsSchema, createLocationSchema, updateLocationSchema, deleteLocationSchema } from '../schemas/location-schemas.ts';

export const locationRoutes: FastifyPluginCallback = (app) => {
  // Rota para obter uma localização específica
  app.get('/locations/:id', {
    schema: getLocationSchema,
    preHandler: authenticateToken,
    handler: getLocation
  });

  // Rota para listar localizações
  app.get('/locations', {
    schema: listLocationsSchema,
    preHandler: authenticateToken,
    handler: listLocations
  });

  // Rota para criar uma nova localização
  app.post('/locations', {
    schema: createLocationSchema,
    preHandler: authenticateToken,
    handler: createLocation
  });

  // Rota para atualizar uma localização
  app.put('/locations/:id', {
    schema: updateLocationSchema,
    preHandler: authenticateToken,
    handler: updateLocation
  });

  // Rota para eliminar uma localização
  app.delete('/locations/:id', {
    schema: deleteLocationSchema,
    preHandler: authenticateToken,
    handler: deleteLocation
  });
};
