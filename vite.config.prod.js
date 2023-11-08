/* eslint-disable unicorn/prefer-module */
/** @type {import('vite').UserConfig} */
import * as path from 'node:path'

import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import ViteRadar from 'vite-plugin-radar'
import tsconfigPaths from 'vite-tsconfig-paths'
// import commonjs from '@rollup/plugin-commonjs';

const root = path.resolve(__dirname, 'src')
const outdir = path.resolve(__dirname, 'dist')

const defaultConfig = {
  base: './',
  server: {
    host: 'meta-builders.local',
    port: 1169
  },
  plugins: [
    tsconfigPaths(),
    react(),
    ViteRadar({
      // Google Analytics tag injection
      analytics: {
        id: 'G-36FWMBEFZR'
      }
    }),
    // commonjs(),
    eslintPlugin()
    // legacy({
    //   targets: ['chrome >= 64', 'edge >= 79', 'safari >= 11.1', 'firefox >= 67'],
    //   ignoreBrowserslistConfig: true,
    //   renderLegacyChunks: false,
    //   /**
    //    * Polyfills required by modern browsers
    //    *
    //    * Since some low-version modern browsers do not support the new syntax
    //    * You need to load polyfills corresponding to the syntax to be compatible
    //    * At build, all required polyfills are packaged according to the target browser version range
    //    * But when the page is accessed, only the required part is loaded depending on the browser version
    //    *
    //    * Two configuration methods:
    //    *
    //    * 1. true
    //    *  - Automatically load all required polyfills based on the target browser version range
    //    *  - Demerit: will introduce polyfills that are not needed by modern browsers in higher versions,
    //    *    as well as more aggressive polyfills.
    //    *
    //    * 2、string[]
    //    *  - Add low-version browser polyfills as needed
    //    *  - Demerit: It needs to be added manually, which is inflexible;
    //    *    it will be discovered after the production is deployed, resulting in production failure! ! !
    //    */
    //   modernPolyfills: ['es/global-this'],
    //   //  or
    //   // modernPolyfills: true,
    // }),
  ],
  resolve: {
    alias: [
      { find: '~mb/*', replacement: path.resolve(__dirname, 'src') },
      {
        find: '~mb/default/*',
        replacement: path.resolve(__dirname, 'src/components/Default/*')
      },
      {
        find: '~mb/buttons/*',
        replacement: path.resolve(__dirname, 'src/components/Buttons/*')
      },
      {
        find: '~mb/cards/*',
        replacement: path.resolve(__dirname, 'src/components/Cards/*')
      },
      {
        find: '~mb/marketplace/*',
        replacement: path.resolve(__dirname, 'src/components/Marketplace/*')
      },
      {
        find: '~mb/sections/*',
        replacement: path.resolve(__dirname, 'src/components/Sections/*')
      },
      {
        find: '~mb/toast/*',
        replacement: path.resolve(__dirname, 'src/components/Toast/*')
      },
      {
        find: '~mb/animation/*',
        replacement: path.resolve(__dirname, 'src/lib/animation/*')
      },
      {
        find: '~mb/hooks/*',
        replacement: path.resolve(__dirname, 'src/lib/hooks/*')
      },
      {
        find: '~mb/icons/*',
        replacement: path.resolve(__dirname, 'src/components/Icons/*')
      }
    ]
  },
  optimizeDeps: {
    exclude: ['crypto-js']
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    console.log('serve config', command)
    // dev config
    return {
      ...defaultConfig,
      define: {
        global: 'globalThis',
        process: {
          env: 'development'
        }
      }
    }
  }

  // prod config
  return {
    ...defaultConfig
  }
})
