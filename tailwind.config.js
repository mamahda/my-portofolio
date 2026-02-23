/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Blue 600
        secondary: '#1e293b', // Slate 800
      }
    },
  },
  plugins: [],
}
