const express = require('express');
const router = express.Router();
const {
  getProyectos,
  createProyecto,
  updateProyecto,
  deleteProyecto
} = require('../controllers/portfolio.controllers');

router.get('/', getProyectos);
router.post('/', createProyecto);
router.put('/:id', updateProyecto);
router.delete('/:id', deleteProyecto);

module.exports = router;
