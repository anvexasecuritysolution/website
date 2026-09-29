import { ZodError } from 'zod';
import { env } from '../config/env.js';

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const notFound = (req, res, next) => next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`));

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(422).json({
      message: 'Please check the highlighted fields.',
      errors: Object.fromEntries(err.issues.map((i) => [i.path.join('.') || 'form', i.message])),
    });
  }
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid id.' });

  const status = err.status || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({
    message: status >= 500 && env.isProd ? 'Something went wrong.' : err.message,
  });
}
