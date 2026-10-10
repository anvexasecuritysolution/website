import test from 'node:test';
import assert from 'node:assert/strict';
import { seedOptions, seedPosts, seedAdmin } from '../server/src/seed/operations.js';
import { createBackupWorker } from '../server/src/services/backupWorker.js';

test('default seeding preserves edited articles and does not prune other posts', async () => {
  const writes = [];
  let deletions = 0;
  const Post = { updateOne: async (...args) => writes.push(args), deleteMany: async () => { deletions += 1; } };
  await seedPosts(Post, [{ slug: 'article', title: 'Original' }], seedOptions([]));
  assert.ok(writes[0][1].$setOnInsert);
  assert.equal(deletions, 0);
  await seedPosts(Post, [{ slug: 'article' }], seedOptions(['--update-posts', '--prune-posts']));
  assert.ok(writes[1][1].$set);
  assert.equal(deletions, 1);
});

test('default seeding never resets an existing password', async () => {
  let writes = 0;
  const User = { exists: async () => true, hash: async () => 'hash', updateOne: async () => { writes += 1; } };
  assert.equal(await seedAdmin(User, 'admin@example.com', 'new-strong-password', seedOptions([])), 'preserved');
  assert.equal(writes, 0);
  assert.equal(await seedAdmin(User, 'admin@example.com', 'new-strong-password', seedOptions(['--reset-admin-password'])), 'reset');
  assert.equal(writes, 1);
  assert.throws(() => seedOptions(['--unknown']), /Supported options/);
});

test('a new admin can be created without affecting existing accounts', async () => {
  let write;
  const User = { exists: async () => false, hash: async () => 'hash', updateOne: async (_query, data) => { write = data; } };
  assert.equal(await seedAdmin(User, 'admin@example.com', 'short', seedOptions([])), 'skipped');
  assert.equal(await seedAdmin(User, 'admin@example.com', 'strong-test-password', seedOptions([])), 'created');
  assert.ok(write.$setOnInsert);
});

function fakeLeads() {
  const now = new Date('2026-10-08T00:00:00Z');
  const lead = { _id: 'id', createdAt: now, firstName: 'Asha', email: 'asha@example.com', phone: '+91 98765 43210', ip: '192.0.2.1', githubBackup: { state: 'pending', nextAttemptAt: now, attempts: 0 } };
  const Lead = {
    findOneAndUpdate(_filter, update) {
      return { select: () => ({ lean: async () => {
        if (lead.githubBackup.state !== 'pending' || lead.githubBackup.nextAttemptAt > now) return null;
        lead.githubBackup.nextAttemptAt = update.$set['githubBackup.nextAttemptAt'];
        lead.githubBackup.attempts += 1;
        return structuredClone(lead);
      } }) };
    },
    async updateOne(_filter, update) {
      if (update.$set['githubBackup.state']) lead.githubBackup.state = update.$set['githubBackup.state'];
      if (update.$set['githubBackup.nextAttemptAt']) lead.githubBackup.nextAttemptAt = update.$set['githubBackup.nextAttemptAt'];
    },
  };
  return { Lead, lead, now };
}

test('successful durable backups mark saved and exclude internal fields', async () => {
  const { Lead, lead, now } = fakeLeads();
  let saved;
  await createBackupWorker({ Lead, now: () => now, save: async (record) => { saved = record; } })();
  assert.equal(lead.githubBackup.state, 'saved');
  assert.equal(saved.id, 'id');
  assert.equal(saved.phone, lead.phone);
  assert.equal(saved.ip, undefined);
  assert.equal(saved.githubBackup, undefined);
});

test('failed backups remain durable and can recover after a process restart', async () => {
  const { Lead, lead, now } = fakeLeads();
  await createBackupWorker({ Lead, now: () => now, save: async () => { throw new Error('offline'); }, log: () => {} })();
  assert.equal(lead.githubBackup.state, 'pending');
  assert.ok(lead.githubBackup.nextAttemptAt > now);
  now.setTime(lead.githubBackup.nextAttemptAt.getTime() + 1);
  await createBackupWorker({ Lead, now: () => now, save: async () => {} })();
  assert.equal(lead.githubBackup.state, 'saved');
});
