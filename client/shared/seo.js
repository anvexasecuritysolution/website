import { SERVICE_PAGES } from './service-pages.js';
export const SITE_NAME = 'Anvexa Security Solutions';

export const PAGE_META = {
  '/': { title: 'Web, API, Server & Network Security | Anvexa India', description: 'Security assessments for Indian MSMEs and startups: web applications, APIs, servers and networks, with remediation guidance and agreed retesting.' },
  '/about': { title: 'About Our Cybersecurity Team in Noida | Anvexa', description: 'Meet Anvexa Security Solutions, a Noida-based cybersecurity team helping Indian businesses assess risk, verify fixes and maintain audit evidence.' },
  '/services': { title: 'Web Application, API & Infrastructure VAPT | Anvexa', description: 'Web application, API, server and network assessments for Indian businesses, with evidence-backed findings, fix guidance and agreed retesting.' },
  '/how-it-works': { title: 'Our Security Assessment & Remediation Process | Anvexa', description: 'Understand the assessment scope, client responsibilities, remediation guidance and agreed retesting from your first enquiry to final handover.' },
  '/pricing': { title: 'VAPT & Security Assessment Pricing | Anvexa', description: 'Get a scoped quote for a security assessment or recurring reviews. Your proposal confirms the systems, testing depth, deliverables, fees and retest terms.' },
  '/blog': { title: 'Cybersecurity, VAPT & Compliance Articles | Anvexa', description: 'Read practical articles on VAPT, security controls, CERT-In, DPDP and compliance from Anvexa Security Solutions for Indian businesses.' },
  '/contact': { title: 'Contact Anvexa for Cybersecurity & VAPT Services', description: 'Contact Anvexa in Noida about web application, API, server or network testing. Discuss your systems, priorities and assessment requirements.' },
  '/faqs': { title: 'Cybersecurity Assessment FAQs | Anvexa', description: 'Answers about Anvexa security assessments, testing access, confidentiality, pricing, remediation and retesting.' },
  '/team': { title: 'Our Team | Anvexa Security Solutions', description: 'Meet the Anvexa team working across cybersecurity, operations, product engineering, marketing and customer support.' },
  '/privacy': { title: 'Privacy Policy | Anvexa Security Solutions', description: 'Learn how Anvexa handles contact enquiries, website data and optional Google Analytics, and how to manage your cookie choices and privacy requests.' },
  '/terms': { title: 'Website Terms | Anvexa Security Solutions', description: 'Read the terms for using the Anvexa Security Solutions website, including website content, enquiries and responsible security reporting.' },
};

for (const service of SERVICE_PAGES) {
  PAGE_META[`/services/${service.slug}`] = { title: `${service.title} | Anvexa India`, description: service.description };
}

export function canonicalPath(pathname) {
  return pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
}

export function structuredData({ origin, pathname, title, description, article, publishedAt, contact }) {
  const canonical = origin + canonicalPath(pathname);
  const organization = {
    '@type': 'Organization', '@id': `${origin}/#organization`, name: SITE_NAME,
    url: origin + '/', logo: { '@type': 'ImageObject', url: origin + '/anvexa-mark.svg' },
    ...(contact ? { email: contact.email, telephone: contact.phone, ...(contact.postalAddress ? { address: { '@type': 'PostalAddress', ...contact.postalAddress } } : {}) } : {}),
    sameAs: ['https://www.instagram.com/anvexasecuritysolution/', 'https://x.com/anvexasecurity', 'https://www.linkedin.com/company/anvexa-security-solution/'],
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
