import type { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/schema.ts';
import type { LoginBody, RegisterBody } from '../schemas/auth-schemas.ts';
import { withErrorHandler } from '../middleware/error-handler.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function loginHandler(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = request.body as LoginBody;

  // Buscar user pelo email
  const users = await db.select().from(schema.user).where(eq(schema.user.email, email));
  
  if (users.length === 0) {
    return reply.status(401).send({
      error: 'Email ou senha inválidos'
    });
  }

  const userData = users[0];

  if (password !== userData.password) {
    return reply.status(401).send({
      error: 'Email ou senha inválidos'
    });
  }

  if (!userData.company_id) {
    return reply.status(400).send({
      error: 'Utilizador não possui empresa associada'
    });
  }

  const company = await db.select().from(schema.company).where(eq(schema.company.id, userData.company_id));
  // Gerar token JWT
  const token = jwt.sign(
    { 
      user_id: userData.id, 
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      company_id: userData.company_id,
      company_name: company[0].name,
      type: userData.type 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Retornar resposta sem a senha
  const { password: _, ...userWithoutPassword } = userData;

  return reply.status(200).send({
    message: 'Login realizado com sucesso',
    user: { ...userWithoutPassword, company_name: company[0].name },
    token
  });
}

export const login = withErrorHandler(loginHandler, 'login');

async function registerHandler(request: FastifyRequest, reply: FastifyReply) {
  const { first_name, last_name, email, password, company_name, phone, address, city, state, company_type, specialty, terms, newsletter } = request.body as RegisterBody;

  // Verificar se o user já existe
  const existingUser = await db.select().from(schema.user).where(eq(schema.user.email, email));
  
  if (existingUser.length > 0) {
    return reply.status(400).send({
      error: 'Email já está em uso'
    });
  }

  // *** Criar compnay ***
  // Verificar se a compnay já existe com o nome DEFAULT
  const company = await db.select().from(schema.company).where(eq(schema.company.name, company_name));
  const newCompanyName = company.length === 0 ? company_name : `${company_name} ${company.length + 1}`;
  // Criar compnay
  const newCompany = await db.insert(schema.company).values({
    name: newCompanyName
  }).returning();
  const company_id = newCompany[0].id;

  // *** Criar location ***
  const newLocation = await db.insert(schema.location).values({
    company_id,
    name: `Principal`,
  }).returning();
  const location_id = newLocation[0].id;
  
  // *** Criar user ***
  const newUser = await db.insert(schema.user).values({
    first_name,
    last_name,
    email,
    password,
    photo: "example.png",
    company_id,
    type: "owner",
  }).returning();
  const user_id = newUser[0].id;

  // *** Criar user_location ***
  const newUserLocation = await db.insert(schema.userLocation).values({
    user_id,
    location_id,
  }).returning();

  // Gerar token JWT
  const token = jwt.sign(
    { 
      user_id: newUser[0].id, 
      email: newUser[0].email,
      company_name: newCompanyName,
      company_id: newUser[0].company_id,
      location_id: newLocation[0].id,
      type: newUser[0].type 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Retornar resposta sem a senha
  const { password: _, ...userWithoutPassword } = newUser[0];

  return reply.status(201).send({
    message: 'User criado com sucesso',
    user: userWithoutPassword,
    token
  });
}

export const register = withErrorHandler(registerHandler, 'registro');
