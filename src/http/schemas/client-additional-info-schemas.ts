// Schemas para validação de informações adicionais de clientes
export const getClientAdditionalInfoSchema = {
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
        additionalInfo: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            client_id: { type: 'string' },
            type: { type: 'string' },
            content: { type: 'string' }
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

export const listClientAdditionalInfoSchema = {
  querystring: {
    type: 'object',
    properties: {
      client_id: { type: 'string', minLength: 36, maxLength: 36 }
    },
    required: ['client_id'],
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        additionalInfo: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              client_id: { type: 'string' },
              type: { type: 'string' },
              content: { type: 'string' }
            }
          }
        }
      }
    }
  }
};

export const  createClientAdditionalInfoSchema = {
  body: {
    type: 'object',
    properties: {
      client_id: { type: 'string', minLength: 36, maxLength: 36 },
      type: { type: 'string', minLength: 1, maxLength: 100 },
      content: { type: 'string', minLength: 1 }
    },
    required: ['client_id', 'type', 'content'],
    additionalProperties: false
  },
  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        additionalInfo: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            client_id: { type: 'string' },
            type: { type: 'string' },
            content: { type: 'string' }
          }
        }
      }
    }
  }
};

export const updateClientAdditionalInfoSchema = {
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
      type: { type: 'string', minLength: 1, maxLength: 100 },
      content: { type: 'string', minLength: 1 }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        additionalInfo: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            client_id: { type: 'string' },
            type: { type: 'string' },
            content: { type: 'string' }
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

export const deleteClientAdditionalInfoSchema = {
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
        message: { type: 'string' }
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
