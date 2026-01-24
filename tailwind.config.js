/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e8a803",
        secondary: "#f59e0b", 
        accent: "#fbbf24",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#e8a803",
          secondary: "#f59e0b",
          accent: "#fbbf24",
          neutral: "#f3f4f6",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#f3f4f6",
          info: "#0ea5e9",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
        dark: {
          primary: "#e8a803",
          secondary: "#f59e0b",
          accent: "#fbbf24",
          neutral: "#1f2937",
          "base-100": "#111827",
          "base-200": "#1f2937",
          "base-300": "#374151",
          info: "#0ea5e9",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
  },
}
