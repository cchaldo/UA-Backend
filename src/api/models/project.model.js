const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

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

projectSchema.plugin(paginate);
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
