/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F0F0F',
        slate: '#4A4A48',
        mist: '#E8E8E4',
        'near-white': '#F8F8F6',
        'nt-red': '#C8102E',
        'nt-purple': '#5B2D8E',
        'data-blue': '#1A4FAB',
        'data-teal': '#0E9E8E',
        'data-amber': '#D4820A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['80px', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '800' }],
        stat: ['64px', { lineHeight: '1', fontWeight: '800' }],
      },
      letterSpacing: {
        tight2: '-0.02em',
        tight1: '-0.01em',
        wide8: '0.08em',
      },
    },
  },
  plugins: [],
};
