const Joi = require('joi');

module.exports = {

    // POST /v1/Documents
    createDocuments : {
        body: {
            placeId: Joi.string().required(),
            name: Joi.string().required()
        }
    },

    // PATCH /v1/Documents/:id
    updateDocuments: {
        body: {
            placeId: Joi.string().required(),
            name: Joi.string().required()
        }
    }
};