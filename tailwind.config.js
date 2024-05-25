/** @type {import('tailwindcss').Config} */
/* eslint-env node */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css,scss,sass,less,styl}",
    "./src/global.scss"
  ],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        "montserrat-b": ["Montserrat-Bold", "sans-serif"],
        "montserrat-s": ["Montserrat-SemiBold", "sans-serif"],
        "montserrat-r": ["Montserrat-Regular", "sans-serif"],
        "montserrat-l": ["Montserrat-Light", "sans-serif"],
        "montserrat-t": ["Montserrat-Thin", "sans-serif"]
      },
      screens: {
        "xs": "375px",
        "sm": "576px",
        "md": "768px",
        "lg": "992px",
        "xl": "1200px",
        "2xl": "1440px",
        "3xl": "1680px",
        "4xl": "1920px"
      }
    }
  },
  plugins: []
};
