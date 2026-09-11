import React from 'react';
import { Sparkles, Plus, Globe, MessageCircle, ExternalLink, Calendar, Search } from 'lucide-react';
import { GSW_COMPANY_INFO } from '../data/gswCatalog';

export default function TopNavbar({ onQuickGenerate, onAddLead, onOpenSchedule }) {
  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search & Status */}
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search campaigns, leads, plough models..."
            className="w-full bg-slate-800/80 border border-slate-700/60 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Social Channels Sync: <strong className="text-emerald-400">Live</strong></span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onQuickGenerate}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Generator</span>
        </button>

        <button
          onClick={onAddLead}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>New Lead</span>
        </button>

        <a
          href="https://wa.me/919545208208"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-1.5 bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/60 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp Factory Desk</span>
        </a>
      </div>
    </header>
  );
}
