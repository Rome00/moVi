module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
