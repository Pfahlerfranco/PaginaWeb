const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Formato de email inválido']
  },
  mensaje: {
    type: String,
    required: [true, 'El mensaje es obligatorio'],
    trim: true,
    minlength: [10, 'El mensaje debe tener al menos 10 caracteres']
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contacto', contactoSchema);
