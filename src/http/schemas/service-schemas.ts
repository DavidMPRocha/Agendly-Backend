// Schemas para validação de serviços
export const getServiceSchema = {
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
        service: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_id: { type: 'string' },
            location_ids: { 
              type: 'array', 
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                } 
              } 
            },
            name: { type: 'string' },
            duration_minutes: { type: 'number' },
            price: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'number' }
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

export const listServicesSchema = {
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
        services: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              company_id: { type: 'string' },
              location_ids: { 
                type: 'array', 
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                  } 
                } 
              },
              name: { type: 'string' },
              duration_minutes: { type: 'number' },
              price: { type: 'string' },
              description: { type: 'string' },
              status: { type: 'number' }
            }
          }
        }
      }
    }
  }
};

export const createServiceSchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 },
      duration_minutes: { type: 'number', minimum: 1 },
      price: { type: 'number', minimum: 0 },
      description: { type: 'string' },
      location_ids: { type: 'array', items: { type: 'string', minLength: 36, maxLength: 36 } }
    },
    required: ['name', 'duration_minutes', 'price'],
    additionalProperties: false
  },
  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        service: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_id: { type: 'string' },
            location_ids: { 
              type: 'array', 
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                } 
              } 
            },
            name: { type: 'string' },
            duration_minutes: { type: 'number' },
            price: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'number' }
          }
        }
      }
    }
  }
};

export const updateServiceSchema = {
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
      duration_minutes: { type: 'number', minimum: 1 },
      price: { type: 'number', minimum: 0 },
      description: { type: 'string' },
      location_ids: { type: 'array', items: { type: 'string', minLength: 36, maxLength: 36 } },
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        service: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_id: { type: 'string' },
            location_ids: { 
              type: 'array', 
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                } 
              } 
            },
            name: { type: 'string' },
            duration_minutes: { type: 'number' },
            price: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'number' }
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

export const deleteServiceSchema = {
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
      is_active: { type: 'boolean' },
      status: { type: 'number' }
    },
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
