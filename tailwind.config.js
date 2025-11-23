/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg1: "#081638",
        bg2: "#fff",
        bg3: "#282c34",
        bg4: "#0c2050",
        bg5: "#38e07bba",
        bg6: "#29C9FF",
        pBlue: "#1475e1",
        points: "#FED348"
      },
      animation: {
        fade: 'fadeIn .3s ease-in-out',
        slideInRight: 'slideInRight .4s ease-in-out',
        bounceIn: "bounceIn 0.5s ease-out forwards",
        bounceOut: "bounceOut 0.5s ease-in forwards",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)', opacity: 0 },
          to: { transform: 'translateX(0)', opacity: 1 },
        },
        bounceIn: {
          "0%": {
            transform: "scale(0.5)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "0.8",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        bounceOut: {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "0.8",
          },
          "100%": {
            transform: "scale(0.5)",
            opacity: "0",
          },
        },
      }
    },
  },
  plugins: [],
};
