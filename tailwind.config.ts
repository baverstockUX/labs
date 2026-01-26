import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                heading: ["var(--font-fraunces)", "serif"],
            },
            colors: {
                background: "var(--color-background)",
                foreground: "var(--color-foreground)",
                "big-stone": "#101C36",
                tangerine: "#F39300",
                "coral-red": "#FF3C36",
                "electric-purple": "#9D00FF",
            },
        },
    },
    plugins: [],
};
export default config;
