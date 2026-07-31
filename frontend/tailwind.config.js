/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        // Mapping brand colors to a minimal, pure black/white scale
        brand: {
          50: '#F7F7F8', // very light gray for cards
          100: '#f3f4f6', // gray-100 for borders
          200: '#e5e7eb', // gray-200
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280', // gray-500 secondary text
          600: '#4b5563', // gray-600 secondary text
          700: '#374151',
          800: '#1f2937',
          900: '#171717', // near-black primary text
          accent: '#111111', // solid black for primary actions
        },
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.04)',
        'premium': '0 12px 40px -12px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
