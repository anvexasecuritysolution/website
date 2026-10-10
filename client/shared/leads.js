export const INDUSTRIES = ['Fintech / BFSI', 'Healthcare / Pharma', 'E-commerce / Retail', 'Manufacturing / Logistics', 'IT / SaaS', 'Other'];
export const SERVICES = ['Security Assessment (VAPT & Risk)', 'Continuous Security Operations', 'Managed MDR + Incident Response', 'Not sure — need a consultation'];

export function isValidPhone(value) {
  if (typeof value !== 'string') return false;
  value = value.trim();
  const digits = value.replace(/\D/g, '');
  const national = digits.startsWith('91') && digits.length === 12 ? digits.slice(2) : !value.startsWith('+') && digits.startsWith('0') && digits.length === 11 ? digits.slice(1) : digits;
  if (!/^\+?[\d(][\d\s().-]*$/.test(value) || value.length > 32 || /^(\d)\1+$/.test(national)) return false;
  let open = false;
  for (const char of value) {
    if (char === '(') { if (open) return false; open = true; }
    if (char === ')') { if (!open) return false; open = false; }
  }
  if (open || /\(\s*\)/.test(value)) return false;
  if (value.startsWith('+')) return /^[1-9]\d{7,14}$/.test(digits) && (!digits.startsWith('91') || /^91[1-9]\d{9}$/.test(digits));
  return /^[1-9]\d{9}$/.test(digits) || /^0[1-9]\d{9}$/.test(digits) || /^91[1-9]\d{9}$/.test(digits);
}

export function isValidEmail(value) {
  if (typeof value !== 'string' || value.length > 160) return false;
  const parts = value.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || local.length > 64 || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local) || /^\.|\.$|\.\./.test(local)) return false;
  const labels = domain.split('.');
  return labels.length >= 2 && labels.every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label)) && /^(?:[a-z]{2,63}|xn--[a-z0-9-]+)$/i.test(labels[labels.length - 1]);
}

export function isValidName(value) {
  return /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u.test(value);
}

export function validateLead(body) {
  const errors = {};
  const data = {};
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { data, errors: { form: 'Invalid request.' } };
  for (const [key, max] of Object.entries({ firstName: 80, lastName: 80, email: 160, phone: 32, company: 160, industry: 80, service: 80, message: 4000, website: 200 })) {
    const value = body[key] ?? '';
    if (typeof value !== 'string') errors[key] = 'Enter text.';
    data[key] = typeof value === 'string' ? value.trim() : '';
    if (data[key].length > max) errors[key] = `Use at most ${max} characters.`;
  }
  data.email = data.email.toLowerCase();
  if (!data.firstName) errors.firstName = 'First name is required';
  else if (!isValidName(data.firstName)) errors.firstName = 'Enter a valid name';
  if (data.lastName && !isValidName(data.lastName)) errors.lastName = 'Enter a valid name';
  if (!isValidEmail(data.email)) errors.email = 'Enter a valid email';
  if (!isValidPhone(data.phone)) errors.phone = 'Enter a valid phone number, including country code if outside India';
  if (!data.phone) errors.phone = 'Phone number is required';
  if (data.industry && !INDUSTRIES.includes(data.industry)) errors.industry = 'Invalid selection';
  if (data.service && !SERVICES.includes(data.service)) errors.service = 'Invalid selection';
  return { data, errors };
}
