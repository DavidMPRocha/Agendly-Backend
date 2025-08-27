export const healthSchemas = {
  // Schema para health check básico
  basicHealthCheck: {
    description: 'Health check básico da aplicação',
    tags: ['Health'],
    response: {
      200: {
        type: 'object',
        properties: {
          status: { 
            type: 'string', 
            enum: ['healthy', 'unhealthy', 'degraded'] 
          },
          timestamp: { 
            type: 'string', 
            format: 'date-time' 
          },
          uptime: { 
            type: 'number' 
          },
          version: { 
            type: 'string' 
          },
          checks: {
            type: 'object',
            properties: {
              database: {
                type: 'object',
                properties: {
                  status: { 
                    type: 'string', 
                    enum: ['healthy', 'unhealthy'] 
                  },
                  responseTime: { 
                    type: 'number' 
                  }
                }
              },
              memory: {
                type: 'object',
                properties: {
                  status: { 
                    type: 'string', 
                    enum: ['healthy', 'unhealthy'] 
                  },
                  used: { 
                    type: 'number' 
                  },
                  total: { 
                    type: 'number' 
                  },
                  percentage: { 
                    type: 'number' 
                  }
                }
              },
              system: {
                type: 'object',
                properties: {
                  status: { 
                    type: 'string', 
                    enum: ['healthy', 'unhealthy'] 
                  },
                  nodeVersion: { 
                    type: 'string' 
                  },
                  platform: { 
                    type: 'string' 
                  }
                }
              }
            }
          }
        }
      },
      503: {
        type: 'object',
        properties: {
          status: { 
            type: 'string' 
          },
          timestamp: { 
            type: 'string' 
          },
          uptime: { 
            type: 'number' 
          },
          version: { 
            type: 'string' 
          },
          checks: { 
            type: 'object' 
          }
        }
      }
    }
  },

  // Schema para health check detalhado
  detailedHealthCheck: {
    description: 'Health check detalhado com informações adicionais',
    tags: ['Health'],
    response: {
      200: {
        type: 'object',
        properties: {
          status: { 
            type: 'string', 
            enum: ['healthy', 'unhealthy', 'degraded'] 
          },
          timestamp: { 
            type: 'string', 
            format: 'date-time' 
          },
          uptime: { 
            type: 'number' 
          },
          version: { 
            type: 'string' 
          },
          responseTime: { 
            type: 'number' 
          },
          environment: { 
            type: 'string' 
          },
          checks: { 
            type: 'object' 
          }
        }
      },
      503: {
        type: 'object',
        properties: {
          status: { 
            type: 'string' 
          },
          timestamp: { 
            type: 'string' 
          },
          uptime: { 
            type: 'number' 
          },
          version: { 
            type: 'string' 
          },
          responseTime: { 
            type: 'number' 
          },
          environment: { 
            type: 'string' 
          },
          checks: { 
            type: 'object' 
          }
        }
      }
    }
  },

  // Schema para health check do banco de dados
  databaseHealthCheck: {
    description: 'Health check específico do banco de dados',
    tags: ['Health'],
    response: {
      200: {
        type: 'object',
        properties: {
          status: { 
            type: 'string', 
            enum: ['healthy'] 
          },
          timestamp: { 
            type: 'string', 
            format: 'date-time' 
          },
          database: {
            type: 'object',
            properties: {
              status: { 
                type: 'string', 
                enum: ['healthy'] 
              },
              responseTime: { 
                type: 'number' 
              }
            }
          }
        }
      },
      503: {
        type: 'object',
        properties: {
          status: { 
            type: 'string', 
            enum: ['unhealthy'] 
          },
          timestamp: { 
            type: 'string', 
            format: 'date-time' 
          },
          database: {
            type: 'object',
            properties: {
              status: { 
                type: 'string', 
                enum: ['unhealthy'] 
              },
              error: { 
                type: 'string' 
              }
            }
          }
        }
      }
    }
  },

  // Schema para health check simples
  simpleHealthCheck: {
    description: 'Health check simples - compatibilidade com versões anteriores',
    tags: ['Health'],
    response: {
      200: {
        type: 'string',
        example: 'OK'
      }
    }
  }
};
