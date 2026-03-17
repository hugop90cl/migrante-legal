FROM node:22-alpine

WORKDIR /app

# Instala dependencias del sistema
RUN apk add --no-cache libc6-compat openssl

# Copia los archivos de dependencias
COPY package.json package-lock.json* ./

# Instala dependencias
RUN npm ci

# Copia el código fuente y todo lo necesario para el build
COPY . .

# Genera Prisma Client
RUN npx prisma generate

# Build de la app Next.js
RUN npm run build

# Expone el puerto
EXPOSE 3001

ENV PORT 3001
ENV HOSTNAME "0.0.0.0"
ENV NODE_ENV production

# Comando de inicio SOLO para producción
CMD ["npm", "start"]