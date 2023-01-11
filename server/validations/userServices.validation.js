const Joi = require('joi');

module.exports = {
  login: {
    body: {
      email: Joi.string().email().required(),
      /* password: Joi.string().required().max(128), */
    },
  },
  addUser:{
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email:  Joi.string().email().required(),
      password: Joi.string().required(),
      employeeId: Joi.string(),
      organizationName: Joi.string()
    },
  },
}