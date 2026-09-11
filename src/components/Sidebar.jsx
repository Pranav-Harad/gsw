import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  CalendarDays, 
  Users, 
  BarChart3, 
  Globe, 
  PhoneCall,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Key
} from 'lucide-react';
import { GSW_COMPANY_INFO } from '../data/gswCatalog';

export default function Sidebar({ activeTab, setActiveTab, leadCount, scheduledCount }) {
  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
    { id: 'ai-studio', label: 'AI Content Studio', icon: Sparkles, badge: 'Live Gemini' },
    { id: 'calendar', label: 'Content Calendar', icon: CalendarDays, badge: scheduledCount > 0 ? scheduledCount : null },
    { id: 'leads-crm', label: 'WhatsApp & Leads CRM', icon: Users, badge: leadCount > 0 ? `${leadCount} active` : null },
    { id: 'analytics', label: 'Social Insights & Analytics', icon: BarChart3, badge: '+24%' },
    { id: 'campaigns', label: 'Ad & Landing Page Hub', icon: Globe, badge: 'Live Sync' },
    { id: 'settings', label: 'API Keys & Live Webhook', icon: Key, badge: 'Active' },
  ];

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center font-black text-xl text-slate-950 shadow-lg shadow-emerald-500/20">
            GSW
          </div>
          <div>
            <h1 className="font-bold text-white text-base leading-tight tracking-tight">Marketing Copilot</h1>
            <p className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 inline" /> Gurumauli Steel Works
            </p>
          </div>
        </div>
        <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
          <span>{GSW_COMPANY_INFO.certification}</span>
          <span className="text-emerald-400 font-semibold">Lonar, MH</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1.5 flex-1">
        <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Full-Stack Engine
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-800 text-emerald-400 border border-emerald-500/20'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Official Website & Helpline Widget */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 m-3 rounded-2xl border">
        <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
          <span>Official GSW Site</span>
          <a
            href="https://gsw.net.in"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-[11px]"
          >
            gsw.net.in <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>+91 954 520 8208</span>
        </div>
      </div>
    </aside>
  );
}
