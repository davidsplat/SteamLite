# 🎮 SteamLite

**SteamLite** es una plataforma web de distribución de videojuegos inspirada en la estética de Steam. Fue desarrollada como un proyecto Full-Stack para demostrar la integración de un Frontend moderno, un Backend robusto y una base de datos en la nube, ofreciendo una experiencia completa de compra y ejecución de mini-juegos directamente en el navegador.

![SteamLite Banner](https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop) <!-- Puedes cambiar esta imagen por una captura de tu proyecto -->

## ✨ Características principales

- **Autenticación de usuarios:** Sistema de Login y Registro con encriptación de contraseñas (Bcrypt) y manejo de sesiones con JSON Web Tokens (JWT).
- **Tienda dinámica:** Catálogo de juegos que se carga en tiempo real desde la base de datos, con buscador integrado.
- **Carrito de compras:** Gestión de productos seleccionados con cálculo de total.
- **Simulación de Pago Seguro:** Formulario de pago con validaciones estrictas utilizando **Formik** y **Yup** (validación de tarjeta, fecha y CVV).
- **Biblioteca personal:** Los usuarios pueden ver sus juegos comprados, jugarlos y desinstalarlos de su cuenta.
- **Mini-juegos integrados:** Reproducción de juegos en HTML5/JS dentro de un entorno controlado (iframe) directamente desde la plataforma.
- **Diseño oscuro y responsivo:** Interfaz de usuario construida con Tailwind CSS, respetando la paleta de colores clásica de Steam.

## 🕹️ Mini-Juegos Incluidos

La plataforma cuenta con un sistema dinámico que permite cargar diferentes juegos. Actualmente incluye:

1. **Phantom Blade:** Juego de reflejos y supervivencia contra reloj.
2. **Elden Ring (Pong):** Clásico juego de paletas con sistema de vidas estilo "Boss Fight".
3. **Hollow Knight:** Juego de plataformas y saltos.
4. **Space Shooter:** Juego de naves espaciales con jefes finales.
5. **Memory Match:** Juego de memoria con tutorial, ajustes de dificultad y niveles infinitos.
6. **Target Rush:** Juego de puntería y reflejos contra el tiempo.

## 🛠️ Tecnologías Utilizadas

**Frontend:**
- [React.js](https://reactjs.org/) (con Vite)
- [React Router](https://reactrouter.com/) para la navegación
- [Tailwind CSS](https://tailwindcss.com/) para los estilos
- [Axios](https://axios-http.com/) para las peticiones HTTP
- [Formik](https://formik.org/) y [Yup](https://github.com/jquense/yup) para la validación de formularios

**Backend:**
- [Node.js](https://nodejs.org/) y [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) (a través de Mongoose) como base de datos NoSQL
- [JSON Web Tokens (JWT)](https://jwt.io/) para la autenticación
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) para el hash de contraseñas

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para correr el proyecto en tu computadora:

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/SteamLite.git
cd SteamLite

## Configurar el Backend ##

cd server
npm install

## Crea un archivo .env en la carpeta server con las siguientes variables:

PORT=5000
MONGO_URI=tu_cadena_de_conexion_a_mongodb_atlas
JWT_SECRET=tu_secreto_super_seguro

## Ejecuta el servidor en modo desarrollo:

npm run dev

## Configurar el Frontend

cd client
npm install

## Inicia la aplicación de React:

npm run dev

## cuando se hace, cada cambio en la base de datos actualizar:

cd server
node seed.js


## 👨‍💻 Autor:
Desarrollado por: Victor David huayta Huaripoma


