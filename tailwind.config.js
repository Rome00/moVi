module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      sans: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      barlow: ['Barlow Condensed', 'sans-serif'],
      raleway: ['Raleway', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          default: '#e73643',
          light: '#ec5e69',
          dark: '#b92b36',
        },
      },
      animation: {
        'spin-slow': 'spin 0.5s linear infinite reverse',
      },
      keyframes: {
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
