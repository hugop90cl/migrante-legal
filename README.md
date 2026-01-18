# Migrante Legal - Sitio Web

Sitio web de asesoría legal para regularizar situaciones migratorias en Chile.

## 🚀 Tecnologías

### Frontend
- ⚛️ **Next.js 15** (App Router, Server Components, Fast Refresh)
- ⚛️ **React 19**
- 📘 **TypeScript 5.7**
- 🎨 **Tailwind CSS 4.0**
- 📝 **React Hook Form + Zod** (formularios y validación)
- 🌐 **Axios** (llamadas HTTP)

### Backend
- 🟢 **Next.js API Routes + Server Actions**
- 🟢 **Node.js 22 LTS**

### Base de Datos
- 🐘 **PostgreSQL 17**
- 🔷 **Prisma 6** (ORM)
- 🖥️ **pgAdmin 4 Web** (puerto 5051)

### DevTools
- 🔍 **ESLint** (análisis de código)
- 🎨 **Prettier** (formateo automático)

### Docker
- 🐳 3 contenedores (postgres, pgadmin, app)
- 💾 Volumes persistentes
- 🔄 Fast Refresh con volumes

## 📦 Instalación

### Prerrequisitos
- Docker y Docker Compose instalados
- Node.js 22 LTS (para desarrollo local sin Docker)

### Configuración con Docker

1. **Clonar el repositorio** (o asegurarse de estar en el directorio del proyecto)

2. **Copiar el archivo de variables de entorno**
```bash
cp .env.example .env
```

3. **Construir y levantar los contenedores**
```bash
docker compose up -d --build
```

Esto iniciará:
- **PostgreSQL** en el puerto **5433**
- **pgAdmin** en el puerto **5051** (http://localhost:5051)
- **App Next.js** en el puerto **3001** (http://localhost:3001)

4. **Ejecutar las migraciones de Prisma**
```bash
docker compose exec app npx prisma migrate dev --name init
```

5. **Generar el cliente de Prisma**
```bash
docker compose exec app npx prisma generate
```

6. **Acceder a pgAdmin** (opcional)
- URL: http://localhost:5051
- Email: admin@migrantelegal.cl
- Password: admin2026

Para conectar pgAdmin a PostgreSQL:
- Host: postgres
- Port: 5432
- Database: migrantelegal_db
- Username: migrantelegal
- Password: migrantelegal2026

### Desarrollo Local (sin Docker)

1. **Instalar dependencias**
```bash
npm install
```

2. **Configurar variables de entorno**
```bash
cp .env.example .env
```

3. **Levantar PostgreSQL** (necesitarás Docker o una instalación local)
```bash
docker compose up postgres -d
```

4. **Ejecutar migraciones de Prisma**
```bash
npx prisma migrate dev
```

5. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en http://localhost:3001

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia el servidor de desarrollo (puerto 3001)

# Producción
npm run build            # Construye la aplicación para producción
npm start                # Inicia el servidor de producción

# Linting y formateo
npm run lint             # Ejecuta ESLint
npm run format           # Formatea el código con Prettier

# Prisma
npm run prisma:generate  # Genera el cliente de Prisma
npm run prisma:push      # Sincroniza el schema con la base de datos
npm run prisma:studio    # Abre Prisma Studio
```

## 🐳 Comandos Docker Útiles

```bash
# Ver logs
docker compose logs -f app

# Reiniciar contenedores
docker compose restart

# Detener contenedores
docker compose down

# Detener y eliminar volúmenes (¡cuidado, elimina los datos!)
docker compose down -v

# Ejecutar comandos dentro del contenedor
docker compose exec app sh
docker compose exec app npm run prisma:studio
docker compose exec app npx prisma migrate dev

# Ver estado de los contenedores
docker compose ps
```

## 📁 Estructura del Proyecto

```
migrantelegal/
├── prisma/
│   └── schema.prisma          # Schema de Prisma
├── public/                    # Archivos estáticos
├── src/
│   ├── actions/               # Server Actions
│   │   └── contact.ts
│   ├── app/
│   │   ├── api/               # API Routes
│   │   │   ├── contact/
│   │   │   ├── lawyers/
│   │   │   └── visa-types/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx           # Página principal
│   ├── components/            # Componentes React
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Lawyers.tsx
│   │   └── VisaServices.tsx
│   └── lib/                   # Utilidades
│       ├── axios.ts
│       ├── prisma.ts
│       └── validations.ts
├── .env                       # Variables de entorno
├── .eslintrc.json            # Configuración ESLint
├── .prettierrc               # Configuración Prettier
├── docker-compose.yml        # Configuración Docker Compose
├── Dockerfile                # Configuración Docker
├── next.config.ts            # Configuración Next.js
├── package.json
├── tailwind.config.ts        # Configuración Tailwind
└── tsconfig.json             # Configuración TypeScript
```

## 🌐 Características

- ✅ Responsive design (móvil, tablet, escritorio)
- ✅ Formulario de contacto con validación
- ✅ Almacenamiento de consultas en PostgreSQL
- ✅ API Routes para manejar datos
- ✅ Server Actions de Next.js 15
- ✅ Componentes modulares y reutilizables
- ✅ Navegación suave (smooth scroll)
- ✅ Diseño moderno con Tailwind CSS

## 🔧 Configuración de Puertos

Los siguientes puertos están configurados para evitar conflictos:

- **3001**: Aplicación Next.js
- **5433**: PostgreSQL
- **5051**: pgAdmin

Si necesitas cambiar los puertos, modifica el archivo `docker-compose.yml` y el archivo `.env`.

## 📝 Licencia

Copyright © 2026 Migrante Legal. Todos los derechos reservados.

## 🤝 Contacto

- Teléfono: +56 9 9138 1660
- Email: contacto@migrantelegal.cl
