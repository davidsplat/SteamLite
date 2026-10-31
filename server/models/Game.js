const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // URL de la imagen
    gameUrl: { type: String, required: true } // Aquí irá el enlace al mini-juego
});

module.exports = mongoose.model('Game', gameSchema);