const Proyecto = require('../models/portfolio.model');

exports.getProyectos = async (req, res) => {
  try {
    const {
      q = '', tag, destacado,
      page = 1, limit = 12, sort = 'recientes'
    } = req.query;

    const filter = {};
    if (tag) filter.tags = tag;
    if (typeof destacado !== 'undefined') {
      filter.destacado = (destacado === 'true' || destacado === '1' || destacado === true);
    }
    if (q && q.trim()) filter.$text = { $search: q.trim() };

    const sortMap = {
      recientes: { createdAt: -1 },
      antiguos: { createdAt: 1 },
      titulo_asc: { titulo: 1 },
      titulo_desc: { titulo: -1 }
    };
    const sortSpec = sortMap[sort] || sortMap.recientes;

    const p = Math.max(1, parseInt(page, 10));
    const l = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (p - 1) * l;

    const [total, data] = await Promise.all([
      Proyecto.countDocuments(filter),
      Proyecto.find(filter).sort(sortSpec).skip(skip).limit(l).lean()
    ]);

    res.json({
      meta: {
        page: p, limit: l, total,
        totalPages: Math.max(1, Math.ceil(total / l)),
        hasPrev: p > 1,
        hasNext: p * l < total
      },
      data
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
};

exports.createProyecto = async (req, res) => {
  try {
    const nuevo = await Proyecto.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
};

exports.updateProyecto = async (req, res) => {
  try {
    const actualizado = await Proyecto.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!actualizado) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
};

exports.deleteProyecto = async (req, res) => {
  try {
    const eliminado = await Proyecto.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json({ mensaje: 'Proyecto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
};
