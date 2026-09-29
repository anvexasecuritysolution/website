import { randomUUID } from 'node:crypto';
import { appendJson } from './_lib/github.js';

const INDUSTRIES = ['Fintech / BFSI', 'Healthcare / Pharma', 'E-commerce / Retail', 'Manufacturing / Logistics', 'IT / SaaS', 'Other'];
const SERVICES = ['Security Assessment (VAPT & Risk)', 'Continuous Security Operations', 'Managed MDR + Incident Response', 'Not sure — need a consultation'];

// Best-effort rate limit (per warm instance): 8 submissions / hour / IP.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 3600_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }
  const body = typeof req.body === 'string' ? (() => { try { return JSON.parse(req.body); } catch { return {}; } })() : req.body || {};

  if (body.website) return res.status(201).json({ ok: true }); // honeypot: bot, pretend success

  const errors = {};
  const firstName = str(body.firstName, 80);
  const email = str(body.email, 160).toLowerCase();
  if (!firstName) errors.firstName = 'First name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';
  const industry = str(body.industry, 80);
  const service = str(body.service, 80);
  if (industry && !INDUSTRIES.includes(industry)) errors.industry = 'Invalid selection';
  if (service && !SERVICES.includes(service)) errors.service = 'Invalid selection';
  if (Object.keys(errors).length) return res.status(400).json({ message: 'Please check the highlighted fields.', errors });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ message: 'Too many submissions. Please try again later.' });

  try {
    await appendJson({
      id: randomUUID(),
      submittedAt: new Date().toISOString(),
      firstName,
      lastName: str(body.lastName, 80),
      email,
      company: str(body.company, 160),
      industry,
      service,
      message: str(body.message, 4000),
      status: 'new',
    });
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error('Lead save failed:', err.message);
    return res.status(500).json({ message: 'We could not save your request right now. Please try again in a moment.' });
  }
}
