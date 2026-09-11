import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Tractor, 
  Layers,
  Send,
  Trash2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, WhatsAppIcon } from '../components/SocialIcons';
import { GSW_PRODUCTS } from '../data/gswCatalog';
import { apiClient } from '../services/apiClient';
import confetti from 'canvas-confetti';

export default function ContentCalendar({ posts, onAddPost, onRefreshPosts }) {
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [publishingId, setPublishingId] = useState(null);

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newPlatform, setNewPlatform] = useState('instagram');
  const [newProduct, setNewProduct] = useState(GSW_PRODUCTS[0].name);
  const [newDate, setNewDate] = useState('2026-09-18');
  const [newTime, setNewTime] = useState('07:30 AM');
  const [newCaption, setNewCaption] = useState('');

  const filteredPosts = posts.filter(post => {
    if (filterPlatform !== 'all' && post.platform !== filterPlatform) return false;
    if (filterStatus !== 'all' && post.status !== filterStatus) return false;
    return true;
  });

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const prod = GSW_PRODUCTS.find(p => p.name === newProduct) || GSW_PRODUCTS[0];
    const postData = {
      title: newTitle || `${newProduct} Campaign`,
      platform: newPlatform,
      product: newProduct,
      scheduledDate: newDate,
      scheduledTime: newTime,
      caption: newCaption || `High-performance ${newProduct} for modern farming. Contact GSW Lonar!`,
      status: 'scheduled',
      mediaUrl: prod.image
    };

    await onAddPost(postData);
    setShowAddModal(false);
    setNewTitle('');
    setNewCaption('');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  };

  const handlePublishNow = async (postId) => {
    setPublishingId(postId);
    try {
      await apiClient.publishPostNow(postId);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      if (onRefreshPosts) onRefreshPosts();
    } catch (err) {
      alert('Publishing error: ' + err.message);
    } finally {
      setPublishingId(null);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Delete this post from the scheduling database?')) return;
    try {
      await apiClient.deletePost(postId);
      if (onRefreshPosts) onRefreshPosts();
    } catch (err) {
      alert('Delete error: ' + err.message);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <CalendarIcon className="w-3.5 h-3.5" /> Full-Stack Omnichannel Scheduler
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Content Calendar & Live Queue</h2>
          <p className="text-xs text-slate-400 mt-1">
            Persisted in SQLite database with automated background worker executing live social broadcasts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Post</span>
          </button>
        </div>
      </div>

      {/* Agri-Timing Intelligence Tip */}
      <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 flex items-start gap-3 bg-emerald-950/20">
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
          <Clock className="w-4 h-4" />
        </div>
        <div className="text-xs">
          <span className="font-bold text-emerald-300">Live Auto-Publish Engine: </span>
          <span className="text-slate-300">
            Posts scheduled for today are automatically published by the background worker. You can also click <strong>"Publish Now"</strong> on any post below to trigger an immediate live webhook broadcast.
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        {/* Platform Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['all', 'instagram', 'facebook', 'youtube', 'whatsapp'].map((plat) => (
            <button
              key={plat}
              onClick={() => setFilterPlatform(plat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                filterPlatform === plat
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          {['all', 'scheduled', 'published'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div>
              {/* Card Image Banner */}
              <div className="h-48 bg-white/5 relative overflow-hidden flex items-center justify-center p-3">
                <img src={post.mediaUrl} alt={post.title} className="max-w-full max-h-full object-contain drop-shadow-lg" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    {post.platform === 'instagram' && <InstagramIcon className="w-3 h-3 text-pink-400" />}
                    {post.platform === 'facebook' && <FacebookIcon className="w-3 h-3 text-blue-400" />}
                    {post.platform === 'youtube' && <YoutubeIcon className="w-3 h-3 text-red-400" />}
                    {post.platform === 'whatsapp' && <WhatsAppIcon className="w-3 h-3 text-green-400" />}
                    <span>{post.platform}</span>
                  </span>
                </div>

                <span
                  className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    post.status === 'published'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-amber-500/90 text-slate-950'
                  }`}
                >
                  {post.status === 'published' ? 'Published' : 'Scheduled'}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300 font-medium">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> {post.scheduledDate} • {post.scheduledTime}
                  </span>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-slate-400 hover:text-red-400 transition-colors p-1"
                    title="Delete Post"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="font-bold text-sm text-slate-100 line-clamp-2 leading-snug">
                  {post.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {post.caption}
                </p>

                {post.publishLog && (
                  <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-[10px] text-emerald-300 font-mono truncate">
                    📡 {post.publishLog}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 pt-3 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
              <span className="truncate max-w-[130px] text-emerald-400 font-medium text-[11px]">
                {post.product}
              </span>
              <div className="flex items-center gap-2">
                {post.status === 'scheduled' && (
                  <button
                    onClick={() => handlePublishNow(post.id)}
                    disabled={publishingId === post.id}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    {publishingId === post.id ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <Send className="w-3 h-3" />
                    )}
                    <span>{publishingId === post.id ? 'Publishing...' : 'Publish Now'}</span>
                  </button>
                )}
                {post.status === 'published' && (
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Live
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Post Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-emerald-400" /> Schedule Social Post to Database
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Post Title / Campaign Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GSW Hi Tech Reversible Plough Tillage Demo"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Channel</label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="youtube">YouTube</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Target Implement</label>
                  <select
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    {GSW_PRODUCTS.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Time</label>
                  <input
                    type="text"
                    value={newTime}
                    placeholder="07:30 AM"
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Caption / Content</label>
                <textarea
                  rows={3}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Paste or write your caption here..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl shadow-md cursor-pointer"
                >
                  Save to SQLite Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
