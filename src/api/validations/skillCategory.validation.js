const Joi = require('joi');

module.exports = {

	createSkillCategory: {
		body:{
			name:Joi.string().min(2).required(),
		}
	},
	
	updateSkillCategory: {
		body:{
			name:Joi.string().min(2).required(),
		}
	},

}