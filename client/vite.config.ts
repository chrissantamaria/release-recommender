import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { minifyHtml } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    minifyHtml({
      // http://perfectionkills.com/experimenting-with-html-minifier/#remove_attribute_quotes
      removeAttributeQuotes: false,
    }),
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
