const mongoose = require('mongoose');
require('dotenv').config();
const Game = require('./models/Game');

const games = [
    {
        title: "Phantom Blade Zero",
        description: "Un juego de acción y hack & slash con un estilo visual impresionante.",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop", // Imagen de un samurái/espada
        gameUrl: "snake"
    },
    {
        title: "Elden Ring",
        description: "Levántate, Tarnished, y conviértete en el Señor Elden.",
        price: 49.99,
        image: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png", // Esta sí funciona
        gameUrl: "pong"
    },
    {
        title: "Target Rush",
        description: "Pon a prueba tus reflejos y puntería destruyendo objetivos antes de que se acabe el tiempo.",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
        gameUrl: "target" // <-- Nombre del archivo sin .html
    },
    {
        title: "Space Shooter",
        description: "Defiende la galaxia de una lluvia de asteroides en esta nave espacial.",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2070&auto=format&fit=crop",
        gameUrl: "space" // <-- Nombre exacto del archivo sin .html
    },
    {
        title: "Memory Match",
        description: "Pon a prueba tu memoria encontrando todas las parejas de cartas.",
        price: 4.99,
        image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=2070&auto=format&fit=crop",
        gameUrl: "memory"
    },
    {
        title: "Clicker Tycoon",
        description: "Genera energía haciendo clic y compra mejoras automáticas. ¡Adictivo!",
        price: 7.99,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        gameUrl: "clicker"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Game.deleteMany({}); // Limpia la colección antes de insertar
        await Game.insertMany(games);
        console.log("✅ Base de datos sembrada con juegos de prueba");
        process.exit();
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

seedDB();