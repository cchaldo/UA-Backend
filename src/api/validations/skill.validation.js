const Joi = require('joi');

module.exports = {

	createSkill: {
		body:{
			name:Joi.string().min(2).required(),
		}
	},
	
	updateSkill: {
		body:{
			name:Joi.string().min(2).required(),
		}
	},

}