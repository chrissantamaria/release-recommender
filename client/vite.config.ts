import path from 'path';
import type { UserConfigExport } from 'vite';
import macrosPlugin from 'vite-plugin-babel-macros';
import preact from '@preact/preset-vite';
// import { getAliases } from 'vite-aliases';
import { minifyHtml } from 'vite-plugin-html';
import legacy from '@vitejs/plugin-legacy';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
const config: UserConfigExport = {
  resolve: {
    // vite currently can't handle merging array-based aliases
    // (from vite-aliases) with object-based aliases (from @preact/preset-vite),
    // for now just manually creating object-based aliases.
    // https://github.com/vitejs/vite/pull/2847
    alias: {
      '@components': path.resolve('./src/components'),
      '@images': path.resolve('./src/images'),
      '@pages': path.resolve('./src/pages'),
      '@store': path.resolve('./src/store'),
      '@utils': path.resolve('./src/utils'),
    },
  },
  plugins: [
    preact(),
    minifyHtml({
      // http://perfectionkills.com/experimenting-with-html-minifier/#remove_attribute_quotes
      removeAttributeQuotes: false,
    }),
    macrosPlugin(),
    legacy(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
};

if (process.env.BUILD_STATS) {
  config.plugins.push(visualizer());
}

export default config;
