const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    
    streetAddress: {
        type: String,
    },
    
    city:{
        type: String,
    },

    state:{
        type: String,
    },

    zipcode: {
        type: Number,
    },

    description:{
        type: String,
    },

    photosURL:{
        type: String,
    },
    googleMap:{
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: Number,
        default: 1
    }
    


});


const Places = mongoose.model('Places', placesSchema);
module.exports = Places;