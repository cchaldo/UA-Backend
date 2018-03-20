const Joi = require('joi');

module.exports = {

	createProfile: {
		body:{
			firstName:Joi.string().min(2).required(),
			lastName:Joi.string(),
		}
	}
}