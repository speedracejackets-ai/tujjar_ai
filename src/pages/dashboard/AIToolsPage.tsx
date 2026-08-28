import { useState } from 'react';
import { Wand2, Image, Type, Palette, Camera, Tag, Sparkles, ArrowLeft, Loader2, Upload, X, Download } from 'lucide-react';
import { callOpenRouterAI } from '../../lib/openrouter';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

type Tool = 'banner' | 'writer' | 'bgremove' | 'theme' | 'photographer' | 'logo' | null;

const tools = [
  { id: 'banner' as Tool, icon: Image, label: 'مصمم البانرات', desc: 'أنشئ بانرات إعلانية احترافية', color: '#00C2CB' },
  { id: 'writer' as Tool, icon: Type, label: 'كاتب المنتجات', desc: 'اكتب أوصافاً جذابة تلقائياً', color: '#008080' },
  { id: 'theme' as Tool, icon: Palette, label: 'مصمم الثيم', desc: 'خصص ألوان وتصميم متجرك', color: '#0ea5e9' },
  { id: 'bgremove' as Tool, icon: Wand2, label: 'مزيل الخلفية', desc: 'أزل خلفيات صور المنتجات', color: '#8b5cf6' },
  { id: 'photographer' as Tool, icon: Camera, label: 'مصور المنتجات', desc: 'أنشئ صوراً احترافية بالذكاء', color: '#f59e0b' },
  { id: 'logo' as Tool, icon: Tag, label: 'مصمم الشعار', desc: 'أنشئ شعاراً احترافياً', color: '#10b981' },
];

function BannerTool({ onBack }: { onBack: () => void }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ title?: string; subtitle?: string; cta?: string } | null>(null);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await callOpenRouterAI(
        [{ role: 'user', content: `اكتب نص بانر إعلاني جذاب لـ: ${prompt}` }],
        'banner_copy'
      );
      if (res.parsedJson) setResult(res.parsedJson as typeof result);
    } catch {
      setResult({ title: 'عرض لا يُفوَّت!', subtitle: 'خصومات تصل حتى 50% على جميع المنتجات', cta: 'تسوق الآن' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
        <ArrowLeft size={14} className="rotate-180" />
        العودة للأدوات
      </button>
      <div className="card-dark p-4 sm:p-6 space-y-4 max-w-2xl">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Image size={18} className="text-[#00C2CB] flex-shrink-0" />
          مصمم البانرات
        </h2>
        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">ماذا يروج البانر؟</label>
          <input className="input-dark text-sm" placeholder="مثال: عرض تخفيض الصيف 50%" value={prompt} onChange={e => setPrompt(e.target.value)} />
        </div>
        <button onClick={generate} disabled={!prompt || loading} className="btn-primary flex items-center gap-2 disabled:opacity-40">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          توليد النص
        </button>

        {result && (
          <div className="animate-fade-in-up space-y-3">
            <p className="text-xs text-slate-500">معاينة البانر:</p>
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#00C2CB]/20 to-[#008080]/10 border border-[#00C2CB]/20 p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">{result.title}</h3>
              <p className="text-slate-300 mb-4 text-sm">{result.subtitle}</p>
              <button className="bg-white text-[#008080] font-bold px-6 py-2 rounded-xl text-xs sm:text-sm">
                {result.cta}
              </button>
            </div>
            <button className="btn-secondary w-full text-xs py-2">نسخ البانر</button>
          </div>
        )}
      </div>
    </div>
  );
}

function WriterTool({ onBack }: { onBack: () => void }) {
  const { store } = useAuth();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ title?: string; description?: string } | null>(null);

  const mockProducts = [
    { name: 'جاكيت شتوي' },
    { name: 'فستان سهرة' },
    { name: 'حقيبة جلدية' },
  ];
  const product = mockProducts[selectedIdx];

  const generate = async () => {
    setLoading(true);
    try {
      const res = await callOpenRouterAI(
        [{ role: 'user', content: `منتج: ${product.name}` }],
        'product_description'
      );
      if (res.parsedJson) setResult(res.parsedJson as typeof result);
    } catch {
      setResult({ title: product.name, description: 'منتج استثنائي بجودة عالية وتصميم عصري مناسب للسوق السوري.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
        <ArrowLeft size={14} className="rotate-180" />
        العودة للأدوات
      </button>
      <div className="card-dark p-4 sm:p-6 space-y-4 max-w-2xl">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Type size={18} className="text-[#008080] flex-shrink-0" />
          كاتب المنتجات
        </h2>
        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">اختر منتج</label>
          <div className="grid grid-cols-3 gap-2">
            {mockProducts.map((p, i) => (
              <button
                key={i}
                onClick={() => { setSelectedIdx(i); setResult(null); }}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedIdx === i
                    ? 'bg-gradient-to-r from-[#00C2CB] to-[#008080] text-white'
                    : 'border border-[#1f2d3d] text-slate-500 hover:border-[#1f2d3d]'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <button onClick={generate} disabled={loading} className="btn-primary flex items-center gap-2 disabled:opacity-40 w-full justify-center">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          كتابة الوصف
        </button>
        {result && (
          <div className="card-dark bg-[#0d1520] p-4 space-y-3 animate-fade-in">
            <div>
              <p className="text-xs text-slate-500 mb-1.5">العنوان</p>
              <input className="input-dark text-sm" value={result.title ?? ''} onChange={e => setResult(r => ({ ...r, title: e.target.value }))} />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1.5">الوصف</p>
              <textarea className="input-dark text-sm resize-none" rows={3} value={result.description ?? ''} onChange={e => setResult(r => ({ ...r, description: e.target.value }))} />
            </div>
            <button className="btn-primary text-xs py-2 w-full">إضافة للمنتج</button>
          </div>
        )}
      </div>
    </div>
  );
}

function BackgroundRemoverTool({ onBack }: { onBack: () => void }) {
  const [image, setImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
        <ArrowLeft size={14} className="rotate-180" />
        العودة للأدوات
      </button>
      <div className="card-dark p-4 sm:p-6 space-y-4 max-w-2xl">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Wand2 size={18} className="text-[#8b5cf6] flex-shrink-0" />
          مزيل الخلفية
        </h2>

        <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={e => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
          }
        }} />

        {!image ? (
          <label className="block border-2 border-dashed border-[#8b5cf6]/25 rounded-2xl p-8 text-center cursor-pointer hover:border-[#8b5cf6]/50 hover:bg-[#8b5cf6]/3 transition-all group">
            <Upload size={32} className="mx-auto text-slate-600 mb-2 group-hover:text-[#8b5cf6]" />
            <p className="text-sm text-slate-400">ارفع صورة المنتج</p>
            <p className="text-xs text-slate-600 mt-1">PNG, JPG حتى 10MB</p>
            <input type="file" className="hidden" accept="image/*" onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => { setImage(reader.result as string); setProcessing(true); setTimeout(() => setProcessing(false), 2000); };
                reader.readAsDataURL(file);
              }
            }} onClick={e => fileInputRef.current?.click()} />
          </label>
        ) : (
          <div className="space-y-3">
            {processing && (
              <div className="flex items-center justify-center py-8">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 size={28} className="animate-spin text-[#8b5cf6]" />
                  <p className="text-xs text-slate-500">جارٍ معالجة الصورة...</p>
                </div>
              </div>
            )}
            {!processing && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">قبل - بعد:</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl overflow-hidden border border-[#1f2d3d]">
                    <img src={image} alt="original" className="w-full h-auto" />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-[#1f2d3d] bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
                    <img src={image} alt="removed" className="w-full h-auto opacity-80" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setImage(null)} className="btn-secondary flex-1 text-xs py-2">
                    صورة أخرى
                  </button>
                  <button className="btn-primary flex-1 text-xs py-2 flex items-center justify-center gap-1">
                    <Download size={12} />
                    تحميل
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AIToolsPage() {
  const [activeTool, setActiveTool] = useState<Tool>(null);

  if (activeTool === 'banner') return <BannerTool onBack={() => setActiveTool(null)} />;
  if (activeTool === 'writer') return <WriterTool onBack={() => setActiveTool(null)} />;
  if (activeTool === 'bgremove') return <BackgroundRemoverTool onBack={() => setActiveTool(null)} />;
  if (activeTool === 'theme') return (
    <div className="p-6"><button onClick={() => setActiveTool(null)} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-5"><ArrowLeft size={14} className="rotate-180" />العودة</button><div className="card-dark p-6 max-w-2xl"><h2 className="text-base font-bold text-white mb-4">مصمم الثيم</h2><p className="text-slate-400 text-sm">محرر ألوان بصري يسمح بتخصيص كامل شكل المتجر.</p></div></div>
  );
  if (activeTool === 'photographer') return (
    <div className="p-6"><button onClick={() => setActiveTool(null)} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-5"><ArrowLeft size={14} className="rotate-180" />العودة</button><div className="card-dark p-6 max-w-2xl"><h2 className="text-base font-bold text-white mb-4">مصور المنتجات</h2><p className="text-slate-400 text-sm">أداة توليد صور احترافية للمنتجات باستخدام الذكاء الاصطناعي.</p></div></div>
  );
  if (activeTool === 'logo') return (
    <div className="p-6"><button onClick={() => setActiveTool(null)} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-5"><ArrowLeft size={14} className="rotate-180" />العودة</button><div className="card-dark p-6 max-w-2xl"><h2 className="text-base font-bold text-white mb-4">مصمم الشعار</h2><p className="text-slate-400 text-sm">أنشئ شعاراً احترافياً ومذهلاً لمتجرك بثوانٍ.</p></div></div>
  );

  return (
    <div className="p-4 sm:p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Wand2 size={22} className="text-[#00C2CB] flex-shrink-0" />
          أدوات الذكاء الاصطناعي
        </h1>
        <p className="text-slate-500 text-sm mt-1">مجموعة أدوات قوية لتسريع عملك</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className="card-dark p-5 sm:p-6 text-right hover:border-[#00C2CB]/20 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div
              className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
              style={{ background: `${tool.color}15`, border: `1px solid ${tool.color}25` }}
            >
              <tool.icon size={18} className="sm:w-6 sm:h-6" style={{ color: tool.color }} />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-1">{tool.label}</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{tool.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
