import { GSW_COMPANY_INFO, GSW_PRODUCTS } from '../data/gswCatalog';

export const AI_LANGUAGES = [
  { code: "mr", label: "मराठी (Marathi)", icon: "🚩" },
  { code: "hi", label: "हिन्दी (Hindi)", icon: "🇮🇳" },
  { code: "en", label: "English", icon: "🌐" }
];

export const CONTENT_TONES = [
  { id: "farmer-friendly", label: "Farmer Friendly & Trustworthy", desc: "Warm, respectful, highlighting durability & farmer prosperity" },
  { id: "technical", label: "Technical & Performance Focus", desc: "Specs, tractor HP, Boron steel, diesel efficiency & hydraulic tech" },
  { id: "festive-offer", label: "Festive & Discount Promotional", desc: "Urgency, limited festive discounts, subsidy guidance" },
  { id: "viral-hook", label: "Viral Reel & Curiosity Hook", desc: "Fast-paced, bold comparisons, live field challenges" }
];

export const PLATFORMS = [
  { id: "instagram", name: "Instagram (Post / Reel)", color: "from-pink-500 to-purple-600", icon: "Instagram" },
  { id: "facebook", name: "Facebook Page", color: "from-blue-600 to-blue-800", icon: "Facebook" },
  { id: "youtube", name: "YouTube Shorts / Video", color: "from-red-500 to-red-700", icon: "Youtube" },
  { id: "whatsapp", name: "WhatsApp Broadcast", color: "from-emerald-500 to-green-600", icon: "MessageSquare" }
];

// Fallback intelligent Agri-AI generator (Produces authentic regional copy without needing paid API)
export function generateAgriContent({
  productName,
  language = "mr",
  platform = "instagram",
  tone = "farmer-friendly",
  season = "General",
  tractorHp = "45 HP",
  customPrompt = ""
}) {
  const product = GSW_PRODUCTS.find(p => p.name === productName) || GSW_PRODUCTS[0];

  if (language === "mr") {
    return generateMarathiContent(product, platform, tone, season, tractorHp, customPrompt);
  } else if (language === "hi") {
    return generateHindiContent(product, platform, tone, season, tractorHp, customPrompt);
  } else {
    return generateEnglishContent(product, platform, tone, season, tractorHp, customPrompt);
  }
}

function generateMarathiContent(product, platform, tone, season, tractorHp, customPrompt) {
  let title = "";
  let body = "";
  let hashtags = "";
  let reelScript = null;

  if (platform === "youtube" || tone === "viral-hook") {
    title = `🚜 ${tractorHp} ट्रॅक्टरवर ${product.marathiName} ची ताकद! पहा प्रत्यक्ष शेतातील लाईव्ह नांगरणी`;
    body = `🔥 **शेतकरी मित्रांनो, शेताची मशागत आता होणार दुप्पट वेगाने!**

पहा ${GSW_COMPANY_INFO.name}, लोणार प्रस्तुत **${product.marathiName}** चे थेट शेतातील प्रात्यक्षिक!
👉 कमी डिझेलमध्ये १२०% जास्त काम
👉 काळी-कसदार जमिनीत १४ इंचांपर्यंत खोल नांगरणी
👉 ${product.tractorHp} ट्रॅक्टरसाठी सर्वोत्तम डिझाइन

📍 कारखाना: लोणार, जि. बुलढाणा (महाराष्ट्र)
📞 संपर्क व बुकिंग: ${GSW_COMPANY_INFO.phone}`;

    reelScript = {
      hook: "📢 [०:०० - ०:०३ सेकंद] (ट्रॅक्टरचा दमदार आवाज आणि धुराळा उडताना) 'मित्रांनो, तुमच्या ट्रॅक्टरवर नांगर चालवताना डिझेल जास्त जळतंय का? थांबा!'",
      scene1: "🚜 [०:०३ - ०:१५ सेकंद] (GSW हायड्रॉलिक रिव्हर्सिबल नांगराची स्मूथ टर्निंग आणि खोल फाळ मातीत शिरतानाचा क्लोजअप शॉट) 'पहा GSW लोणारचा ओरिजिनल बोरॉन स्टील नांगर! एकाच फेरीत १४ इंच खोल काळी माती पालथी!'",
      scene2: "🌾 [०:१५ - ०:२५ सेकंद] (हसतमुख शेतकरी ट्रॅक्टर चालवताना व थंब्स अप करताना) 'कमीत कमी डिझेल आणि ट्रॅक्टरवर झिरो जर्क ताण. १५ वर्षांचा विश्वास!'",
      cta: "📲 [०:२५ - ०:३० सेकंद] (स्क्रीनवर नंबर आणि पत्ता) 'आजच थेट कारखान्यातून ऑर्डर करण्यासाठी खाली दिलेल्या व्हॉट्सअॅप लिंकवर क्लिक करा!'"
    };
  } else if (platform === "whatsapp") {
    title = `🌾 गुरमाऊली स्टील वर्क्स — ${product.marathiName} खास ऑफर`;
    body = `🙏 **जय जिजाऊ, जय शिवराय! नमस्कार शेतकरी बंधूंनो!**

गुरमाऊली स्टील वर्क्स (GSW), लोणार घेऊन येत आहे **${product.marathiName}** वर खास थेट कारखाना सवलत! 🚜

🌟 **महत्त्वाचे फायदे:**
${product.keyFeatures.map(f => `✔️ ${f}`).join('\n')}
🚜 **सुसंगत ट्रॅक्टर:** ${product.tractorHp}
💰 **अंदाजे किंमत:** ${product.priceRange}
📜 **महाडीबीटी कृषी अनुदान कोटेशन उपलब्ध!**

📍 **पत्ता:** गुरमाऊली स्टील वर्क्स, लोणार (जि. बुलढाणा)
📞 **अधिक माहितीसाठी त्वरित संपर्क करा:** ${GSW_COMPANY_INFO.phone}
🌐 **वेबसाईट:** ${GSW_COMPANY_INFO.website}

_(हा मेसेज गरजू शेतकरी मित्रांच्या ग्रुपवर नक्की शेअर करा!)_`;
  } else {
    // Instagram / Facebook
    title = `शेतकरी बंधूंच्या पसंतीचा अव्वल नांगर — ${product.marathiName}`;
    body = `🚜 **उत्कृष्ट शेती, समृद्ध शेतकरी!** 🌾

शेतातील कसदार मशागतीसाठी निवडा **${product.marathiName}** (गुरमाऊली स्टील वर्क्स, लोणार). 

✨ **GSW च का निवडावे?**
✅ उच्च दर्जाचे बोरॉन स्टील फाळ – जास्त टिकणारे आणि मजबूत
✅ हायड्रॉलिक रिव्हर्सल सिस्टीम – ड्रायव्हरचा त्रास कमी, काम जलद
✅ २०% पर्यंत डिझेलची हमखास बचत
✅ ${product.tractorHp} क्षमतेच्या ट्रॅक्टरसाठी परिपूर्ण संतुलन

👉 ${season !== "General" ? `🎯 विशेष मोहीम: ${season}` : ""}
${customPrompt ? `💡 विशेष सूचना: ${customPrompt}` : ""}

📍 **गुरमाऊली स्टील वर्क्स**, लोणार, जि. बुलढाणा
📲 **किंमत आणि अधिक माहितीसाठी त्वरित WhatsApp करा:** ${GSW_COMPANY_INFO.phone}`;
  }

  hashtags = `#GSW #GurumauliSteelWorks #नांगर #${product.category.replace(/\s+/g, '')} #शेतकरी #कृषीमशिनरी #बुलढाणा #विदर्भ #MaharashtraFarmers #TractorImplements #MahaDBT #AgriTech`;

  return { title, body, hashtags, reelScript, language: "mr" };
}

function generateHindiContent(product, platform, tone, season, tractorHp, customPrompt) {
  let title = `🚜 आधुनिक खेती के लिए नंबर १ — ${product.name}`;
  let body = `🌾 **किसान भाइयों, खेत की गहरी जुताई और शानदार पैदावार के लिए अपनाएं GSW एग्रीकल्चरल इक्विपमेंट्स!** 🚜

गुरुमाउली स्टील वर्क्स (लोनार, महाराष्ट्र) प्रस्तुत **${product.name}**:
🔹 बोरॉन स्टील से निर्मित मजबूत शेयर ब्लेड्स
🔹 हाइड्रोलिक रिवर्सल सिस्टम — ट्रैक्टर पर शून्य झटका और ईंधन की भारी बचत
🔹 ${product.tractorHp} के सभी प्रमुख ट्रैक्टर्स (महिंद्रा, स्वराज, सोनालीका, जॉन डियर) के लिए परफेक्ट!
🔹 सरकारी कृषि सब्सिडी कोटेशन एवं बिलिंग सुविधा उपलब्ध।

📍 **निर्माता:** गुरुमाउली स्टील वर्क्स, लोनार (बुलढाणा)
📞 **फैक्ट्री डायरेक्ट बुकिंग एवं पूछताछ:** ${GSW_COMPANY_INFO.phone}
🌐 **विजिट करें:** ${GSW_COMPANY_INFO.website}`;

  let hashtags = `#GSW #AgriculturalMachinery #ReversiblePlough #Rotavator #Kisan #IndianFarming #TractorTools #Buldhana`;

  return { title, body, hashtags, language: "hi" };
}

function generateEnglishContent(product, platform, tone, season, tractorHp, customPrompt) {
  let title = `Engineered for Maximum Tillage Efficiency — ${product.name}`;
  let body = `🚜 **Empowering Modern Indian Agriculture with Precision Engineering!**

Upgrade your farm preparation with the **${product.name}** manufactured by **Gurumauli Steel Works (GSW)**, Lonar.

🌟 **Key Engineering Highlights:**
${product.keyFeatures.map(f => `• ${f}`).join('\n')}
🚜 **Tractor Compatibility:** ${product.tractorHp}
🛡️ **Quality Assurance:** ISO 9001:2015 Certified Manufacturing
📄 **Govt. Subsidy:** Eligible for State Agriculture Dept. Scheme Invoicing

📍 **Plant Location:** Lonar, Buldhana District, Maharashtra
📲 **Direct Factory Inquiries:** ${GSW_COMPANY_INFO.phone}
🌐 **Explore Catalog:** ${GSW_COMPANY_INFO.website}`;

  let hashtags = `#AgriMachinery #GSW #PloughManufacturer #SmartFarming #TractorImplements #AgricultureIndia #FarmEquipment`;

  return { title, body, hashtags, language: "en" };
}
