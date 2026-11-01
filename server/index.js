const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Inicializar Express
const app = express();

// Middlewares
app.use(cors({
  origin: ['https://steam-lite-git-main-davidsplat.vercel.app', 'https://steam-lite-psi.vercel.app']
}));
app.use(express.json()); // Permite recibir datos en formato JSON

// Conectar a la Base de Datos
connectDB();

// Definir Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/games', require('./routes/gameRoutes'));

// Ruta de prueba principal
app.get('/', (req, res) => {
    res.send('API de SteamLite funcionando 🚀');
});

// Encender el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});