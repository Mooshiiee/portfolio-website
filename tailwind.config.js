/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './myapp/public/*.html'
  ],
  theme: {
    extend: {}, 
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
