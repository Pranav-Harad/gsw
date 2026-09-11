import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'gsw_marketing.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

// Initialize Schema & Default Seeds
db.serialize(() => {
  // Posts Table
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      language TEXT NOT NULL,
      platform TEXT NOT NULL,
      product TEXT NOT NULL,
      caption TEXT NOT NULL,
      mediaUrl TEXT,
      scheduledDate TEXT NOT NULL,
      scheduledTime TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'scheduled',
      likes INTEGER DEFAULT 0,
      shares INTEGER DEFAULT 0,
      reach INTEGER DEFAULT 0,
      publishedAt TEXT,
      publishLog TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Leads Table
  db.run(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      district TEXT NOT NULL,
      tractorModel TEXT NOT NULL,
      interestedProduct TEXT NOT NULL,
      source TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'New Lead',
      priority TEXT DEFAULT 'High',
      estimatedBudget TEXT,
      dateAdded TEXT NOT NULL,
      notes TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Settings Table
  db.run(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  // Seed default settings if not existing
  db.get(`SELECT value FROM settings WHERE key = 'gemini_api_key'`, (err, row) => {
    if (!row) {
      const defaultKey = process.env.GEMINI_API_KEY || '';
      db.run(`INSERT INTO settings (key, value) VALUES ('gemini_api_key', ?)`, [defaultKey]);
      db.run(`INSERT INTO settings (key, value) VALUES ('webhook_url', 'https://webhook.site/sample-gsw-auto-post')`);
      db.run(`INSERT INTO settings (key, value) VALUES ('auto_publish_enabled', 'true')`);
    }
  });

  // Seed initial real posts if table is empty
  db.get(`SELECT COUNT(*) as count FROM posts`, (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare(`
        INSERT INTO posts (id, title, language, platform, product, caption, mediaUrl, scheduledDate, scheduledTime, status, likes, shares, reach)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        'post-101',
        'उन्हाळी खोल नांगरणीसाठी GSW हाय-टेक रिव्हर्सिबल नांगर!',
        'mr',
        'instagram',
        'GSW Hi Tech Reversible Plough',
        `🚜 शेतकरी मित्रांनो, उन्हाळी खोल नांगरणीसाठी सर्वोत्तम पर्याय — **GSW हाय-टेक हायड्रॉलिक रिव्हर्सिबल नांगर!** 🌾\n\n✅ १२ ते १४ इंच खोल आणि स्वच्छ नांगरणी\n✅ हायड्रॉलिक टर्नओव्हर — झिरो जर्क व ट्रॅक्टरवर कमी ताण\n✅ २०% डिझेलची बचत आणि मजबूत बोरॉन स्टील फाळ\n✅ ३५ ते ५५ HP च्या सर्व ट्रॅक्टरसाठी योग्य!\n\n📍 गुरमाऊली स्टील वर्क्स, लोणार (जि. बुलढाणा)\n📞 अधिक माहिती व किमतीसाठी कॉल/व्हॉट्सअॅप करा: +91 954 520 8208\n\n#GSW #GurumauliSteelWorks #ReversiblePlough #नांगर #शेतकरी #MaharashtraFarmers`,
        '/products/gsw_hi_tech_plough.png',
        '2026-09-12',
        '10:30 AM',
        'scheduled',
        340,
        85,
        4800
      );

      stmt.run(
        'post-102',
        '४० ते ५० HP ट्रॅक्टरसाठी Two Bottom GSW Hydraulic Reversible Plough',
        'mr',
        'facebook',
        'Two Bottom GSW Hydraulic Reversible Plough',
        `📢 काळी कसदार मातीत निर्धोक नांगरणीसाठी **Two Bottom GSW Hydraulic Reversible Plough**! 💪\n\n🔹 ट्विन सिलिंडर स्मूथ फ्लिप\n🔹 स्पेशल कर्व्ह मोल्डबोर्ड — कचरा व गवताचे १००% मातीत गाडणे\n🔹 ४०-५० HP ट्रॅक्टरसाठी परिपूर्ण\n\n📍 गुरमाऊली स्टील वर्क्स, लोणार (जि. बुलढाणा)\n📞 संपर्क: +91 954 520 8208`,
        '/products/two_bottom_hydraulic_plough.png',
        '2026-09-15',
        '04:00 PM',
        'scheduled',
        520,
        140,
        6200
      );

      stmt.finalize();
    }
  });

  // Seed initial leads if table is empty
  db.get(`SELECT COUNT(*) as count FROM leads`, (err, row) => {
    if (row && row.count === 0) {
      const leadStmt = db.prepare(`
        INSERT INTO leads (id, name, phone, district, tractorModel, interestedProduct, source, status, priority, estimatedBudget, dateAdded, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      leadStmt.run(
        'lead-01',
        'विठ्ठलराव देशमुख (Vitthalrao Deshmukh)',
        '9823451234',
        'Buldhana (मेहेकर)',
        'Mahindra 575 DI (45 HP)',
        'GSW Hi Tech Reversible Plough',
        'Instagram Ad Campaign',
        'Quote Sent',
        'High',
        '₹1,15,000',
        '2026-09-08',
        'Wants delivery before Dussehra. Needs MahaDBT subsidy quotation document.'
      );

      leadStmt.run(
        'lead-02',
        'ज्ञानेश्वर पाटील (Dnyaneshwar Patil)',
        '9765432109',
        'Jalgaon (पाचोरा)',
        'John Deere 5050 D (50 HP)',
        'GSW Hi Tech Highlighted Reversible Plough',
        'Facebook Video Ad',
        'New Lead',
        'Urgent',
        '₹1,25,000',
        '2026-09-10',
        'Asked about heavy rocky soil compatibility.'
      );

      leadStmt.finalize();
    }
  });
});

export default db;
