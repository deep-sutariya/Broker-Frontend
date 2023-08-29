/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        offwhite:"#FFF9F0",
        dul:"#FFF6E9",
        common:"#F2DFCE",
        popup: "#DEC9B7",
        main:"#417156",
        blue: "#3C8CAC",
        brown: "#C28B7C",
      },
      fontFamily: {
        heading: ['REM', 'sans-serif'],
        basic: ['Nunito', 'sans-serif'],
        rare: ['Lobster', 'cursive'],
      },
    },
  },
  plugins: [],
}
