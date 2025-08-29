// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function parseBearer(header) {
  if (!header) return null;
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) return null;
  return token;
}

module.exports = function requireAuth(req, res, next) {
  try {
    const token = parseBearer(req.headers.authorization);
    if (!token) {
      return res.status(401).json({ error: 'No autorizado: falta token Bearer' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Podés guardar info del usuario en la request para usarla después
    req.user = { id: payload.sub, email: payload.email, role: payload.role || 'admin' };
    next();
  } catch (err) {
    const isExpired = err?.name === 'TokenExpiredError';
    return res.status(401).json({ error: isExpired ? 'Token expirado' : 'Token inválido' });
  }
};