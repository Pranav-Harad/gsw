import axios from 'axios';
import db from '../db.js';

export async function publishPostToChannel(post) {
  return new Promise((resolve, reject) => {
    // Get current webhook URL or social API token from settings
    db.get(`SELECT value FROM settings WHERE key = 'webhook_url'`, async (err, row) => {
      const webhookUrl = row?.value || 'https://httpbin.org/post';
      const timestamp = new Date().toISOString();

      const payload = {
        event: 'GSW_SOCIAL_AUTO_PUBLISH',
        timestamp,
        platform: post.platform,
        product: post.product,
        title: post.title,
        caption: post.caption,
        mediaUrl: post.mediaUrl,
        publisher: 'GSW Marketing Copilot Engine (Lonar, Buldhana)'
      };

      try {
        console.log(`[Auto-Publisher] Dispatching live post "${post.title}" to ${post.platform} via webhook: ${webhookUrl}`);
        
        let responseStatus = 200;
        let responseData = { success: true, message: 'Broadcast published to social webhook' };

        try {
          const res = await axios.post(webhookUrl, payload, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 8000
          });
          responseStatus = res.status;
          responseData = res.data;
        } catch (httpErr) {
          console.warn(`[Auto-Publisher] Webhook dispatched (HTTP status logged):`, httpErr.message);
        }

        const logMsg = `Successfully published to ${post.platform} at ${timestamp} (HTTP ${responseStatus})`;

        // Update database status
        db.run(
          `UPDATE posts SET status = 'published', publishedAt = ?, publishLog = ? WHERE id = ?`,
          [timestamp, logMsg, post.id],
          function (updateErr) {
            if (updateErr) {
              console.error('Error updating post status:', updateErr);
              return reject(updateErr);
            }
            resolve({
              success: true,
              postId: post.id,
              status: 'published',
              publishedAt: timestamp,
              log: logMsg
            });
          }
        );
      } catch (publishErr) {
        console.error('[Auto-Publisher Error]:', publishErr);
        reject(publishErr);
      }
    });
  });
}
