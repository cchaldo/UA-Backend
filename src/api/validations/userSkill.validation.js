const Joi = require('joi');

module.exports = {

	createUserSkill: {
		body:{
			userId:Joi.string().required(),
			skillId:Joi.string().required(),
		}
	},
	
	updateUserSkill: {
		body:{
			userId:Joi.string().required(),
			skillId:Joi.string().required(),
		}
	},

}