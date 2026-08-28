import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface OpenRouterRequest {
  messages: ChatMessage[];
  action?: "onboard" | "refine" | "product_description" | "banner_copy" | "general";
}

const SYSTEM_PROMPTS: Record<string, string> = {
  onboard: `أنت خبير في بناء متاجر إلكترونية فريدة لمنصة تجّار السورية، مثلما يعمل bolt.new — كل متجر يجب أن يكون مختلفاً هيكلياً وبصرياً، ليس مجرد تغيير ألوان.

CRITICAL RULE: You are strictly forbidden from using a global default template or repeating identical content across different merchants. Every storefront must feel explicitly tailored to that specific merchant. Each store must have a DIFFERENT layout structure, hero style, product arrangement, and font pairing based on the business type.

مهمتك: استلم وصف التاجر وابنِ متجراً كاملاً مختلفاً — الهوية، الألوان، التخطيط، النصوص، الأقسام، والمنتجات.

أجب بـ JSON فقط (بدون نص إضافي قبل أو بعد) بهذا الشكل:
{
  "storeName": "",
  "tagline": "",
  "description": "",
  "audience": "",
  "tone": "",
  "businessType": "",
  "navigation": ["", "", "", ""],
  "sections": ["", "", ""],
  "primaryColor": "#hex",
  "secondaryColor": "#hex",
  "accentColor": "#hex",
  "heroLabel": "",
  "heroTitle": "",
  "heroSubtitle": "",
  "ctaText": "",
  "trustPoints": ["", "", ""],
  "categories": ["", "", ""],
  "products": [
    {"name": "", "category": "", "description": "", "price": 0, "badge": ""}
  ],
  "layoutType": "classic | minimal | bold | magazine | boutique",
  "heroStyle": "split | centered | video | carousel | fullscreen",
  "productLayout": "grid | list | masonry | carousel",
  "fontPairing": "cairo | tajawal | amiri | naskh",
  "aboutText": "",
  "hours": "",
  "location": ""
}

قواعد صارمة:
- كل النصوص بالعربية ومرتبطة بدقة بوصف التاجر.
- الألوان بصيغة #hex — اختر لوحة ألوان مناسبة لنوع النشاط (دافئة للطعام، باردة للتقنية، راقية للأزياء...).
- 4-8 منتجات بأسعار واقعية بالليرة السورية.
- badge اختياري (مثل: الأكثر مبيعاً، جديد، عرض).
- layoutType: اختر تخطيطاً يناسب النشاط — minimal للبسيطة، bold للجريئة، magazine للمحتوى، boutique للأزياء، classic للعامة.
- heroStyle: split لصورة جانبية، centered للنص المركزي، fullscreen للخدمات، carousel للعروض.
- productLayout: grid للمنتجات المتساوية، list للقوائم، masonry للمنتجات المتنوعة، carousel للعرض المتحرك.
- fontPairing: cairo للعامة، tajawal للتقنية، amiri للرسمي، naskh للكلاسيكي.
- aboutText: فقرة قصيرة عن النشاط (2-3 جمل).
- hours: ساعات العمل.
- location: المدينة.
- لا تكرر نفس البنية بين المتاجر المختلفة — التنوع هو الأساس.
- ضع JSON بين علامتي \`\`\`json و \`\`\` أو أرسله مباشرة.`,

  product_description: `أنت خبير في كتابة أوصاف المنتجات للسوق السوري.
اكتب وصفاً جذاباً ومقنعاً باللغة العربية للمنتج المطلوب.
الوصف يجب أن يكون من 2-3 جمل ويبرز مميزات المنتج.
قدم أيضاً عنواناً مقترحاً للمنتج.
أجب بصيغة JSON:
{
  "title": "عنوان المنتج",
  "description": "وصف المنتج"
}`,

  banner_copy: `أنت مصمم إعلانات خبير للسوق السوري.
اكتب نصوصاً إعلانية جذابة باللغة العربية.
أجب بصيغة JSON:
{
  "title": "عنوان البانر",
  "subtitle": "عنوان فرعي",
  "cta": "نص الزر"
}`,

  refine: `أنت خبير في تحسين المتاجر الإلكترونية لمنصة تجّار السورية.
التاجر يطلب تعديلاً على متجره الحالي. طبّق التعديل المطلوب على إعدادات المتجر الحالية وأعد إرسالها كاملة.

أجب بـ JSON فقط بنفس هيكل المتجر الكامل:
{
  "storeName": "", "tagline": "", "description": "", "audience": "", "tone": "", "businessType": "",
  "navigation": [""], "sections": [""], "primaryColor": "#hex", "secondaryColor": "#hex", "accentColor": "#hex",
  "heroLabel": "", "heroTitle": "", "heroSubtitle": "", "ctaText": "", "trustPoints": [""],
  "categories": [""], "products": [{"name": "", "category": "", "description": "", "price": 0, "badge": ""}]
}

قواعد:
- حافظ على ما لم يطلب التاجر تغييره.
- طبّق التعديل المطلوب بدقة.
- كل النصوص بالعربية.
- الأسعار بالليرة السورية.
- ضع JSON بين علامتي \`\`\`json و \`\`\` أو أرسله مباشرة.`,

  general: `أنت مساعد ذكي لمنصة تجار للتجارة الإلكترونية في سوريا.
ساعد التجار بكل ما يحتاجونه بالعربية الفصحى الواضحة.`,
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const openrouterApiKey = Deno.env.get("OPENROUTER_API_KEY");
    if (!openrouterApiKey) {
      return new Response(
        JSON.stringify({ error: "OPENROUTER_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body: OpenRouterRequest = await req.json();
    const { messages, action = "general" } = body;

    const systemPrompt = SYSTEM_PROMPTS[action] || SYSTEM_PROMPTS.general;

    const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openrouterApiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://tujjar.sy",
        "X-Title": "Tujjar AI",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      return new Response(
        JSON.stringify({ error: `AI API error: ${errText}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await aiResponse.json();
    const content = data.choices?.[0]?.message?.content ?? "";

    // Extract JSON if present (from code fence or raw)
    let parsedJson = null;
    const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      try {
        parsedJson = JSON.parse(jsonMatch[1]);
      } catch {
        // ignore parse error
      }
    }
    if (!parsedJson) {
      // Try raw JSON extraction
      const rawMatch = content.match(/\{[\s\S]*\}/);
      if (rawMatch) {
        try {
          parsedJson = JSON.parse(rawMatch[0]);
        } catch {
          // ignore parse error
        }
      }
    }

    return new Response(
      JSON.stringify({ content, parsedJson }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
