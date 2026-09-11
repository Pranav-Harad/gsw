import cron from 'node-cron';
import db from '../db.js';
import { publishPostToChannel } from './publisherService.js';

export function initBackgroundScheduler() {
  console.log('[Scheduler] Background Social Media Worker initialized. Checking queue every minute...');

  // Run every 60 seconds
  cron.schedule('* * * * *', () => {
    db.get(`SELECT value FROM settings WHERE key = 'auto_publish_enabled'`, (err, row) => {
      const isEnabled = row?.value !== 'false';
      if (!isEnabled) return;

      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];

      // Query scheduled posts due today or earlier
      db.all(
        `SELECT * FROM posts WHERE status = 'scheduled' AND scheduledDate <= ?`,
        [todayStr],
        async (queryErr, rows) => {
          if (queryErr) {
            console.error('[Scheduler Error]:', queryErr);
            return;
          }

          if (rows && rows.length > 0) {
            console.log(`[Scheduler] Found ${rows.length} due post(s). Executing auto-publish...`);
            for (const post of rows) {
              try {
                await publishPostToChannel(post);
                console.log(`[Scheduler] Auto-published post: "${post.title}" on ${post.platform}`);
              } catch (pubErr) {
                console.error(`[Scheduler] Failed auto-publishing post ${post.id}:`, pubErr.message);
              }
            }
          }
        }
      );
    });
  });
}
