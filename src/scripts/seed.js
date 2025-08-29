// scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Proyecto = require('../models/portfolio.model')
//const Proyecto = require('../src/models/portfolio.model');

const DEMO_PROJECTS = [
  {
    titulo: 'Portfolio Web',
    descripcion: 'Sitio personal hecho con React y Tailwind, mostrando proyectos y blog.',
    tecnologias: ['React', 'Vite', 'Tailwind'],
    imagen: 'https://via.placeholder.com/1200x630?text=Portfolio+Web',
    repo: 'https://github.com/usuario/portfolio-web',
    demo: 'https://mi-sitio.com',
    tags: ['frontend', 'personal'],
    destacado: true
  },
  {
    titulo: 'API Portfolio',
    descripcion: 'Backend con Node, Express y MongoDB que alimenta el portfolio y el contacto.',
    tecnologias: ['Node', 'Express', 'MongoDB'],
    imagen: 'https://via.placeholder.com/1200x630?text=API+Portfolio',
    repo: 'https://github.com/usuario/api-portfolio',
    demo: '',
    tags: ['backend'],
    destacado: false
  },
  {
    titulo: 'Dashboard Admin',
    descripcion: 'Panel administrativo con autenticación JWT y gráficos básicos.',
    tecnologias: ['React', 'Recharts', 'JWT'],
    imagen: 'https://via.placeholder.com/1200x630?text=Dashboard+Admin',
    repo: 'https://github.com/usuario/dashboard-admin',
    demo: '',
    tags: ['admin', 'dashboard'],
    destacado: false
  }
];

async function main() {
  const uri = process.env.MONGO_URI;
  const reset = process.argv.includes('--reset') || process.argv.includes('--clear');

  if (!uri) {
    console.error('❌ MONGO_URI no está definido en el .env');
    process.exit(1);
  }

  console.log('🔌 Conectando a MongoDB…');
  await mongoose.connect(uri, {
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 5000
  });

  try {
    await Proyecto.syncIndexes();
  } catch (e) {
    console.warn('⚠️ No se pudo syncIndexes (no crítico en dev):', e.message);
  }

  if (reset) {
    console.log('🧹 Limpiando colección de proyectos…');
    await Proyecto.deleteMany({});
  }

  let inserted = 0;
  for (const item of DEMO_PROJECTS) {
    const exists = await Proyecto.findOne({ titulo: item.titulo }).lean();
    if (exists) {
      console.log(`↩️  Ya existe: ${item.titulo}`);
      continue;
    }
    await Proyecto.create(item);
    console.log(`✅ Insertado: ${item.titulo}`);
    inserted++;
  }

  const total = await Proyecto.countDocuments({});
  console.log(`\n📊 Seed finalizado. Insertados: ${inserted}. Total en colección: ${total}`);

  await mongoose.connection.close();
  console.log('👋 Conexión cerrada.');
  process.exit(0);
}

main().catch(async (e) => {
  console.error('❌ Error en seed:', e);
  try { await mongoose.connection.close(); } catch {}
  process.exit(1);
});