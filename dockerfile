# Usa una imagen base de Node.js
FROM node:20

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./
RUN ls -l /app
RUN cat /app/package.json

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .
RUN ls -l /app

# Exponer el puerto que la aplicación utiliza
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
