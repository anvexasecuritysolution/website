import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { seoAssets } from './build/seo.js';
import { DEFAULT_SITE_ORIGIN, siteOrigin } from './shared/site.js';

export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, process.cwd(), '');
  const origin = siteOrigin(config.VITE_SITE_URL || DEFAULT_SITE_ORIGIN);
  return {
  plugins: [react(), seoAssets(origin)],
  define: { 'import.meta.env.VITE_SITE_URL': JSON.stringify(origin), 'import.meta.env.VITE_GA_MEASUREMENT_ID': JSON.stringify(config.VITE_GA_MEASUREMENT_ID ?? 'G-B2XQDE7L8D') },
  server: {
    port: 5173,
    proxy: { '/api': { target: 'http://localhost:5000', changeOrigin: true } },
  },
  };
});
