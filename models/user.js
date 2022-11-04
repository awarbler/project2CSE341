// mongoos schema
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// mongoos schema
const Schema = mongoose.Schema;
// mongoos schema
const userSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true}, // 
    password: {type: String, required: true, minlength: 6},
    image: { type: String, required: true},
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place'}],
    birthday: {type: String}

});

 userSchema.plugin(uniqueValidator);

 module.exports = mongoose.model('User', userSchema);