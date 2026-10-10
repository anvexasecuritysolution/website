export function createBackupWorker({ Lead, save, now = () => new Date(), log = console.error }) {
  let running = false;
  return async function flush() {
    if (running) return;
    running = true;
    try {
      for (let i = 0; i < 10; i += 1) {
        // A durable lease lets another process recover a pending backup after a restart.
        const lead = await Lead.findOneAndUpdate(
          { 'githubBackup.state': 'pending', 'githubBackup.nextAttemptAt': { $lte: now() } },
          { $set: { 'githubBackup.nextAttemptAt': new Date(now().getTime() + 30_000) }, $inc: { 'githubBackup.attempts': 1 } },
          { new: true, sort: { createdAt: 1 } },
        ).select('+githubBackup').lean();
        if (!lead) break;
        try {
          const { firstName, lastName, email, phone = '', company, industry, service, message } = lead;
          await save({ id: String(lead._id), submittedAt: lead.createdAt.toISOString(), firstName, lastName, email, phone, company, industry, service, message, status: 'new' });
          await Lead.updateOne({ _id: lead._id }, { $set: { 'githubBackup.state': 'saved' } });
        } catch (err) {
          const delay = Math.min(3600_000, 30_000 * 2 ** Math.min(lead.githubBackup.attempts - 1, 7));
          await Lead.updateOne({ _id: lead._id }, { $set: { 'githubBackup.nextAttemptAt': new Date(now().getTime() + delay) } });
          log('GitHub lead backup will retry:', err.message);
        }
      }
    } catch (err) { log('GitHub backup worker failed:', err.message); }
    finally { running = false; }
  };
}
