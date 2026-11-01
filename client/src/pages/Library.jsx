import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Library = () => {
    const [myGames, setMyGames] = useState([]);
    const navigate = useNavigate();
    const { cart } = useCart();

    // Obtenemos el ID del usuario guardado en el Login
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                // Llamamos a la nueva ruta del backend
                const res = await axios.get(`https://steamlite-s8j9.onrender.com/api/games/library/${userId}`);
                setMyGames(res.data);
            } catch (error) {
                console.error("Error cargando biblioteca", error);
            }
        };
        fetchLibrary();
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    };

    const handleRemoveGame = async (gameId) => {
        if (window.confirm("¿Seguro que quieres desinstalar este juego de tu biblioteca?")) {
            try {
                await axios.delete(`https://steamlite-s8j9.onrender.com/api/games/library/${userId}/${gameId}`);
                // Actualizamos la lista en pantalla
                setMyGames(myGames.filter(g => g._id !== gameId));
            } catch (error) {
                alert("Error al eliminar el juego");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#1b2838] text-white">
            {/* Barra de Navegación */}
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
                    <span onClick={() => navigate('/home')} className="cursor-pointer hover:text-blue-400">TIENDA</span>
                    <span className="cursor-pointer hover:text-blue-400 font-semibold text-white border-b-2 border-blue-500 pb-1">BIBLIOTECA</span>
                    <span className="cursor-pointer hover:text-blue-400">COMUNIDAD</span>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={handleLogout} className="text-gray-400 hover:text-white transition">
                        Cerrar Sesión
                    </button>
                    <button onClick={() => navigate('/cart')} className="bg-green-600 hover:bg-green-500 px-4 py-1 rounded font-bold">
                        Carrito ({cart.length})
                    </button>
                </div>
            </nav>

            {/* Contenido de la Biblioteca */}
            <div className="px-8 py-10 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Tu Biblioteca</h2>
                <p className="text-gray-400 mb-8">{myGames.length} juegos en tu colección</p>

                {myGames.length === 0 ? (
                    <div className="bg-[#2a475e] p-8 rounded-lg text-center">
                        <p className="text-lg mb-4">Aún no tienes juegos. ¡Ve a la tienda y compra uno!</p>
                        <button onClick={() => navigate('/home')} className="bg-[#0056b3] px-6 py-2 rounded font-bold hover:bg-blue-700">
                            Ir a la Tienda
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {myGames.map((game) => (
                            <div key={game._id} className="bg-[#2a475e] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200">
                                <img src={game.image} alt={game.title} className="w-full h-40 object-cover" />
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => navigate(`/play/${game.gameUrl}`)} 
                                        className="flex-1 bg-[#0056b3] hover:bg-blue-700 text-white font-bold py-2 rounded transition"
                                    >
                                        Jugar
                                    </button>
                                    <button
                                        onClick={() => handleRemoveGame(game._id)}
                                        className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-2 rounded transition"
                                        title="Desinstalar juego"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Library;