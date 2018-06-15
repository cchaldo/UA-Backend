const mongoose = require('mongoose');

const documentationSchema = new mongoose.Schema ({

    document : [],

    attachments: [],

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    status: {
        type: Number,
        default: 1
    },

},
    { strict: false }

);

const Documentation = mongoose.model('Documentation', documentationSchema);
module.exports = Documentation;

