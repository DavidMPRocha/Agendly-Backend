// Schemas para validação de agendamentos
export const getAppointmentSchema = {
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
        appointment: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            user_id: { type: 'string' },
            location_id: { type: 'string' },
            client_id: { type: 'string' },
            service_id: { type: 'string' },
            status_id: { type: 'string' },
            date: { type: 'string', format: 'date' },
            datetime_start: { type: 'string', format: 'date-time' },
            datetime_end: { type: 'string', format: 'date-time' },
            description: { type: 'string' },
            notified_by_phone: { type: 'boolean' },
            notified_by_email: { type: 'boolean' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' },
            is_active: { type: 'boolean' }
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

export const listAppointmentsSchema = {
  querystring: {
    type: 'object',
    properties: {
      company_id: { type: 'string', minLength: 36, maxLength: 36 },
      location_id: { type: 'string', minLength: 36, maxLength: 36 },
      client_id: { type: 'string', minLength: 36, maxLength: 36 },
      service_id: { type: 'string', minLength: 36, maxLength: 36 },
      status_id: { type: 'string', minLength: 36, maxLength: 36 },
      date_start: { type: 'string', format: 'date' },
      date_end: { type: 'string', format: 'date' },
      user_id: { type: 'string', minLength: 36, maxLength: 36 }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        appointments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              user_id: { type: 'string' },
              user_name: { type: 'string' },
              location_id: { type: 'string' },
              location_name: { type: 'string' },
              client_id: { type: 'string' },
              client_name: { type: 'string' },
              service_id: { type: 'string' },
              service_name: { type: 'string' },
              status_id: { type: 'string' },
              status_name: { type: 'string' },
              date: { type: 'string', format: 'date' },
              datetime_start: { type: 'string', format: 'date-time' },
              datetime_end: { type: 'string', format: 'date-time' },
              description: { type: 'string' },
              notified_by_phone: { type: 'boolean' },
              notified_by_email: { type: 'boolean' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
              is_active: { type: 'boolean' }
            }
          }
        }
      }
    }
  }
};

export const createAppointmentSchema = {
  body: {
    type: 'object',
    properties: {
      company_id: { type: 'string', minLength: 36, maxLength: 36 },
      location_id: { type: 'string', minLength: 36, maxLength: 36 },
      user_id: { type: 'string', minLength: 36, maxLength: 36 },
      client_id: { type: 'string', minLength: 36, maxLength: 36 },
      service_id: { type: 'string', minLength: 36, maxLength: 36 },
      status_id: { type: 'string', minLength: 36, maxLength: 36 },
      date: { type: 'string', format: 'date' },
      datetime_start: { type: 'string', format: 'date-time' },
      datetime_end: { type: 'string', format: 'date-time' },
      description: { type: 'string' },
      notified_by_phone: { type: 'boolean' },
      notified_by_email: { type: 'boolean' }
    },
    required: ['company_id', 'location_id', 'user_id', 'client_id', 'service_id', 'date', 'datetime_start', 'datetime_end'],
    additionalProperties: false
  },
  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        appointment: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_id: { type: 'string' },
            location_id: { type: 'string' },
            user_id: { type: 'string' },
            client_id: { type: 'string' },
            service_id: { type: 'string' },
            status_id: { type: 'string' },
            date: { type: 'string', format: 'date' },
            datetime_start: { type: 'string', format: 'date-time' },
            datetime_end: { type: 'string', format: 'date-time' },
            description: { type: 'string' },
            notified_by_phone: { type: 'boolean' },
            notified_by_email: { type: 'boolean' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' },
            is_active: { type: 'boolean' }
          }
        }
      }
    }
  }
};

export const updateAppointmentSchema = {
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
      company_id: { type: 'string', minLength: 36, maxLength: 36 },
      location_id: { type: 'string', minLength: 36, maxLength: 36 },
      user_id: { type: 'string', minLength: 36, maxLength: 36 },
      client_id: { type: 'string', minLength: 36, maxLength: 36 },
      service_id: { type: 'string', minLength: 36, maxLength: 36 },
      status_id: { type: 'string', minLength: 36, maxLength: 36 },
      date: { type: 'string', format: 'date' },
      datetime_start: { type: 'string', format: 'date-time' },
      datetime_end: { type: 'string', format: 'date-time' },
      description: { type: 'string' },
      notified_by_phone: { type: 'boolean' },
      notified_by_email: { type: 'boolean' }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        appointment: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_id: { type: 'string' },
            location_id: { type: 'string' },
            user_id: { type: 'string' },
            client_id: { type: 'string' },
            service_id: { type: 'string' },
            status_id: { type: 'string' },
            date: { type: 'string', format: 'date' },
            datetime_start: { type: 'string', format: 'date-time' },
            datetime_end: { type: 'string', format: 'date-time' },
            description: { type: 'string' },
            notified_by_phone: { type: 'boolean' },
            notified_by_email: { type: 'boolean' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' },
            is_active: { type: 'boolean' }
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

export const deleteAppointmentSchema = {
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
