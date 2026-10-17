// Plain-language summaries; check the linked authority for current scope and dates.
export const FRAMEWORK_GUIDE = [
  {
    title: 'CERT-In Directions', type: 'Indian cybersecurity directions',
    explanation: 'Report specified incidents within six hours of notice; retain ICT logs securely in India for 180 days.',
    audience: 'Covered companies, IT providers and government organisations.',
    support: 'Logging and incident escalation reviews.',
    sources: [{ label: 'CERT-In directions and FAQs', url: 'https://www.cert-in.org.in/Directions70B.jsp' }],
  },
  {
    title: 'DPDP Act 2023 & Rules 2025', type: 'Indian personal data protection law',
    explanation: 'Personal data use, safeguards and individual rights; phased commencement.',
    audience: 'Businesses processing covered digital personal data.',
    support: 'Access-control and data-exposure assessments.',
    sources: [{ label: 'MeitY: notified DPDP Rules', url: 'https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa' }],
  },
  {
    title: 'ISO/IEC 27001', type: 'Information security management standard',
    explanation: 'A risk-based information security management standard with independent certification.',
    audience: 'Organisations building or strengthening their security programme.',
    support: 'Map findings and remediation to relevant controls.',
    sources: [{ label: 'ISO: ISO/IEC 27001', url: 'https://www.iso.org/standard/27001' }],
  },
  {
    title: 'SOC 2', type: 'Independent assurance report',
    explanation: 'Independent assurance on controls against relevant Trust Services Criteria.',
    audience: 'SaaS, cloud and other service providers.',
    support: 'Testing and verification evidence for independent auditors.',
    sources: [{ label: 'AICPA: SOC reporting', url: 'https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services' }],
  },
  {
    title: 'PCI DSS', type: 'Payment card data security standard',
    explanation: 'Security requirements for cardholder data and systems affecting its protection.',
    audience: 'Card-payment merchants and providers, depending on scope.',
    support: 'Scoped testing and remediation; confirm assessor eligibility first.',
    sources: [{ label: 'PCI SSC: PCI DSS', url: 'https://www.pcisecuritystandards.org/standards/pci-dss/' }],
  },
  {
    title: 'SEBI, RBI & IRDAI requirements', type: 'Financial-sector regulatory requirements',
    explanation: 'Sector-specific cybersecurity, resilience and audit obligations.',
    audience: 'Covered financial entities, according to regulator and licence.',
    support: 'Map technical checks and evidence to applicable requirements.',
    sources: [
      { label: 'SEBI: CSCRF', url: 'https://www.sebi.gov.in/legal/circulars/aug-2024/cybersecurity-and-cyber-resilience-framework-cscrf-for-sebi-regulated-entities-res-_85964.html' },
      { label: 'RBI: IT governance directions', url: 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12562' },
      { label: 'IRDAI: cyber security guidelines', url: 'https://irdai.gov.in/document-detail?documentId=3314780' },
    ],
  },
];
