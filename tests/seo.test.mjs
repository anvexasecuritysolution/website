import test from 'node:test';
import assert from 'node:assert/strict';
import posts from '../client/shared/posts.js';
import frontendPosts from '../client/src/data/posts.js';
import apiPosts from '../client/api/_lib/posts.js';
import { DEFAULT_SITE_ORIGIN, sitemapXml, siteOrigin } from '../client/shared/site.js';
import { seoAssets } from '../client/build/seo.js';
import { readFileSync } from 'node:fs';
import { PAGE_META, canonicalPath, structuredData, serializeJsonLd } from '../client/shared/seo.js';

test('all deployment paths use the same blog content', () => {
  assert.equal(frontendPosts, posts);
  assert.equal(apiPosts, posts);
});

test('every built public URL has its own crawlable content, canonical and valid structured data', () => {
  for (const route of [...Object.keys(PAGE_META), ...posts.map((post) => `/blog/${post.slug}`)]) {
    const file = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`;
    const html = readFileSync(new URL('../client/dist/' + file, import.meta.url), 'utf8');
    const head = html.split('</head>')[0];
    assert.equal((head.match(/<title\b/g) || []).length, 1, route);
    assert.equal((head.match(/rel="canonical"/g) || []).length, 1, route);
    assert.ok(head.includes(`href="${DEFAULT_SITE_ORIGIN}${route}"`), route);
    assert.ok(head.includes('name="description"'), route);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, route);
    assert.ok(html.includes('id="main"'), route);
    const data = JSON.parse(head.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1]);
    assert.equal(data['@graph'][2].url, DEFAULT_SITE_ORIGIN + route);
    if (route.startsWith('/blog/')) {
      const post = posts.find((entry) => route.endsWith(entry.slug));
      // Inline emphasis may split a paragraph into several HTML text nodes.
      const crawlableText = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, '');
      assert.ok(crawlableText.toLowerCase().includes(post.body[0].replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').toLowerCase()), route);
      assert.equal(data['@graph'][2]['@type'], 'BlogPosting');
      assert.equal(data['@graph'][2].headline, post.title);
    }
  }
});

test('admin and missing-page HTML is excluded from indexing', () => {
  for (const file of ['admin/login/index.html', '404.html']) {
    const html = readFileSync(new URL('../client/dist/' + file, import.meta.url), 'utf8');
    assert.ok(html.includes('content="noindex,nofollow"'));
    assert.equal(html.includes('application/ld+json'), false);
  }
  const robots = readFileSync(new URL('../client/dist/robots.txt', import.meta.url), 'utf8');
  // Crawlers must be able to see admin noindex; robots disallow would hide it.
  assert.equal(robots.includes('Disallow: /admin'), false);
});

test('canonical URLs normalize trailing slashes and structured data escapes embedded script content', () => {
  assert.equal(canonicalPath('/contact///'), '/contact');
  assert.equal(canonicalPath('/'), '/');
  const data = structuredData({ origin: DEFAULT_SITE_ORIGIN, pathname: '/blog/test', title: '</script><script>alert(1)</script>', description: 'Example', article: true });
  const encoded = serializeJsonLd(data);
  assert.equal(encoded.includes('</script>'), false);
  assert.equal(JSON.parse(encoded)['@graph'][2].headline, data['@graph'][2].headline);
});

test('sitemap uses the public domain, includes articles and excludes admin routes', () => {
  const xml = sitemapXml(DEFAULT_SITE_ORIGIN, posts);
  assert.ok(xml.includes(`${DEFAULT_SITE_ORIGIN}/contact`));
  for (const post of posts) assert.ok(xml.includes(`/blog/${post.slug}`));
  assert.equal(xml.includes('/admin'), false);
  assert.equal(siteOrigin(DEFAULT_SITE_ORIGIN + '/'), DEFAULT_SITE_ORIGIN);
  assert.throws(() => siteOrigin('javascript:alert(1)'), /http/);
});

test('build emits sitemap, robots and social metadata without relying on JavaScript crawlers', () => {
  const plugin = seoAssets(DEFAULT_SITE_ORIGIN);
  const assets = [];
  plugin.generateBundle.call({ emitFile: (asset) => assets.push(asset) });
  assert.ok(assets.find((asset) => asset.fileName === 'robots.txt').source.includes(`Sitemap: ${DEFAULT_SITE_ORIGIN}/sitemap.xml`));
  assert.ok(assets.some((asset) => asset.fileName === 'sitemap.xml'));
  assert.ok(plugin.transformIndexHtml().some((tag) => tag.attrs.content === `${DEFAULT_SITE_ORIGIN}/social-preview.png`));
});
