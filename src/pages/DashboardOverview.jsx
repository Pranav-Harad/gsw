import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Sparkles, 
  Calendar, 
  Share2, 
  ArrowUpRight, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  Tractor,
  Layers,
  ChevronRight
} from 'lucide-react';
import { GSW_PRODUCTS, GSW_COMPANY_INFO } from '../data/gswCatalog';

export default function DashboardOverview({ 
  analytics, 
  posts, 
  leads, 
  onNavigateToAi, 
  onNavigateToCalendar, 
  onNavigateToLeads 
}) {
  const scheduledPosts = posts.filter(p => p.status === 'scheduled');
  const activeLeads = leads.slice(0, 4);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome & Agri-Campaign Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900/90 via-slate-900 to-slate-950 p-7 border border-emerald-500/20 shadow-2xl shadow-emerald-950/40">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Kharif Pre-Sowing & Agri-Festivals Special
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
            Grow GSW's Brand Presence Across Maharashtra & Central India
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Generate high-converting agricultural social media posts in <strong>Marathi, Hindi & English</strong>, manage farmer WhatsApp inquiries, and track multi-channel ROI for Gurumauli Steel Works.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={onNavigateToAi}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch AI Content Studio</span>
            </button>
            <button
              onClick={onNavigateToLeads}
              className="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>View Farmer Leads ({leads.length})</span>
            </button>
          </div>
        </div>

        {/* Decorative Badge */}
        <div className="absolute -right-8 -bottom-8 opacity-15 pointer-events-none hidden md:block">
          <Tractor className="w-64 h-64 text-emerald-400" />
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Monthly Reach</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> {analytics.reachGrowth}
            </span>
          </div>
          <div className="text-2xl font-black text-white mt-2">{analytics.totalReach}</div>
          <div className="text-xs text-slate-400 mt-1">Across FB, Instagram & YouTube</div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
        </div>

        <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Farmer Leads</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> {analytics.leadsGrowth}
            </span>
          </div>
          <div className="text-2xl font-black text-white mt-2">{leads.length} Active</div>
          <div className="text-xs text-slate-400 mt-1">Direct inquiries via WhatsApp/Ads</div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        </div>

        <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Avg. Engagement Rate</span>
            <span className="text-emerald-400 font-semibold">+1.8% vs last mo</span>
          </div>
          <div className="text-2xl font-black text-white mt-2">{analytics.avgEngagementRate}</div>
          <div className="text-xs text-slate-400 mt-1">High video completion on Reels</div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>

        <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Estimated Pipeline</span>
            <span className="text-emerald-400 font-semibold">Tractor Implements</span>
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">{analytics.estimatedPipelineValue}</div>
          <div className="text-xs text-slate-400 mt-1">Active quote discussions</div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
        </div>
      </div>

      {/* Two Column Section: Scheduled Posts & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Upcoming Scheduled Social Posts */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" /> Upcoming Social Media Queue
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Automated campaigns prepared for regional distribution</p>
            </div>
            <button
              onClick={onNavigateToCalendar}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              Full Calendar <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {scheduledPosts.map((post) => (
              <div
                key={post.id}
                className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-800 border border-slate-700">
                    <img src={post.mediaUrl} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider bg-slate-800 text-emerald-400 border border-emerald-500/20">
                        {post.platform}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.scheduledDate} • {post.scheduledTime}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-200 text-xs mt-1 line-clamp-1">{post.title}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 font-medium">
                    Scheduled
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Targeting: Maharashtra (Buldhana, Akola, Jalgaon, Washim, Amravati)</span>
            <button onClick={onNavigateToAi} className="text-emerald-400 hover:underline font-medium">
              + Generate New Post
            </button>
          </div>
        </div>

        {/* Right: High-Priority Inquiries / WhatsApp CRM Preview */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" /> Recent Farmer Inquiries
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">High-intent leads from social ad campaigns</p>
              </div>
              <button
                onClick={onNavigateToLeads}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                All Leads <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {activeLeads.map((lead) => {
                const waText = encodeURIComponent(
                  `नमस्कार ${lead.name} जी! गुरमाऊली स्टील वर्क्स (GSW), लोणार तर्फे आम्ही आपल्या ${lead.interestedProduct} च्या चौकशीबद्दल मेसेज करत आहोत. आपल्या ${lead.tractorModel} साठी संपूर्ण कोटेशन व माहिती खालीलप्रमाणे आहे.`
                );
                return (
                  <div key={lead.id} className="bg-slate-900/80 rounded-2xl p-3.5 border border-slate-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-xs text-slate-100">{lead.name}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Tractor className="w-3 h-3 text-emerald-400" /> {lead.tractorModel} • {lead.district}
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {lead.status}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                      <span className="text-[11px] text-slate-400 truncate max-w-[180px]">
                        {lead.interestedProduct}
                      </span>
                      <a
                        href={`https://wa.me/91${lead.phone}?text=${waText}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-400" /> WhatsApp
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-center">
            <span className="text-xs text-slate-400">
              💡 1-Click WhatsApp enables instant quotation sharing in Marathi
            </span>
          </div>
        </div>
      </div>

      {/* GSW Core Products Quick Highlights */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> GSW Factory Machinery Catalog Highlights
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Manufactured at Lonar, Buldhana — ready for instant AI campaign creation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GSW_PRODUCTS.map((prod) => (
            <div key={prod.id} className="glass-card rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="h-40 rounded-xl overflow-hidden mb-3 bg-white/5 p-2 relative flex items-center justify-center">
                  <img src={prod.image} alt={prod.name} className="max-w-full max-h-full object-contain drop-shadow-md" />
                  <span className="absolute bottom-2 left-2 text-[10px] bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-emerald-400 font-bold border border-emerald-500/30">
                    {prod.tractorHp}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-100">{prod.name}</h4>
                <div className="text-xs text-emerald-400 font-medium mt-0.5">{prod.marathiName}</div>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{prod.idealFor}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">{prod.priceRange.split(' ')[0]}</span>
                <button
                  onClick={onNavigateToAi}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                >
                  Create Ad <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
