const Joi = require('joi');

module.exports = {

    // POST /v1/Communication
    createHealthSafety: {
        body: {
        
            location: Joi.string(),
            lmc: Joi.string(),
            lsc: Joi.string(),
            placeId: Joi.string().required()
        }
    },

    // PATCH /v1/HealthSafety/:id
    updateHealthSafety: {
        body: {
            location: Joi.string(),
            lmc: Joi.string(),
            lsc: Joi.string(),
            placeId: Joi.string().required()
        }
    }
};
