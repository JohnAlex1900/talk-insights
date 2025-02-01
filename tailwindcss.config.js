/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B00", // Orange for buttons
        darkBlue: "#002B5B", // Dark blue for titles
        lightBlue: "#1D9BF0", // Light blue for subtitles
        textGray: "#B0B3B8", // Light grey for other texts
      },
    },
  },
  plugins: [],
};
