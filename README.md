# Sistema de Inventario - Frontend y Microservicios

Este proyecto implementa una aplicación de gestión de inventarios compuesta por un frontend en Angular y dos microservicios en .NET Core.  
El sistema permite administrar productos, registrar transacciones de compra/venta y consultar el historial con filtros.

## Estructura del repositorio

inventario-microservicios/
frontend-prueba/            # Aplicación Angular
ProductosService/           # Microservicio .NET para productos
TransaccionesService/       # Microservicio .NET para transacciones
InventarioMicroservicios.sln
db/
    inventario.sql          # Script SQL para crear la base de datos

## Requerimientos

- Node.js 20.x o superior  
- Angular CLI 19.x  
- .NET SDK 8.0  
- MySQL 8.x (o MariaDB compatible)  

## Base de datos

El script SQL para inicializar la base se encuentra en `db/inventario.sql`.

Pasos:
1. Crear la base de datos en MySQL.
2. Ejecutar el script `inventario.sql`.
3. Configurar las cadenas de conexión en `appsettings.json` de cada microservicio.

## Microservicio de Productos

Ubicación: `ProductosService/`

### Configuración

Editar `appsettings.json` con la cadena de conexión a la base de datos:

"ConnectionStrings": {
  "DefaultConnection": "server=localhost;database=inventario;user=root;password=tu_password;"
}

### Ejecución

cd ProductosService  
dotnet restore  
dotnet run  

La API estará disponible en `http://localhost:5075/swagger`.

## Microservicio de Transacciones

Ubicación: `TransaccionesService/`

### Configuración

Editar `appsettings.json` con la cadena de conexión y la URL del microservicio de productos:

"ConnectionStrings": {
  "DefaultConnection": "server=localhost;database=inventario;user=root;password=tu_password;"
},
"Services": {
  "Productos": "http://localhost:5075/api/productos"
}

### Ejecución

cd TransaccionesService  
dotnet restore  
dotnet run  

La API estará disponible en `http://localhost:5063/swagger`.

## Frontend Angular

Ubicación: `frontend-prueba/`

### Instalación

cd frontend-prueba  
npm install  

### Ejecución

ng serve  

La aplicación se inicia en `http://localhost:4200/`.

En `frontend-prueba/src/environments/environment.ts` deben configurarse las URLs de los microservicios:

export const environment = {  
  production: false,  
  apiProductos: 'http://localhost:5075/api/productos',  
  apiTransacciones: 'http://localhost:5063/api/transacciones'  
};

## Módulos implementados

1. Gestión de Productos  
   - Crear, editar, listar y eliminar productos.  
   - Validaciones en formularios.  
   - Tabla con paginación.  

2. Gestión de Transacciones  
   - Registrar compras y ventas.  
   - Validación de stock disponible.  
   - Actualización automática del stock del producto.  

3. Historial y Búsquedas  
   - Listado de transacciones por producto.  
   - Filtros por fecha y tipo de transacción.  
   - Vista de historial enlazada desde cada producto.  

## Evidencias

### Lista de productos
![Lista de productos](./evidencias/productos-list.png)

### Formulario de productos
![Formulario de productos](./evidencias/productos-form.png)

### Lista de transacciones
![Lista de transacciones](./evidencias/transacciones-list.png)

### Formulario de transacciones
![Formulario de transacciones](./evidencias/transacciones-form.png)

### Historial de transacciones por producto
![Historial](./evidencias/historial.png)
