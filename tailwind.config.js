/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    'app/**/*.{tsx,jsx,ts,js}',
    'components/**/*.{tsx,jsx,ts,js}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F4FF',
          100: '#D9E2FF',
          200: '#A6BFFF',
          300: '#739CFF',
          400: '#407AFF',
          500: '#0D57FF',
          600: '#0045CC',
          700: '#003399',
          800: '#002266',
          900: '#001133',
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        extrablack: '950',
      },
      fontSize: {
        '2xs': '10px',
      },
      boxShadow: {
        'soft-1': '0px 0px 10px rgba(38, 38, 38, 0.1)',
        'soft-2': '0px 0px 20px rgba(38, 38, 38, 0.2)',
      },
    },
  },
  plugins: [],
}
