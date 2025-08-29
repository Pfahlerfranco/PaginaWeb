const Contacto = require('../models/contact.model');
exports.getMensajes = async (_req, res) => {
  try {
    const mensajes = await Contacto.find().sort({ createdAt: -1 }).lean();
    res.json(mensajes);
  } catch {
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
};

exports.createMensaje = async (req, res) => {
  try {
    const nuevo = await Contacto.create(req.body);
    res.status(201).json(nuevo);
  } catch {
    res.status(500).json({ error: 'Error al crear el mensaje' });
  }
};

exports.updateMensaje = async (req, res) => {
  try {
    const actualizado = await Contacto.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!actualizado) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.json(actualizado);
  } catch {
    res.status(500).json({ error: 'Error al actualizar el mensaje' });
  }
};

exports.deleteMensaje = async (req, res) => {
  try {
    const eliminado = await Contacto.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.json({ mensaje: 'Mensaje eliminado correctamente' });
  } catch {
    res.status(500).json({ error: 'Error al eliminar el mensaje' });
  }
};