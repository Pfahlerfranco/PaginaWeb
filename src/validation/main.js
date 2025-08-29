const Joi = require('joi');

function formatDetails(details = []) {
  return details.map(d => ({ path: d.path.join('.'), message: d.message }));
}

/**
 * validate(schema, prop)
 * prop: "body" | "query" | "params"
 */
function validate(schema, prop = 'body') {
  return (req, res, next) => {
    const { value, error } = schema.validate(req[prop], {
      abortEarly: false,
      convert: true,        // convierte "true"/"1" a boolean, etc.
      stripUnknown: true    // descarta campos extra
    });

    if (error) {
      return res.status(400).json({ error: 'Validación', details: formatDetails(error.details) });
    }

    // sobreescribimos con los datos saneados
    req[prop] = value;
    next();
  };
}

module.exports = { validate, Joi };