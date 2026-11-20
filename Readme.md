# SÉPHIRA: tienda y panel de administración

Es una aplicación web de tienda con dos caras: una **parte pública** donde cualquier persona ve el catálogo, arma un carrito y realiza pedidos, y una **parte privada** donde solo el administrador gestiona productos, categorías y pedidos y consulta métricas. Desarrollada con React, Tailwind CSS, Redux Toolkit, React Router y un backend propio en Node/Express con MongoDB Atlas.

SÉPHIRA comenzó como un catálogo interactivo en JavaScript puro y fue evolucionando a un panel de administración con estado global y incorpora navegación con rutas reales, autenticación y acceso protegido.

## Funcionalidades

**Parte pública**
- Landing, catálogo de productos con búsqueda y filtro por categoría.
- Carrito global que se conserva al recargar la página.
- Compra que crea un pedido en la base de datos.
- Registro e inicio de sesión de clientes.

**Parte privada (solo administrador)**
- Dashboard con ingresos, conteos, pedidos por estado y últimos pedidos.
- CRUD completo de productos, categorías y pedidos, con formularios validados y tablas con búsqueda y filtros.
- Cambio de estado de los pedidos desde la tabla.

**Navegación y seguridad**
- SPA con React Router: cada sección tiene su propia URL y se navega sin recargar la página.
- Rutas protegidas por sesión y por rol, con redirección al login.
- Página 404 para direcciones inexistentes.
- Contraseñas cifradas, autenticación con token JWT y rutas del backend protegidas.

## Mapa de rutas del frontend

| Ruta | Acceso | Descripción |
| --- | --- | --- |
| `/` | Público | Landing |
| `/tienda` | Público | Catálogo de productos |
| `/carrito` | Público | Carrito y confirmación del pedido |
| `/login` | Público | Inicio de sesión |
| `/registro` | Público | Registro de clientes |
| `/admin` | Administrador | Dashboard |
| `/admin/productos` | Administrador | Gestión de productos |
| `/admin/categorias` | Administrador | Gestión de categorías |
| `/admin/pedidos` | Administrador | Gestión de pedidos |
| `/admin/acerca` | Administrador | Información del proyecto |
| `*` | Público | Página 404 |

## Tecnologías

| Capa | Tecnología |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, React Router |
| Estado global | Redux Toolkit, React Redux |
| Backend | Node.js, Express |
| Base de datos | MongoDB Atlas, Mongoose |
| Seguridad | JSON Web Tokens (jsonwebtoken), bcryptjs |

## Custom hooks

| Hook | Función |
| --- | --- |
| `useModal` | Abrir y cerrar modales, guardando el elemento en edición |
| `useForm` | Valores, validación, errores y envío de formularios |
| `useDebounce` | Retrasar la búsqueda mientras el usuario escribe |
| `useCart` | Carrito de productos del formulario de pedidos del panel |
| `useFetch` | Cargar datos con estados de carga y error |

## Estructura del repositorio

```text
├── act1-vanilla/          Actividad 1 (catálogo en JavaScript puro)
├── backend/
│   └── src/
│       ├── config/        Conexión a MongoDB
│       ├── models/        Esquemas de Mongoose (User, Category, Product, Order)
│       ├── controllers/   Lógica de cada endpoint
│       ├── middleware/    Autenticación y permisos (protect, adminOnly)
│       ├── routes/        Rutas de la API
│       ├── seed.js        Datos de ejemplo y usuario administrador
│       └── server.js
└── frontend/
    └── src/
        ├── components/    layout, ui, shared, store, products, orders, categories
        ├── constants/
        ├── hooks/         Los 5 custom hooks
        ├── pages/         Landing, tienda, carrito, login, registro y 404
        ├── sections/      Secciones del panel de administración
        ├── services/      Llamadas al backend
        ├── store/         Redux (store y slices)
        └── utils/
```

## Requisitos previos

- **Node.js** 18.11 o superior.
- **npm** .
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
3. En **Network Access**, agrega tu ip 
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
JWT_SECRET=una_clave_secreta_cualquiera
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@sephira.com
ADMIN_PASSWORD=Admin1234
```

Carga los datos de ejemplo y crea el usuario administrador:

```bash
npm run seed
```

> **Atención:** `npm run seed` borra todos los productos y categorías existentes antes de insertar los de ejemplo, y necesita conexión a internet. No borra usuarios ni pedidos. El administrador solo se crea si no existe.

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

Abre la dirección que muestra Vite

### 5. Usuarios de prueba

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Administrador | `admin@sephira.com` | `Admin1234` |
| Cliente | Se crea desde `/registro` | La que elijas |

Son los valores por defecto del seed (se cambian con `ADMIN_EMAIL` y `ADMIN_PASSWORD` en el `.env`). El administrador accede al panel en `/admin`; un cliente no puede entrar al panel aunque escriba la dirección a mano.

## API REST

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| GET | `/api/health` | Público | Estado del servidor |
| POST | `/api/auth/register` | Público | Registrar un cliente |
| POST | `/api/auth/login` | Público | Iniciar sesión y recibir el token |
| GET | `/api/auth/me` | Autenticado | Datos del usuario de la sesión |
| GET | `/api/categories` | Público | Listar categorías |
| POST, PUT, DELETE | `/api/categories` y `/api/categories/:id` | Administrador | Crear, editar y eliminar (no se elimina si tiene productos) |
| GET | `/api/products` | Público | Listar productos |
| POST, PUT, DELETE | `/api/products` y `/api/products/:id` | Administrador | Crear, editar y eliminar productos |
| POST | `/api/orders` | Público | Crear un pedido (el total lo calcula el servidor) |
| GET, PUT, DELETE | `/api/orders` y `/api/orders/:id` | Administrador | Listar, editar datos y estado, eliminar pedidos |
| GET | `/api/stats` | Administrador | Métricas del dashboard |

Las rutas protegidas esperan el encabezado `Authorization: Bearer <token>`. Sin token responden `401`; con un token de un usuario sin permisos, `403`.

## Seguridad

- Las contraseñas se guardan cifradas con bcrypt y nunca se devuelven en las respuestas.
- Al registrarse, todo usuario es cliente: el rol no se acepta desde el formulario.
- El token JWT firmado con `JWT_SECRET` identifica la sesión y se envía en cada petición.
- El acceso se restringe en dos niveles: en el frontend con rutas protegidas (`ProtectedRoute`), y en el backend con middleware de autenticación y de rol, que es la protección real.
- El archivo `.env` no se sube al repositorio.

## Repositorio

https://github.com/luisfernandez270406-ux/Sephira-catalogo-interactivo

## Video demostrativo

