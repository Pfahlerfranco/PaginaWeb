require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const conectarDB = require('./config/database');

const { contact, portfolio, auth } = require('./routes/main');

const app = express();
const PORT = process.env.PORT || 5000;

// Orígenes permitidos (dev/prod)
const ORIGINS = [
  process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  process.env.FRONTEND_ORIGIN_2,
  process.env.FRONTEND_ORIGIN_3
].filter(Boolean);

// Middlewares base
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// CORS (orígenes explícitos)
app.use(cors({
  origin: ORIGINS.length === 1 ? ORIGINS[0] : ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 600
}));
//app.options('*', cors());

// Healthcheck
app.get('/api/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

// Rutas
app.use('/api/contact', contact);
app.use('/api/portfolio', portfolio);
app.use('/api', auth);

// Swagger (opcional; si no existe el archivo, no rompe)
try {
  const swaggerDocument = YAML.load('./swagger.yaml');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch {
  console.warn('⚠️ No se cargó swagger.yaml (opcional)');
}

// Arranque: primero DB, luego server
conectarDB()
  .then(() => app.listen(PORT, () => console.log(`Listen in the PORT ${PORT}`)))
  .catch((err) => {
    console.error('No se pudo iniciar el server por error de DB:', err.message);
    process.exit(1);
  });

module.exports = app; // útil para tests