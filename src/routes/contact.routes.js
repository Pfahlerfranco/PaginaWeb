const express = require('express');
const router = express.Router();
const {
  getMensajes,
  createMensaje,
  updateMensaje,
  deleteMensaje
} = require('../controllers/contact.controllers');

router.get('/', getMensajes);
router.post('/', createMensaje);
router.put('/:id', updateMensaje);
router.delete('/:id', deleteMensaje);

module.exports = router;
