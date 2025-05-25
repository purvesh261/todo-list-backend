import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo List API',
      version: '1.0.0',
      description: 'A RESTful API for managing todo items',
      contact: {
        name: 'Purvesh Gandhi',
        email: 'purvesh.gandhi2012@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
    schemas: {
      Todo: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier of the todo item'
          },
          title: {
            type: 'string',
            description: 'The title of the todo item'
          },
          description: {
            type: 'string',
            description: 'Optional description of the todo item'
          },
          isCompleted: {
            type: 'boolean',
            description: 'Whether the todo item is completed',
            default: false
          },
          dueDate: {
            type: 'string',
            format: 'date-time',
            description: 'Optional due date for the todo item'
          }
        },
        required: ['_id', 'title', 'completed', 'createdAt', 'updatedAt']
      }
    },
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options); 