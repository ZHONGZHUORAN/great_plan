/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'notion': {
          'bg': '#FBFCF8',
          'bg-hover': '#F5F6F3',
          'bg-card': '#F7F8F4',
          'bg-card-hover': '#FAFAF8',
          'text': '#4A4A4A',
          'text-muted': '#838182',
          'text-gray': '#A0A0A0',
          'border': '#E4E4E6',
          'accent': '#93A4C1',
          'accent-hover': '#7A8EB8',
          'success': '#7BA67C',
          'warning': '#C9A86C',
          'danger': '#C47A7A',
        }
      },
      fontFamily: {
        'notion': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
