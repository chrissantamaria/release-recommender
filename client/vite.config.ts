import { defineConfig } from 'vite';
import macrosPlugin from 'vite-plugin-babel-macros';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { getAliases } from 'vite-aliases'
import { minifyHtml } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: getAliases()
  },
  plugins: [
    reactRefresh(),
    minifyHtml({
      // http://perfectionkills.com/experimenting-with-html-minifier/#remove_attribute_quotes
      removeAttributeQuotes: false,
    }),
    macrosPlugin(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
