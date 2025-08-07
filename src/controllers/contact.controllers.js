const Contacto = require('../models/contact.model');

// Obtener todos los mensajes de contacto
exports.getMensajes = async (req, res) => {
  try {
    const mensajes = await Contacto.find();
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
};

// Crear un nuevo mensaje de contacto
exports.createMensaje = async (req, res) => {
  try {
    const nuevoMensaje = new Contacto(req.body);
    const mensajeGuardado = await nuevoMensaje.save();
    res.status(201).json(mensajeGuardado);
  } catch (error) {
    res.status(400).json({ error: 'Error al enviar el mensaje' });
  }
};

// Actualizar un mensaje por ID
exports.updateMensaje = async (req, res) => {
  try {
    const mensajeActualizado = await Contacto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!mensajeActualizado) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.json(mensajeActualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el mensaje' });
  }
};

// Eliminar un mensaje por ID
exports.deleteMensaje = async (req, res) => {
  try {
    const mensajeEliminado = await Contacto.findByIdAndDelete(req.params.id);
    if (!mensajeEliminado) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.json({ mensaje: 'Mensaje eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el mensaje' });
  }
};
