const express = require('express');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const router = express.Router();

// Acepta email O username (uno de los dos), y password
const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  username: Joi.string(),
  password: Joi.string().min(3).required()
}).xor('email', 'username'); // exige uno u otro, no ambos

router.post('/login', (req, res) => {
  const { value, error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ error: 'Validación', details: error.details });

  const { email, username, password } = value;

  // Tomamos credenciales desde .env
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME; // opcional
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const JWT_SECRET = process.env.JWT_SECRET;

  // Chequeos de configuración (sin mostrar secretos)
  if (!JWT_SECRET || (!ADMIN_EMAIL && !ADMIN_USERNAME) || !ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Config faltante en .env (JWT_SECRET / ADMIN_* )' });
  }

  // Validación de identidad: email o username
  const emailOk = email ? email === ADMIN_EMAIL : true; // si vino email, debe coincidir
  const userOk = username ? username === (ADMIN_USERNAME || 'admin') : true; // si vino username, debe coincidir (por defecto 'admin' si seteás ADMIN_USERNAME)
  const passOk = password === ADMIN_PASSWORD;

  if (!passOk || (!emailOk && !userOk)) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  // Usamos 'sub' como identificador (email o username)
  const subject = email || username;

  const token = jwt.sign(
    { sub: subject, email: email || undefined, username: username || undefined, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token });
});

module.exports = router;