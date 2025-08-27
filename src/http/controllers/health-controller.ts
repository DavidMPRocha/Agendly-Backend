import type { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../../db/connection.ts';
import { sql } from 'drizzle-orm';

interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  uptime: number;
  version: string;
  checks: {
    database: {
      status: 'healthy' | 'unhealthy';
      responseTime?: number;
      error?: string;
    };
    memory: {
      status: 'healthy' | 'unhealthy';
      used: number;
      total: number;
      percentage: number;
    };
    system: {
      status: 'healthy' | 'unhealthy';
      nodeVersion: string;
      platform: string;
    };
  };
}

// Função para verificar a saúde do banco de dados
async function checkDatabase(): Promise<{ status: 'healthy' | 'unhealthy'; responseTime?: number; error?: string }> {
  const startTime = Date.now();
  
  try {
    // Executa uma query simples para verificar a conectividade
    await db.execute(sql`SELECT 1 as health_check`);
    const responseTime = Date.now() - startTime;
    
    return {
      status: 'healthy',
      responseTime
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown database error'
    };
  }
}

// Função para verificar o uso de memória
function checkMemory(): { status: 'healthy' | 'unhealthy'; used: number; total: number; percentage: number } {
  const memUsage = process.memoryUsage();
  const used = Math.round(memUsage.heapUsed / 1024 / 1024); // MB
  const total = Math.round(memUsage.heapTotal / 1024 / 1024); // MB
  const percentage = Math.round((used / total) * 100);
  
  // Considera saudável se usar menos de 80% da memória alocada
  const status = percentage < 80 ? 'healthy' : 'unhealthy';
  
  return {
    status,
    used,
    total,
    percentage
  };
}

// Função para verificar informações do sistema
function checkSystem(): { status: 'healthy' | 'unhealthy'; nodeVersion: string; platform: string } {
  return {
    status: 'healthy',
    nodeVersion: process.version,
    platform: process.platform
  };
}

// Função para determinar o status geral
function determineOverallStatus(checks: HealthStatus['checks']): 'healthy' | 'unhealthy' | 'degraded' {
  const checkStatuses = [
    checks.database.status,
    checks.memory.status,
    checks.system.status
  ];
  
  if (checkStatuses.every(status => status === 'healthy')) {
    return 'healthy';
  }
  
  if (checkStatuses.some(status => status === 'unhealthy')) {
    return 'unhealthy';
  }
  
  return 'degraded';
}

// Health check básico (rápido)
export async function basicHealthCheck(request: FastifyRequest, reply: FastifyReply) {
  const healthStatus: HealthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    checks: {
      database: await checkDatabase(),
      memory: checkMemory(),
      system: checkSystem()
    }
  };
  
  // Determina o status geral
  healthStatus.status = determineOverallStatus(healthStatus.checks);
  
  // Define o status HTTP baseado no health geral
  const statusCode = healthStatus.status === 'healthy' ? 200 : 
                    healthStatus.status === 'degraded' ? 200 : 503;
  
  return reply.status(statusCode).send(healthStatus);
}

// Health check detalhado (mais lento, mais informações)
export async function detailedHealthCheck(request: FastifyRequest, reply: FastifyReply) {
  const startTime = Date.now();
  
  const healthStatus: HealthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    checks: {
      database: await checkDatabase(),
      memory: checkMemory(),
      system: checkSystem()
    }
  };
  
  // Determina o status geral
  healthStatus.status = determineOverallStatus(healthStatus.checks);
  
  // Adiciona tempo total de resposta
  const totalResponseTime = Date.now() - startTime;
  
  const response = {
    ...healthStatus,
    responseTime: totalResponseTime,
    environment: process.env.NODE_ENV || 'development'
  };
  
  // Define o status HTTP baseado no health geral
  const statusCode = healthStatus.status === 'healthy' ? 200 : 
                    healthStatus.status === 'degraded' ? 200 : 503;
  
  return reply.status(statusCode).send(response);
}

// Health check apenas do banco de dados
export async function databaseHealthCheck(request: FastifyRequest, reply: FastifyReply) {
  const dbCheck = await checkDatabase();
  
  const statusCode = dbCheck.status === 'healthy' ? 200 : 503;
  
  return reply.status(statusCode).send({
    status: dbCheck.status,
    timestamp: new Date().toISOString(),
    database: dbCheck
  });
}
