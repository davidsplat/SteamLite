import { useParams, useNavigate } from 'react-router-dom';

const GamePlayer = () => {
  // Capturamos el nombre del juego desde la URL de React
  const { gameUrl } = useParams(); 
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Barra superior del reproductor */}
      <div className="bg-[#171a21] px-4 py-2 flex justify-between items-center text-white border-b border-gray-700">
        <h2 className="text-lg font-bold">SteamLite - Jugando</h2>
        <button 
          onClick={() => navigate('/library')} 
          className="bg-red-600 hover:bg-red-500 px-4 py-1 rounded text-sm font-bold transition"
        >
          Cerrar Juego
        </button>
      </div>

      {/* El iframe que carga el juego dinámicamente */}
      <div className="flex-grow flex items-center justify-center p-8 bg-black">
        <iframe 
          src={`/games/${gameUrl}.html`} 
          title="Mini Juego"
          className="w-full max-w-[800px] h-[700px] bg-[#1b2838] rounded-lg shadow-2xl border-2 border-[#2a475e]"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default GamePlayer;