export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust path based on where your components and pages are
  ],
  theme: {
    extend: {
      colors: {
        primary: '#32CD32', // Green
        secondary: '#FF8000', // Orange
        accent: '#FFFDD0', // Cream (Accent)
        background: '#000000', // Black
        text: '#FFFFFF', // White
        button: '#4D4D4D', // Dark Gray
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },

  plugins: [],
};
