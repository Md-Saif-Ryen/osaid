import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "20vh": "20vh",
        "30vh": "30vh",
        "50vh": "50vh",
        "100vh": "100vh",
      },
      fontFamily: {
        staatliches: ["Staatliches", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
