import type { FastifyReply, FastifyRequest } from 'fastify';

export interface ErrorResponse {
  error: string;
  details?: any;
}

export function handleError(error: any, reply: FastifyReply, context: string = 'Operação') {
  console.error(`Erro em ${context}:`, error);
  
  // Se já é uma resposta de erro estruturada
  if (error.statusCode && error.message) {
    return reply.status(error.statusCode).send({
      error: error.message
    });
  }

  // Se é um erro de validação do Fastify
  if (error.validation) {
    return reply.status(400).send({
      error: 'Dados inválidos',
      details: error.validation
    });
  }

  // Erro padrão do servidor
  return reply.status(500).send({
    error: 'Erro interno do servidor'
  });
}

// Wrapper para controllers que automaticamente trata erros
export function withErrorHandler<T extends any[]>(
  handler: (request: FastifyRequest, reply: FastifyReply, ...args: T) => Promise<any>,
  context: string
) {
  return async (request: FastifyRequest, reply: FastifyReply, ...args: T) => {
    try {
      return await handler(request, reply, ...args);
    } catch (error) {
      return handleError(error, reply, context);
    }
  };
}
