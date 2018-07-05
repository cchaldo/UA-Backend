const Joi = require('joi');
const User = require('../models/passpharase.model');

module.exports = {

  // GET /v1/users
  listUsers: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      role: Joi.string().valid(User.roles),
    },
  },

  // POST /v1/users
  createUser: {
    body: {
      passpharase: Joi.string().min(6).max(6).required(),
      name: Joi.string().max(128),
      role: Joi.string().valid(User.roles),
    },
  },



  // PUT /v1/users/:userId
  replaceUser: {
    body: {
      passpharase: Joi.string().min(6).max(6).required(),
      name: Joi.string().max(128),
      role: Joi.string().valid(User.roles),
    },
    params: {
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PATCH /v1/users/:userId
  updateUser: {
    body: {
      passpharase: Joi.string().min(6).max(6),
      name: Joi.string().max(128),
      role: Joi.string().valid(User.roles),
    },
    params: {
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
