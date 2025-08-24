/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Noto Sans", "sans-serif"],
      },
      textColor: {
        "customized": "#000",
      },
      screens: {
        "3xl": "1920px",  // Full HD (1080p) and above
        "4xl": "2560px",  // 2K / WQHD screens
        "5xl": "3840px",  // 4K UHD
        "6xl": "7680px",  // 8K UHD
      },
    },
  },
  plugins: [],
}
