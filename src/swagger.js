import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: { title: 'Logistics API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./src/Routes/*.js'],
});
