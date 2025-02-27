/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: [
    './index.html', // Include the index.html file for Tailwind CSS processing
    './src/**/*.{js,ts,jsx,tsx}', // Include all JavaScript/TypeScript/React files in the src directory
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette for dark theme
        gray: {
          900: '#1a1a1a', // Background color
          800: '#2d2d2d', // Header/Footer background
          700: '#3f3f3f', // Sidebar/Navigation background
        },
        white: '#ffffff', // Text color
        primary: '#4f46e5', // Accent color for buttons/links
        secondary: '#22d3ee', // Secondary accent color
      },
    },
  },
  plugins: [],
};
