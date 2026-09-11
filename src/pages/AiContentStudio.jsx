import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  CalendarPlus, 
  MessageSquare, 
  Tractor, 
  Languages, 
  FileVideo, 
  Layers, 
  Send, 
  Share2, 
  RefreshCw, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  ThumbsUp, 
  Sliders 
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, WhatsAppIcon } from '../components/SocialIcons';
import { GSW_PRODUCTS, MARKETING_SEASONS, GSW_COMPANY_INFO } from '../data/gswCatalog';
import { AI_LANGUAGES, CONTENT_TONES, PLATFORMS } from '../services/aiGenerator';
import { apiClient } from '../services/apiClient';
import confetti from 'canvas-confetti';

export default function AiContentStudio({ onSchedulePost }) {
  const [selectedProduct, setSelectedProduct] = useState(GSW_PRODUCTS[0].name);
  const [language, setLanguage] = useState('mr');
  const [platform, setPlatform] = useState('instagram');
  const [tone, setTone] = useState('farmer-friendly');
  const [season, setSeason] = useState('kharif-prep');
  const [tractorHp, setTractorHp] = useState('45 HP');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initial output state
  const [generatedOutput, setGeneratedOutput] = useState({
    title: "🚜 ४५ HP ट्रॅक्टरसाठी अव्वल पर्याय — GSW Hi Tech Reversible Plough",
    body: `🌾 **शेतकरी मित्रांनो, शेताच्या खोल आणि कसदार नांगरणीसाठी निवडा गुरमाऊली स्टील वर्क्स (GSW), लोणार निर्मित GSW Hi Tech Reversible Plough!** 🚜\n\n✨ **प्रमुख वैशिष्ट्ये:**\n✅ १२ ते १४ इंच खोल आणि स्वच्छ नांगरणी (काळी कसदार माती व कठीण जमिनीसाठी)\n✅ स्पेशल बोरॉन स्टील फाळ — जास्त आयुष्य आणि कमी झिज\n✅ हायड्रॉलिक/मेकॅनिकल रिव्हर्सल — ट्रॅक्टरवर झिरो जर्क व २०% डिझेलची बचत\n✅ ४५ HP च्या सर्व ट्रॅक्टर मॉडेल्ससाठी परिपूर्ण संतुलन\n✅ **महाडीबीटी शासकीय कृषी अनुदान बिलिंग सुविधा उपलब्ध!**\n\n📍 **कारखाना पत्ता:** गुरमाऊली स्टील वर्क्स, लोणार (जि. बुलढाणा - ४४३३०२)\n📲 **किंमत व थेट बुकिंगसाठी त्वरित संपर्क:** +91 954 520 8208\n🌐 **अधिकृत वेबसाईट:** https://gsw.net.in`,
    hashtags: "#GSW #GurumauliSteelWorks #नांगर #ReversiblePlough #शेतकरी #Buldhana #VidarbhaAgriculture #KrishiYantra #MahaDBT",
    source: "Google Gemini AI Engine",
    reelScript: {
      hook: "📢 [०:०० - ०:०३ सेकंद] '४५ HP ट्रॅक्टरवर नांगर चालवताना जास्त डिझेल जळतंय का? हे पहा!'",
      scene1: "🚜 [०:०३ - ०:१५ सेकंद] 'लोणारच्या GSW चा ओरिजिनल बोरॉन स्टील नांगर एकाच फेरीत काळी माती पालथी करतो!'",
      scene2: "🌾 [०:१५ - ०:२५ सेकंद] 'कमीत कमी डिझेल आणि ड्रायव्हरला शून्य ताण. १५ वर्षांची गुणवत्ता!'",
      cta: "📲 [०:२५ - ०:३० सेकंद] 'थेट कारखाना दरात मिळवण्यासाठी त्वरित संपर्क करा!'"
    }
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await apiClient.generateAiContent({
        productName: selectedProduct,
        language,
        platform,
        tone,
        season: MARKETING_SEASONS.find(s => s.id === season)?.name || "General",
        tractorHp,
        customPrompt
      });
      setGeneratedOutput(result);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 } });
    } catch (err) {
      console.error('Generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const fullText = `${generatedOutput.title}\n\n${generatedOutput.body}\n\n${generatedOutput.hashtags}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCalendar = () => {
    const currentProd = GSW_PRODUCTS.find(p => p.name === selectedProduct) || GSW_PRODUCTS[0];
    onSchedulePost({
      title: generatedOutput.title,
      language,
      platform,
      product: selectedProduct,
      caption: `${generatedOutput.body}\n\n${generatedOutput.hashtags}`,
      mediaUrl: currentProd.image
    });
  };

  const activeProductData = GSW_PRODUCTS.find(p => p.name === selectedProduct) || GSW_PRODUCTS[0];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Live Google Gemini AI Engine
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">AI Content Studio</h2>
          <p className="text-xs text-slate-400 mt-1">
            Generate authentic regional agricultural campaigns for 5 real GSW Reversible Ploughs in Marathi, Hindi & English.
          </p>
        </div>

        {/* Language Quick Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-2xl shrink-0 self-start md:self-auto">
          {AI_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                language === lang.code
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{lang.icon}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Parameter Controls */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" /> Campaign Parameters
            </h3>
            <span className="text-[11px] text-emerald-400 font-mono">Gemini 1.5 Flash</span>
          </div>

          {/* 1. Target Machine / Product */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              1. Select Real GSW Implement
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-medium focus:outline-none focus:border-emerald-500 transition-colors"
            >
              {GSW_PRODUCTS.map((prod) => (
                <option key={prod.id} value={prod.name}>
                  {prod.name} ({prod.tractorHp})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Platform Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              2. Target Social Media Platform
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((plat) => {
                const isSelected = platform === plat.id;
                return (
                  <button
                    key={plat.id}
                    type="button"
                    onClick={() => setPlatform(plat.id)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-300 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {plat.id === 'instagram' && <InstagramIcon className="w-4 h-4 text-pink-400" />}
                    {plat.id === 'facebook' && <FacebookIcon className="w-4 h-4 text-blue-400" />}
                    {plat.id === 'youtube' && <YoutubeIcon className="w-4 h-4 text-red-400" />}
                    {plat.id === 'whatsapp' && <WhatsAppIcon className="w-4 h-4 text-green-400" />}
                    <span>{plat.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Tone & Season */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                3. Content Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 font-medium focus:outline-none focus:border-emerald-500"
              >
                {CONTENT_TONES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                4. Season / Occasion
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 font-medium focus:outline-none focus:border-emerald-500"
              >
                {MARKETING_SEASONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Tractor HP & Custom prompt */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              5. Highlight Tractor Capacity & Model
            </label>
            <div className="flex gap-2">
              {['35 HP', '45 HP', '50 HP', '55 HP+'].map((hp) => (
                <button
                  key={hp}
                  type="button"
                  onClick={() => setTractorHp(hp)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    tractorHp === hp
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {hp}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Custom Marketing Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Highlight MahaDBT subsidy approval, 100% trash coverage, Lonar factory visit..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 placeholder-slate-400"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Invoking Live Gemini LLM...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Live AI Regional Content</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Live Interactive Mockup & Script Studio */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-sm font-bold text-white">Live Channel Post Preview</h3>
              {generatedOutput.source && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono">
                  {generatedOutput.source}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Caption'}</span>
              </button>

              <button
                onClick={handleAddToCalendar}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>Schedule to Calendar</span>
              </button>
            </div>
          </div>

          {/* Social Platform Mockup Render */}
          <div className="max-w-md mx-auto w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Mockup Header */}
            <div className="p-3.5 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs">
                  GSW
                </div>
                <div>
                  <div className="font-bold text-xs text-white flex items-center gap-1">
                    gurumaulisteelworks
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-[9px] flex items-center justify-center text-white">✓</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Lonar, Buldhana (Maharashtra)</div>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono">Sponsored</span>
            </div>

            {/* Real GSW Product Image Card */}
            <div className="relative aspect-square w-full bg-white/5 flex items-center justify-center p-4 overflow-hidden">
              <img
                src={activeProductData.image}
                alt={activeProductData.name}
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
                {activeProductData.marathiName}
              </div>
              <div className="absolute bottom-3 right-3 bg-emerald-600/90 text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-lg">
                {activeProductData.tractorHp}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-3 border-b border-slate-900 flex items-center justify-between text-slate-300">
              <div className="flex items-center gap-4">
                <Heart className="w-5 h-5 hover:text-red-500 cursor-pointer" />
                <MessageCircle className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
                <Share2 className="w-5 h-5 hover:text-emerald-400 cursor-pointer" />
              </div>
              <Bookmark className="w-5 h-5 hover:text-emerald-400 cursor-pointer" />
            </div>

            {/* Caption & Content Body */}
            <div className="p-4 space-y-2.5 max-h-60 overflow-y-auto text-xs">
              <div className="font-semibold text-slate-200">{generatedOutput.title}</div>
              <div className="text-slate-300 whitespace-pre-line leading-relaxed font-normal">
                {generatedOutput.body}
              </div>
              <div className="text-emerald-400/90 font-medium">{generatedOutput.hashtags}</div>
            </div>
          </div>

          {/* YouTube / Reel Script Storyboard if available */}
          {generatedOutput.reelScript && (
            <div className="bg-slate-900/90 border border-red-500/20 rounded-2xl p-4 mt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-red-400 mb-2">
                <FileVideo className="w-4 h-4" /> Video Reel Storyboard (Generated by AI)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-emerald-400">Hook:</span> {generatedOutput.reelScript.hook}
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-emerald-400">Scene 1:</span> {generatedOutput.reelScript.scene1}
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-emerald-400">Scene 2:</span> {generatedOutput.reelScript.scene2}
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-emerald-400">CTA:</span> {generatedOutput.reelScript.cta}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
