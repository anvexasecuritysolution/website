export const DEFAULT_SITE_ORIGIN = 'https://anvexasecuritysolution.vercel.app';

export function siteOrigin(value) {
  if (!value) return '';
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Site URL must be an http(s) origin.');
  return url.origin;
}

export const PUBLIC_PATHS = ['/', '/about', '/services', '/how-it-works', '/pricing', '/blog', '/contact', '/faqs', '/team', '/privacy', '/terms'];

export function sitemapXml(origin, posts) {
  const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const entries = PUBLIC_PATHS.map((path) => ({ path }));
  for (const post of posts) entries.push({ path: `/blog/${encodeURIComponent(post.slug)}`, date: new Date(post.publishedAt).toISOString().slice(0, 10) });
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + entries.map(({ path, date }) => `  <url><loc>${escape(origin + path)}</loc>${date ? `<lastmod>${date}</lastmod>` : ''}</url>`).join('\n') + '\n</urlset>\n';
}
