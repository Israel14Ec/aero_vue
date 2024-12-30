/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors') //dependencia para datapickerz

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./formkit.config.js",
    "./node_modules/vue-tailwind-datepicker/**/*.js" //Instalacion de tailwind para datapicker
  ],
  theme: {
    extend: {
      colors: {
        "vtd-primary": colors.green
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

