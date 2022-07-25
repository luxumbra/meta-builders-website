const defaultTheme = require("tailwindcss/defaultTheme");
const defaultConfig = require('tailwindcss/defaultConfig')
const formsPlugin = require('@tailwindcss/forms')
const typographyPlugin = require('@tailwindcss/typography')
const daisyUIPlugin = require('daisyui')
const fluidTypePlugin = require('tailwindcss-fluid-type')

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        dark: '#242f3e',
        darkish: '#17263c',
        background: '#17263c',
        blueGlassAlpha: '#00233385',
        greenGlassAlpha: '#37491D95',
        white: '#ffffff',
        black: '#000000',
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
        purple: {
          50: "#F1EAFA",
          100: "#D9C5F1",
          200: "#C1A0E8",
          300: "#A97BE0",
          400: "#9056D7",
          500: "#7831CE",
          600: "#6027A5",
          700: "#481D7C",
          800: "#301452",
          900: "#180A29"
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
      fontFamily: {
        sans: ['"Exo 2"', 'Ubuntu', 'sans-serif'],
        serif: ['serif']
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
      }
    },
  },
  experimental: { optimizeUniversalDefaults: true },
  plugins: [formsPlugin, fluidTypePlugin, typographyPlugin, daisyUIPlugin]
}