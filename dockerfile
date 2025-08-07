# Usa una imagen oficial de Node.js como base
FROM node:18

# Crea y establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del proyecto
COPY . .

# Expone el puerto (opcional pero útil para documentación)
EXPOSE 5000

# Comando para iniciar la app
CMD ["npm", "start"]
