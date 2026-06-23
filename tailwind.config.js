/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#0A0A0A',
          deep: '#050505',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#FCF6BA',
          mid: '#BF953F',
          dark: '#B38728',
          dim: '#8B6914',
        },
        indigo: {
          deep: '#0A0A1F',
          glow: '#1a1a3e',
        },
        neon: {
          blue: '#00D4FF',
          magenta: '#FF00FF',
          crimson: '#DC143C',
        },
      },
      fontFamily: {
        catamaran: ['Catamaran', 'sans-serif'],
        arima: ['Arima', 'cursive'],
        kavivanar: ['Kavivanar', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        'noto-tamil': ['"Noto Sans Tamil"', 'sans-serif'],
        'mukta-malar': ['"Mukta Malar"', 'sans-serif'],
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'particle-drift': 'particle-drift 20s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'particle-drift': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(100px, -50px) rotate(90deg)' },
          '50%': { transform: 'translate(50px, -100px) rotate(180deg)' },
          '75%': { transform: 'translate(-50px, -50px) rotate(270deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FCF6BA, #BF953F)',
        'neon-glow': 'radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%)',
        'hero-radial': 'radial-gradient(ellipse at 50% 50%, rgba(10,10,31,0.8) 0%, rgba(5,5,5,1) 70%)',
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(212,175,55,0.3)',
        'gold-md': '0 0 30px rgba(212,175,55,0.4)',
        'gold-lg': '0 0 60px rgba(212,175,55,0.3)',
        'neon-blue': '0 0 20px rgba(0,212,255,0.4), 0 0 40px rgba(0,212,255,0.2)',
        'neon-magenta': '0 0 20px rgba(255,0,255,0.4), 0 0 40px rgba(255,0,255,0.2)',
      },
    },
  },
  plugins: [],
};
