const Joi = require('joi');

module.exports = {

    // POST /v1/Communication
    createCommunication: {
        body: {
            moc: Joi.string(),
        },
    },


    // PATCH /v1/communication/:id
    updateCommunication: {
        body: {
            moc: Joi.string(),
        },
    },
};
