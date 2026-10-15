// Plain-language summaries; check the linked authority for current scope and dates.
export const FRAMEWORK_GUIDE = [
  {
    title: 'CERT-In Directions', type: 'Indian cybersecurity directions',
    explanation: 'Covered entities must report specified cyber incidents within six hours of noticing or being informed of them. ICT logs must be kept securely for a rolling 180 days within India.',
    audience: 'Covered companies, service providers, intermediaries, data centres and government organisations.',
    sources: [{ label: 'CERT-In directions and FAQs', url: 'https://www.cert-in.org.in/Directions70B.jsp' }],
  },
  {
    title: 'DPDP Act 2023 & Rules 2025', type: 'Indian personal data protection law',
    explanation: 'Governs digital personal data, including permitted uses, security safeguards, individual rights and breach notifications. Requirements take effect in phases.',
    audience: 'Businesses handling digital personal data in India, and certain overseas providers serving people in India, subject to scope and exemptions.',
    sources: [{ label: 'MeitY: notified DPDP Rules', url: 'https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa' }],
  },
  {
    title: 'ISO/IEC 27001', type: 'Information security management standard',
    explanation: 'An international standard for managing information security risks through an ISMS. Organisations can seek independent certification for a defined scope.',
    audience: 'Organisations of any size building a security programme or meeting customer and contractual requirements.',
    sources: [{ label: 'ISO: ISO/IEC 27001', url: 'https://www.iso.org/standard/27001' }],
  },
  {
    title: 'SOC 2', type: 'Independent assurance report',
    explanation: 'An independent report on a service organisation’s controls against relevant AICPA Trust Services Criteria. Type I reviews a point in time; Type II also reviews operation over a period.',
    audience: 'SaaS, cloud and other service providers whose customers need assurance about how their information is protected.',
    sources: [{ label: 'AICPA: SOC reporting', url: 'https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services' }],
  },
  {
    title: 'PCI DSS', type: 'Payment card data security standard',
    explanation: 'Sets security requirements for cardholder data and systems that can affect its security. Outsourcing payment processing does not automatically remove all responsibilities.',
    audience: 'Merchants, payment processors and service providers involved in card payments, depending on their payment environment.',
    sources: [{ label: 'PCI SSC: PCI DSS', url: 'https://www.pcisecuritystandards.org/standards/pci-dss/' }],
  },
  {
    title: 'SEBI, RBI & IRDAI requirements', type: 'Financial-sector regulatory requirements',
    explanation: 'Separate sector requirements cover IT governance, cybersecurity, resilience, incident handling and audits. Obligations depend on the regulator, licence and entity category.',
    audience: 'Covered securities-market entities, banks and other RBI-regulated institutions, insurers and insurance intermediaries.',
    sources: [
      { label: 'SEBI: CSCRF', url: 'https://www.sebi.gov.in/legal/circulars/aug-2024/cybersecurity-and-cyber-resilience-framework-cscrf-for-sebi-regulated-entities-res-_85964.html' },
      { label: 'RBI: IT governance directions', url: 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12562' },
      { label: 'IRDAI: cyber security guidelines', url: 'https://irdai.gov.in/document-detail?documentId=3314780' },
    ],
  },
];
