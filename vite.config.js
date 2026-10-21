'use strict';

const react = require('@vitejs/plugin-react');
const { defineConfig } = require('vite');
const { resolve } = require('path');

/**
 * @type {import('vite').UserConfig}
 */
const viteConfig = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@lib': resolve(__dirname, './src/lib'),
      '@pages': resolve(__dirname, './src/pages'),
      '@services': resolve(__dirname, './src/services'),
      '@type': resolve(__dirname, './src/type')
    }
  },
  server: {
    strictPort: false
  },
  build: {
    outDir: 'build',
    emptyOutDir: true
  }
});

module.exports = viteConfig;
