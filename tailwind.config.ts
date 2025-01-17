import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "rotate-full": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.3s ease-out',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          lg: "80px",
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Primary Color Palette
        "primary-900": "var(--primary-900)",
        "primary-800": "var(--primary-800)",
        "primary-700": "var(--primary-700)",
        "primary-600": "var(--primary-600)",
        "primary-500": "var(--primary-500)",
        "primary-400": "var(--primary-400)",
        "primary-300": "var(--primary-300)",
        "primary-200": "var(--primary-200)",
        "primary-100": "var(--primary-100)",
        "primary-50": "var(--primary-50)",

        // Neutral Color Palette
        "neutral-900": "var(--neutral-900)",
        "neutral-800": "var(--neutral-800)",
        "neutral-700": "var(--neutral-700)",
        "neutral-600": "var(--neutral-600)",
        "neutral-500": "var(--neutral-500)",
        "neutral-400": "var(--neutral-400)",
        "neutral-300": "var(--neutral-300)",
        "neutral-200": "var(--neutral-200)",
        "neutral-100": "var(--neutral-100)",

        // Additional Custom Colors
        black: "var(--black)",
        white: "var(--white)",
        "albert-success": "var(--albert-success)",
        "albert-error": "var(--albert-error)",
        "albert-warning": "var(--albert-warning)",
        "albert-noti": "var(--albert-noti)",

        // Secondary Color Palette
        "secondary-900": "var(--secondary-900)",
        "secondary-800": "var(--secondary-800)",
        "secondary-700": "var(--secondary-700)",
        "secondary-600": "var(--secondary-600)",
        "secondary-500": "var(--secondary-500)",
        "secondary-400": "var(--secondary-400)",
        "secondary-300": "var(--secondary-300)",
        "secondary-200": "var(--secondary-200)",
        "secondary-100": "var(--secondary-100)",
        "secondary-50": "var(--secondary-50)",

        // Custom Borders and Blues
        "primary-border-50": "var(--primary-border-50)",
        "custom-blue": "var(--custom-blue)",
      },
      screens: {
        sm: "640px", // Small devices (phones)
        md: "768px", // Medium devices (tablets)
        lg: "1024px", // Large devices (desktops)
        xl: "1280px", // Extra large devices (large desktops)
        "2xl": "1536px", // 2XL devices
      },
      fontSize: {
        10: "10px",
        12: "12px",
        14: "14px", // Primary text size
        16: "16px",
        18: "18px",
        20: "20px", // Content text
        24: "24px",  // Title text
        26: "26px",
        28: "28px",
        30: "30px",
      },
      borderRadius: {
        sm: "15px", // Custom rounded corners
      },
    },
  },
};

export default config;
