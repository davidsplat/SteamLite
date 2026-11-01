import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Cart = () => {
    const { cart, removeFromCart, total, clearCart } = useCart();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Obtenemos el ID del usuario logueado (guardado en el Login)
    const userId = localStorage.getItem('userId');

    // Función que se ejecuta cuando el pago es válido
    const processPayment = async () => {
        try {
            if (!userId) {
                alert("Error: No se encontró el ID de usuario. Vuelve a iniciar sesión.");
                return;
            }

            // Compramos cada juego del carrito uno por uno
            for (const game of cart) {
                await axios.post('https://steamlite-s8j9.onrender.com/api/games/buy', {
                    gameId: game._id,
                    userId: userId
                });
            }

            alert("¡Pago simulado con éxito! Los juegos se añadieron a tu biblioteca.");
            clearCart();
            navigate('/library'); // Lo mandamos a la biblioteca para que vea sus juegos
        } catch (error) {
            console.error(error);
            alert("Error al procesar la compra: " + (error.response?.data?.message || error.message));
        }
    };

    // Configuración de Formik y Yup
    const formik = useFormik({
        initialValues: { cardNumber: '', cardName: '', expiry: '', cvv: '' },
        validationSchema: Yup.object({
            cardNumber: Yup.string()
                .required('Requerido')
                .matches(/^[0-9]{16}$/, 'Debe tener 16 dígitos'),
            cardName: Yup.string().required('Requerido').min(3, 'Nombre muy corto'),
            expiry: Yup.string()
                .required('Requerido')
                .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Formato MM/AA'),
            cvv: Yup.string().required('Requerido').matches(/^[0-9]{3,4}$/, '3 o 4 dígitos'),
        }),
        onSubmit: async (values) => {
            // Si Yup valida todo bien, se ejecuta esto:
            await processPayment();
            setIsModalOpen(false);
        },
    });

    return (
        <div className="min-h-screen bg-[#1b2838] text-white p-8">
            <h1 className="text-3xl font-bold mb-8">Tu Carrito de Compras</h1>

            {cart.length === 0 ? (
                <div className="bg-[#2a475e] p-8 rounded-lg text-center">
                    <p className="text-lg mb-4">Tu carrito está vacío.</p>
                    <button onClick={() => navigate('/home')} className="bg-[#0056b3] px-6 py-2 rounded font-bold hover:bg-blue-700">
                        Ir a la Tienda
                    </button>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Lista de juegos */}
                    <div className="flex-grow flex flex-col gap-4">
                        {cart.map(game => (
                            <div key={game._id} className="bg-[#2a475e] p-4 rounded-lg flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <img src={game.image} alt={game.title} className="w-24 h-12 object-cover rounded" />
                                    <div>
                                        <h3 className="font-bold">{game.title}</h3>
                                        <p className="text-sm text-gray-300">${game.price}</p>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(game._id)} className="text-red-400 hover:text-red-300 text-sm font-semibold">
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Resumen de pago */}
                    <div className="w-full lg:w-1/3 bg-[#171a21] p-6 rounded-lg h-fit">
                        <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
                        <div className="flex justify-between mb-6 text-gray-300">
                            <span>Total estimado:</span>
                            <span className="font-bold text-white">${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded transition"
                        >
                            Simular Pago
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL DE PAGO (FORMULARIO) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-[#1b2838] p-8 rounded-lg w-full max-w-md border border-[#2a475e] shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-white text-center">Pago Seguro</h2>

                        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                            {/* Número de Tarjeta */}
                            <div>
                                <input name="cardNumber" placeholder="Número de Tarjeta (16 dígitos)"
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.cardNumber}
                                    className="w-full p-3 rounded bg-[#2a475e] text-white border border-transparent focus:border-blue-500 focus:outline-none" />
                                {formik.touched.cardNumber && formik.errors.cardNumber && <p className="text-red-400 text-xs mt-1">{formik.errors.cardNumber}</p>}
                            </div>

                            {/* Nombre en la tarjeta */}
                            <div>
                                <input name="cardName" placeholder="Nombre en la tarjeta"
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.cardName}
                                    className="w-full p-3 rounded bg-[#2a475e] text-white border border-transparent focus:border-blue-500 focus:outline-none" />
                                {formik.touched.cardName && formik.errors.cardName && <p className="text-red-400 text-xs mt-1">{formik.errors.cardName}</p>}
                            </div>

                            <div className="flex gap-4">
                                {/* Fecha Expiración */}
                                <div className="w-1/2">
                                    <input name="expiry" placeholder="MM/AA"
                                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.expiry}
                                        className="w-full p-3 rounded bg-[#2a475e] text-white border border-transparent focus:border-blue-500 focus:outline-none" />
                                    {formik.touched.expiry && formik.errors.expiry && <p className="text-red-400 text-xs mt-1">{formik.errors.expiry}</p>}
                                </div>
                                {/* CVV */}
                                <div className="w-1/2">
                                    <input name="cvv" placeholder="CVV" type="password"
                                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.cvv}
                                        className="w-full p-3 rounded bg-[#2a475e] text-white border border-transparent focus:border-blue-500 focus:outline-none" />
                                    {formik.touched.cvv && formik.errors.cvv && <p className="text-red-400 text-xs mt-1">{formik.errors.cvv}</p>}
                                </div>
                            </div>

                            <div className="flex gap-4 mt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="w-1/2 bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded transition">
                                    Cancelar
                                </button>
                                <button type="submit" className="w-1/2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded transition">
                                    Confirmar Pago
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;