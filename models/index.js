const dbConfig = require('../config/db.donfig.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.places = require('./place')(mongoose);
db.user = require('./user')(mongoose);

module.exports = db;
