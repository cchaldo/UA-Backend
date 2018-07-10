const Joi = require('joi');

module.exports = {

    // POST /v1/Communication
    createCommunication: {
        body: {
            // placeId: Joi.string().required()
        },
    },
    

    // PATCH /v1/communication/:id
    updateCommunication: {
        body: {
            // placeId: Joi.string().required()
        }, 
    },
};
