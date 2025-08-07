const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const admin = require('../config/admin');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Verificar usuario
  if (username !== admin.username) {
    return res.status(401).json({ error: 'Usuario incorrecto' });
  }

  // Verificar contraseña
  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  // Generar token
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
