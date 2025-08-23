// tailwind.config.js
const daisyui = require("daisyui");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",         // default
      "dark",          // dark mode
      "cupcake",       // pastel
      "dracula",       // dark purple
      // Add more themes as you like from DaisyUI's list
    ]
  }
}
