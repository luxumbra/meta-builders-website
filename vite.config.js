/** @type {import('vite').UserConfig} */
import * as path from 'node:path'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths';
import eslintPlugin from '@nabla/vite-plugin-eslint'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { imagetools } from 'vite-imagetools'
import imagePresets, { widthPreset } from 'vite-plugin-image-presets'
import alias from '@rollup/plugin-alias'

const root = path.resolve(__dirname, 'src')
const outdir = path.resolve(__dirname, 'dist')

const defaultConfig = {
  base: './',
  plugins: [
    tsconfigPaths(),
    react(),
    eslintPlugin()],
  resolve: {
    alias: [
      { find: '~mb/*', replacement: path.resolve(__dirname, 'src') },
      { find: '~mb/default/*', replacement: path.resolve(__dirname, 'src/components/Default/*') },
      { find: '~mb/buttons/*', replacement: path.resolve(__dirname, 'src/components/Buttons/*') },
      { find: '~mb/cards/*', replacement: path.resolve(__dirname, 'src/components/Cards/*') },
      { find: '~mb/marketplace/*', replacement: path.resolve(__dirname, 'src/components/Marketplace/*') },
      { find: '~mb/sections/*', replacement: path.resolve(__dirname, 'src/components/Sections/*') },
      { find: '~mb/toast/*', replacement: path.resolve(__dirname, 'src/components/Toast/*') },
      { find: '~mb/animation/*', replacement: path.resolve(__dirname, 'src/lib/animation/*') },
      { find: '~mb/hooks/*', replacement: path.resolve(__dirname, 'src/lib/hooks/*') },
      { find: '~mb/icons/*', replacement: path.resolve(__dirname, 'src/components/Icons/*') },
    ]
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === "serve") {
    //dev config
    return {
      ...defaultConfig,
      define: {
        global: "globalThis",
        process: {
          env: "development",
        },
      },
    };
  }

  //prod config
  return { ...defaultConfig, define: { global: "globalThis" } };
});
