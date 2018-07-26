const Joi = require('joi');

module.exports = {

	createUserSkill: {
		body:{
			userId:Joi.string().required(),
			skillId:Joi.string().required(),
			rating:Joi.number().required(),
			type:Joi.number().required(),
		}
	},
	
	updateUserSkill: {
		body:{
			userId:Joi.string().required(),
			skillId:Joi.string().required(),
		}
	},

}