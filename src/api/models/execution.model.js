const mongoose = require('mongoose');

const executionSchema = new mongoose.Schema({

    entry: {
        type: String,
    },

    intent: {
        type: String,
    },

    conceptOperation: {
        type: String,
    },

    status: {
        type: Number,
        default: 1
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        // required: true,
    }
});

const Execution = mongoose.model('Execution', executionSchema);
module.exports = Execution;