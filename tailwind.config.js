/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
      },
      colors: {
        cyan: {
          DEFAULT: '#00C2CB',
          50: '#e6fafb',
          100: '#ccf5f7',
          200: '#99ebef',
          300: '#66e1e7',
          400: '#33d7df',
          500: '#00C2CB',
          600: '#009ba2',
          700: '#007479',
          800: '#004e51',
          900: '#002728',
        },
        teal: {
          DEFAULT: '#008080',
          500: '#008080',
        },
      },
    },
  },
  plugins: [],
};
