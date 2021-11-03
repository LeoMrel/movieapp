module.exports = {
  purge: ['./pages/**/*.html', './components/**/*.js', './pages/**/*.js',],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        blue: {
          dark: "#091353"
        }
      }
    },
  },
  variants: {
    extend: {
      margin: ['first', 'last'],
      display: ['group-hover'],
      backgroundColor: ['first', 'checked', 'active']
    }
  },
  plugins: [ require('tailwind-scrollbar')],
}
