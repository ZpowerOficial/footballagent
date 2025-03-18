// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#e6f0fd',
            100: '#b3d1fa',
            200: '#80b3f7',
            300: '#4d94f4',
            400: '#1a75f1',
            500: '#0a66c2',
            600: '#0852a3',
            700: '#063d7a',
            800: '#042952',
            900: '#021429',
          }
        },
        spacing: {
          '72': '18rem',
          '80': '20rem',
          '96': '24rem',
        },
        height: {
          'screen-90': '90vh',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }