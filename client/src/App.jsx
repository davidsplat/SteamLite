import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Home from './pages/Home'; // Lo crearemos en un segundo
import Library from './pages/Library';
import GamePlayer from './pages/GamePlayer';

function App() {
  // Verificamos si el usuario ya inició sesión (tiene token)
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        {/* Si ya está logueado, lo mandamos al Home, si no, al Login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/library" element={<Library />} />
        <Route path="/play/:gameUrl" element={<GamePlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
