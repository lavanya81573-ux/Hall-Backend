/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#fff9f5',
          100: '#ffede5',
          200: '#ffd6c4',
          300: '#ffb394',
          400: '#ff8a5d',
          500: '#f9652b',
          600: '#e6480e',
          700: '#bf3307',
          800: '#9b2a0b',
          900: '#7d260e',
        },
        purple: {
          50: '#fbf7ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
      },
    },
  },
  plugins: [],
}
