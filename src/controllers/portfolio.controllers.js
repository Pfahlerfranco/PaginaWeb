const Proyecto = require('../models/portfolio.model');

// Obtener todos los proyectos
exports.getProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find();
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
};

// Crear un nuevo proyecto
exports.createProyecto = async (req, res) => {
  try {
    const nuevoProyecto = new Proyecto(req.body);
    const proyectoGuardado = await nuevoProyecto.save();
    res.status(201).json(proyectoGuardado);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el proyecto' });
  }
};

// Actualizar un proyecto por ID
exports.updateProyecto = async (req, res) => {
  try {
    const proyectoActualizado = await Proyecto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!proyectoActualizado) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.json(proyectoActualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el proyecto' });
  }
};

// Eliminar un proyecto por ID
exports.deleteProyecto = async (req, res) => {
  try {
    const proyectoEliminado = await Proyecto.findByIdAndDelete(req.params.id);
    if (!proyectoEliminado) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.json({ mensaje: 'Proyecto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
};
