/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'steam-blue': '#0056b3', // El azul de tu botón
        'steam-bg': '#f4f7f6',   // El fondo clarito
      }
    },
  },
  plugins: [],
}