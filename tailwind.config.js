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
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: 0, transform: "translateX(-30px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: 0, transform: "translateX(30px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out",
        fadeUp: "fadeUp 0.5s ease-out",
        slideInLeft: "slideInLeft 0.5s ease-out",
        slideInRight: "slideInRight 0.5s ease-out",
      },
    },
  },
  plugins: [],

}
