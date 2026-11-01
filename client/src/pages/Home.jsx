import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();
    const { addToCart, cart } = useCart();
    const [searchTerm, setSearchTerm] = useState('');

    // Traemos los juegos de nuestro backend
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await axios.get('https://steamlite-s8j9.onrender.com/api/games');
                setGames(res.data);
            } catch (error) {
                console.error("Error cargando juegos", error);
            }
        };
        fetchGames();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Filtramos los juegos. Si el searchTerm está vacío, mostramos todos.
    const filteredGames = games.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#1b2838] text-white">

            {/* 1. Barra de Navegación (Idéntica a tu captura 1) */}
            <nav className="bg-[#171a21] px-8 py-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-6">
                    <div onClick={() => navigate('/home')} className="flex items-center gap-2 cursor-pointer group">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 group-hover:scale-110 transition-transform">
                            <circle cx="12" cy="12" r="10" fill="#00A4FF" />
                            <path d="M13.5 4L6.5 13.5H11V20L18 10.5H13.5V4Z" fill="#FFFFFF" />
                            <ellipse cx="12" cy="12" rx="11.5" ry="4.5" transform="rotate(-20 12 12)" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
                        </svg>
                        <span className="text-2xl font-bold text-white tracking-wider">SteamLite</span>
                    </div>
                    <span className="cursor-pointer hover:text-blue-400 font-semibold">TIENDA</span>
                    <span onClick={() => navigate('/library')} className="cursor-pointer hover:text-blue-400">BIBLIOTECA</span>
                    <span className="cursor-pointer hover:text-blue-400">COMUNIDAD</span>
                </div>

                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Buscar en la tienda..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-[#316282] text-white px-3 py-1 rounded text-sm w-64 focus:outline-none placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
                    />
                    <button onClick={handleLogout} className="text-gray-400 hover:text-white transition">
                        Cerrar Sesión
                    </button>
                    <button onClick={() => navigate('/cart')} className="bg-green-600 hover:bg-green-500 px-4 py-1 rounded font-bold">
                        Carrito ({cart.length})
                    </button>
                </div>
            </nav>

            {/* 2. Banner Principal (Hero) */}
            <div className="relative w-full h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b2838] to-transparent"></div>
                <div className="absolute bottom-10 left-10 z-10">
                    <h2 className="text-5xl font-bold mb-2">PHANTOM BLADE Ø</h2>
                    <p className="text-lg text-gray-300 mb-4">Ya disponible</p>
                </div>
            </div>

            {/* 3. Catálogo de Juegos (Destacados) */}
            <div className="px-8 py-6 max-w-7xl mx-auto">
                <h3 className="text-xl font-semibold mb-6 text-gray-200">Destacados y recomendados</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGames.map((game) => (
                        <div key={game._id} className="bg-[#2a475e] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 shadow-lg">
                            <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h4 className="text-lg font-bold mb-1">{game.title}</h4>
                                <p className="text-sm text-gray-300 mb-4 line-clamp-2">{game.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="bg-[#4c6b22] text-white px-3 py-1 rounded text-sm font-bold">
                                        ${game.price}
                                    </span>

                                    {/* BOTÓN CORREGIDO */}
                                    <button
                                        onClick={() => addToCart(game)}
                                        className={`px-4 py-2 rounded font-semibold text-sm transition ${cart.find(item => item._id === game._id)
                                            ? 'bg-green-600 cursor-default'
                                            : 'bg-[#0056b3] hover:bg-blue-700'
                                            }`}
                                    >
                                        {cart.find(item => item._id === game._id) ? 'En el carrito ✓' : 'Añadir al carrito'}
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;