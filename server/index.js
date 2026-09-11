import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';
import { generateContentWithGemini } from './services/geminiService.js';
import { publishPostToChannel } from './services/publisherService.js';
import { initBackgroundScheduler } from './services/scheduler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Background Auto-Publishing Cron Worker
initBackgroundScheduler();

// --- 1. AI Content Generation Route (Live Google Gemini LLM) ---
app.post('/api/ai/generate', async (req, res) => {
  try {
    const { productName, language, platform, tone, season, tractorHp, customPrompt, apiKey } = req.body;
    
    // Retrieve stored Gemini API key if not passed in body
    let keyToUse = apiKey;
    if (!keyToUse) {
      const row = await new Promise((resolve) => {
        db.get(`SELECT value FROM settings WHERE key = 'gemini_api_key'`, (err, r) => resolve(r));
      });
      keyToUse = row?.value || process.env.GEMINI_API_KEY;
    }

    const output = await generateContentWithGemini({
      apiKey: keyToUse,
      productName,
      language,
      platform,
      tone,
      season,
      tractorHp,
      customPrompt
    });

    res.json({ success: true, data: output });
  } catch (err) {
    console.error('AI generation API error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- 2. Posts REST API (Real SQLite DB) ---
app.get('/api/posts', (req, res) => {
  db.all(`SELECT * FROM posts ORDER BY createdAt DESC`, (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, data: rows });
  });
});

app.post('/api/posts', (req, res) => {
  const { id, title, language, platform, product, caption, mediaUrl, scheduledDate, scheduledTime, status } = req.body;
  const postId = id || `post-${Date.now()}`;

  const stmt = db.prepare(`
    INSERT INTO posts (id, title, language, platform, product, caption, mediaUrl, scheduledDate, scheduledTime, status, likes, shares, reach)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0)
  `);

  stmt.run(
    postId,
    title,
    language || 'mr',
    platform || 'instagram',
    product,
    caption,
    mediaUrl,
    scheduledDate,
    scheduledTime,
    status || 'scheduled',
    function (err) {
      if (err) return res.status(500).json({ success: false, error: err.message });
      res.json({ success: true, message: 'Post saved to database queue', id: postId });
    }
  );
  stmt.finalize();
});

// Real Direct Force Publish Now Trigger
app.post('/api/posts/:id/publish-now', (req, res) => {
  const postId = req.params.id;
  db.get(`SELECT * FROM posts WHERE id = ?`, async (err, post) => {
    if (err || !post) return res.status(404).json({ success: false, error: 'Post not found' });

    try {
      const publishReceipt = await publishPostToChannel(post);
      res.json({ success: true, receipt: publishReceipt });
    } catch (pubErr) {
      res.status(500).json({ success: false, error: pubErr.message });
    }
  });
});

app.delete('/api/posts/:id', (req, res) => {
  db.run(`DELETE FROM posts WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, message: 'Post deleted' });
  });
});

// --- 3. Leads CRM REST API ---
app.get('/api/leads', (req, res) => {
  db.all(`SELECT * FROM leads ORDER BY createdAt DESC`, (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, data: rows });
  });
});

app.post('/api/leads', (req, res) => {
  const { name, phone, district, tractorModel, interestedProduct, source, status, priority, estimatedBudget, notes } = req.body;
  const leadId = `lead-${Date.now()}`;
  const dateAdded = new Date().toISOString().split('T')[0];

  const stmt = db.prepare(`
    INSERT INTO leads (id, name, phone, district, tractorModel, interestedProduct, source, status, priority, estimatedBudget, dateAdded, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    leadId,
    name,
    phone,
    district,
    tractorModel,
    interestedProduct,
    source || 'Digital Campaign',
    status || 'New Lead',
    priority || 'High',
    estimatedBudget || '₹1,15,000',
    dateAdded,
    notes || '',
    function (err) {
      if (err) return res.status(500).json({ success: false, error: err.message });
      res.json({ success: true, message: 'Lead added to CRM', id: leadId });
    }
  );
  stmt.finalize();
});

app.put('/api/leads/:id', (req, res) => {
  const { status, notes } = req.body;
  db.run(
    `UPDATE leads SET status = COALESCE(?, status), notes = COALESCE(?, notes) WHERE id = ?`,
    [status, notes, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ success: false, error: err.message });
      res.json({ success: true, message: 'Lead updated' });
    }
  );
});

// --- 4. Settings & Live Config API ---
app.get('/api/settings', (req, res) => {
  db.all(`SELECT * FROM settings`, (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    const settingsObj = {};
    rows.forEach(r => settingsObj[r.key] = r.value);
    res.json({ success: true, data: settingsObj });
  });
});

app.post('/api/settings', (req, res) => {
  const { key, value } = req.body;
  db.run(
    `INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    [key, value],
    function (err) {
      if (err) return res.status(500).json({ success: false, error: err.message });
      res.json({ success: true, message: `Setting ${key} updated` });
    }
  );
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 GSW Marketing Copilot Backend Server Live on Port ${PORT}`);
  console.log(`📡 REST API Endpoints: http://localhost:${PORT}/api/`);
  console.log(`🤖 Gemini API Key configured`);
  console.log(`====================================================`);
});
