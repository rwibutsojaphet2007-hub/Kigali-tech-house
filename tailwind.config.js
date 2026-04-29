/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#00A3DD', // Rwanda blue
          600: '#0088c2',
          700: '#006d9f',
        },
        secondary: {
          500: '#FADB14', // Rwanda yellow
          600: '#e6c40d',
        },
        accent: {
          500: '#26A541', // Rwanda green
          600: '#1f8a34',
        },
      },
    },
  },
  plugins: [],
}

