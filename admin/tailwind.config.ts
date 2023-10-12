import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: "0.75rem" /* 12px */,
      sm: "0.875rem" /* 14px */,
      base: "1rem" /* 16px */,
      md: "1.125rem" /* 18px */,
      lg: "1.25rem" /* 20px */,
      xl: "1.5rem" /* 24px */,
      "2xl": "2rem" /* 32px */,
      "3xl": "2.75rem" /* 44px */,
      "4xl": "5.25rem" /* 84px */,
      title: "3.5rem" /* 56px */,
      "9xl": "6.75rem" /* 108px */,
    },
    colors: {
      "white-dis": "#F8FCFF",
      "dark-blue": "#04268B",
      "light-blue": "#1B37AA",
      "mid-blue": "#3EC9FF",
      "black-dis": "#0B122F",
      "light-green": "#4BE0AA",
      "mid-green": "#00CC73",
      "light-grey": "#F8FCFFC2",
      "mid-grey": "#92999C",
      "modal-overlay": "rgba(0, 0, 0, 0.25)",
      "pros-bg": "rgba(248, 252, 255, 0.76)",
    },
    extend: {
      dropShadow: {
        pros: "0px 4px 24px 0px rgba(0, 0, 0, 0.10)",
        banner: "0px 0px 2px #FFFFFF",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-linear-center-blue":
          "linear-gradient(115deg, #04248b 0%, #121c37 48%, #264cc7 100%)",
        "gradient-linear-blue":
          "linear-gradient(109deg, #121C37 0%, #0D225E 8%, #04248B 16%, #264CC7 100%)",
        "footer-gradient-linear-blue":
          "linear-gradient(134deg, #121C37 0%, #04248B 55.98%, #264CC7 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
