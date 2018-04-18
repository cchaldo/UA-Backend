const Joi = require('joi');
// const User = require('../models/user.model');

module.exports = {

  // POST /v1/resource
  createResource: {
    body: {
      name: Joi.string().required(),
      userId: Joi.string().required(),
    },
  },


  // PATCH /v1/resource/:id
  updateResource: {
    body: {
      name: Joi.string(),
    },
  },
};
