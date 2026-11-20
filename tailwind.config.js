/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        niyo: {
          primary: '#0A2540',
          dark: '#051329',
          accent: '#00D632',
          blue: '#0066FF',
          sky: '#38B6FF',
          purple: '#6C5CE7',
          card: '#111827',
          subtle: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
