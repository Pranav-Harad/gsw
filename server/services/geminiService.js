import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function generateContentWithGemini({
  apiKey,
  productName,
  language = 'mr',
  platform = 'instagram',
  tone = 'farmer-friendly',
  season = 'General',
  tractorHp = '45 HP',
  customPrompt = ''
}) {
  const currentKey = apiKey || process.env.GEMINI_API_KEY;

  const langNames = {
    mr: 'Marathi (मराठी)',
    hi: 'Hindi (हिन्दी)',
    en: 'English'
  };

  const systemInstruction = `You are the Lead Agri-Marketing AI Specialist for "Gurumauli Steel Works (GSW)", located in Lonar, Buldhana District, Maharashtra (ISO 9001:2015 certified, phone: +91 954 520 8208).
GSW manufactures premium heavy-duty agricultural implements, specifically Reversible Ploughs (Hi-Tech, Two-Bottom Hydraulic, Auto Reversible, Highlighted, and Kubota Special for 20-55 HP tractors).

Create a high-converting, authentic, respectful, and engaging social media post in ${langNames[language] || 'Marathi'}.

Requirements:
- Platform: ${platform}
- Product: ${productName} (Tractor matching: ${tractorHp})
- Tone: ${tone}
- Season/Context: ${season}
${customPrompt ? `- Custom Instructions: ${customPrompt}` : ''}

Output format: Return a clean JSON object with:
{
  "title": "A catchy headline with emojis",
  "body": "The full engaging post caption highlighting Boron steel, deep tillage, 20% diesel fuel savings, Lonar Buldhana address, WhatsApp contact +91 954 520 8208, and MahaDBT subsidy approval",
  "hashtags": "10-15 relevant regional hashtags (e.g. #GSW #नांगर #शेतकरी #MaharashtraAgriculture)",
  "reelScript": {
    "hook": "0-3 sec audio/visual hook",
    "scene1": "3-15 sec scene with tractor ploughing deep soil",
    "scene2": "15-25 sec farmer testimonial",
    "cta": "25-30 sec call to action"
  }
}`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${currentKey}`;
    
    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [
              {
                text: `${systemInstruction}\n\nReturn only valid JSON.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json"
        }
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000
      }
    );

    const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (rawText) {
      try {
        const parsed = JSON.parse(rawText);
        return {
          ...parsed,
          source: 'Live Google Gemini 1.5 Flash API',
          language
        };
      } catch (parseErr) {
        return {
          title: `🚜 ${productName} (${tractorHp})`,
          body: rawText,
          hashtags: '#GSW #Plough #KrishiYantra #MaharashtraFarmers',
          source: 'Live Google Gemini 1.5 Flash API (Text Format)',
          language
        };
      }
    }
  } catch (err) {
    console.warn('Gemini API live call failed or timed out, returning domain-aware generation. Error:', err.message);
  }

  // Fallback domain-aware AI generation if key is invalid or offline
  return getSmartFallbackContent({ productName, language, platform, tone, season, tractorHp, customPrompt });
}

function getSmartFallbackContent({ productName, language, platform, tone, season, tractorHp, customPrompt }) {
  if (language === 'mr') {
    return {
      title: `🚜 ${tractorHp} ट्रॅक्टरसाठी अव्वल पर्याय — ${productName}`,
      body: `🌾 **शेतकरी मित्रांनो, शेताच्या खोल आणि कसदार नांगरणीसाठी निवडा गुरमाऊली स्टील वर्क्स (GSW), लोणार निर्मित ${productName}!** 🚜

✨ **प्रमुख वैशिष्ट्ये:**
✅ १२ ते १४ इंच खोल आणि स्वच्छ नांगरणी (काळी कसदार माती व कठीण जमिनीसाठी)
✅ स्पेशल बोरॉन स्टील फाळ — जास्त आयुष्य आणि कमी झिज
✅ हायड्रॉलिक/मेकॅनिकल रिव्हर्सल — ट्रॅक्टरवर झिरो जर्क व २०% डिझेलची बचत
✅ ${tractorHp} च्या सर्व ट्रॅक्टर मॉडेल्ससाठी परिपूर्ण संतुलन
✅ **महाडीबीटी शासकीय कृषी अनुदान बिलिंग सुविधा उपलब्ध!**

📍 **कारखाना पत्ता:** गुरमाऊली स्टील वर्क्स, लोणार (जि. बुलढाणा - ४४३३०२)
📲 **किंमत व थेट बुकिंगसाठी त्वरित संपर्क:** +91 954 520 8208
🌐 **अधिकृत वेबसाईट:** https://gsw.net.in`,
      hashtags: '#GSW #GurumauliSteelWorks #नांगर #ReversiblePlough #शेतकरी #Buldhana #VidarbhaAgriculture #KrishiYantra #MahaDBT',
      reelScript: {
        hook: `📢 [०:०० - ०:०३ सेकंद] (दमदार ट्रॅक्टरचा आवाज) '${tractorHp} ट्रॅक्टरवर नांगर चालवताना जास्त डिझेल जळतंय का? हे पहा!'`,
        scene1: `🚜 [०:०३ - ०:१५ सेकंद] (GSW ${productName} ची १४ इंच खोल नांगरणी) 'लोणारच्या GSW चा बोरॉन स्टील नांगर एकाच फेरीत काळी माती पालथी करतो!'`,
        scene2: `🌾 [०:१५ - ०:२५ सेकंद] (समाधानी शेतकरी) 'कमीत कमी डिझेल आणि ड्रायव्हरला शून्य ताण. १५ वर्षांची गुणवत्ता!'`,
        cta: `📲 [०:२५ - ०:३० सेकंद] 'थेट कारखाना दरात मिळवण्यासाठी खाली दिलेल्या क्रमांकावर संपर्क करा!'`
      },
      source: 'GSW Agri-AI Generator (Offline Engine)',
      language: 'mr'
    };
  } else if (language === 'hi') {
    return {
      title: `🚜 आधुनिक खेती और गहरी जुताई के लिए नंबर १ — ${productName}`,
      body: `🌾 **किसान भाइयों, खेत की गहरी जुताई और शानदार पैदावार के लिए अपनाएं GSW एग्रीकल्चरल इक्विपमेंट्स!** 🚜

गुरुमाउली स्टील वर्क्स (लोनार, बुलढाणा) प्रस्तुत **${productName}**:
🔹 बोरॉन स्टील से निर्मित मजबूत शेयर ब्लेड्स
🔹 हाइड्रोलिक रिवर्सल सिस्टम — ट्रैक्टर पर शून्य झटका और २०% तक ईंधन की बचत
🔹 ${tractorHp} के सभी प्रमुख ट्रैक्टर्स के लिए परफेक्ट!
🔹 सरकारी कृषि सब्सिडी कोटेशन एवं बिलिंग सुविधा उपलब्ध।

📍 **निर्माता:** गुरुमाउली स्टील वर्क्स, लोनार (बुलढाणा - ४४३३०२)
📞 **फैक्ट्री डायरेक्ट बुकिंग एवं पूछताछ:** +91 954 520 8208
🌐 **वेबसाइट:** https://gsw.net.in`,
      hashtags: '#GSW #AgriculturalMachinery #ReversiblePlough #Kisan #IndianFarming #TractorTools #Buldhana',
      source: 'GSW Agri-AI Generator (Offline Engine)',
      language: 'hi'
    };
  } else {
    return {
      title: `Engineered for Maximum Soil Tillage Efficiency — ${productName}`,
      body: `🚜 **Empowering Modern Indian Agriculture with Precision Engineering!**

Upgrade your farm preparation with the **${productName}** manufactured by **Gurumauli Steel Works (GSW)**, Lonar.

🌟 **Key Engineering Highlights:**
• Heavy-duty Boron steel shares for 12-14 inch deep soil turnover
• Hydraulic flip mechanism ensuring zero jerk on tractor lift
• Up to 20% diesel fuel efficiency
• Tractor Compatibility: ${tractorHp}
• Eligible for Government Agriculture Subsidy Invoicing

📍 **Plant Location:** Lonar, Buldhana District, Maharashtra
📲 **Direct Factory Inquiries:** +91 954 520 8208
🌐 **Explore Catalog:** https://gsw.net.in`,
      hashtags: '#AgriMachinery #GSW #PloughManufacturer #SmartFarming #TractorImplements #AgricultureIndia',
      source: 'GSW Agri-AI Generator (Offline Engine)',
      language: 'en'
    };
  }
}
