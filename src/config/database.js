const mongoose = require('mongoose');
require('dotenv').config();

const conectarDB = async () => {
  console.log('🔌 Intentando conectar a MongoDB...');

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    console.log(`✅ Conectado a MongoDB: ${db.name} en ${db.host}:${db.port}`);
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1); // Corta la ejecución si no se conecta
  }
};

module.exports = conectarDB;
