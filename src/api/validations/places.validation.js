const Joi = require('joi');

module.exports = {

    // POST /v1/project
    createPlaces: {
        body: {
            name: Joi.string().required(),
            userId: Joi.string().required()
        },
    },


    // PATCH /v1/project/:id
    updatePlaces: {
        body: {
            name: Joi.string(),
            userId: Joi.string().required()
        },
    },
};
