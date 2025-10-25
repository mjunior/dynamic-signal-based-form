/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1DB496',
          hover: '#21CAA8',
          light: '#DBF6F0',
          'most-light': '#F2FDFB',
        },
        'state-bg': '#F6F6F7',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

