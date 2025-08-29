const mongoose = require('mongoose');

const proyectoSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
  tecnologias: { type: [String], default: [] },
  imagen: { type: String, trim: true },
  repo: { type: String, trim: true },
  demo: { type: String, trim: true },
  tags: { type: [String], default: [] },
  destacado: { type: Boolean, default: false },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

proyectoSchema.index({ titulo: 'text', descripcion: 'text', tags: 'text' });

module.exports = mongoose.model('Proyecto', proyectoSchema);