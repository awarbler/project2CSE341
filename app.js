// const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser'); // do I need this?
const logger = require('morgan'); // w
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// import the routing file to handle the default (index) route
// const index = require('./routes/app');
const placesRoutes = require('./routes/places.route');
const usersRoutes = require('./routes/users.route');
const HttpError = require('./models/http-error');

const app = express();
// parses and converts
app.use(bodyParser.json());

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev')); // Tell express to use the Morgan logger
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('could not find this route', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// establish a connection to the mongo database
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, res) => {
    if (err) {
      console.log('Connection failed: ' + err);
    } else {
      console.log('Connected to database!');
    }
  }
);

// Define the port address and tell express to use this port
const port = process.env.PORT || '8080';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () {
  console.log('API running on localhost: ' + port);
});
