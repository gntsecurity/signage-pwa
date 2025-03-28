module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",  // Include app directory for Next.js 13+ apps
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a202c', // Custom primary color
        secondary: '#edf2f7', // Custom secondary color
        accent: '#38b2ac', // Custom accent color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom font family
      },
      screens: {
        'xs': '475px', // Adding custom breakpoint for extra small devices
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode via class, useful for toggling dark theme manually
};
