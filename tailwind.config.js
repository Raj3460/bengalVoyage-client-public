// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // তোমার পছন্দ মতো থিম রাখো
  },
};
