const mongoose = require('mongoose');

const healthSafetySchema = new mongoose.Schema({

    ecn: [],

    mma: [],
    
    sma: [],

    location: {
        type: String,
    },

    lmc: {
        type: String,
    },

    lsc: {
        type: String,
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },




});

const HealthSafety = mongoose.model('HealthSafety', healthSafetySchema);
module.exports = HealthSafety;