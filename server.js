const express = require('express');
const bodyParser = require('body-parser');
// const mongodb = require('./db/connect');
const mongoose = require('.db/connect/mongoose');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

// listen and mongoose
mongoose
  .connect(
    'mongodb+srv://awarbler:jihduz-pytraw-0mEvmi@cse341aw.cmw2isx.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
