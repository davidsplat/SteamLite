import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://steamlite-s8j9.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);
      alert('¡Bienvenido a SteamLite!');
      navigate('/home');
    } catch (error) {
      alert(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      
      {/* LADO IZQUIERDO: Formulario (Ahora centrado vertical y horizontalmente) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-12 lg:px-24 xl:px-32 bg-white z-10 shadow-[5px_0_15px_rgba(0,0,0,0.1)]">
        <div className="w-full max-w-md mx-auto">
          
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Login</h1>
          <p className="text-sm text-gray-500 mb-8">
            ¿No tienes una cuenta? <span className="text-steam-blue cursor-pointer font-semibold hover:underline">crear ahora</span>
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="text-sm font-semibold text-gray-700">Correo Electronico</label>
              <input 
                type="email" 
                placeholder="david@valve.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-steam-blue focus:ring-2 focus:ring-blue-100 transition"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">contraseña</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-steam-blue focus:ring-2 focus:ring-blue-100 transition"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#0056b3] text-white font-bold py-3 rounded-lg mt-2 hover:bg-blue-800 hover:shadow-[0_0_15px_rgba(0,86,179,0.4)] transition-all duration-300"
            >
              Entrar
            </button>
          </form>

          {/* Divisor "OR" */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-xs text-gray-400 uppercase font-semibold">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Botones de Google y Facebook */}
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-3 w-full border border-gray-300 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
            <button className="flex items-center justify-center gap-3 w-full border border-gray-300 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
              Continue with Facebook
            </button>
          </div>

        </div>
      </div>

      {/* LADO DERECHO: Imagen Completa */}
      <div className="hidden md:block w-1/2 relative bg-[#0f172a]">
        {/* Usamos bg-cover y bg-center para que la imagen llene el espacio sin deformarse */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/login-bg.jpg')" }}
        ></div>
        {/* Un pequeño degradado oscuro a la izquierda para que la transición con el formulario sea suave */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
      </div>

    </div>
  );
};

export default Login;