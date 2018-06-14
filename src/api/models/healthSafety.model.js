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

    status: {
        type: Number,
        default: 1
    },

    lsc: {
        type: String,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    }
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },




},
    { strict: false }
);

const HealthSafety = mongoose.model('HealthSafety', healthSafetySchema);
module.exports = HealthSafety;