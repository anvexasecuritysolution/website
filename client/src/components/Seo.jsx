import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { siteOrigin } from '../../shared/site.js';
import { PAGE_META, SITE_NAME, canonicalPath, structuredData, serializeJsonLd } from '../../shared/seo.js';
import { CONTACT } from '../data/content.js';

const SITE = SITE_NAME;

export default function Seo({ title, description, noindex = false, article = false, publishedAt }) {
  const { pathname } = useLocation();
  const metadata = noindex ? null : PAGE_META[canonicalPath(pathname)];
  const full = metadata?.title || (title ? `${title} · ${SITE}` : SITE);
  description = metadata?.description || description;
  const origin = siteOrigin(import.meta.env.VITE_SITE_URL || window.location.origin);
  const canonical = origin + canonicalPath(pathname);
  return (
    <Helmet>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content={SITE} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${origin}/social-preview.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Anvexa Security Solutions — Assess, Remediate, Monitor, Respond" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={full} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={`${origin}/social-preview.png`} />
      {article && publishedAt && <meta property="article:published_time" content={new Date(publishedAt).toISOString()} />}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'} />
      {!noindex && <script type="application/ld+json">{serializeJsonLd(structuredData({ origin, pathname, title: article ? title : full, description, article, publishedAt, contact: CONTACT }))}</script>}
    </Helmet>
  );
}
