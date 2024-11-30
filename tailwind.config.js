/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        "sans": ["Noto Sans", "sans-serif"],
      },
      backgroundImage:{
        "bgImg": "url('./src/assets/bgimg.jpg')"
      }
    },
  },
  plugins: [],
}