const mongoose = require('mongoose');

/**
 * Skill Category Schema
 * @private
 */
const skillCategorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  status: {
  	type: Number,
  	default: 1
  }
  
});


const SkillCategory = mongoose.model('SkillCategory', skillCategorySchema);
module.exports = SkillCategory;
