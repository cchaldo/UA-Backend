const Joi = require('joi');
const User = require('../models/user.model');
module.exports = {
  // POST /v1/auth/register
  register: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(128),
    },
  },

  // POST /v1/socialSignup
  socialSignup:{
    body:{
      email:Joi.string().email().required(),
      source:Joi.string().required(),
      userId:Joi.string().required(),
      accessToken:Joi.string().required(),
      source: Joi.string().valid(User.socialSignupSources),
     
    },
  },

  // POST /v1/linkedinSignup
  linkedinSignup:{
    body:{
      code:Joi.string().required(),     
    },
  },

  // POST /v1/auth/login
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().max(128),
    },
  },

  // POST /v1/auth/facebook
  // POST /v1/auth/google
  oAuth: {
    body: {
      access_token: Joi.string().required(),
    },
  },

  // POST /v1/auth/refresh
  refresh: {
    body: {
      email: Joi.string().email().required(),
      refreshToken: Joi.string().required(),
    },
  },
};
