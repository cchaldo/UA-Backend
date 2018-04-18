const mongoose = require('mongoose');

/**
 * Resource Schema
 * @private
 */
const resourceSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
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


const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;
