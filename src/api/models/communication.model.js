const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
   
    moc: [],
    
    critialContacts: [],
    
    specialInstruction : {
        type : String,
    },
    
    revelvantUA: {
        type: String,
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },




});

const Communication = mongoose.model('Communication', communicationSchema);
module.exports = Communication;