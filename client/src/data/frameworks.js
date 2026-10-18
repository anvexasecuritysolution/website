// Plain-language summaries; check the linked authority for current scope and dates.
export const FRAMEWORK_GUIDE = [
  {
    title: 'CERT-In Directions', type: 'Indian cybersecurity directions',
    explanation: 'Covered entities: report specified incidents within six hours of noticing or being informed; retain ICT logs in India for a rolling 180 days.',
    audience: 'Entities covered by CERT-In directions.',
    support: 'Review logging and incident escalation controls.',
    sources: [{ label: 'CERT-In directions and FAQs', url: 'https://www.cert-in.org.in/Directions70B.jsp' }],
  },
  {
    title: 'DPDP Act 2023 & Rules 2025', type: 'Indian personal data protection law',
    explanation: 'Digital personal data protection, safeguards and individual rights. Requirements take effect in phases.',
    audience: 'Organisations processing covered digital personal data.',
    support: 'Assess access controls and potential data exposure.',
    sources: [{ label: 'MeitY: notified DPDP Rules', url: 'https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa' }],
  },
  {
    title: 'ISO/IEC 27001', type: 'Information security management standard',
    explanation: 'Requirements for an information security management system. Certification is a separate process.',
    audience: 'Organisations developing their security programme.',
    support: 'Map technical findings to relevant controls.',
    sources: [{ label: 'ISO: ISO/IEC 27001', url: 'https://www.iso.org/standard/27001' }],
  },
  {
    title: 'SOC 2', type: 'Independent assurance report',
    explanation: 'An independent examination and report against selected Trust Services Criteria.',
    audience: 'SaaS, cloud and other service providers.',
    support: 'Provide readiness evidence, not a SOC 2 examination or report.',
    sources: [{ label: 'AICPA: SOC reporting', url: 'https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services' }],
  },
  {
    title: 'PCI DSS', type: 'Payment card data security standard',
    explanation: 'Security requirements for payment card data.',
    audience: 'In-scope merchants and payment providers.',
    support: 'Scoped testing and remediation guidance.',
    sources: [{ label: 'PCI SSC: PCI DSS', url: 'https://www.pcisecuritystandards.org/standards/pci-dss/' }],
  },
  {
    title: 'SEBI, RBI & IRDAI requirements', type: 'Financial-sector regulatory requirements',
    explanation: 'Sector-specific cybersecurity, resilience and audit obligations.',
    audience: 'Financial entities covered by their regulator.',
    support: 'Map technical findings to applicable requirements.',
    sources: [
      { label: 'SEBI: CSCRF', url: 'https://www.sebi.gov.in/legal/circulars/aug-2024/cybersecurity-and-cyber-resilience-framework-cscrf-for-sebi-regulated-entities-res-_85964.html' },
      { label: 'RBI: IT governance directions', url: 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12562' },
      { label: 'IRDAI: cyber security guidelines', url: 'https://irdai.gov.in/document-detail?documentId=3314780' },
    ],
  },
];
