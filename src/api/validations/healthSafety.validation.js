const Joi = require('joi');

module.exports = {

    // POST /v1/Communication
    createHealthSafety: {
        body: {
            ecn: Joi.array()
        }
    },

    // PATCH /v1/HealthSafety/:id
    updateHealthSafety: {
        body: {
            ecn: Joi.string()
        }
    }
};
