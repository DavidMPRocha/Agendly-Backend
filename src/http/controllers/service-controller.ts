import type { FastifyReply, FastifyRequest } from 'fastify';
import { eq, and, inArray } from 'drizzle-orm';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/schema.ts';
import { withErrorHandler } from '../middleware/error-handler.ts';

// Controller para obter um serviço específico
async function getServiceHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  // Buscar o service
  const services = await db.select().from(schema.service).where(eq(schema.service.id, id));
  
  if (services.length === 0) {
    return reply.status(404).send({
      error: 'Serviço não foi encontrado'
    });
  }

  const service = services[0];

  // Buscar todas as locations relacionadas ao service através da tabela service_location
  const serviceLocations = await db
    .select({
      location: schema.location,
    })
    .from(schema.serviceLocation)
    .innerJoin(schema.location, eq(schema.serviceLocation.location_id, schema.location.id))
    .where(eq(schema.serviceLocation.service_id, id));

  const locations = serviceLocations.map(sl => sl.location);
  console.log(locations);
  const service_with_locations = {
    ...service,
    location_ids: locations
  };

  return reply.send({
    service: service_with_locations
  });
}

export const getService = withErrorHandler(getServiceHandler, 'procurar serviço');

// Controller para listar serviços
async function listServicesHandler(request: FastifyRequest, reply: FastifyReply) {
  const { company_id, location_id } = request.query as { company_id: string; location_id?: string };

  let services;
  
  if (location_id) {
    // Se location_id for fornecido, buscar serviços que estão relacionados a essa location
    services = await db
      .select({
        service: schema.service,
      })
      .from(schema.serviceLocation)
      .innerJoin(schema.service, eq(schema.serviceLocation.service_id, schema.service.id))
      .where(and(
        eq(schema.service.company_id, company_id),
        eq(schema.serviceLocation.location_id, location_id)
      ));
    
    services = services.map(s => s.service);
  } else {
    // Se não houver location_id, buscar todos os serviços da empresa
    services = await db.select().from(schema.service).where(and(eq(schema.service.company_id, company_id), eq(schema.service.is_active, true)));
  }

  // Buscar todas as locations de todos os serviços em uma única query
  const serviceIds = services.map(s => s.id);
  
  if (serviceIds.length > 0) {
    const serviceLocations = await db
      .select({
        service_id: schema.serviceLocation.service_id,
        location: schema.location,
      })
      .from(schema.serviceLocation)
      .innerJoin(schema.location, eq(schema.serviceLocation.location_id, schema.location.id))
      .where(inArray(schema.serviceLocation.service_id, serviceIds));

    // Criar um mapa de service_id -> locations
    const locationMap = new Map();
    serviceLocations.forEach(sl => {
      if (!locationMap.has(sl.service_id)) {
        locationMap.set(sl.service_id, []);
      }
      locationMap.get(sl.service_id).push({
        id: sl.location.id,
        name: sl.location.name
      });
    });

    // Associar location_ids a cada serviço
    services = services.map(service => ({
      ...service,
      location_ids: locationMap.get(service.id) || []
    }));
  }

  return reply.send({
    services
  });
}

export const listServices = withErrorHandler(listServicesHandler, 'listar serviços');

// Controller para criar um novo serviço
async function createServiceHandler(request: FastifyRequest, reply: FastifyReply) {
  const { name, duration_minutes, price, description, location_ids } = request.body as {
    name: string;
    duration_minutes: number;
    price: number;
    description?: string;
    location_ids?: string[];
  };

  const newService = await db.insert(schema.service).values({
    company_id: request.user.company_id,
    name,
    duration_minutes,
    price: price.toString(),
    description,
  }).returning();

  const service = newService[0];

  // Se location_ids foram fornecidos, criar as relações na tabela service_location
  if (location_ids && location_ids.length > 0) {
    const serviceLocationValues = location_ids.map(location_id => ({
      service_id: service.id,
      location_id,
    }));

    await db.insert(schema.serviceLocation).values(serviceLocationValues);
  }

  return reply.status(201).send({
    message: 'Serviço adicionado com sucesso',
    service
  });
}

export const createService = withErrorHandler(createServiceHandler, 'adicionar serviço');

// Controller para atualizar um serviço
async function updateServiceHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name, duration_minutes, price, description, location_ids } = request.body as {
    name?: string;
    duration_minutes?: number;
    price?: number;
    description?: string;
    location_ids?: string[];
  };

  const updateData: any = {};
  if (name) updateData.name = name;
  if (duration_minutes !== undefined) updateData.duration_minutes = duration_minutes;
  if (price !== undefined) updateData.price = price.toString();
  if (description !== undefined) updateData.description = description;
  
  const updatedService = await db
    .update(schema.service)
    .set(updateData)
    .where(eq(schema.service.id, id))
    .returning();

  if (updatedService.length === 0) {
    return reply.status(404).send({
      error: 'Serviço não foi encontrado'
    });
  }

  // Se location_ids foram fornecidos, atualizar as relações na tabela service_location
  if (location_ids !== undefined) {
    // Remover todas as relações existentes
    await db.delete(schema.serviceLocation).where(eq(schema.serviceLocation.service_id, id));
    
    // Adicionar as novas relações
    if (location_ids.length > 0) {
      const serviceLocationValues = location_ids.map(location_id => ({
        service_id: id,
        location_id,
      }));

      await db.insert(schema.serviceLocation).values(serviceLocationValues);
    }
  }

  return reply.send({
    message: 'Serviço modificado com sucesso',
    service: updatedService[0]
  });
}

export const updateService = withErrorHandler(updateServiceHandler, 'modificar serviço');

// Controller para eliminar um serviço
async function deleteServiceHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { is_active, status } = request.body as { is_active?: boolean; status?: number };

  const updateData: any = {};
  if (is_active !== undefined) updateData.is_active = is_active;
  if (status !== undefined) updateData.status = status;

  if (Object.keys(updateData).length === 0) {
    return reply.status(400).send({
      error: 'Nenhum dado fornecido para atualização'
    });
  }

  const deletedService = await db
    .update(schema.service)
    .set(updateData)
    .where(eq(schema.service.id, id))
    .returning();
  

  if (deletedService.length === 0) {
    return reply.status(404).send({
      error: 'Serviço não foi encontrado'
    });
  }

  return reply.send({
    message: `Serviço ${is_active !== undefined ? (is_active ? 'ativado' : 'desativado') : ''}${status !== undefined ? (status === 0 ? 'desativado' : 'ativado') : ''} com sucesso`
  });
}

export const deleteService = withErrorHandler(deleteServiceHandler, 'remover serviço');
