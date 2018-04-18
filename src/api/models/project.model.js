const mongoose = require('mongoose');

/**
 * Project Schema
 * @private
 */
const projectSchema = new mongoose.Schema({

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


const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
