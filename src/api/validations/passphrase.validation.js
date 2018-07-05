const Joi = require('joi');
const User = require('../models/user.model');

module.exports = {

  // POST /v1/list
  create: {
    body: {
      passphrase: Joi.string().min(6).max(6).required(),
    },
  },

};
