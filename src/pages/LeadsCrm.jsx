import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Tractor, 
  Search, 
  Filter, 
  FileText, 
  CheckCircle2, 
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { GSW_PRODUCTS, GSW_COMPANY_INFO } from '../data/gswCatalog';
import confetti from 'canvas-confetti';

export default function LeadsCrm({ leads, onAddLead, onUpdateLeadStatus }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New lead form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Buldhana');
  const [tractorModel, setTractorModel] = useState('Mahindra 575 DI (45 HP)');
  const [interestedProduct, setInterestedProduct] = useState(GSW_PRODUCTS[0].name);
  const [source, setSource] = useState('Instagram Ad Campaign');
  const [notes, setNotes] = useState('');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.tractorModel.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedStatus !== 'all' && lead.status !== selectedStatus) return false;
    return matchesSearch;
  });

  const handleCreateLead = async (e) => {
    e.preventDefault();
    await onAddLead({
      name,
      phone,
      district,
      tractorModel,
      interestedProduct,
      source,
      status: 'New Lead',
      priority: 'High',
      estimatedBudget: '₹1,15,000',
      notes: notes || 'Direct digital inquiry via social ad campaign.'
    });
    setShowAddModal(false);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    setName('');
    setPhone('');
    setNotes('');
  };

  const generateWhatsAppUrl = (lead) => {
    const message = `नमस्कार ${lead.name} जी! 🙏

आम्ही **गुरमाऊली स्टील वर्क्स (GSW), लोणार (जि. बुलढाणा)** तर्फे संपर्क करत आहोत. 

आपण आमच्या **${lead.interestedProduct}** बद्दल केलेल्या चौकशीसाठी धन्यवाद. 🚜

🔹 आपल्या **${lead.tractorModel}** ट्रॅक्टरसाठी हे अवजार १००% परिपूर्ण आहे.
🔹 स्पेशल बोरॉन स्टीलचे मजबूत फाळ व २०% डिझेलची बचत.
🔹 **महाडीबीटी शासकीय कृषी अनुदान बिलिंग उपलब्ध!**

📍 **कारखाना पत्ता:** गुरमाऊली स्टील वर्क्स, लोणार (जि. बुलढाणा - ४४३३०२)
📞 **कॉल/चौकशी:** ${GSW_COMPANY_INFO.phone}
🌐 **अधिकृत वेबसाईट:** https://gsw.net.in

आपल्याला अवजाराचे कोटेशन आणि प्रत्यक्ष शेतातील कामाचा व्हिडिओ पाठवू का? कृपया 'होय' लिहून पाठवा.`;

    return `https://wa.me/91${lead.phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" /> SQLite Persistent CRM Pipeline
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">WhatsApp & Farmer Leads CRM</h2>
          <p className="text-xs text-slate-400 mt-1">
            Capture, qualify, and convert agricultural machinery inquiries directly over WhatsApp in Marathi.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Farmer Lead</span>
        </button>
      </div>

      {/* CRM Search & Filters */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by farmer name, district, tractor HP, or phone..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {['all', 'New Lead', 'Quote Sent', 'Demo Booked', 'Won / Closed'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedStatus === st
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {st === 'all' ? 'All Leads' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table / Cards */}
      <div className="space-y-3">
        {filteredLeads.map((lead) => {
          const waLink = generateWhatsAppUrl(lead);

          return (
            <div
              key={lead.id}
              className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
            >
              {/* Farmer & Tractor Details */}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-100">{lead.name}</h4>
                  <span className="text-[11px] px-2 py-0.5 rounded-md font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {lead.source}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30">
                    {lead.estimatedBudget}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> +91 {lead.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {lead.district}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-slate-300">
                    <Tractor className="w-3.5 h-3.5 text-amber-400" /> {lead.tractorModel}
                  </span>
                </div>

                <div className="text-xs text-slate-300 font-medium pt-1">
                  Implement Inquired: <span className="text-emerald-300">{lead.interestedProduct}</span>
                </div>

                {lead.notes && (
                  <p className="text-[11px] text-slate-400 italic bg-slate-950/40 px-2.5 py-1 rounded-lg border border-slate-800/80 inline-block">
                    💬 Note: {lead.notes}
                  </p>
                )}
              </div>

              {/* Status Selector & WhatsApp Trigger */}
              <div className="flex flex-wrap items-center gap-3 self-stretch lg:self-center justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800">
                {/* Status Dropdown */}
                <select
                  value={lead.status}
                  onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="New Lead">🟡 New Lead</option>
                  <option value="Quote Sent">🔵 Quote Sent</option>
                  <option value="Demo Booked">🟣 Demo Booked</option>
                  <option value="Won / Closed">🟢 Won / Closed</option>
                </select>

                {/* Direct WhatsApp Pre-filled Action */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Send WhatsApp Quote</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" /> Add New Farmer Inquiry
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Farmer / Dealer Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patil"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">WhatsApp Phone (10 digits)</label>
                  <input
                    type="tel"
                    required
                    placeholder="9823456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">District / Taluka</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Buldhana / Lonar"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Tractor Model & HP</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Swaraj 744 (48 HP)"
                    value={tractorModel}
                    onChange={(e) => setTractorModel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Implement Inquired</label>
                  <select
                    value={interestedProduct}
                    onChange={(e) => setInterestedProduct(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    {GSW_PRODUCTS.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Inquiry Source</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Instagram Ad Campaign">Instagram Ad Campaign</option>
                  <option value="Facebook Video Ad">Facebook Video Ad</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                  <option value="WhatsApp Direct">WhatsApp Direct</option>
                  <option value="Website Form (gsw.net.in)">Website Form (gsw.net.in)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Farmer Notes / Requirements</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Needs MahaDBT subsidy quotation, black cotton soil..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-slate-100 focus:outline-none focus:border-emerald-500"
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
                  Save to SQLite CRM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
