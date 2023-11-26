/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./html/**/*.html"
   ],
   theme: {
      extend: {
         keyframes: {
            wiggle: {
               "0%, 100%": {transform: "rotate(-3deg)"},
               "50%": {transform: "rotate(3deg)"},
            },
         },
         animation: {
            wiggle: 'wiggle 1s ease-in-out infinite',
            commute: "commute 5s ease-in-out infinite",
         }
      },
      screens: {
         'sm': { 'max': '500px'},
      }
   },
   plugins: [],
}

