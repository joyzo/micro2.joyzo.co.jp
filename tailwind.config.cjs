/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "4rem",
        md: "8rem",
        lg: "10rem",
        xl: "16rem",
        "2xl": "12rem",
      },
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    letterSpacing: {
      xs: "-.1em",
      sm: "-.05em",
      normal: "0",
      lg: ".05em",
      xl: ".05em",
      "2xl": ".15em",
      "3xl": ".2em",
      tight: "-0.5em",
    },
    extend: {
      colors: {
        main: "#001F3F", // より深い青
        secondary: "#003366",
        accent: "#E63946", // より強く独特な赤オレンジ
        dark: "#1A1A1A",
        light: "#F8F9FA",
      },
      borderRadius: {
        subtle: "0.25rem", // 4px
      },
      fontFamily: {
        // M PLUS 1pフォントに変更（元: Zen Kaku Gothic Antique）
        serif: ["M PLUS 1p", "Noto Sans JP", "sans-serif"],
        english: ["M PLUS 1p", "Noto Sans JP", "sans-serif"],
        sans: ["M PLUS 1p", "Noto Sans JP", "sans-serif"],
        // 元のZen Kaku Gothic Antique設定（戻し用）
        // serif: ["Zen Kaku Gothic Antique", "Noto Sans JP", "sans-serif"],
        // english: ["Zen Kaku Gothic Antique", "Noto Sans JP", "sans-serif"],
        // sans: ["Zen Kaku Gothic Antique", "Noto Sans JP", "sans-serif"],
        heading: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
