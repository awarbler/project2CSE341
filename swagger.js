const swaggerAutogen = require('swagger-autogen')();
const appConfig = require('./config/app');

// process.env.HOST

const doc = {
  info: {
    title: 'Contacts API',
  },
  host: '',
  schemes: ['http','https'],
  securityDefinitions: {
    Authorization: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Authentication token (Bearer)",
      example: "Bearer <your token>",
     },
    }
  },
  security: [
    {
      Authorization: [],
    },
  ],
};

const outputFile = 'swagger.json';
const endpointsFiles = ['./server.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
