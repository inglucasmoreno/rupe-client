// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#E03584',
        'secondary': '#005780',
        // 'background': '#ECECEC'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

