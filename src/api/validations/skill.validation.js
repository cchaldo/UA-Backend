const Joi = require('joi');

module.exports = {

	createSkill: {
		body:{
			name:Joi.string().min(2).required(),
			categoryId:Joi.string().required(),
		}
	},
	
	updateSkill: {
		body:{
			name:Joi.string().min(2).required(),
		}
	},

}