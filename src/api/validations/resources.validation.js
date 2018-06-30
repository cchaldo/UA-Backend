const Joi = require('joi');

module.exports = {

    // POST /v1/Resources
    createResources: {
        body: {
            item: Joi.string()
        }
    },

    // PATCH /v1/Resources/:id
    updateResources: {
        body: {
            item: Joi.string(),
            placeId: Joi.string().required()
        }
    }
};