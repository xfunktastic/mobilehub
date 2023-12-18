# Mobile Hub

Este proyecto consiste en la creación de una aplicación móvil para la asignatura de Introducción al desarrollo WEB/Movil la cual permite   y consumiendola con Ionic, utilizando Laravel para el backend y Ionic para el frontend. Es una aplicación Móvil que consume una API.

## Requisitos Previos

 - Instala [Composer](https://getcomposer.org/download/).
 - Instala [PHP](https://www.php.net/manual/es/install.php).
 - Instala [Node.js](https://nodejs.org/en).
 - Instala [Angular CLI](https://angular.io/guide/setup-local).
 - Instala [Ionic CLI](https://ionicframework.com/docs/intro/cli).
 - Instala [XAMPP](https://www.apachefriends.org/es/download.html).
 - Instala [Postman](https://www.postman.com/downloads/).

## Frameworks y lenguajes utilizados

- Backend: Laravel 10.10
- Frontend: Angular 16.2.8/Ionic 7.1.5
- Base de datos: XAMPP

## Configuración de la base de datos (XAMPP)

1. Inicia XAMPP y asegúrate de que Apache y MySQL estén en ejecución.

2. Abre phpMyAdmin [http://localhost/phpmyadmin](http://localhost/phpmyadmin).

3. Crea una nueva base de datos y configura la información en el archivo `.env` del backend.

## Configuración del Backend (Laravel)

1. Clona el repositorio: `git clone https://github.com/xfunktastic/mobilehub.git`.

2. Abre el proyecto en tu editor de código.

3. Navega al directorio del backend: `cd backend`.
    
4. Instala las dependencias de Composer: `composer install`.
    
5. Copia el archivo de configuración: `cp .env.example .env`.
    
6. Genera la clave de la aplicación: `php artisan key:generate`.

7. Genera la clave secreta de JWT: `php artisan jwt:secret`.
    
8. Configura la base de datos en el archivo con tus datos `.env`.
    
9. Ejecuta las migraciones y los seeders: 
`php artisan migrate`.

10. Agrega esta línea de codigo en: `backend\vendor\autoload.php`
`require_once __DIR__ . '/../app/helpers/MyHelper.php';`.

11. Inicia el servidor: `php artisan serve`.

- El backend será ejecutado en [http://localhost:8000](http://localhost:8000).

## Configuración del Frontend (Ionic)

1. Navega al directorio del frontend: `cd frontend`.

2. Instalar Ionic: `npm install -g @ionic/cli`.

3. Instala las dependencias de Node: `npm install`.

4. Inicia la aplicación Ionic: `ng serve -o`.

El frontend estará disponible en [http://localhost:4200/home](http://localhost:4200/home).

## Autor

- [@funktastic](https://www.github.com/xfunktastic)


