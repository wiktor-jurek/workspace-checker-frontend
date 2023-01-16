module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "1200px",
    },
    extend: {
      colors: {
        "orange-dark": "#6D3C0B",
        brown: "#977546",
        "orange-light": "#FDBC62",
        "orange-vivid": "#E17B16",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
