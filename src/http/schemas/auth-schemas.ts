// Interfaces TypeScript para tipagem
export interface RegisterBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  photo: string;
  company_id?: string;
  type: 'owner' | 'admin' | 'user';
}

export interface LoginBody {
  email: string;
  password: string;
}

// Schemas para validação (sem Zod)
export const registerSchema = {
  body: {
    type: 'object',
    required: ['first_name', 'last_name', 'email', 'password'],
    properties: {
      first_name: { type: 'string', minLength: 1, maxLength: 50 },
      last_name: { type: 'string', minLength: 1, maxLength: 50 },
      email: { type: 'string', format: 'email', maxLength: 50 },
      password: { type: 'string', minLength: 8, maxLength: 24 },
    }
  }
};

export const loginSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 1 }
    }
  }
};
