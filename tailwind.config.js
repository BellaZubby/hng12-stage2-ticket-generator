const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roadRage: ["Road Rage", "serif"],
        roboto: ["Roboto", "serif"],
        jeju: ["JejuMyeongjo", ...defaultTheme.fontFamily.sans],
        alatsi: ["Alatsi", "serif"],
      },
      colors: {
        "primary-50": "#041e23",
        "primary-100":"#0e464f",
        "primary-150":"#08252b",
        "primary-200":"#0e464f",
        "primary-250":"#07373f",
        "primary-300":"#fafafa",
        "primary-350":"#052228",
        "primary-400":"#12464e",
        "primary-450":"#197686",
        "primary-500":"#24a0b5",
        "primary-550":"#23a0b5",
        "border": "rgba(213, 234, 0, 0.1)",
        "nav-bg": "rgba(5, 37, 44, 0.4)",
        "custom-bg":"radial-gradient(circle at top left, #24a0b5 0%, #24a0b5 70%, #24a0b5 100%"
      },
    },
    screens: {
      xs: "480px",
      ssm:"600px",
      sm: "820px",
      bm: "1000px",
      md: "1060px",
    }
  },
  plugins: [],
}
