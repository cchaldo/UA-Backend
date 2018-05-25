const Joi = require('joi');

module.exports = {

    // POST /v1/project
    createPlaces: {
        body: {
            name: Joi.string().required(),
        },
    },


    // PATCH /v1/project/:id
    updatePlaces: {
        body: {
            name: Joi.string(),
        },
    },
};
