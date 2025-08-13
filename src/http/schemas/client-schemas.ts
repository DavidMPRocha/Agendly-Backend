// Schemas para validação de clientes
export const getClientSchema = {
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
        client: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_id: { type: 'string' },
            location_id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            notes: { type: 'string' },
            date_of_birth: { type: 'string', format: 'date' },
            notification_phone: { type: 'boolean' },
            notification_email: { type: 'boolean' }
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

export const listClientsSchema = {
  querystring: {
    type: 'object',
    properties: {
      company_id: { type: 'string', minLength: 36, maxLength: 36 },
      location_id: { type: 'string', minLength: 36, maxLength: 36 }
    },
    required: ['company_id'],
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        clients: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              company_id: { type: 'string' },
              location_id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
              notes: { type: 'string' },
              date_of_birth: { type: 'string', format: 'date' },
              notification_phone: { type: 'boolean' },
              notification_email: { type: 'boolean' }
            }
          }
        }
      }
    }
  }
};

export const createClientSchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 },
      email: { type: 'string', format: 'email', maxLength: 50 },
      phone: { type: 'string', maxLength: 20 },
      notes: { type: 'string' },
      date_of_birth: { type: 'string', format: 'date' },
      notification_phone: { type: 'boolean' },
      notification_email: { type: 'boolean' },
      location_id: { type: 'string', minLength: 36, maxLength: 36 }
    },
    required: ['name', 'location_id'],
    additionalProperties: false
  },
  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        client: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_id: { type: 'string' },
            location_id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            notes: { type: 'string' },
            date_of_birth: { type: 'string', format: 'date' },
            notification_phone: { type: 'boolean' },
            notification_email: { type: 'boolean' }
          }
        }
      }
    }
  }
};

export const updateClientSchema = {
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
      email: { type: 'string', format: 'email', maxLength: 50 },
      phone: { type: 'string', maxLength: 20 },
      notes: { type: 'string' },
      date_of_birth: { type: 'string', format: 'date' },
      notification_phone: { type: 'boolean' },
      notification_email: { type: 'boolean' },
      location_id: { type: 'string', minLength: 36, maxLength: 36 }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        client: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_id: { type: 'string' },
            location_id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            notes: { type: 'string' },
            date_of_birth: { type: 'string', format: 'date' },
            notification_phone: { type: 'boolean' },
            notification_email: { type: 'boolean' }
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

export const deleteClientSchema = {
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
