const mongoose = require('mongoose');

/**
 * User Skill Schema
 * @private
 */
const userSkillSchema = new mongoose.Schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true,
  },
  want: {
    type: Number
  },
  have: {
    type: Number
  },
  status: {
  	type: Number,
  	default: 1
  }
  
});


const UserSkill = mongoose.model('UserSkill', userSkillSchema);
module.exports = UserSkill;
