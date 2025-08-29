const express = require('express');
const router = express.Router();
const {
  getProyectos,
  createProyecto,
  updateProyecto,
  deleteProyecto
} = require('../controllers/portfolio.controllers');
const requireAuth = require('../middlewares/auth.middleware');
const { validate } = require('../validation/main');
const { proyectoBodySchema, listQuerySchema, idParamSchema } = require('../validation/portfolio.schema');

// GET público con validación de query
router.get('/', validate(listQuerySchema, 'query'), getProyectos);

// Escritura protegida + validación de body/params
router.post('/', requireAuth, validate(proyectoBodySchema, 'body'), createProyecto);
router.put('/:id', requireAuth, validate(idParamSchema, 'params'), validate(proyectoBodySchema, 'body'), updateProyecto);
router.delete('/:id', requireAuth, validate(idParamSchema, 'params'), deleteProyecto);

module.exports = router;