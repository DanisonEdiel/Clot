# Usa la imagen oficial de Node.js para la construcción
FROM node:20 as build-stage
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Usa Nginx para servir el frontend en producción
FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
