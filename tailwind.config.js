/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        crop: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(50px)" },
        },
      },
      animation: {
        crop: "crop 1s ease-in-out linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
