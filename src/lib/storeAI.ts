import { callOpenRouterAI } from './openrouter';

export type AIStoreProduct = {
  name: string;
  category: string;
  description: string;
  price: number;
  badge?: string;
};

export type AIStoreConfig = {
  storeName: string;
  tagline: string;
  description: string;
  audience: string;
  tone: string;
  businessType: string;
  navigation: string[];
  sections: string[];
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  heroLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  trustPoints: string[];
  categories: string[];
  products: AIStoreProduct[];
};

function fallback(prompt: string): AIStoreConfig {
  const isFood = /مطعم|مأكول|طعام|حلويات|مقهى|مشاوي|شاورما|فلافل|كافيه/i.test(prompt);
  const isTech = /إلكترون|تقنية|رقمي|هاتف|كمبيوتر|حاسوب/i.test(prompt);
  const isFashion = /ملابس|أزياء|عطور|إكسسوار|موضة|أحذية/i.test(prompt);
  const name = prompt.split(/\s+/).slice(0, 3).join(' ') || 'متجري';

  if (isFood) {
    return {
      storeName: name, tagline: 'ألذ الأطعمة الطازجة', description: 'مطعم يقدم أشهى المأكولات الشرقية',
      audience: 'عشاق الطعام الأصيل', tone: 'ودي ومحترف', businessType: 'food',
      navigation: ['الرئيسية', 'القائمة', 'عن المتجر', 'تواصل معنا'],
      sections: ['قائمتنا', 'لماذا نحن', 'آراء العملاء', 'تواصل معنا'],
      primaryColor: '#F97316', secondaryColor: '#DC2626', accentColor: '#FBBF24',
      heroLabel: 'مرحباً بك في', heroTitle: name, heroSubtitle: 'أطباق شهية محضّرة بحب وبمكونات طازجة 100%',
      ctaText: 'تصفح القائمة',
      trustPoints: ['مكونات طازجة يومياً', 'توصيل سريع خلال 30 دقيقة', 'طلب عبر واتساب'],
      categories: ['المقبلات', 'الأطباق الرئيسية', 'المشروبات', 'الحلويات'],
      products: [
        { name: 'شاورما عربي', category: 'الأطباق الرئيسية', description: 'شاورما لحم طازج مع صلصة خاصة وخبز محمص', price: 25000, badge: 'الأكثر طلباً' },
        { name: 'مشاوي مشكلة', category: 'الأطباق الرئيسية', description: 'تشكيلة مشاوي على الفحم مع الأرز والسلطة', price: 85000 },
        { name: 'حمص بطحينة', category: 'المقبلات', description: 'حمص كريمي بزيت الزيتون البكر', price: 15000 },
        { name: 'كنافة بالقشطة', category: 'الحلويات', description: 'كنافة ناعمة طازجة بالقشطة والفستق', price: 30000, badge: 'جديد' },
      ],
    };
  }

  if (isTech) {
    return {
      storeName: name, tagline: 'أحدث الأجهزة والتقنيات', description: 'متجر إلكترونيات متخصص في الأجهزة الحديثة',
      audience: 'عشاق التقنية', tone: 'عصري ومباشر', businessType: 'electronics',
      navigation: ['الرئيسية', 'المنتجات', 'عن المتجر', 'تواصل معنا'],
      sections: ['منتجاتنا', 'لماذا نحن', 'آراء العملاء', 'تواصل معنا'],
      primaryColor: '#3B82F6', secondaryColor: '#1E3A8A', accentColor: '#22D3EE',
      heroLabel: 'مرحباً بك في', heroTitle: name, heroSubtitle: 'أحدث الأجهزة الإلكترونية بأسعار تنافسية وضمان حقيقي',
      ctaText: 'تسوق الآن',
      trustPoints: ['ضمان سنة كاملة', 'توصيل مجاني للطلبات فوق 100k', 'دفع عند الاستلام متاح'],
      categories: ['هواتف', 'إكسسوارات', 'صوتيات'],
      products: [
        { name: 'سماعات بلوتوث لاسلكية', category: 'صوتيات', description: 'سماعات عالية الجودة مع إلغاء الضوضاء وعمر بطارية 30 ساعة', price: 120000, badge: 'الأكثر مبيعاً' },
        { name: 'شاحن سريع 65W', category: 'إكسسوارات', description: 'شاحن سريع متعدد المنافذ يدعم الشحن السريع لجميع الأجهزة', price: 45000 },
        { name: 'ساعة ذكية رياضية', category: 'هواتف', description: 'ساعة ذكية بشاشة AMOLED ومقاومة للماء وقياس نبض القلب', price: 280000, badge: 'جديد' },
        { name: 'مكبر صوت بلوتوث', category: 'صوتيات', description: 'مكبر صوت محمول بصوت قوي 360 درجة وبطارية تدوم 12 ساعة', price: 95000 },
      ],
    };
  }

  return {
    storeName: name, tagline: 'جودة عالية وأناقة تليق بك', description: 'متجر يقدم منتجات مختارة بعناية بأفضل الأسعار',
    audience: 'العملاء الذين يبحثون عن الجودة', tone: 'ودي ومحترف', businessType: isFashion ? 'fashion' : 'retail',
    navigation: ['الرئيسية', 'المنتجات', 'عن المتجر', 'تواصل معنا'],
    sections: ['منتجاتنا', 'لماذا نحن', 'آراء العملاء', 'تواصل معنا'],
    primaryColor: '#7C3AED', secondaryColor: '#4C1D95', accentColor: '#F59E0B',
    heroLabel: 'مرحباً بك في', heroTitle: name, heroSubtitle: 'تشكيلة مختارة بعناية تناسب ذوقك الرفيع وأسعار في متناول الجميع',
    ctaText: 'تصفح المجموعة',
    trustPoints: ['جودة مضمونة 100%', 'إرجاع مجاني خلال 7 أيام', 'توصيل لجميع المحافظات'],
    categories: ['الأكثر مبيعاً', 'وصل حديثاً', 'عروض خاصة'],
    products: [
      { name: 'جاكيت شتوي كاجوال', category: 'الأكثر مبيعاً', description: 'جاكيت دافئ وعصري بقماش عالي الجودة مناسب لبرودة الشتاء', price: 125000, badge: 'الأكثر مبيعاً' },
      { name: 'فستان سهرة أنيق', category: 'وصل حديثاً', description: 'فستان سهرة بتصميم راقٍ يمنحك إطلالة مميزة في المناسبات', price: 95000, badge: 'جديد' },
      { name: 'حقيبة جلدية فاخرة', category: 'عروض خاصة', description: 'حقيبة جلد طبيعي بتصميم كلاسيكي وحرفية عالية', price: 210000 },
      { name: 'حذاء رياضي مريح', category: 'الأكثر مبيعاً', description: 'حذاء رياضي خفيف ومريح بنعل مرن مناسب للاستخدام اليومي', price: 65000 },
    ],
  };
}

function parseConfig(value: Record<string, unknown> | null): Partial<AIStoreConfig> {
  if (!value || typeof value !== 'object') return {};
  return value as Partial<AIStoreConfig>;
}

export async function generateStoreFromPrompt(
  prompt: string,
): Promise<{ config: AIStoreConfig; error: string | null }> {
  const base = fallback(prompt);

  try {
    const response = await callOpenRouterAI([
      {
        role: 'user',
        content: `أنت تبني متجراً إلكترونياً كاملاً ومختلفاً لهذا التاجر السوري. لا تستخدم قالباً عاماً ولا تكرر نفس البنية بين التجار. كل نص يجب أن يعكس وصف هذا التاجر تحديداً.

وصف التاجر:
${prompt}

أنشئ هوية المتجر كاملة. أجب بـ JSON فقط بهذا الشكل بالضبط:
{
  "storeName": "",
  "tagline": "",
  "description": "",
  "audience": "",
  "tone": "",
  "businessType": "",
  "navigation": ["", ""],
  "sections": ["", "", ""],
  "primaryColor": "#hex",
  "secondaryColor": "#hex",
  "accentColor": "#hex",
  "heroLabel": "",
  "heroTitle": "",
  "heroSubtitle": "",
  "ctaText": "",
  "trustPoints": ["", "", ""],
  "categories": ["", ""],
  "products": [
    {"name": "", "category": "", "description": "", "price": 0, "badge": ""}
  ]
}

قواعد صارمة:
- كل النصوص بالعربية.
- الألوان بصيغة #hex وعالية التباين على خلفية بيضاء أو داكنة حسب نوع المتجر.
- لا تقل 4 منتجات ولا تزد 8.
- السعر بالليرة السورية (أرقام واقعية للسوق السوري).
- المحتوى مرتبط بدقة بوصف التاجر، لا نصوص عامة.
- badge اختياري (مثل: "الأكثر مبيعاً" أو "جديد" أو "").`
      }
    ], 'onboard');

    const ai = parseConfig(response.parsedJson);

    if (!response.parsedJson) {
      return { config: base, error: 'لم يتمكن الذكاء الاصطناعي من فهم الرد. حاول مرة أخرى.' };
    }

    const merged: AIStoreConfig = {
      ...base,
      ...ai,
      navigation: ai.navigation?.length ? ai.navigation : base.navigation,
      sections: ai.sections?.length ? ai.sections : base.sections,
      trustPoints: ai.trustPoints?.length ? ai.trustPoints : base.trustPoints,
      categories: ai.categories?.length ? ai.categories : base.categories,
      products: ai.products?.length ? ai.products : base.products,
    };

    return { config: merged, error: null };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return { config: base, error: `تعذّر الاتصال بالذكاء الاصطناعي: ${detail}` };
  }
}

export async function refineStore(
  currentConfig: AIStoreConfig,
  userInstruction: string,
): Promise<{ config: AIStoreConfig; error: string | null }> {
  try {
    const response = await callOpenRouterAI([
      {
        role: 'user',
        content: `هذه إعدادات المتجر الحالي بـ JSON:\n${JSON.stringify(currentConfig, null, 2)}\n\nطلب التاجر: ${userInstruction}\n\nطبّق التعديل وأعد إرسال إعدادات المتجر كاملة بصيغة JSON.`,
      }
    ], 'refine');

    if (!response.parsedJson) {
      return { config: currentConfig, error: 'لم يتمكن الذكاء الاصطناعي من فهم الرد. حاول مرة أخرى.' };
    }

    const ai = parseConfig(response.parsedJson);
    const merged: AIStoreConfig = {
      ...currentConfig,
      ...ai,
      navigation: ai.navigation?.length ? ai.navigation : currentConfig.navigation,
      sections: ai.sections?.length ? ai.sections : currentConfig.sections,
      trustPoints: ai.trustPoints?.length ? ai.trustPoints : currentConfig.trustPoints,
      categories: ai.categories?.length ? ai.categories : currentConfig.categories,
      products: ai.products?.length ? ai.products : currentConfig.products,
    };

    return { config: merged, error: null };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return { config: currentConfig, error: `تعذّر الاتصال بالذكاء الاصطناعي: ${detail}` };
  }
}

// Keep backward compatibility for any callers still using the old signature
export type ChatAnswer = { storeName: string; businessType: string; description: string; audience: string; goals: string; features: string };

export async function generateStoreWithAI(answers: ChatAnswer): Promise<{ config: AIStoreConfig; error: string | null }> {
  const prompt = `${answers.storeName} - ${answers.businessType} - ${answers.description} - الجمهور: ${answers.audience} - الهدف: ${answers.goals}`;
  return generateStoreFromPrompt(prompt);
}
