const Joi = require('joi');

module.exports = {

	createRole: {
		body:{
			name:Joi.string().min(2).required(),
		}
	},
	
	updateRole: {
		body:{
			name:Joi.string().min(2).required(),
		}
	},

}