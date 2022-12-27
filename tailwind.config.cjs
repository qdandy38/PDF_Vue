/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        negative: "#D83A52",
        positive: "#0B8652",
        general: "#0073EA",
        primary: "#0B7D77",
        primaryHover: "#096561",
        secondary: "#CEE5E4",
        gray:{
          100: "#F5F6F8",
          200: "#E6E9EF",
          300: "#C5C7D0",
          400: "#676879",
          500: "#323338",
        }
      }
    },
    boxShadow: {
      box: "-2px 0px 5px 2px rgba(0,0,0,0.2)",
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
