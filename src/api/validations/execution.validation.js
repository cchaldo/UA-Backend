const Joi = require('joi');

module.exports = {

    // POST /v1/Execution
    createExecution: {
        body: {
            entry: Joi.string(),
        },
    },


    // PATCH /v1/Execution/:id
    updateExecution: {
        body: {
            entry: Joi.string(),
        },
    },
};