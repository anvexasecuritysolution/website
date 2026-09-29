import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { env } from './config/env.js';
import { notFound, errorHandler } from './middleware/error.js';
import postsRoutes from './routes/posts.js';
import leadsRoutes from './routes/leads.js';
import authRoutes from './routes/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();
  app.set('trust proxy', 1);

  app.use(helmet({ contentSecurityPolicy: env.isProd ? undefined : false }));
  app.use(cors({ origin: env.clientOrigins, credentials: false }));
  app.use(compression());
  app.use(express.json({ limit: '20kb' }));
  if (!env.isProd) app.use(morgan('dev'));

  app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
  app.use('/api/posts', postsRoutes);
  app.use('/api/leads', leadsRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api', notFound);

  // Serve the built React app in production (single-deploy option)
  const dist = path.resolve(__dirname, '../../client/dist');
  if (env.isProd && fs.existsSync(dist)) {
    app.use(express.static(dist));
    app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
  }

  app.use(errorHandler);
  return app;
}
