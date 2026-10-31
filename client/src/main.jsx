import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext' // <-- Importamos

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* <-- Envolvemos */}
      <App />
    </CartProvider>
  </React.StrictMode>,
)
