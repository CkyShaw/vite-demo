import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { visualizer } from 'rollup-plugin-visualizer'
import { ViteEjsPlugin } from 'vite-plugin-ejs'

import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    visualizer({
      filename: 'dist/report.html'
    }),
    ViteEjsPlugin(viteConfig => ({
      env: viteConfig.env
    }))
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 9800
  },
  build: {
    outDir: `dist/${pkg.name}_${pkg.version}`
  },
  define: {
    global: {}
  }
})
