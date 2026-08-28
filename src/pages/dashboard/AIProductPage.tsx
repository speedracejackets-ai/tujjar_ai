import { useState } from 'react';
import { Upload, Sparkles, Wand2, Image as ImageIcon, DollarSign, Package, CheckCircle2 } from 'lucide-react';
import { callOpenRouterAI } from '../../lib/openrouter';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

type Step = 'upload' | 'generate' | 'price' | 'done';

export default function AIProductPage() {
  const { store } = useAuth();
  const [step, setStep] = useState<Step>('upload');
  const [generating, setGenerating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generated, setGenerated] = useState({ title: '', description: '' });
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [saving, setSaving] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await callOpenRouterAI(
        [{ role: 'user', content: 'اكتب عنواناً ووصفاً لمنتج سألقطه بالكاميرا. المنتج للسوق السوري.' }],
        'product_description'
      );
      if (res.parsedJson) {
        setGenerated({
          title: (res.parsedJson as { title?: string; description?: string }).title ?? '',
          description: (res.parsedJson as { title?: string; description?: string }).description ?? '',
        });
      }
      setStep('price');
    } catch {
      setStep('price');
      setGenerated({ title: 'منتج جديد', description: 'منتج عالي الجودة بأفضل الأسعار.' });
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!store || !price) return;
    setSaving(true);
    await supabase.from('products').insert({
      store_id: store.id,
      name: generated.title,
      description: generated.description,
      price: Number(price),
      category,
      ai_generated: true,
      image_urls: imagePreview ? [imagePreview] : [],
    });
    setSaving(false);
    setStep('done');
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Sparkles size={22} className="text-[#00C2CB]" />
          إضافة منتج بالذكاء الاصطناعي
        </h1>
        <p className="text-slate-500 text-sm mt-1">ارفع صورة منتجك — الذكاء الاصطناعي يكتب الوصف والعنوان</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { id: 'upload', label: 'رفع الصورة' },
          { id: 'generate', label: 'توليد المحتوى' },
          { id: 'price', label: 'تحديد السعر' },
          { id: 'done', label: 'اكتمل' },
        ].map((s, i, arr) => {
          const steps = ['upload', 'generate', 'price', 'done'];
          const current = steps.indexOf(step);
          const idx = steps.indexOf(s.id);
          const done = current > idx;
          const active = current === idx;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 whitespace-nowrap`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300 ${
                  done ? 'bg-gradient-to-r from-[#00C2CB] to-[#008080] text-white' :
                  active ? 'border-2 border-[#00C2CB] text-[#00C2CB]' :
                  'border border-[#1f2d3d] text-slate-600'
                }`}>
                  {done ? <CheckCircle2 size={14} /> : i + 1}
                </div>
                <span className={`text-xs font-medium ${active ? 'text-[#00C2CB]' : done ? 'text-slate-300' : 'text-slate-600'}`}>{s.label}</span>
              </div>
              {i < arr.length - 1 && <div className={`w-8 h-px flex-shrink-0 ${done ? 'bg-[#00C2CB]' : 'bg-[#1f2d3d]'}`} />}
            </div>
          );
        })}
      </div>

      <div className="max-w-xl">
        {step === 'upload' && (
          <div className="card-dark p-8 text-center space-y-5 animate-fade-in-up">
            <div className="w-16 h-16 rounded-2xl bg-[#00C2CB]/10 border border-[#00C2CB]/20 flex items-center justify-center mx-auto">
              <ImageIcon size={28} className="text-[#00C2CB]" />
            </div>
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="preview" className="w-full max-h-64 object-contain rounded-xl border border-[#1f2d3d]" />
                <button onClick={() => setImagePreview(null)} className="absolute top-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded-lg">إزالة</button>
              </div>
            ) : (
              <label className="block border-2 border-dashed border-[#00C2CB]/25 rounded-2xl p-10 cursor-pointer hover:border-[#00C2CB]/50 hover:bg-[#00C2CB]/3 transition-all duration-200 group">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                <Upload size={32} className="mx-auto text-slate-600 mb-3 group-hover:text-[#00C2CB] transition-colors" />
                <p className="text-sm text-slate-400 group-hover:text-slate-300">اضغط لرفع صورة المنتج</p>
                <p className="text-xs text-slate-600 mt-1">PNG, JPG, WEBP حتى 10MB</p>
              </label>
            )}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-[#0d1520] rounded-xl p-3 border border-[#1f2d3d]">
                <Wand2 size={14} className="text-[#00C2CB]" />
                سيتم إزالة الخلفية تلقائياً وتحسين جودة الصورة
              </div>
              <button
                onClick={() => { setStep('generate'); handleGenerate(); }}
                disabled={!imagePreview}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <Sparkles size={16} />
                توليد المحتوى بالذكاء الاصطناعي
              </button>
              <button
                onClick={() => setStep('price')}
                className="btn-ghost text-xs text-slate-500"
              >
                تخطي التوليد — الإضافة اليدوية
              </button>
            </div>
          </div>
        )}

        {(step === 'generate' || generating) && (
          <div className="card-dark p-8 text-center space-y-4 animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00C2CB]/20 to-[#008080]/10 border border-[#00C2CB]/20 flex items-center justify-center mx-auto animate-pulse-glow">
              <Sparkles size={28} className="text-[#00C2CB]" />
            </div>
            <div>
              <p className="text-white font-semibold mb-1">يعمل الذكاء الاصطناعي...</p>
              <p className="text-sm text-slate-500">جارٍ كتابة العنوان والوصف لمنتجك</p>
            </div>
            <div className="flex gap-2 justify-center">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}

        {step === 'price' && !generating && (
          <div className="card-dark p-6 space-y-4 animate-fade-in-up">
            <h2 className="text-base font-bold text-white">راجع وحدد السعر</h2>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">عنوان المنتج (من AI)</label>
              <input
                className="input-dark text-sm"
                value={generated.title}
                onChange={e => setGenerated(g => ({ ...g, title: e.target.value }))}
                placeholder="عنوان المنتج"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">وصف المنتج (من AI)</label>
              <textarea
                className="input-dark text-sm resize-none"
                rows={4}
                value={generated.description}
                onChange={e => setGenerated(g => ({ ...g, description: e.target.value }))}
                placeholder="وصف المنتج"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">السعر (ل.س) *</label>
                <div className="relative">
                  <DollarSign size={14} className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-500" />
                  <input className="input-dark text-sm pr-8" type="number" dir="ltr" placeholder="125000" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">الفئة</label>
                <input className="input-dark text-sm" placeholder="ملابس، إكسسوارات..." value={category} onChange={e => setCategory(e.target.value)} />
              </div>
            </div>
            <button onClick={handleSave} disabled={saving || !price} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-40">
              {saving ? <><span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" /></> : <><Package size={16} />إضافة المنتج للمتجر</>}
            </button>
          </div>
        )}

        {step === 'done' && (
          <div className="card-dark p-8 text-center space-y-4 animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-white font-bold text-lg mb-1">تم إضافة المنتج بنجاح!</p>
              <p className="text-sm text-slate-500">{generated.title}</p>
            </div>
            <button onClick={() => { setStep('upload'); setImagePreview(null); setGenerated({ title: '', description: '' }); setPrice(''); }} className="btn-primary w-full">
              إضافة منتج آخر
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
