const mongoose = require('mongoose');

const conectarDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI no está definido en el .env');
  }

  // En prod suele ser mejor desactivar autoIndex por performance
  mongoose.set('autoIndex', process.env.NODE_ENV !== 'production');

  console.log('🔌 Intentando conectar a MongoDB...'); 
  
  try {
    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });

    const dbName = mongoose.connection.name || mongoose.connection.db?.databaseName;
    console.log(`✅ Conectado a MongoDB: ${dbName}`);
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    throw error;
  }

  mongoose.connection.on('error', (err) => console.error('🔴 MongoDB error:', err.message));
  mongoose.connection.on('disconnected', () => console.warn('⚠️ MongoDB desconectado'));
};

module.exports = conectarDB;