/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scrapbook: {
          rose: '#FF4D80',
          'rose-light': '#FF85A2',
          'rose-deep': '#E02960',
          blush: '#FFE4E8',
          cream: '#FFFDF9',
          plum: '#2D1B2D',
          'plum-muted': '#6D556D',
          lavender: '#F3E8FF',
          mint: '#D1FAE5',
          yellow: '#FEF08A',
        },
      },
      fontFamily: {
        handwriting: ['Caveat', 'Patrick Hand', 'Dancing Script', 'cursive'],
        sans: ['Quicksand', 'Nunito', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'polaroid': '0 10px 25px -5px rgba(45, 27, 45, 0.08), 0 4px 10px -2px rgba(255, 77, 128, 0.06)',
        'polaroid-hover': '0 18px 32px -5px rgba(45, 27, 45, 0.14), 0 8px 16px -3px rgba(255, 77, 128, 0.14)',
        'scrapbook': '0 12px 32px -4px rgba(255, 77, 128, 0.12), 0 4px 16px -2px rgba(45, 27, 45, 0.06)',
        'glow': '0 0 20px rgba(255, 77, 128, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        'pulse-gentle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-gentle': 'pulse-gentle 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
