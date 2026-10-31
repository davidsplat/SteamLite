const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registrar usuario (POST)
router.post('/register', authController.register);

// Ruta para iniciar sesión (POST)
router.post('/login', authController.login);

module.exports = router;