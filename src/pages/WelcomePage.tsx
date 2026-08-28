import { useState } from 'react';
import { Zap, ShoppingBag, BarChart3, Globe, Shield, Sparkles, ChevronLeft, Wand2, Loader2 } from 'lucide-react';

type Props = { onGetStarted: () => void; onGenerate: (prompt: string) => void };

const PROMPT_SUGGESTIONS = [
  'محل عطورات شرقية في حمص يقدم oud ومسك',
  'مطعم مشاوي شامية مع توصيل سريع',
  'متجر إلكترونيات وحواسيب وضمان سنة',
  'بوتيك أزياء نسائية عصرية',
];

const features = [
  { icon: Zap, title: 'إعداد فوري بالذكاء الاصطناعي', desc: 'أنشئ متجرك الكامل في دقائق بمساعدة AI' },
  { icon: ShoppingBag, title: 'إدارة منتجات ذكية', desc: 'أضف منتجاتك بصورة واحدة فقط — الذكاء يكمل الباقي' },
  { icon: BarChart3, title: 'تحليلات متقدمة', desc: 'تابع مبيعاتك وعملاءك في الوقت الفعلي' },
  { icon: Globe, title: 'متجر احترافي على الإنترنت', desc: 'موقع جاهز للبيع من أول يوم بنطاق خاص' },
  { icon: Shield, title: 'دفع آمن بالطريقة السورية', desc: 'سيريتل كاش، شام كاش، أو الدفع عند الاستلام' },
  { icon: Sparkles, title: 'أدوات تصميم AI', desc: 'مصمم بانرات، محرر خلفيات، كاتب محتوى' },
];

const stats = [
  { value: '+2,500', label: 'تاجر نشط' },
  { value: '+85,000', label: 'منتج مُباع' },
  { value: '98%', label: 'رضا التجار' },
  { value: '24/7', label: 'دعم مستمر' },
];

export default function WelcomePage({ onGetStarted, onGenerate }: Props) {
  const [prompt, setPrompt] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleGenerate = () => {
    const value = prompt.trim();
    if (!value || submitting) return;
    setSubmitting(true);
    onGenerate(value);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 glass-strong border-b border-[#1f2d3d]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/1777583164569.png" alt="تجار" className="w-9 h-9 object-contain" />
            <span className="text-xl font-bold gradient-text">تجّار</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onGetStarted} className="btn-ghost text-sm">تسجيل الدخول</button>
            <button onClick={onGetStarted} className="btn-primary text-sm py-2 px-5">ابدأ مجاناً</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
        {/* BG orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#00C2CB]/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-[#008080]/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-[#00C2CB]/6 blur-3xl pointer-events-none" />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#00C2CB 1px, transparent 1px), linear-gradient(90deg, #00C2CB 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass border border-[#00C2CB]/20 rounded-full px-5 py-2 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-[#00C2CB] animate-pulse" />
            <span className="text-sm text-[#00C2CB] font-medium">منصة التجارة الإلكترونية السورية الأولى بالذكاء الاصطناعي</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-fade-in-up delay-100">
            <span className="text-white">أطلق متجرك</span>
            <br />
            <span className="gradient-text glow-text">في 5 دقائق</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            منصة تجّار تمنحك قوة الذكاء الاصطناعي لبناء متجرك الإلكتروني الاحترافي بالكامل —
            من التصميم إلى المبيعات إلى التوصيل — كل ذلك باللغة العربية ومناسب للسوق السوري.
          </p>

          {/* Bolt-style first-slide prompt */}
          <div className="w-full max-w-3xl mx-auto animate-fade-in-up delay-300">
            <div className="glass-strong rounded-2xl p-2 border border-[#00C2CB]/25 shadow-2xl shadow-cyan-500/10">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 px-3">
                  <Wand2 size={18} className="text-[#00C2CB] flex-shrink-0" />
                  <input
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleGenerate(); }}
                    placeholder="صف متجرك... مثال: محل عطورات شرقية في حمص"
                    className="flex-1 bg-transparent text-white placeholder-slate-500 py-3.5 text-sm outline-none"
                    dir="rtl"
                  />
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || submitting}
                  className="btn-primary text-sm px-6 py-3.5 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> جاري فتح مساحة البناء...</> : <><Wand2 size={16} /> أنشئ متجري</>}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {PROMPT_SUGGESTIONS.map(suggestion => (
                <button key={suggestion} onClick={() => setPrompt(suggestion)} className="text-xs px-3 py-1.5 rounded-lg glass border border-[#1f2d3d] text-slate-400 hover:border-[#00C2CB]/30 hover:text-[#00C2CB] transition-all">
                  {suggestion}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-600 mt-4">اكتب فكرتك، وسيفتح لك محرر مثل bolt.new لمعاينة متجرك وتعديله قبل إطلاقه.</p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 animate-fade-in-up delay-400">
            <button onClick={onGetStarted} className="btn-secondary text-sm px-6 py-3 flex items-center gap-2">
              <Sparkles size={16} /> سجّل وابدأ مجاناً
            </button>
            <button onClick={onGetStarted} className="btn-ghost text-sm px-5 py-3 flex items-center gap-2">
              تسجيل الدخول <ChevronLeft size={15} />
            </button>
          </div>

          {/* Logo float */}
          <div className="mt-16 flex justify-center animate-fade-in-up delay-500">
            <div className="relative animate-float">
              <div className="w-32 h-32 rounded-3xl glass border border-[#00C2CB]/20 flex items-center justify-center shadow-2xl shadow-cyan-500/20">
                <img src="/1777583164569.png" alt="تجار" className="w-20 h-20 object-contain" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#00C2CB] to-[#008080] flex items-center justify-center shadow-lg shadow-cyan-500/40">
                <Zap size={14} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-[#1f2d3d]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-3xl font-black gradient-text mb-1">{s.value}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">كل ما تحتاجه في منصة واحدة</h2>
            <p className="text-slate-400 text-lg">مصممة خصيصاً للتاجر السوري الطموح</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="card-dark p-6 hover:border-[#00C2CB]/25 transition-all duration-300 hover:-translate-y-1 group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C2CB]/20 to-[#008080]/10 border border-[#00C2CB]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <f.icon size={22} className="text-[#00C2CB]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business types */}
      <section className="py-16 px-6 bg-[#0d1520]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">مناسب لكل نوع تجارة</h2>
          <p className="text-slate-500 mb-10">سواء كنت تبيع ملابس أو طعام أو خدمات أو منتجات رقمية</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['متجر تجزئة', 'مطعم وكافيه', 'منتجات رقمية', 'خدمات مهنية', 'محل ملابس', 'عيادة طبية', 'مركز تعليمي', 'بورتفوليو'].map((type) => (
              <span
                key={type}
                className="glass border border-[#00C2CB]/15 text-[#00C2CB] px-5 py-2 rounded-full text-sm font-medium hover:border-[#00C2CB]/40 hover:bg-[#00C2CB]/10 transition-all duration-200 cursor-pointer"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden border border-[#00C2CB]/20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00C2CB]/5 to-[#008080]/5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">جاهز لتطلق متجرك؟</h2>
              <p className="text-slate-400 mb-8 text-lg">انضم لأكثر من 2,500 تاجر سوري يبيعون عبر تجّار</p>
              <button onClick={onGetStarted} className="btn-primary text-lg px-10 py-4 animate-pulse-glow">
                ابدأ مجاناً — لا يتطلب بطاقة ائتمان
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1f2d3d] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/1777583164569.png" alt="تجار" className="w-7 h-7 object-contain" />
            <span className="font-bold gradient-text">تجّار</span>
          </div>
          <p className="text-xs text-slate-600">© 2025 تجّار. جميع الحقوق محفوظة. مصنوع بـ ❤️ لسوريا</p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">الخصوصية</a>
            <a href="#" className="hover:text-slate-400 transition-colors">الشروط</a>
            <a href="#" className="hover:text-slate-400 transition-colors">الدعم</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
