import posts from '../shared/posts.js';
import { siteOrigin, sitemapXml } from '../shared/site.js';
import { PAGE_META } from '../shared/seo.js';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export function renderPage(template, rendered) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/g, '')
    .replace(/<(?:meta|link)\b[^>]*data-rh="true"[^>]*>/g, '')
    .replace('</head>', `${rendered.head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${rendered.html}</div>`);
}

export function seoAssets(originValue) {
  const origin = siteOrigin(originValue);
  let config;
  return {
    name: 'anvexa-seo-assets',
    configResolved(value) { config = value; },
    transformIndexHtml() {
      if (!origin) return [];
      const meta = (property, content) => ({ tag: 'meta', attrs: { property, content, 'data-rh': 'true' }, injectTo: 'head' });
      return [
        { tag: 'link', attrs: { rel: 'canonical', href: origin + '/', 'data-rh': 'true' }, injectTo: 'head' },
        meta('og:title', 'Anvexa Security Solutions'),
        { tag: 'meta', attrs: { name: 'description', content: PAGE_META['/'].description, 'data-rh': 'true' }, injectTo: 'head' },
        meta('og:description', 'Security assessments, continuous monitoring, and incident response for your business.'),
        meta('og:type', 'website'), meta('og:url', origin + '/'), meta('og:image', origin + '/social-preview.png'),
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image', 'data-rh': 'true' }, injectTo: 'head' },
      ];
    },
    generateBundle() {
      const sitemap = origin ? `Sitemap: ${origin}/sitemap.xml\n` : '';
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\nDisallow: /api/\n${sitemap}` });
      if (origin) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(origin, posts) });
      else this.warn('Set VITE_SITE_URL to publish an absolute sitemap. Canonical links use the current browser origin.');
    },
    async closeBundle() {
      if (config.command !== 'build' || config.build.ssr) return;
      const output = path.resolve(config.root, config.build.outDir);
      const template = await readFile(path.join(output, 'index.html'), 'utf8');
      const server = await createServer({
        configFile: false, root: config.root, mode: config.mode, plugins: [react()], publicDir: false,
        ssr: { noExternal: ['react-helmet-async'] }, optimizeDeps: { noDiscovery: true, include: [] },
        define: config.define, server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom',
      });
      try {
        const { render } = await server.ssrLoadModule('/src/entry-prerender.jsx');
        const routes = [...Object.keys(PAGE_META), ...posts.map((post) => `/blog/${post.slug}`), '/admin/login', '/404'];
        for (const route of routes) {
          const file = route === '/' ? path.join(output, 'index.html') : route === '/404' ? path.join(output, '404.html') : path.join(output, route.slice(1), 'index.html');
          await mkdir(path.dirname(file), { recursive: true });
          await writeFile(file, renderPage(template, render(route)));
        }
      } finally { await server.close(); }
    },
  };
}
