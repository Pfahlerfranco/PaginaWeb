const { Joi } = require('./main');

const contactoBodySchema = Joi.object({
  nombre:  Joi.string().min(2).max(120).required(),
  email:   Joi.string().email().required(),
  mensaje: Joi.string().min(10).max(2000).required()
});

const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

module.exports = { contactoBodySchema, idParamSchema };