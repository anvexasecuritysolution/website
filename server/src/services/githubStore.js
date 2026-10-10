import { env } from '../config/env.js';
import { appendJson } from '../../../client/api/_lib/github.js';
import { Lead } from '../models/Lead.js';
import { createBackupWorker } from './backupWorker.js';

export const githubEnabled = Boolean(env.github.token && env.github.repo);

// Bounded operations retry SHA conflicts, including across server processes.
export function saveLeadToGithub(record) {
  return githubEnabled ? appendJson(record, env.github) : Promise.resolve();
}

export const flushGithubBackups = createBackupWorker({ Lead, save: saveLeadToGithub });

export function startGithubBackups() {
  if (!githubEnabled) return;
  void flushGithubBackups();
  const timer = setInterval(() => { void flushGithubBackups(); }, 30_000);
  timer.unref();
}
