const Joi = require('joi');

module.exports = {

  // POST /v1/project
  createProject: {
    body: {
      name: Joi.string().required(),
    },
  },


  // PATCH /v1/project/:id
  updateProject: {
    body: {
      name: Joi.string(),
    },
  },
};
