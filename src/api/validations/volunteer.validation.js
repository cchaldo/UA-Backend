const Joi = require('joi');
// const User = require('../models/user.model');

module.exports = {

  // POST /v1/volunteer
  createVolunteer: {
    body: {
      email: Joi.string().email().required(),
      role: Joi.string().required(),
    },
  },


  // PATCH /v1/volunteer/:userId
  updateVolunteer: {
    body: {
      email: Joi.string().email(),
              role: Joi.string().required(),
    },
  },
};
