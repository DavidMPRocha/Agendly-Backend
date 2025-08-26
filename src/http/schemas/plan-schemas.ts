// Schemas para validação de planos
export const getPlansSchema = {
  querystring: {
    type: 'object',
    properties: {
      company_id: { type: 'string', minLength: 36, maxLength: 36 }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        plans: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              company_id: { type: 'string' },
              plan_type_id: { type: 'string' },
              status_id: { type: 'string' },
              start_date: { type: 'string' },
              end_date: { type: 'string' },
              price_paid: { type: 'number' },
              payment_method: { type: 'string' },
              payment_reference: { type: 'string' },
              auto_renewal: { type: 'boolean' },
              notes: { type: 'string' },
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

export const getPlanSchema = {
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
        plan: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_id: { type: 'string' },
            plan_type_id: { type: 'string' },
            status_id: { type: 'string' },
            start_date: { type: 'string' },
            end_date: { type: 'string' },
            price_paid: { type: 'number' },
            payment_method: { type: 'string' },
            payment_reference: { type: 'string' },
            auto_renewal: { type: 'boolean' },
            notes: { type: 'string' },
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

export const createPlanSchema = {
  body: {
    type: 'object',
    properties: {
      company_id: { type: 'string', minLength: 36, maxLength: 36 },
      plan_type_id: { type: 'string', minLength: 36, maxLength: 36 },
      status_id: { type: 'string', minLength: 36, maxLength: 36 },
      start_date: { type: 'string', format: 'date-time' },
      end_date: { type: 'string', format: 'date-time' },
      price_paid: { type: 'number', minimum: 0 },
      payment_method: { type: 'string', maxLength: 100 },
      payment_reference: { type: 'string', maxLength: 255 },
      auto_renewal: { type: 'boolean' },
      notes: { type: 'string', maxLength: 1000 }
    },
    required: ['company_id', 'plan_type_id', 'status_id', 'start_date', 'end_date', 'price_paid'],
    additionalProperties: false
  },
  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        plan: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_id: { type: 'string' },
            plan_type_id: { type: 'string' },
            status_id: { type: 'string' },
            start_date: { type: 'string' },
            end_date: { type: 'string' },
            price_paid: { type: 'number' },
            payment_method: { type: 'string' },
            payment_reference: { type: 'string' },
            auto_renewal: { type: 'boolean' },
            notes: { type: 'string' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' },
            is_active: { type: 'boolean' }
          }
        }
      }
    }
  }
};

export const updatePlanSchema = {
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
      plan_type_id: { type: 'string', minLength: 36, maxLength: 36 },
      status_id: { type: 'string', minLength: 36, maxLength: 36 },
      start_date: { type: 'string', format: 'date-time' },
      end_date: { type: 'string', format: 'date-time' },
      price_paid: { type: 'number', minimum: 0 },
      payment_method: { type: 'string', maxLength: 100 },
      payment_reference: { type: 'string', maxLength: 255 },
      auto_renewal: { type: 'boolean' },
      notes: { type: 'string', maxLength: 1000 }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        plan: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_id: { type: 'string' },
            plan_type_id: { type: 'string' },
            status_id: { type: 'string' },
            start_date: { type: 'string' },
            end_date: { type: 'string' },
            price_paid: { type: 'number' },
            payment_method: { type: 'string' },
            payment_reference: { type: 'string' },
            auto_renewal: { type: 'boolean' },
            notes: { type: 'string' },
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

export const deletePlanSchema = {
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

export const getPlansByCompanySchema = {
  params: {
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
        plans: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              company_id: { type: 'string' },
              plan_type_id: { type: 'string' },
              status_id: { type: 'string' },
              start_date: { type: 'string' },
              end_date: { type: 'string' },
              price_paid: { type: 'number' },
              payment_method: { type: 'string' },
              payment_reference: { type: 'string' },
              auto_renewal: { type: 'boolean' },
              notes: { type: 'string' },
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
