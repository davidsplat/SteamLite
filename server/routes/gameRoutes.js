const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Ruta para ver el catálogo
router.get('/', gameController.getAllGames);

// Ruta para simular la compra
router.post('/buy', gameController.buyGame);
router.get('/library/:userId', gameController.getUserLibrary);
router.delete('/library/:userId/:gameId', gameController.removeGameFromLibrary);

module.exports = router;