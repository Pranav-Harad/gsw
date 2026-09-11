import React, { useState } from 'react';
import { 
  Globe, 
  Sparkles, 
  ExternalLink, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Tractor, 
  CheckCircle2, 
  Copy, 
  Check,
  Send
} from 'lucide-react';
import { GSW_PRODUCTS, GSW_COMPANY_INFO, MARKETING_SEASONS } from '../data/gswCatalog';
import confetti from 'canvas-confetti';

export default function LandingPageGenerator({ onAddLeadFromLandingPage }) {
  const [campaignTitle, setCampaignTitle] = useState('GSW Bail Pola & Kharif Machinery Special 2026');
  const [selectedProduct, setSelectedProduct] = useState(GSW_PRODUCTS[0].name);
  const [discountBadge, setDiscountBadge] = useState('Special ₹5,000 Festive Discount + Free Spare Kit');
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [farmerTractor, setFarmerTractor] = useState('Mahindra 575 DI (45 HP)');
  const [submitted, setSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeProduct = GSW_PRODUCTS.find(p => p.name === selectedProduct) || GSW_PRODUCTS[0];

  const handleFarmerSubmit = (e) => {
    e.preventDefault();
    onAddLeadFromLandingPage({
      name: farmerName,
      phone: farmerPhone,
      district: 'Online Campaign (Landing Page)',
      tractorModel: farmerTractor,
      interestedProduct: selectedProduct,
      source: 'Promotional Micro-Site',
      status: 'New Lead',
      priority: 'Urgent',
      estimatedBudget: activeProduct.priceRange.split(' ')[0],
      dateAdded: new Date().toISOString().split('T')[0],
      notes: `Captured via campaign landing page: ${campaignTitle}`
    });
    setSubmitted(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      setFarmerName('');
      setFarmerPhone('');
      setSubmitted(false);
    }, 4000);
  };

  const copyCampaignUrl = () => {
    navigator.clipboard.writeText(`https://offer.gsw-marketing.com/campaign/${selectedProduct.toLowerCase().replace(/\s+/g, '-')}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <Globe className="w-3.5 h-3.5" /> High-Converting Micro-Site Builder
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Campaign Landing Page Hub</h2>
          <p className="text-xs text-slate-400 mt-1">
            Build and publish standalone promotional landing pages for Google/Facebook Ads to capture farmer leads without modifying the main website.
          </p>
        </div>

        <button
          onClick={copyCampaignUrl}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
        >
          {copiedLink ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
          <span>{copiedLink ? 'Campaign URL Copied!' : 'Copy Ad Landing Link'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Configuration Controls */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Campaign Configuration
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Campaign Headline</label>
            <input
              type="text"
              value={campaignTitle}
              onChange={(e) => setCampaignTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Featured Agricultural Implement</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            >
              {GSW_PRODUCTS.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Promotional Offer / Subsidy Banner</label>
            <input
              type="text"
              value={discountBadge}
              onChange={(e) => setDiscountBadge(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="font-bold text-emerald-400">⚡ Instant Lead Capture Sync:</div>
            <div>Any farmer submitting their details in this live preview will immediately appear in your <strong>WhatsApp & Leads CRM</strong> with full tractor details.</div>
          </div>
        </div>

        {/* Right: Live Interactive Micro-Site Preview */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              https://offer.gsw-marketing.com/campaign/special
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
              Live Preview
            </span>
          </div>

          {/* Micro-Site Content Container */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl p-6 space-y-6">
            {/* Top Banner */}
            <div className="text-center space-y-2">
              <div className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-full text-xs font-bold">
                🎁 {discountBadge}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {campaignTitle}
              </h1>
              <p className="text-xs text-emerald-400 font-medium">
                {GSW_COMPANY_INFO.name} • {GSW_COMPANY_INFO.certification} • Lonar, Buldhana
              </p>
            </div>

            {/* Product Feature Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
              <div className="aspect-video rounded-xl overflow-hidden bg-white/5 p-3 flex items-center justify-center">
                <img src={activeProduct.image} alt={activeProduct.name} className="max-w-full max-h-full object-contain drop-shadow-xl" />
              </div>
              <div className="space-y-2 text-xs">
                <h3 className="font-bold text-sm text-white">{activeProduct.name}</h3>
                <div className="text-emerald-400 font-bold text-xs">{activeProduct.marathiName}</div>
                <div className="text-slate-300">Tractor Matching: <strong>{activeProduct.tractorHp}</strong></div>
                <div className="text-slate-400 leading-relaxed">{activeProduct.idealFor}</div>
                <div className="pt-2 text-emerald-300 font-bold text-sm">
                  {activeProduct.priceRange}
                </div>
              </div>
            </div>

            {/* Direct Inquiry Form */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-emerald-500/30">
              <h4 className="font-bold text-sm text-white text-center mb-1">
                🚜 मोफत कोटेशन आणि थेट कारखाना ऑफर मिळवा!
              </h4>
              <p className="text-[11px] text-slate-400 text-center mb-4">
                Fill the quick form below to receive immediate WhatsApp details & factory discount code.
              </p>

              {submitted ? (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500 rounded-xl text-center text-xs text-emerald-300 font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>धन्यवाद! आपली चौकशी यशस्वीरित्या नोंदवली गेली आहे. GSW प्रतिनिधी लवकरच संपर्क करतील.</span>
                </div>
              ) : (
                <form onSubmit={handleFarmerSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="आपले पूर्ण नाव (Full Name)"
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="व्हॉट्सअॅप नंबर (WhatsApp No)"
                      value={farmerPhone}
                      onChange={(e) => setFarmerPhone(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="ट्रॅक्टर मॉडेल (e.g. 45 HP Mahindra)"
                      value={farmerTractor}
                      onChange={(e) => setFarmerTractor(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get Instant Factory Quote on WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
