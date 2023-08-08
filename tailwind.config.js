/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        monitor: {
          100: "#96e4e1", //primary text
          200: "#5b785a", //sec text
          300: "#214940", // borders
          400: "#8eb473", //accent for borders?
        },
        display: {
          100: "#001E17",
        },
      },
      animation: {
        fadeGrowIn: "fadeGrowIn .25s ease-in-out forwards ",
      },

      // that is actual animation
      keyframes: (theme) => ({
        fadeGrowIn: {
          "0%": { opacity: 0, transform: "translateX(-30px)" },
          "100%": { opacity: 1, transform: "translateX(0px)" },
        },
      }),
    },
  },
  plugins: [],
};
