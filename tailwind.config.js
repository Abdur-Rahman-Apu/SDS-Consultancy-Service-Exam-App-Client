/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        DidplayFair:"Playfair Display, serif",
        Roboto:"Roboto Condensed, sans-serif",
        IBM:"IBM Plex Sans, sans-serif"
      }
    },
  },
  plugins: [require("daisyui")],
};
