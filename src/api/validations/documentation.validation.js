const Joi = require('joi');

module.exports = {

    // POST /v1/Documents
    createDocuments : {
        body: {
            // document: Joi.string()
        }
    },

    // PATCH /v1/Documents/:id
    updateDocuments: {
        body: {
            // document: Joi.string()
        }
    }
};