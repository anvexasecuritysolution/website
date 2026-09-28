import { Router } from 'express';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import { Lead, INDUSTRIES, SERVICES } from '../models/Lead.js';
import { requireAuth } from '../middleware/auth.js';
import { HttpError } from '../middleware/error.js';

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many submissions. Please try again later.' },
});

const leadSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(80),
  lastName: z.string().trim().max(80).optional().default(''),
  email: z.string().trim().toLowerCase().email('Enter a valid email').max(160),
  company: z.string().trim().max(160).optional().default(''),
  industry: z.enum(INDUSTRIES).or(z.literal('')).optional().default(''),
  service: z.enum(SERVICES).or(z.literal('')).optional().default(''),
  message: z.string().trim().max(4000).optional().default(''),
  website: z.string().optional().default(''), // honeypot — real users leave this empty
});

// Public: submit contact form
router.post('/', submitLimiter, async (req, res, next) => {
  try {
    const { website, ...data } = leadSchema.parse(req.body);
    if (website) return res.status(201).json({ ok: true }); // bot: pretend success, store nothing
    await Lead.create({ ...data, ip: req.ip });
    res.status(201).json({ ok: true });
  } catch (e) { next(e); }
});

// Admin: list leads
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status: String(status) } : {};
    const leads = await Lead.find(filter).sort({ createdAt: -1 }).limit(500).lean();
    res.json(leads);
  } catch (e) { next(e); }
});

// Admin: update status
router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const { status } = z.object({ status: z.enum(['new', 'contacted', 'qualified', 'closed']) }).parse(req.body);
    const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true }).lean();
    if (!lead) throw new HttpError(404, 'Lead not found.');
    res.json(lead);
  } catch (e) { next(e); }
});

export default router;
