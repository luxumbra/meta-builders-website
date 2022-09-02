const defaultTheme = require("tailwindcss/defaultTheme");
const defaultConfig = require('tailwindcss/defaultConfig')
const formsPlugin = require('@tailwindcss/forms')
const typographyPlugin = require('@tailwindcss/typography')
const daisyUIPlugin = require('daisyui')
const fluidTypePlugin = require('tailwindcss-fluid-type')

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        dark: '#242f3e',
        darkish: '#17263c',
        background: '#17263c',
        white: '#ffffff',
        black: '#000000',
        glass: {
          primary: {
            50: "#f8fafc99",
            100: "#f1f5f999",
            200: "#e2e8f099",
            300: "#cbd5e199",
            400: "#94a3b899",
            500: "#64748b99",
            600: "#47556999",
            700: "#33415599",
            800: "#1e293b99",
            900: "#0f172a99"
          },
          secondary: {
            50: "#f5f3ff85",
            100: "#ede9fe85",
            200: "#ddd6fe85",
            300: "#c4b5fd85",
            400: "#a78bfa85",
            500: "#8b5cf685",
            600: "#7c3aed85",
            700: "#6d28d985",
            800: "#5b21b685",
            900: "#4c1d9585"
          },
          light: '#85A0D685',
        },
        cyan: {
          50: "#E5F7FF",
          100: "#B8E8FF",
          200: "#8ADAFF",
          300: "#5CCBFF",
          400: "#2EBDFF",
          500: "#00AEFF",
          600: "#008BCC",
          700: "#006999",
          800: "#004666",
          900: "#002333"
        },
        blue: {
          50: "#ECF0F9",
          100: "#C9D5ED",
          200: "#A7BBE2",
          300: "#85A0D6",
          400: "#6285CB",
          500: "#406ABF",
          600: "#335599",
          700: "#264073",
          800: "#192A4D",
          900: "#0D1526"
        },
        green: {
          50: "#EBFAEA",
          100: "#C7F1C5",
          200: "#A4E8A0",
          300: "#80E07B",
          400: "#5CD756",
          500: "#39CE31",
          600: "#2DA527",
          700: "#227C1D",
          800: "#175214",
          900: "#0B290A"
        },
        pink: {
          50: "#FAE6FE",
          100: "#F0BAFC",
          200: "#E78EFB",
          300: "#DD62F9",
          400: "#D436F7",
          500: "#CA09F6",
          600: "#A207C5",
          700: "#790693",
          800: "#510462",
          900: "#280231"
        },
        yellow: {
          50: "#FAF9EA",
          100: "#F1EFC5",
          200: "#E8E5A0",
          300: "#E0DB7B",
          400: "#D7D156",
          500: "#CEC631",
          600: "#A59F27",
          700: "#7C771D",
          800: "#524F14",
          900: "#29280A"
        },
      },
      dropShadow: {
        inset: {
          '5': '0 0 5px 0 rgba(0, 0, 0, 0.25) inset',
          '10': '0 0 10px 0 rgba(0, 0, 0, 0.25) inset',
          '25': '0 0 25px 0 rgba(0, 0, 0, 0.25) inset',
        }
      },
      fontFamily: {
        'sans': ['Exo\\ 2', 'Ubuntu', 'Roboto', 'sans-serif'],
        'display': ['"Arizone Unicase Regular"', 'Exo\\ 2', 'Ubuntu', 'sans-serif'],
        'heading': ['Exo\\ 2', 'Ubuntu', 'Roboto', 'sans-serif'],
        'body': ['Ubuntu', 'Roboto', 'sans-serif'],
        'serif': ['serif']
      },
      fontSize: {
        'xxs': '.625rem',
      },
      textColor: {
        default: "var(--color-text)",
        offset: "var(--color-text-offset)",
      },
      backgroundColor: {
        default: "var(--color-background)",
        offset: "var(--color-background-offset)",
      },
      borderColor: {
        default: "var(--color-border)",
      },
      animation: {
        'ping-once': 'ping 0.5s cubic-bezier(0, 0, 0.2, 1) 2',
        'pulse-min': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 3',
        'bounce-min': 'bounce 1s 3'
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
    },
  },
  experimental: { optimizeUniversalDefaults: true },
  plugins: [formsPlugin, fluidTypePlugin, typographyPlugin, daisyUIPlugin]
}