# Establece la imagen base
FROM node:16

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el código fuente
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
