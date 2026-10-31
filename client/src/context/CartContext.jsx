import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar un juego al carrito
  const addToCart = (game) => {
    // Evitamos que el mismo juego se agregue dos veces
    if (!cart.find(item => item._id === game._id)) {
      setCart([...cart, game]);
    }
  };

  // Eliminar un juego del carrito
  const removeFromCart = (gameId) => {
    setCart(cart.filter(item => item._id !== gameId));
  };

  // Vaciar el carrito después de comprar
  const clearCart = () => setCart([]);

  // Calcular el total a pagar
  const total = cart.reduce((acc, game) => acc + game.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito fácilmente
export const useCart = () => useContext(CartContext);