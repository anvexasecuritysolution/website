import { randomUUID } from 'node:crypto';
import { appendJson, consumeRateLimit } from './_lib/github.js';
import { validateLead } from '../shared/leads.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }
  let body = req.body;
  if (Buffer.byteLength(typeof body === 'string' ? body : JSON.stringify(body ?? {})) > 20 * 1024) return res.status(413).json({ message: 'Request is too large.' });
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ message: 'Invalid JSON.' }); }
  }
  if (body?.website) return res.status(201).json({ ok: true });
  const { data, errors } = validateLead(body);
  if (Object.keys(errors).length) return res.status(422).json({ message: 'Please check the highlighted fields.', errors });
  // Vercel supplies this header. Other hosts must configure a trusted proxy.
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  try {
    await consumeRateLimit(ip);
    const { website, ...fields } = data;
    await appendJson({ id: randomUUID(), submittedAt: new Date().toISOString(), ...fields, status: 'new' });
    return res.status(201).json({ ok: true });
  } catch (err) {
    if (err.status === 429) {
      res.setHeader('Retry-After', '3600');
      return res.status(429).json({ message: err.message });
    }
    console.error('Lead save failed:', err.message);
    return res.status(503).json({ message: 'We could not save your request right now. Please try again in a moment.' });
  }
}
