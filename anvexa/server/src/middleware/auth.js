import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { HttpError } from './error.js';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return next(new HttpError(401, 'Authentication required.'));
  try {
    req.user = jwt.verify(token, env.jwtSecret);
    next();
  } catch {
    next(new HttpError(401, 'Session expired. Please sign in again.'));
  }
}
