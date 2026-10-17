export const SITE_NAME = 'Anvexa Security Solutions';

export const PAGE_META = {
  '/': { title: 'Web, API, Server & Network Security | Anvexa India', description: 'Security assessments for Indian MSMEs and startups: web applications, APIs, servers and networks, with remediation guidance and agreed retesting.' },
  '/about': { title: 'About Our Cybersecurity Team in Noida | Anvexa', description: 'Meet Anvexa Security Solutions, a Noida-based cybersecurity team helping Indian businesses assess risk, verify fixes and maintain audit evidence.' },
  '/services': { title: 'VAPT, Compliance & Cybersecurity Services | Anvexa', description: 'Explore Anvexa’s cybersecurity services: asset discovery, VAPT, remediation, retesting, compliance mapping, continuous monitoring and incident response.' },
  '/how-it-works': { title: 'Our Security Assessment & Remediation Process | Anvexa', description: 'See how an Anvexa engagement works: discover your environment, assess vulnerabilities, support remediation and verify controls with ongoing assurance.' },
  '/pricing': { title: 'Cybersecurity Assessment & Monitoring Pricing | Anvexa', description: 'Discuss pricing for a one-time cybersecurity assessment or ongoing security support. Anvexa scopes each engagement around your environment and needs.' },
  '/blog': { title: 'Cybersecurity, VAPT & Compliance Articles | Anvexa', description: 'Read practical articles on VAPT, security controls, CERT-In, DPDP and compliance from Anvexa Security Solutions for Indian businesses.' },
  '/contact': { title: 'Contact Anvexa for Cybersecurity & VAPT Services', description: 'Contact Anvexa Security Solutions in Noida to discuss VAPT, compliance or ongoing security support. Start with a free discovery call.' },
  '/privacy': { title: 'Privacy Policy | Anvexa Security Solutions', description: 'Learn how Anvexa handles contact enquiries, website data and optional Google Analytics, and how to manage your cookie choices and privacy requests.' },
  '/terms': { title: 'Website Terms | Anvexa Security Solutions', description: 'Read the terms for using the Anvexa Security Solutions website, including website content, enquiries and responsible security reporting.' },
};

export function canonicalPath(pathname) {
  return pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
}

export function structuredData({ origin, pathname, title, description, article, publishedAt, contact }) {
  const canonical = origin + canonicalPath(pathname);
  const organization = {
    '@type': 'Organization', '@id': `${origin}/#organization`, name: SITE_NAME,
    url: origin + '/', logo: { '@type': 'ImageObject', url: origin + '/anvexa-mark.svg' },
    ...(contact ? { email: contact.email, telephone: contact.phone, address: { '@type': 'PostalAddress', streetAddress: contact.address, addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', postalCode: '201309', addressCountry: 'IN' } } : {}),
  };
  const graph = [organization, {
    '@type': 'WebSite', '@id': `${origin}/#website`, url: origin + '/', name: SITE_NAME,
    publisher: { '@id': organization['@id'] }, inLanguage: 'en-IN',
  }, {
    '@type': article ? 'BlogPosting' : 'WebPage', '@id': canonical + '#page', url: canonical,
    name: title, description, inLanguage: 'en-IN', isPartOf: { '@id': `${origin}/#website` },
    ...(article ? { headline: title, image: origin + '/social-preview.png', mainEntityOfPage: canonical,
      author: { '@id': organization['@id'] }, publisher: { '@id': organization['@id'] },
      ...(publishedAt ? { datePublished: new Date(publishedAt).toISOString() } : {}) } : {}),
  }];
  return { '@context': 'https://schema.org', '@graph': graph };
}

// Prevent embedded content from terminating the JSON-LD script element.
export const serializeJsonLd = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
