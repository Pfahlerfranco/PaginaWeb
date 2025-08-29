const { Joi } = require('./main');

const proyectoBodySchema = Joi.object({
  titulo: Joi.string().min(3).max(120).required(),
  descripcion: Joi.string().min(10).required(),
  tecnologias: Joi.array().items(Joi.string()).default([]),
  imagen: Joi.string().uri().allow('', null),
  repo: Joi.string().uri().allow('', null),
  demo: Joi.string().uri().allow('', null),
  tags: Joi.array().items(Joi.string()).default([]),
  destacado: Joi.boolean().default(false)
});

const listQuerySchema = Joi.object({
  q: Joi.string().allow(''),
  tag: Joi.string(),
  destacado: Joi.boolean().truthy('true','1').falsy('false','0'),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(12),
  sort: Joi.string().valid('recientes','antiguos','titulo_asc','titulo_desc').default('recientes')
});

const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

module.exports = { proyectoBodySchema, listQuerySchema, idParamSchema };