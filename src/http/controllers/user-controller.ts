import type { FastifyReply, FastifyRequest } from 'fastify';
import { eq } from 'drizzle-orm';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/schema.ts';

// Controller para obter dados do user logado
export async function getCurrentUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const users = await db.select().from(schema.user).where(eq(schema.user.id, request.user.user_id));
    
    if (users.length === 0) {
      return reply.status(404).send({
        error: 'user não encontrado'
      });
    }

    const userData = users[0];
    const { password: _, ...userWithoutPassword } = userData;

    return reply.send({
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Erro ao buscar user:', error);
    return reply.status(500).send({
      error: 'Erro interno do servidor'
    });
  }
}

// Controller para atualizar dados do user
export async function updateCurrentUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { first_name, last_name, photo } = request.body as {
      first_name?: string;
      last_name?: string;
      photo?: string;
    };

    const updateData: any = {};
    if (first_name) updateData.first_name = first_name;
    if (last_name) updateData.last_name = last_name;
    if (photo) updateData.photo = photo;

    const updatedUser = await db
      .update(schema.user)
      .set(updateData)
      .where(eq(schema.user.id, request.user.user_id))
      .returning();

    if (updatedUser.length === 0) {
      return reply.status(404).send({
        error: 'user não encontrado'
      });
    }

    const { password: _, ...userWithoutPassword } = updatedUser[0];

    return reply.send({
      message: 'user atualizado com sucesso',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Erro ao atualizar user:', error);
    return reply.status(500).send({
      error: 'Erro interno do servidor'
    });
  }
}

// Controller para listar users (apenas para owners/admins)
export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { company_id } = request.query as { company_id: string };

    const users = await db.select({
      id: schema.user.id,
      first_name: schema.user.first_name,
      last_name: schema.user.last_name,
      email: schema.user.email,
      photo: schema.user.photo,
      type: schema.user.type
    }).from(schema.user)
    .where(eq(schema.user.company_id, company_id));

    return reply.send({
      users
    });

  } catch (error) {
    console.error('Erro ao listar users:', error);
    return reply.status(500).send({
      error: 'Erro interno do servidor'
    });
  }
}
