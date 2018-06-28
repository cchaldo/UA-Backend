const mongoose = require('mongoose');

const resourcesSchema = new mongoose.Schema({

    item: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
    },

    status: {
        type: Number,
        default: 1
    },
    
    placeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Places'
    },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    }


},

);

const Resources = mongoose.model('Resources', resourcesSchema);
module.exports = Resources;