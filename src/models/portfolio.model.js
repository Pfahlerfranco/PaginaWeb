const mongoose = require('mongoose');

const proyectoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  tecnologias: {
    type: [String],
    default: []
  },
  imagen: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Proyecto', proyectoSchema);
