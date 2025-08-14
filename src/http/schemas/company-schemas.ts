// Schemas para validação de empresas
export const getCompanySchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', minLength: 36, maxLength: 36 }
    },
    required: ['id'],
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        company: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' }
          }
        }
      }
    },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  }
};

export const updateCompanySchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', minLength: 36, maxLength: 36 }
    },
    required: ['id'],
    additionalProperties: false
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 },
      description: { type: 'string', maxLength: 255 }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        company: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' }
          }
        }
      }
    },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  }
};
