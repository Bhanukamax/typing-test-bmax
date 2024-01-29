/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}' /* src folder, for example */,
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        main:{
          DEFAULT: 'bg-main'
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
