import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas:    "#FFFFFF",
        ink:       "#363636",
        brand:     "#D2D2D2",
        link:      "#06BC65",
        lime:      "#DBF505",
        "acc-red":    "#FF4106",
        "acc-pink-l": "#FFCAFB",
        "acc-pink":   "#FFBDF7",
        "acc-orange":  "#F05626",
        "acc-teal":    "#245767",
        border:    "#000000",
      },
      fontFamily: {
        display: [
          "Futura Now Headline",
          "Futura-Bold",
          "Futura",
          "Trebuchet MS",
          "Arial Black",
          "sans-serif",
        ],
        body:    ["Inter", "sans-serif"],
        input:   ["Arial", "sans-serif"],
      },
      letterSpacing: {
        "display-tight": "-0.05em",
        "display-md":    "-0.04em",
        "display-sm":    "-0.03em",
      },
      borderRadius: {
        card:   "16px",
        pill:   "9999px",
      },
    },
  },
  plugins: [],
} satisfies Config;
