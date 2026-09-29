import 'dotenv/config';

const required = ['MONGO_URI', 'JWT_SECRET'];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required env var: ${key}`);
    process.exit(1);
  }
}

export const env = {
  port: Number(process.env.PORT) || 5000,
  isProd: process.env.NODE_ENV === 'production',
  mongoUri: process.env.MONGO_URI,
  clientOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim()),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  github: {
    token: process.env.GITHUB_TOKEN || '',
    repo: process.env.GITHUB_REPO || '', // "owner/name"
    branch: process.env.GITHUB_BRANCH || 'main',
    path: process.env.GITHUB_LEADS_PATH || 'data/leads.json',
    apiUrl: process.env.GITHUB_API_URL || 'https://api.github.com',
  },
};
