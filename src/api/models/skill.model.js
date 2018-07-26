const mongoose = require('mongoose');

/**
 * Skill Schema
 * @private
 */
const skillSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  categoryId: {
  	type: mongoose.Schema.Types.ObjectId,
    ref: 'SkillCategory',
  },
  status: {
  	type: Number,
  	default: 1
  }
  
});


const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;
