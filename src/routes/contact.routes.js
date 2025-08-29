const express = require('express');
const router = express.Router();
const {
  getMensajes,
  createMensaje,
  updateMensaje,
  deleteMensaje
} = require('../controllers/contact.controllers');
const requireAuth = require('../middlewares/auth.middleware');
const { validate } = require('../validation/main');
const { contactoBodySchema, idParamSchema } = require('../validation/contact.schema');

// Alta pública (formulario) con validación
router.post('/', validate(contactoBodySchema, 'body'), createMensaje);

// Gestión solo admin
router.get('/', requireAuth, getMensajes);
router.put('/:id', requireAuth, validate(idParamSchema, 'params'), validate(contactoBodySchema, 'body'), updateMensaje);
router.delete('/:id', requireAuth, validate(idParamSchema, 'params'), deleteMensaje);

module.exports = router;