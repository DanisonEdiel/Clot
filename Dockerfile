# Etapa 1: Construcción de la app con Node.js
FROM node:18 AS build
WORKDIR /app

# Copiar archivos del proyecto y instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build  # Genera la carpeta dist/

# Etapa 2: Servir la app con Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Eliminar archivos predeterminados de Nginx
RUN rm -rf ./*

# Copiar los archivos compilados desde la etapa de build
COPY --from=build /app/dist .

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para correr Nginx
CMD ["nginx", "-g", "daemon off;"]
