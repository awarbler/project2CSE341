// basic routing 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// add own imports or middleware
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();
// parses and converts
app.use(bodyParser.json());

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

//listen and mongoose 
mongoose
    .connect('mongodb+srv://awarbler:jihduz-pytraw-0mEvmi@cse341aw.cmw2isx.mongodb.net/mern?retryWrites=true&w=majority')
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
