const Joi = require('joi');

module.exports = {

  // POST /v1/project
  createProject: {
    body: {
      name: Joi.string().required(),
      place: Joi.string().required()
    },
  },
  
  
  // PATCH /v1/project/:id
  updateProject: {
    body: {
      name: Joi.string(),
      place: Joi.string().required()
    },
  },
};
