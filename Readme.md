# SÉPHIRA — Panel de administración

Panel de administración para una tienda: gestiona productos, categorías y pedidos, con un dashboard de métricas. Desarrollado con React, Tailwind CSS, Redux Toolkit y un backend propio en Node/Express conectado a MongoDB Atlas.

SÉPHIRA comenzó como un catálogo interactivo en JavaScript puro (Actividad 1, carpeta `act1-vanilla/`) y en esta actividad evoluciona a un panel de gestión con frameworks de frontend, estado global y base de datos.

## Funcionalidades

- CRUD completo de **productos**, **categorías** y **pedidos**.
- Formularios con validación en el cliente y en el servidor.
- Tablas con búsqueda y filtros (por nombre, categoría y estado).
- Pedidos armados con un carrito; el total lo calcula el backend.
- Dashboard con ingresos, conteos, pedidos por estado y últimos pedidos.
- Sidebar y diseño responsive.
- Navegación entre secciones controlada por estado de Redux (sin react router).

## Secciones

1. Landing
2. Dashboard
3. Productos
4. Categorías
5. Pedidos
6. Acerca de

## Tecnologías

| Capa | Tecnología |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS |
| Estado global | Redux Toolkit, React Redux |
| Backend | Node.js, Express |
| Base de datos | MongoDB Atlas, Mongoose |

## Custom hooks

| Hook | Función |
| --- | --- |
| `useModal` | Abrir y cerrar modales, guardando el elemento en edición |
| `useForm` | Valores, validación, errores y envío de formularios |
| `useDebounce` | Retrasar la búsqueda mientras el usuario escribe |
| `useCart` | Carrito de productos de un pedido, con totales |
| `useFetch` | Cargar datos con estados de carga y error |

## Estructura del repositorio

```text
├── act1-vanilla/        Actividad 1 (catálogo en JavaScript puro)
├── backend/
│   └── src/
│       ├── config/      Conexión a MongoDB
│       ├── models/      Esquemas de Mongoose
│       ├── controllers/ Lógica de cada endpoint
│       ├── routes/      Rutas de la API
│       ├── seed.js      Datos de ejemplo
│       └── server.js
└── frontend/
    └── src/
        ├── components/  layout, ui, shared, products, orders, categories
        ├── constants/
        ├── hooks/       Los 5 custom hooks
        ├── sections/    Las secciones de la app
        ├── services/    Llamadas al backend
        ├── store/       Redux (store y slices)
        └── utils/
```

## Requisitos previos

- **Node.js** 18.11 o superior (recomendado 20 o más). Verifica con `node -v`.
- **npm**.
- **Git**.
- Una cuenta gratuita de **MongoDB Atlas**.
- Conexión a internet.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/luisfernandez270406-ux/Sephira-catalogo-interactivo.git
cd Sephira-catalogo-interactivo
```

### 2. Configurar MongoDB Atlas

1. Crea un clúster gratuito (M0) en MongoDB Atlas.
2. En **Database Access**, crea un usuario con contraseña (evita caracteres especiales como `@`, `:` o `/`).
3. En **Network Access**, agrega `0.0.0.0/0` para permitir la conexión desde cualquier IP (solo para desarrollo y pruebas).
4. En **Connect → Drivers**, copia la cadena de conexión (`mongodb+srv://...`), reemplaza `<password>` por tu contraseña y agrega el nombre de la base de datos antes del `?`, por ejemplo `.../sephira?retryWrites=true&w=majority`.

### 3. Backend

```bash
cd backend
npm install
```

Crea el archivo `backend/.env` (usa `backend/.env.example` como plantilla):

```env
PORT=4000
MONGODB_URI=tu_cadena_de_conexion_de_atlas
```

Carga los datos de ejemplo:

```bash
npm run seed
```


Inicia el servidor:

```bash
npm run dev
```

Debe mostrar `MongoDB Atlas conectado` y quedar escuchando en `http://localhost:4000`. Comprobación rápida: abre `http://localhost:4000/api/health`.

### 4. Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Abre la dirección que muestra Vite (normalmente `http://localhost:5173`).

Por defecto el frontend usa `http://localhost:4000/api`. Si cambias el puerto o la dirección del backend, crea `frontend/.env` con:

```env
VITE_API_URL=http://localhost:4000/api
```

### 5. Compilar para producción (opcional)

```bash
cd frontend
npm run build
```

## API REST

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/health` | Estado del servidor |
| GET, POST | `/api/categories` | Listar y crear categorías |
| PUT, DELETE | `/api/categories/:id` | Editar y eliminar (no se elimina si tiene productos) |
| GET, POST | `/api/products` | Listar y crear productos |
| PUT, DELETE | `/api/products/:id` | Editar y eliminar productos |
| GET, POST | `/api/orders` | Listar y crear pedidos (el total lo calcula el servidor) |
| PUT, DELETE | `/api/orders/:id` | Editar datos y estado, eliminar pedidos |
| GET | `/api/stats` | Métricas del dashboard |

## Limitaciones conocidas y mejoras futuras

- No hay autenticación: cualquier persona con acceso a la app puede entrar al panel.
- Crear un pedido no descuenta el stock de los productos.
- Tienda pública con catálogo y carrito para clientes