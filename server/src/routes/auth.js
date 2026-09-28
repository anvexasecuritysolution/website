import { Router } from 'express';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { User } from '../models/User.js';
import { env } from '../config/env.js';
import { HttpError } from '../middleware/error.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Try again in 15 minutes.' },
});

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { email, password } = z.object({ email: z.string().email(), password: z.string().min(1) }).parse(req.body);
    const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
    const ok = user && (await user.verifyPassword(password));
    if (!ok) throw new HttpError(401, 'Invalid email or password.');
    const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (e) { next(e); }
});

export default router;
