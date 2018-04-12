const mongoose = require('mongoose');

/**
 * Role Schema
 * @private
 */
const roleSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  status: {
  	type: Number,
  	default: 1
  }
  
});


const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
