const mongoose = require('mongoose');

/**
 * Profile Schema
 * @private
 */

 const projectTeamMemberSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
  },

  city:{
    type: String,
  },

  role: {

  }
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

  const ProjectTeamMember = mongoose.model('ProjectTeamMember', profileSchema);
module.exports = ProjectTeamMember;
