// mongoos schema
const mongoose = require('mongoose');
// mongoos schema
const Schema = mongoose.Schema;
// mongoos schema
const placeSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    image: { type: String, required: true},
    address: { type: String, required: true},
    location: {
      lat: { type: Number, required: true},
      lng: { type: Number, required: true},
    },
    // use mondgodb id establish connection 
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Place', placeSchema);