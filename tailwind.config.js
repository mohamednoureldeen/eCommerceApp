/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",

  ],
  theme: {
    extend: {
      animation: {
        float: "float 3s infinite",
      },
      float: {
      "0%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-10px)" },
      "100%": { transform: "translateY(0)" },
    },
    },
    container: {
      center: true,
    },
    
  },
  plugins: [
    require('flowbite/plugin'),

  ],
}

