import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--color-bg-base)",
        elevated: "var(--color-bg-elevated)",
        panel: "var(--color-bg-panel)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        copper: {
          DEFAULT: "var(--color-accent-copper)",
          hover: "var(--color-accent-copper-hover)",
        },
        steel: "var(--color-accent-steel)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
        "border-subtle": "var(--color-border-subtle)",
        "border-accent": "var(--color-border-accent)",
      },
      fontFamily: {
        sans: ["var(--font-onest)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        button: "var(--radius-button)",
        card: "var(--radius-card)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      boxShadow: {
        panel: "var(--shadow-panel)",
        "glow-copper": "var(--glow-copper-soft)",
      },
    },
  },
  plugins: [],
};

export default config;
