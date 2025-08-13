import type { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Interface para o payload do JWT
interface JWTPayload {
  user_id: string;
  email: string;
  type: string;
}

// Interface para estender o FastifyRequest com o user autenticado
declare module 'fastify' {
  interface FastifyRequest {
    user: JWTPayload;
  }
}

// Tipo para requisições autenticadas (alias para compatibilidade)
export type AuthenticatedRequest = FastifyRequest;

export async function authenticateToken(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return reply.status(401).send({
        error: 'Token de acesso não fornecido'
      });
    }

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
    // Adicionar informações do user à requisição
    request.user = decoded;
    
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return reply.status(401).send({
        error: 'Token inválido'
      });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return reply.status(401).send({
        error: 'Token expirado'
      });
    }

    return reply.status(500).send({
      error: 'Erro na verificação do token'
    });
  }
}

// Middleware para verificar se o user tem um tipo específico
export function requireUserType(allowedTypes: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user) {
      return reply.status(401).send({
        error: 'user não autenticado'
      });
    }

    if (!allowedTypes.includes(request.user.type)) {
      return reply.status(403).send({
        error: 'Acesso negado. Tipo de user não autorizado'
      });
    }
  };
}

// Middleware para verificar se o user é owner
export const requireOwner = requireUserType(['owner']);

// Middleware para verificar se o user é owner ou admin
export const requireOwnerOrAdmin = requireUserType(['owner', 'admin']);
