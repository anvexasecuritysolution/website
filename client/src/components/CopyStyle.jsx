import { Children, cloneElement, isValidElement } from 'react';

function mapText(children, transform) {
  return Children.map(children, (child) => {
    if (typeof child === 'string') return transform(child);
    if (isValidElement(child) && child.props.children != null) {
      return cloneElement(child, {}, mapText(child.props.children, transform));
    }
    return child;
  });
}

export function titleCase(text) {
  return text.replace(/\S+/g, (word, offset) => (
    offset > 0 && /^(and|or|the|a|an|to|for|of|in|with)$/i.test(word)
      ? word.toLowerCase()
      : word.charAt(0).toUpperCase() + word.slice(1)
  ));
}

export function TitleCase({ children }) {
  return mapText(children, titleCase);
}

// Preserve the source sentence case when emphasising body copy.
// Headings and labels opt into TitleCase separately.
const KEY_PHRASES = /\b(OWASP(?: API Security)? Top 10(?::20\d{2})?|VAPT|GRC|digital forensics|incident response|security monitoring|product engineering|customer relationships|written authorisation|written proposal|testing window|stop conditions|business impact|risk priorities|recommended fixes|retest window|secure channel|confidentiality terms|technical findings|data exposure|access controls|personal data|security safeguards|independent certification|independent assurance|remediation guidance|six hours|180 days|take effect in phases|information security management system|separate process|Trust Services Criteria|readiness evidence|payment card data|incident escalation)\b/gi;

export function Emphasis({ children }) {
  return Children.map(children, (child) => {
    if (typeof child === 'string') {
      return child.split(KEY_PHRASES).map((part, index) => (
        index % 2 ? <strong key={index}>{part}</strong> : part
      ));
    }
    if (isValidElement(child) && child.props.children != null) {
      return cloneElement(child, {}, child.type === 'strong'
        ? child.props.children
        : <Emphasis>{child.props.children}</Emphasis>);
    }
    return child;
  });
}
