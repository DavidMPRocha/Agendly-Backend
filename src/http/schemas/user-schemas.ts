// Schemas para validação
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
            phone: { type: 'string' },
            photo: { type: 'string' },
            type: { type: 'string' },
            company_id: { type: 'string' },
            status: { type: 'number' },
            location_ids: { 
              type: 'array', 
              items: { 
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' }
                }
              }
            }
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
      company_id: { type: 'string', minLength: 36, maxLength: 36 },
      page: { type: 'number', minimum: 1, default: 1 },
      limit: { type: 'number', minimum: 1, maximum: 100, default: 10 },
      search: { type: 'string', maxLength: 100 }
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
              phone: { type: 'string' },
              photo: { type: 'string' },
              type: { type: 'string' },
              status: { type: 'number' },
              is_active: { type: 'boolean' },
              created_at: { type: 'string' },
              location_ids: { 
                type: 'array', 
                items: { 
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' }
                  }
                }
              }
            }
          }
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            totalPages: { type: 'number' }
          }
        }
      }
    }
  }
};

export const getUserByIdSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', minLength: 36, maxLength: 36 }
    },
    additionalProperties: false,
    required: ['id']
  },
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
            phone: { type: 'string' },
            photo: { type: 'string' },
            type: { type: 'string' },
            company_id: { type: 'string' },
            status: { type: 'number' },
            location_ids: { 
              type: 'array', 
              items: { 
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const createUserSchema = {
  body: {
    type: 'object',
    properties: {
      first_name: { type: 'string', minLength: 1, maxLength: 50 },
      last_name: { type: 'string', minLength: 1, maxLength: 50 },
      email: { type: 'string', format: 'email' },
      phone: { type: 'string', maxLength: 20 },
      photo: { type: 'string', maxLength: 255 },
      type: { type: 'string', enum: ['owner', 'admin', 'user'] },
      company_id: { type: 'string', minLength: 36, maxLength: 36 },
      location_ids: { type: 'array', items: { type: 'string' } },
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
            phone: { type: 'string' },
            photo: { type: 'string' },
            type: { type: 'string' },
            company_id: { type: 'string' },
            status: { type: 'number' },
            location_ids: { 
              type: 'array', 
              items: { 
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const updateUserSchema = {
  body: {
    type: 'object',
    properties: {
      first_name: { type: 'string', minLength: 1, maxLength: 50 },
      last_name: { type: 'string', minLength: 1, maxLength: 50 },
      email: { type: 'string', format: 'email' },
      phone: { type: 'string', maxLength: 20 },
      photo: { type: 'string', maxLength: 255 },
      type: { type: 'string', enum: ['owner', 'admin', 'user'] },
      location_ids: { type: 'array', items: { type: 'string' } },
      status: { type: 'number', enum: [0, 1] },
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
            phone: { type: 'string' },
            photo: { type: 'string' },
            type: { type: 'string' },
            company_id: { type: 'string' },
            status: { type: 'number' },
            location_ids: { 
              type: 'array', 
              items: { 
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const deleteUserSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', minLength: 36, maxLength: 36 }
    },
    additionalProperties: false,
    required: ['id']
  },
  body: {
    type: 'object',
    properties: {
      is_active: { type: 'boolean' },
      status: { type: 'integer', minimum: 0, maximum: 1 }
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};