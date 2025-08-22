export type ClientSchema = {
  name: string;
  email?: string;
  phone?: string;
  phone2?: string;
  date_of_birth?: string;
  obs1?: string;
  obs2?: string;
  obs3?: string;
  gender?: string;
  cc?: string;
  nif?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  zip?: string;
  invoce_notes?: string;
  status?: number;
  favorite_collaborator?: string;
  notification_phone?: boolean;
  notification_email?: boolean;
  location_id?: string;
  company_id: string;
};

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
            phone2: { type: 'string' },
            date_of_birth: { type: 'string', format: 'date' },
            obs1: { type: 'string' },
            obs2: { type: 'string' },
            obs3: { type: 'string' },
            gender: { type: 'string' },
            cc: { type: 'string' },
            nif: { type: 'string' },
            country: { type: 'string' },
            state: { type: 'string' },
            city: { type: 'string' },
            address: { type: 'string' },
            zip: { type: 'string' },
            invoce_notes: { type: 'string' },
            favorite_collaborator: { type: 'string' },
            notification_phone: { type: 'boolean' },
            notification_email: { type: 'boolean' },
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

export const listClientsSchema = {
  querystring: {
    type: 'object',
    properties: {
      company_id: { type: 'string', minLength: 36, maxLength: 36 },
      location_id: { type: 'string', minLength: 36, maxLength: 36 },
      page: { type: 'number', default: 1 },
      limit: { type: 'number', default: 10 },
      search: { type: 'string', default: '' }
    },
    required: ['company_id', 'page'],
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
              phone2: { type: 'string' },
              date_of_birth: { type: 'string', format: 'date' },
              obs1: { type: 'string' },
              obs2: { type: 'string' },
              obs3: { type: 'string' },
              gender: { type: 'string' },
              cc: { type: 'string' },
              nif: { type: 'string' },
              country: { type: 'string' },
              state: { type: 'string' },
              city: { type: 'string' },
              address: { type: 'string' },
              zip: { type: 'string' },
              invoce_notes: { type: 'string' },
              favorite_collaborator: { type: 'string' },
              notification_phone: { type: 'boolean' },
              notification_email: { type: 'boolean' },
              status: { type: 'number' }
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
      email: { type: 'string', maxLength: 50 },
      phone: { type: 'string', maxLength: 20 },
      phone2: { type: 'string', maxLength: 20 },
      date_of_birth: { type: 'string', format: 'date', nullable: true },
      obs1: { type: 'string', maxLength: 255 },
      obs2: { type: 'string', maxLength: 255 },
      obs3: { type: 'string', maxLength: 255 },
      gender: { type: 'string', maxLength: 10 },
      cc: { type: 'string', maxLength: 20 },
      nif: { type: 'string', maxLength: 20 },
      country: { type: 'string', maxLength: 50 },
      state: { type: 'string', maxLength: 50 },
      city: { type: 'string', maxLength: 50 },
      address: { type: 'string', maxLength: 255 },
      zip: { type: 'string', maxLength: 20 },
      invoce_notes: { type: 'string', maxLength: 255 },
      favorite_collaborator: { type: 'string', minLength: 36, maxLength: 36, nullable: true },
      notification_phone: { type: 'boolean' },
      notification_email: { type: 'boolean' },
      location_id: { type: 'string', minLength: 36, maxLength: 36, nullable: true }
    },
    required: ['name'],
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
            phone2: { type: 'string' },
            date_of_birth: { type: 'string', format: 'date' },
            obs1: { type: 'string' },
            obs2: { type: 'string' },
            obs3: { type: 'string' },
            gender: { type: 'string' },
            cc: { type: 'string' },
            nif: { type: 'string' },
            country: { type: 'string' },
            state: { type: 'string' },
            city: { type: 'string' },
            address: { type: 'string' },
            zip: { type: 'string' },
            invoce_notes: { type: 'string' },
            favorite_collaborator: { type: 'string' },
            notification_phone: { type: 'boolean' },
            notification_email: { type: 'boolean' },
            status: { type: 'number' }
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
      email: { type: 'string', maxLength: 50 },
      phone: { type: 'string', maxLength: 20 },
      phone2: { type: 'string', maxLength: 20 },
      date_of_birth: { type: 'string', format: 'date', nullable: true },
      obs1: { type: 'string', maxLength: 255 },
      obs2: { type: 'string', maxLength: 255 },
      obs3: { type: 'string', maxLength: 255 },
      gender: { type: 'string', maxLength: 10 },
      cc: { type: 'string', maxLength: 20 },
      nif: { type: 'string', maxLength: 20 },
      country: { type: 'string', maxLength: 50 },
      state: { type: 'string', maxLength: 50 },
      city: { type: 'string', maxLength: 50 },
      address: { type: 'string', maxLength: 255 },
      zip: { type: 'string', maxLength: 20 },
      invoce_notes: { type: 'string', maxLength: 255 },
      favorite_collaborator: { type: 'string', minLength: 36, maxLength: 36 },
      notification_phone: { type: 'boolean' },
      notification_email: { type: 'boolean' },
      location_id: { type: 'string', minLength: 36, maxLength: 36 },
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
            phone2: { type: 'string' },
            date_of_birth: { type: 'string', format: 'date' },
            obs1: { type: 'string' },
            obs2: { type: 'string' },
            obs3: { type: 'string' },
            gender: { type: 'string' },
            cc: { type: 'string' },
            nif: { type: 'string' },
            country: { type: 'string' },
            state: { type: 'string' },
            city: { type: 'string' },
            address: { type: 'string' },
            zip: { type: 'string' },
            invoce_notes: { type: 'string' },
            favorite_collaborator: { type: 'string' },
            notification_phone: { type: 'boolean' },
            notification_email: { type: 'boolean' },
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

export const deleteClientSchema = {
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

export const dasboardClientSchema = {
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
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        client: {
          type: 'object',
          properties: {
            total_clients: { type: 'number' },
            total_clients_active: { type: 'number' },
            total_clients_new: { type: 'number' },
            retention_rate: { type: 'number' },
          }
        }
      }
    }
  }
};