# SÉPHIRA

SÉPHIRA es una aplicación web tipo SPA  desarrollada con JavaScript Vanilla. Su objetivo es presentar un catálogo de productos interactivo donde el usuario puede buscar productos, filtrarlos por categoría y agregarlos a un carrito de compras.

El proyecto fue desarrollado como una actividad académica para demostrar el uso de JavaScript moderno, manipulación dinámica del DOM, manejo de eventos y consumo de datos mediante una API.

## Objetivo

Desarrollar una aplicación web interactiva utilizando JavaScript puro, aplicando características de ECMAScript 6+, manipulación del DOM, manejo de eventos, funciones asíncronas y una estructura modular.

## Funcionalidades

- Visualización dinámica de productos.
- Búsqueda de productos.
- Filtrado por categoría.
- Carrito de compras.
- Agregar productos al carrito.
- Aumento automático de cantidad al agregar un producto repetido.
- Eliminación individual de productos del carrito.
- Vaciar completamente el carrito.
- Cálculo automático del total.
- Contador de productos del carrito.
- Panel lateral para visualizar el carrito.
- Animación de apertura y cierre del carrito.
- Diseño adaptable a diferentes tamaños de pantalla.
- Carga inicial de productos mediante una API.
- Interacción sin recargar la página.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- ECMAScript 6+
- Fetch API
- API REST
- Git y GitHub

## API utilizada

Los productos son obtenidos mediante la siguiente API:

https://fakestoreapi.noksha.dev/api/products

La información obtenida incluye datos como:

- Nombre del producto.
- Precio.
- Categoría.
- Descripción.
- Imagen.
- Marca.
- Stock.
- Calificación.

## Estructura del proyecto

```text
sephira/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── main.js
│   ├── api.js
│   ├── state.js
│   ├── ui.js
│   └── events.js
│
└── README.md
```
## Ejecución del proyecto

### Requisitos

Antes de ejecutar el proyecto se necesita:

- Un navegador web actualizado, como Google Chrome, Microsoft Edge, Mozilla Firefox u Opera.
- Visual Studio Code.
- Extensión Live Server para Visual Studio Code.
- Conexión a Internet para cargar los productos desde la API.

### Instalación

1. Descargar o clonar el repositorio de GitHub.

```bash
git clone https://github.com/luisfernandez270406-ux/Sephira-catalogo-interactivo
```
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Instalar la extensión Live Server en Visual Studio Code si todavía no está instalada
4. Hacer clic derecho sobre index.html y seleccionar: Open with Live Server
   
El proyecto se abrirá automáticamente en el navegador mediante una dirección local proporcionada por Live Server.
