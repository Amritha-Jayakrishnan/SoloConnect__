/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a2f1f',
          light: '#234024',
          dark: '#0f1a12',
        },
        accent: {
          DEFAULT: '#4CAF50',
          light: '#81C784',
          dark: '#388E3C',
        },
      },
    },
  },
  plugins: [],
};