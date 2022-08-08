module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-white": "rgba(255,255,255,0.18)",
        "dark-purple": "#081A51",
        "dark-blue": "#0063C9",
        "light-blue": "#37CAE6",
        "light-gray": "#F5F5F7",
      },
    },
  },
  plugins: [],
};
