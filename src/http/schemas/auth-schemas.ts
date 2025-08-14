// Interfaces TypeScript para tipagem
export interface RegisterBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  company_name: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  company_type?: string;
  specialty?: string;
  terms: boolean;
  newsletter: boolean;
}

export interface LoginBody {
  email: string;
  password: string;
}

// Schemas para validação (sem Zod)
export const registerSchema = {
  body: {
    type: 'object',
    required: ['first_name', 'last_name', 'email', 'password', 'company_name'],
    properties: {
      first_name: { type: 'string', minLength: 1, maxLength: 50 },
      last_name: { type: 'string', minLength: 1, maxLength: 50 },
      email: { type: 'string', format: 'email', maxLength: 50 },
      password: { type: 'string', minLength: 8, maxLength: 24 },
      company_name: { type: 'string', minLength: 1, maxLength: 36 },
      phone: { type: 'string', maxLength: 20 },
      address: { type: 'string', maxLength: 100 },
      city: { type: 'string', maxLength: 100 },
      state: { type: 'string', maxLength: 100 },
      company_type: { type: 'string', maxLength: 100 },
      specialty: { type: 'string', maxLength: 100 },
      terms: { type: 'boolean' },
      newsletter: { type: 'boolean' },
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
