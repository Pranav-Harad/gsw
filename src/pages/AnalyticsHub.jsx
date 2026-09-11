import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Share2, 
  Sparkles, 
  Smile, 
  MessageCircle, 
  FileText, 
  Download,
  CheckCircle2,
  PieChart as PieIcon,
  MapPin
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export default function AnalyticsHub({ analytics }) {
  const channelData = analytics.channelBreakdown;
  const trendData = analytics.monthlyReachTrend;
  const productData = analytics.productInterestBreakdown;

  const COLORS = ['#E1306C', '#FF0000', '#1877F2', '#25D366'];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" /> Performance & ROI Intelligence
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Social Insights & Analytics</h2>
          <p className="text-xs text-slate-400 mt-1">
            Track reach, engagement rates, regional farmer sentiment, and machinery conversion metrics.
          </p>
        </div>

        <button
          onClick={() => alert("Marketing Intelligence Report (PDF) exported successfully with GSW Lonar branding!")}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Capstone Report (PDF)</span>
        </button>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Omnichannel Impressions</div>
          <div className="text-2xl font-black text-white mt-1.5">{analytics.totalReach}</div>
          <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> {analytics.reachGrowth} vs last quarter
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Digital Qualified Leads</div>
          <div className="text-2xl font-black text-white mt-1.5">{analytics.totalLeads} Farmers</div>
          <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> {analytics.leadsGrowth} MoM
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Highest Performing Format</div>
          <div className="text-2xl font-black text-emerald-400 mt-1.5">Shorts & Reels</div>
          <div className="text-xs text-slate-400 mt-1">14-inch deep ploughing demos</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Estimated Pipeline Generated</div>
          <div className="text-2xl font-black text-white mt-1.5">{analytics.estimatedPipelineValue}</div>
          <div className="text-xs text-slate-400 mt-1">35-55 HP tractor implements</div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Reach & Inquiries Trend */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-base">Monthly Reach & Inquiries Growth</h3>
              <p className="text-xs text-slate-400 mt-0.5">Seasonal peaks during Kharif & Rabi tillage preparation</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-emerald-400 border border-emerald-500/20 font-semibold">
              Live Feed
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="reach" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#reachGradient)" name="Reach" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Platform Share Distribution */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Channel Share</h3>
            <p className="text-xs text-slate-400 mt-0.5">Where Maharashtra farmers engage</p>

            <div className="h-48 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    dataKey="share"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-2">
              {channelData.map((ch, idx) => (
                <div key={ch.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                    <span className="text-slate-300 font-medium">{ch.name}</span>
                  </div>
                  <span className="font-bold text-slate-100">{ch.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lower Row: AI Sentiment Analysis & Product Popularity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Demand Ranking */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800">
          <h3 className="font-bold text-white text-base mb-1">Implement Inquiry Demand Breakdown</h3>
          <p className="text-xs text-slate-400 mb-4">Farmer interest percentage by machinery type</p>

          <div className="space-y-3">
            {productData.map((item) => (
              <div key={item.product} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">{item.product}</span>
                  <span className="text-emerald-400">{item.interestPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    style={{ width: `${item.interestPercent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Sentiment Analysis of Farmer Comments */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" /> AI Social Sentiment & Feedback Analysis
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Automated NLP categorization of comments & inquiries</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-3.5 text-center">
              <div className="text-2xl font-black text-emerald-400">{analytics.sentimentData.positive}%</div>
              <div className="text-[11px] text-slate-300 font-semibold mt-1">Positive / Trust</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Praise for boron steel & durability</div>
            </div>

            <div className="bg-blue-950/40 border border-blue-500/30 rounded-2xl p-3.5 text-center">
              <div className="text-2xl font-black text-blue-400">{analytics.sentimentData.neutralInquiry}%</div>
              <div className="text-[11px] text-slate-300 font-semibold mt-1">Price Inquiries</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Asking for tractor HP match</div>
            </div>

            <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-3.5 text-center">
              <div className="text-2xl font-black text-amber-400">{analytics.sentimentData.concernsPricing}%</div>
              <div className="text-[11px] text-slate-300 font-semibold mt-1">Subsidy / Delivery</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Questions on MahaDBT window</div>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-3 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span>📍 Top Inquiring Districts: Buldhana, Jalgaon, Akola, Washim, Amravati</span>
            <span className="text-emerald-400 font-semibold">120+ Active Dealers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
