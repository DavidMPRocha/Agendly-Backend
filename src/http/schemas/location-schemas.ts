// Schemas para validação de localizações
export const getLocationSchema = {
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
        location: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_id: { type: 'string' },
            name: { type: 'string' },
            address: { type: 'string' },
            city: { type: 'string' },
            country: { type: 'string' },
            state: { type: 'string' },
            zip: { type: 'string' }
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

export const listLocationsSchema = {
  querystring: {
    type: 'object',
    properties: {
      company_id: { type: 'string', minLength: 36, maxLength: 36 }
    },
    required: ['company_id'],
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        locations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              company_id: { type: 'string' },
              name: { type: 'string' },
              address: { type: 'string' },
              city: { type: 'string' },
              country: { type: 'string' },
              state: { type: 'string' },
              zip: { type: 'string' }
            }
          }
        }
      }
    }
  }
};

export const createLocationSchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 },
      country: { type: 'string', maxLength: 50 },
      state: { type: 'string', maxLength: 50 },
      city: { type: 'string', maxLength: 50 },
      address: { type: 'string', maxLength: 255 },
      zip: { type: 'string', maxLength: 20 },
      company_id: { type: 'string', minLength: 36, maxLength: 36 }
    },
    required: ['name', 'company_id'],
    additionalProperties: false
  },
  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        location: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_id: { type: 'string' },
            name: { type: 'string' },
            address: { type: 'string' },
            city: { type: 'string' },
            country: { type: 'string' },
            state: { type: 'string' },
            zip: { type: 'string' }
          }
        }
      }
    }
  }
};

export const updateLocationSchema = {
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
      address: { type: 'string', maxLength: 255 },
      city: { type: 'string', maxLength: 50 },
      country: { type: 'string', maxLength: 50 },
      state: { type: 'string', maxLength: 50 },
      zip: { type: 'string', maxLength: 20 }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        location: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_id: { type: 'string' },
            name: { type: 'string' },
            address: { type: 'string' },
            city: { type: 'string' },
            country: { type: 'string' },
            state: { type: 'string' },
            zip: { type: 'string' }
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

export const deleteLocationSchema = {
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
