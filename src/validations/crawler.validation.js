const Joi = require('@hapi/joi');

const index = {
  body: Joi.object().keys({}),
};

module.exports = {
  index: index
};
