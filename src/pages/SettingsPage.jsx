import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Key, 
  Globe, 
  CheckCircle2, 
  RefreshCw, 
  Send, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  Sliders,
  Database
} from 'lucide-react';
import { apiClient } from '../services/apiClient';
import confetti from 'canvas-confetti';

export default function SettingsPage() {
  const [geminiKey, setGeminiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('https://webhook.site/sample-gsw-auto-post');
  const [autoPublish, setAutoPublish] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testingAi, setTestingAi] = useState(false);
  const [aiTestResult, setAiTestResult] = useState(null);
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [webhookResult, setWebhookResult] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      const data = await apiClient.getSettings();
      if (data.gemini_api_key) setGeminiKey(data.gemini_api_key);
      if (data.webhook_url) setWebhookUrl(data.webhook_url);
      if (data.auto_publish_enabled !== undefined) setAutoPublish(data.auto_publish_enabled === 'true');
    }
    loadSettings();
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await apiClient.updateSetting('gemini_api_key', geminiKey);
      await apiClient.updateSetting('webhook_url', webhookUrl);
      await apiClient.updateSetting('auto_publish_enabled', String(autoPublish));
      setSaveSuccess(true);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save settings: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestAi = async () => {
    setTestingAi(true);
    setAiTestResult(null);
    try {
      const res = await apiClient.generateAiContent({
        apiKey: geminiKey,
        productName: 'GSW Hi Tech Reversible Plough',
        language: 'mr',
        platform: 'instagram',
        tractorHp: '45 HP'
      });
      setAiTestResult({
        success: true,
        title: res.title,
        source: res.source || 'Live Google Gemini 1.5 Flash API'
      });
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    } catch (err) {
      setAiTestResult({
        success: false,
        error: err.message
      });
    } finally {
      setTestingAi(false);
    }
  };

  const handleTestWebhook = async () => {
    setTestingWebhook(true);
    setWebhookResult(null);
    try {
      // Create a test payload directly
      const res = await apiClient.savePost({
        title: '🔴 LIVE TEST BROADCAST: GSW Hi Tech Reversible Plough',
        language: 'mr',
        platform: 'instagram',
        product: 'GSW Hi Tech Reversible Plough',
        caption: 'Live test auto-publish broadcast from GSW Marketing Copilot to social webhook endpoint.',
        mediaUrl: '/products/gsw_hi_tech_plough.png',
        scheduledDate: new Date().toISOString().split('T')[0],
        scheduledTime: 'NOW',
        status: 'scheduled'
      });

      // Immediately publish
      const publishRes = await apiClient.publishPostNow(res.id);
      setWebhookResult({
        success: true,
        message: 'Live test post successfully dispatched to webhook and updated in database!',
        receipt: publishRes.receipt
      });
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.7 } });
    } catch (err) {
      setWebhookResult({
        success: false,
        error: err.message
      });
    } finally {
      setTestingWebhook(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5" /> Full-Stack Live Engine Config
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">API Settings & Live Integrations</h2>
        <p className="text-xs text-slate-400 mt-1">
          Manage your live Google Gemini API keys, social media webhooks, and background auto-publishing workers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Settings Form */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-slate-800 space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Key className="w-4 h-4 text-emerald-400" /> API Keys & Webhook Endpoints
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            {/* 1. Gemini API Key */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Google Gemini API Key</span>
                <span className="text-emerald-400 text-[11px]">Free Tier Active</span>
              </label>
              <input
                type="password"
                required
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono text-xs focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Powers real-time multilingual post generation in Marathi, Hindi & English.
              </p>
            </div>

            {/* 2. Social Auto-Publishing Webhook */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Social Auto-Publish Webhook URL</span>
                <span className="text-blue-400 text-[11px]">Make.com / Zapier / Custom</span>
              </label>
              <input
                type="url"
                required
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://hook.eu1.make.com/..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono text-xs focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                The backend scheduler sends live HTTP POST payloads to this URL to auto-publish on Facebook/Instagram.
              </p>
            </div>

            {/* 3. Auto-publish toggle */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-200">Background Auto-Publishing Worker</div>
                <div className="text-[11px] text-slate-400">Node-cron checks for due posts every 60 seconds</div>
              </div>
              <input
                type="checkbox"
                checked={autoPublish}
                onChange={(e) => setAutoPublish(e.target.checked)}
                className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
              />
            </div>

            {/* Submit */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{saveSuccess ? 'Settings Saved to DB!' : 'Save Configuration'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Live Diagnostics & Testing Suite */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-slate-800 space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Live Integration Diagnostics
          </h3>

          {/* Test 1: Gemini AI Live Request */}
          <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Test Live Gemini LLM Request
                </h4>
                <p className="text-[11px] text-slate-400">Makes an actual API call to Google Gemini 1.5 Flash</p>
              </div>
              <button
                onClick={handleTestAi}
                disabled={testingAi}
                className="bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {testingAi ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Test Live AI</span>
              </button>
            </div>

            {aiTestResult && (
              <div className={`p-3 rounded-xl text-xs font-mono border ${aiTestResult.success ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-red-950/60 border-red-500/40 text-red-300'}`}>
                {aiTestResult.success ? (
                  <div>
                    <div className="font-bold text-white">✅ Connection Successful:</div>
                    <div>Source: {aiTestResult.source}</div>
                    <div className="truncate mt-1 text-emerald-200">Generated: {aiTestResult.title}</div>
                  </div>
                ) : (
                  <div>❌ Failed: {aiTestResult.error}</div>
                )}
              </div>
            )}
          </div>

          {/* Test 2: Social Auto-Publish Webhook */}
          <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-white flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-400" /> Test Live Auto-Publish Webhook
                </h4>
                <p className="text-[11px] text-slate-400">Dispatches real live post payload to webhook & DB</p>
              </div>
              <button
                onClick={handleTestWebhook}
                disabled={testingWebhook}
                className="bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {testingWebhook ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Test Webhook</span>
              </button>
            </div>

            {webhookResult && (
              <div className={`p-3 rounded-xl text-xs font-mono border ${webhookResult.success ? 'bg-blue-950/60 border-blue-500/40 text-blue-300' : 'bg-red-950/60 border-red-500/40 text-red-300'}`}>
                {webhookResult.success ? (
                  <div>
                    <div className="font-bold text-white">✅ Post Dispatched & Database Updated:</div>
                    <div className="mt-0.5 text-blue-200">{webhookResult.receipt?.log}</div>
                  </div>
                ) : (
                  <div>❌ Failed: {webhookResult.error}</div>
                )}
              </div>
            )}
          </div>

          {/* Architecture Summary Card */}
          <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Database & Background Engine Status:
            </div>
            <div>• Database: <strong>SQLite (server/gsw_marketing.db)</strong> with persistent schema.</div>
            <div>• Background Cron: <strong>Active (`* * * * *`)</strong> scanning scheduled posts every minute.</div>
            <div>• Real Assets: <strong>5 Original GSW Ploughs</strong> stored in `/public/products/`.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
