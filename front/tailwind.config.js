module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "dark-blue": "#0063C9",
        "normal-purple": "#536DFE",

        "light-white": "rgba(255,255,255,0.18)",
        "light-purple": "#536dfe",
        "light-blue": "#37cae6",
        "light-gray": "#F5F5F7",

        gray: "#f5f5f7",
        purple: "#9013fe",
        blue: "#349eff",
        red: "#ea5656",
        yellow: "#ffce31",
        green: "#019707",
      },
      spacing: {
        90: "90%",
      },
    },
  },
  plugins: [],
};
