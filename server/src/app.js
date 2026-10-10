import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import path from 'node:path';
import fs from 'node:fs';
import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { env } from './config/env.js';
import { notFound, errorHandler } from './middleware/error.js';
import postsRoutes from './routes/posts.js';
import leadsRoutes from './routes/leads.js';
import authRoutes from './routes/auth.js';
import { PUBLIC_PATHS } from '../../client/shared/site.js';
import posts from '../../client/shared/posts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();
  app.set('trust proxy', 1);

  app.use((req, res, next) => { res.locals.cspNonce = randomBytes(16).toString('base64'); next(); });
  app.use(helmet({ contentSecurityPolicy: env.isProd ? {
    directives: {
      scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`, 'https://script.google.com', 'https://script.googleusercontent.com', 'https://www.googletagmanager.com', 'https://*.google-analytics.com'],
      imgSrc: ["'self'", 'data:', 'https://www.googletagmanager.com', 'https://*.google-analytics.com'],
      connectSrc: ["'self'", 'https://api.web3forms.com', 'https://script.google.com', 'https://script.googleusercontent.com', 'https://www.googletagmanager.com', 'https://*.google-analytics.com'],
    },
  } : false }));
  app.use(cors({ origin: env.clientOrigins, credentials: false }));
  app.use(compression());
  app.use(express.json({ limit: '20kb' }));
  if (!env.isProd) app.use(morgan('dev'));

  app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
  app.use('/api', (req, res, next) => { res.setHeader('X-Robots-Tag', 'noindex, nofollow'); next(); });
  app.use('/api/posts', postsRoutes);
  app.use('/api/leads', leadsRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api', notFound);

  // Serve the built React app in production (single-deploy option)
  const dist = path.resolve(__dirname, '../../client/dist');
  if (env.isProd && fs.existsSync(dist)) {
    const publicRoutes = new Set([...PUBLIC_PATHS, ...posts.map((post) => `/blog/${post.slug}`)]);
    const staticFiles = express.static(dist, { index: false, redirect: false });
    app.use((req, res, next) => req.path.endsWith('.html') ? next() : staticFiles(req, res, next));
    app.get('*', (req, res) => {
      let route = req.path.replace(/\/+$/, '') || '/';
      const explicitIndex = route.endsWith('/index.html') || route === '/index.html';
      if (explicitIndex) route = route.slice(0, -'/index.html'.length) || '/';
      if ((explicitIndex || (req.path.endsWith('/') && req.path !== '/')) && publicRoutes.has(route)) {
        const search = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
        return res.redirect(308, route + search);
      }
      const admin = route.startsWith('/admin/');
      // Preserve API-managed articles that are added after the static build.
      const dynamicArticle = /^\/blog\/[^/]+$/.test(route) && !publicRoutes.has(route);
      const file = publicRoutes.has(route) ? (route === '/' ? 'index.html' : `${route.slice(1)}/index.html`) : admin ? 'admin/login/index.html' : '404.html';
      let html = fs.readFileSync(path.join(dist, fs.existsSync(path.join(dist, file)) ? file : 'index.html'), 'utf8');
      if (dynamicArticle) html = html.replace(/<meta\b[^>]*name="robots"[^>]*>/g, '').replace(/<link\b[^>]*rel="canonical"[^>]*>/g, '');
      if (admin) res.setHeader('X-Robots-Tag', 'noindex, nofollow');
      if (!publicRoutes.has(route) && !admin && !dynamicArticle) res.status(404);
      res.setHeader('Cache-Control', 'no-cache');
      res.type('html').send(html.replace(/<script(?=[\s>])/g, `<script nonce="${res.locals.cspNonce}"`));
    });
  }

  app.use(errorHandler);
  return app;
}
