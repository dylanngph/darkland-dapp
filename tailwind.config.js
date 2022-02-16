const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ['./src/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    boxShadow: {
      DEFAULT: '0 10px 15px -3px rgb(255 255 255 / 3%), 0 4px 6px -2px rgb(255 255 255 / 1%)',
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'black': '#0f0f0f',
      'gray': '#2a2a2a'
    }),
    textColor: theme => ({
      ...theme('colors'),
      'gray': '#acacac'
    })
  },
  variants: {},
  plugins: [],
}