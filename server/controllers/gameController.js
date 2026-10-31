const Game = require('../models/Game');
const User = require('../models/user');

// Obtener todos los juegos para la tienda
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener juegos', error: error.message });
    }
};

// Simular la compra de un juego
exports.buyGame = async (req, res) => {
    try {
        const { gameId, userId } = req.body;

        // 1. Buscar al usuario y el juego
        const user = await User.findById(userId);
        const game = await Game.findById(gameId);

        if (!user || !game) {
            return res.status(404).json({ message: 'Usuario o juego no encontrado' });
        }

        // 2. Verificar si ya tiene el juego
        if (user.library.includes(gameId)) {
            return res.status(400).json({ message: 'Ya tienes este juego en tu biblioteca' });
        }

        // 3. Simular pago exitoso y añadir a la biblioteca
        user.library.push(gameId);
        await user.save();

        res.json({ message: `¡Compra exitosa! ${game.title} se añadió a tu biblioteca.` });
    } catch (error) {
        res.status(500).json({ message: 'Error en la compra', error: error.message });
    }
};
// Obtener la biblioteca de un usuario específico
exports.getUserLibrary = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Buscamos al usuario y "poblamos" la biblioteca para traer los datos completos del juego
        const user = await User.findById(userId).populate('library');
        
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        
        res.json(user.library);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la biblioteca', error: error.message });
    }
};
// Eliminar un juego de la biblioteca del usuario
exports.removeGameFromLibrary = async (req, res) => {
    try {
        const { userId, gameId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Filtramos la biblioteca para quitar el juego
        user.library = user.library.filter(id => id.toString() !== gameId);
        await user.save();

        res.json({ message: 'Juego eliminado de la biblioteca' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar juego', error: error.message });
    }
};