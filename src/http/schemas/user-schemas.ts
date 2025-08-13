// Schemas para validação
export const updateUserSchema = {
  body: {
    type: 'object',
    properties: {
      first_name: { type: 'string', minLength: 1, maxLength: 50 },
      last_name: { type: 'string', minLength: 1, maxLength: 50 },
      photo: { type: 'string', maxLength: 255 }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string' },
            photo: { type: 'string' },
            type: { type: 'string' },
            company_id: { type: 'string' }
          }
        }
      }
    }
  }
};

export const getUserSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string' },
            photo: { type: 'string' },
            type: { type: 'string' },
            company_id: { type: 'string' }
          }
        }
      }
    }
  }
};

export const listUsersSchema = {
  querystring: {
    type: 'object',
    properties: {
      company_id: { type: 'string', minLength: 36, maxLength: 36 }
    },
    additionalProperties: false,
    required: ['company_id']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              first_name: { type: 'string' },
              last_name: { type: 'string' },
              email: { type: 'string' },
              photo: { type: 'string' },
              type: { type: 'string' }
            }
          }
        }
      }
    }
  }
};
