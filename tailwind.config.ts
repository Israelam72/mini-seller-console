/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      display: "var(--font-display)",
      body: "var(--font-body)",
      mono: "var(--font-mono)",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        system: {
          white: "hsl(var(--color-text-system-white))",
          border: "hsl(var(--color-border-system))",
          "light-blue": "hsl(var(--color-light-blue))",
          "dark-gray": "hsl(var(--color-dark-gray))",
          "text-light-gray": "hsl(var(--color-text-light-gray))",
          gray: "hsl(var(--color-gray))",
        },
        table: {
          critical: "hsl(var(--event-severity-critical))",
          "critical-background":
            "hsl(var(--event-severity-critical-background))",
          high: "hsl(var(--event-severity-high))",
          "high-background": "hsl(var(--event-severity-high-background))",
          moderate: "hsl(var(--event-severity-moderate))",
          "moderate-background":
            "hsl(var(--event-severity-moderate-background))",
          low: "hsl(var(--event-severity-low))",
          "low-background": "hsl(var(--event-severity-low-background))",
          information: "hsl(var(--event-severity-information))",
          "information-background":
            "hsl(var(--event-severity-information-background))",
          ok: "hsl(var(--event-severity-ok))",
          "ok-background": "hsl(var(--event-severity-ok-background))",
        },
      },
    },
  },
  }
