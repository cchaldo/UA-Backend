const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
   
    moc: [],
    
    critialContacts: [],
    
    specialInstruction : {
        type : String,
    },
    
    status: {
        type: Number,
        default: 1
    },

    revelvantUA: {
        type: String,
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    }
    
    
},
{strict: false}

);

const Communication = mongoose.model('Communication', communicationSchema);
module.exports = Communication;