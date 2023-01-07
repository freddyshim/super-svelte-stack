/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'google-white': '#fff',
        'google-white-hover': '#eee',
      },
      backgroundImage: {
        google: "url('/google.svg')",
        'google-hover': "url('/google_hover.svg')",
      },
    },
  },
  plugins: [],
}
