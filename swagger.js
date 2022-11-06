const swaggerAutogen = require('swagger-autogen')();

// process.env.HOST

const doc = {
  info: {
    title: 'Users API',
    description: 'A cool contacts api'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['./server.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
