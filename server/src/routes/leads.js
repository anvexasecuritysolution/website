import { Router } from 'express';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import { Lead } from '../models/Lead.js';
import { requireAuth } from '../middleware/auth.js';
import { HttpError } from '../middleware/error.js';
import { githubEnabled, flushGithubBackups } from '../services/githubStore.js';
import { validateLead } from '../../../client/shared/leads.js';

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many submissions. Please try again later.' },
});

// Public: submit contact form
router.post('/', submitLimiter, async (req, res, next) => {
  try {
    const { data: fields, errors } = validateLead(req.body);
    if (Object.keys(errors).length) return res.status(422).json({ message: 'Please check the highlighted fields.', errors });
    const { website, ...data } = fields;
    if (website) return res.status(201).json({ ok: true }); // bot: pretend success, store nothing
    await Lead.create({ ...data, ip: req.ip, ...(githubEnabled ? { githubBackup: { state: 'pending', nextAttemptAt: new Date() } } : {}) });
    res.status(201).json({ ok: true });
    // The MongoDB record is already durable; backup retries never hold up the visitor.
    if (githubEnabled) void flushGithubBackups();
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
