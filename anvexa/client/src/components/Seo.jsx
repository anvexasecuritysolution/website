import { Helmet } from 'react-helmet-async';

const SITE = 'Anvexa Security Solutions';

export default function Seo({ title, description, noindex = false }) {
  const full = title ? `${title} · ${SITE}` : SITE;
  return (
    <Helmet>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  );
}
