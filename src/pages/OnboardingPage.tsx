import { useState, useRef, useEffect } from 'react';
import {
  Sparkles, Wand2, RotateCcw, Eye, Store, AlertCircle,
  ArrowLeft, Zap, Palette, Package, Globe, CheckCircle2,
  Send, MessageSquare,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { generateStoreFromPrompt, refineStore, type AIStoreConfig } from '../lib/storeAI';
import PlansPopup from '../components/PlansPopup';
import PaymentScreen from '../components/PaymentScreen';
import PremiumStorefrontPreview from './PremiumStorefrontPreview';

type BuilderState = 'idle' | 'generating' | 'preview' | 'refining';
type OnboardStep = 'builder' | 'plans' | 'payment';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
};

const GENERATION_STEPS = [
  { label: 'تحليل وصف متجرك...', icon: Eye },
  { label: 'اختيار الهوية البصرية والألوان...', icon: Palette },
  { label: 'إنشاء كتالوج منتجات بالليرة السورية...', icon: Package },
  { label: 'تجهيز واجهة المتجر للنشر...', icon: Globe },
];

const PROMPT_SUGGESTIONS = [
  'محل عطورات شرقية في حمص يقدم oud ومسك بأسعار منافسة',
  'مطعم مشاوي شامية مع توصيل سريع',
  'متجر إلكترونيات وحواسيب وضمان سنة',
  'بوتيك أزياء نسائية عصرية للشابات',
  'مقهى وحلويات فاخرة في دمشق',
  'متجر هواتف وإكسسوارات مع دفع عند الاستلام',
];

const REFINE_SUGGESTIONS = [
  'غيّر الألوان إلى أزرق وذهبي',
  'أضف 3 منتجات أخرى',
  'اجعل الأسعار أقل',
  'غيّر اسم المتجر',
  'أضف قسم العروض الخاصة',
];

type Props = {
  initialPrompt?: string;
  onClose?: () => void;
};

export default function OnboardingPage({ initialPrompt = '', onClose }: Props) {
  const { user, refreshStore } = useAuth();
  const [builderState, setBuilderState] = useState<BuilderState>('idle');
  const [step, setStep] = useState<OnboardStep>('builder');
  const [prompt, setPrompt] = useState(initialPrompt);
  const [config, setConfig] = useState<AIStoreConfig | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');
  const [creatingStore, setCreatingStore] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [refineInput, setRefineInput] = useState('');
  const stepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setBuilderState('generating');
    setError('');
    setCurrentStep(0);
    setConfig(null);
    setChatMessages([{ role: 'user', content: prompt.trim() }]);

    let s = 0;
    stepTimerRef.current = setInterval(() => {
      s = Math.min(s + 1, GENERATION_STEPS.length - 1);
      setCurrentStep(s);
    }, 1400);

    try {
      const [result] = await Promise.all([
        generateStoreFromPrompt(prompt.trim()),
        new Promise(r => setTimeout(r, 3500)),
      ]);

      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
      setCurrentStep(GENERATION_STEPS.length - 1);

      await new Promise(r => setTimeout(r, 500));

      setConfig(result.config);

      if (result.error) {
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: `تم إنشاء متجر تجريبي بناءً على وصفك. ملاحظة: ${result.error}`,
          isError: true,
        }]);
      } else {
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: `تم! بنيت لك متجر "${result.config.storeName}" بهوية فريدة، ${result.config.products.length} منتجات بأسعار بالليرة السورية. يمكنك تعديل أي شيء — فقط اكتب طلبك أدناه.`,
        }]);
      }

      setBuilderState('preview');
    } catch (err) {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
      const msg = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setError(msg);
      setChatMessages(prev => [...prev, { role: 'assistant', content: `حدث خطأ: ${msg}`, isError: true }]);
      setBuilderState('idle');
    }
  };

  const handleRefine = async () => {
    if (!refineInput.trim() || !config) return;
    const instruction = refineInput.trim();
    setRefineInput('');
    setBuilderState('refining');
    setChatMessages(prev => [...prev, { role: 'user', content: instruction }]);

    try {
      const [result] = await Promise.all([
        refineStore(config, instruction),
        new Promise(r => setTimeout(r, 2500)),
      ]);

      if (result.error) {
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: `تعذّر التحديث: ${result.error}. المتجر الحالي لم يتغير.`,
          isError: true,
        }]);
      } else {
        setConfig(result.config);
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: `تم التحديث! متجر "${result.config.storeName}" جاهز. هل تريد تعديلاً آخر؟`,
        }]);
      }
      setBuilderState('preview');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setChatMessages(prev => [...prev, { role: 'assistant', content: `خطأ: ${msg}`, isError: true }]);
      setBuilderState('preview');
    }
  };

  useEffect(() => {
    if (initialPrompt.trim()) handleGenerate();
  }, [initialPrompt]);

  const handleReset = () => {
    setBuilderState('idle');
    setPrompt('');
    setConfig(null);
    setError('');
    setShowPreview(false);
    setChatMessages([]);
    setRefineInput('');
  };

  const handleCreateStore = async () => {
    if (!user || !config) return;
    setCreatingStore(true);
    setError('');

    try {
      const slug = (config.storeName || 'store')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .slice(0, 20) + '-' + Date.now().toString().slice(-4);

      const { data: storeData, error: storeError } = await supabase.from('stores').insert({
        user_id: user.id,
        store_slug: slug,
        name: config.storeName,
        description: config.description,
        business_type: config.businessType || 'retail',
        primary_color: config.primaryColor,
        secondary_color: config.secondaryColor,
        accent_color: config.accentColor,
        hero_title: config.heroTitle,
        hero_subtitle: config.heroSubtitle,
        tagline: config.tagline,
        tone: config.tone,
        cta_text: config.ctaText,
        audience: config.audience,
        navigation: config.navigation,
        sections: config.sections,
        trust_points: config.trustPoints,
        categories: config.categories,
        contact_email: user.email ?? '',
        ai_config: config as unknown as Record<string, unknown>,
        status: 'active',
      }).select().single();

      if (storeError) throw storeError;

      if (storeData && config.products.length > 0) {
        const productRows = config.products.map(p => ({
          store_id: storeData.id,
          name: p.name,
          description: p.description,
          price: p.price,
          category: p.category,
          is_active: true,
          ai_generated: true,
          stock: 100,
        }));
        await supabase.from('products').insert(productRows);
      }

      setCreatingStore(false);
      setStep('plans');
    } catch (err) {
      setCreatingStore(false);
      setError(err instanceof Error ? err.message : 'فشل إنشاء المتجر. حاول مرة أخرى.');
    }
  };

  if (step === 'plans') return (
    <PlansPopup
      onSelect={(plan) => { setSelectedPlan(plan); setStep('payment'); }}
      onSkip={() => refreshStore()}
    />
  );
  if (step === 'payment') return (
    <PaymentScreen
      plan={selectedPlan}
      userId={user?.id ?? ''}
      onDone={() => refreshStore()}
    />
  );

  if (showPreview && config) {
    return (
      <PremiumStorefrontPreview
        config={config}
        storeName={config.storeName}
        contact={{ email: user?.email ?? '', phone: '', instagram: '', facebook: '', whatsapp: '' }}
        onClose={() => setShowPreview(false)}
      />
    );
  }

  // === SHARED BUILDER LAYOUT (generating + preview + refining) — bolt.new split view ===
  if (builderState === 'generating' || builderState === 'refining' || (builderState === 'preview' && config)) {
    const isWorking = builderState === 'generating' || builderState === 'refining';
    return (
      <div className="h-screen bg-[#0a0f1a] flex flex-col" dir="rtl">
        {/* Top bar */}
        <header className="glass-strong border-b border-[#1f2d3d] px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0 z-50">
          <div className="flex items-center gap-3">
            {onClose && (
              <button onClick={onClose} className="btn-ghost text-xs flex items-center gap-1.5">
                <ArrowLeft size={14} /> الرئيسية
              </button>
            )}
            <img src="/1777583164569.png" alt="تجار" className="w-7 h-7 object-contain" />
            <div>
              <span className="font-black gradient-text text-sm sm:text-base block">تجّار AI</span>
              <p className="text-[10px] text-slate-600">
                {builderState === 'generating' ? 'يبني الذكاء متجرك...' : builderState === 'refining' ? 'يحسّن متجرك...' : 'معاينة المتجر المُولّد'}
              </p>
            </div>
          </div>
          {builderState === 'preview' && (
            <button onClick={handleReset} className="btn-ghost text-xs flex items-center gap-1.5">
              <RotateCcw size={13} /> متجر جديد
            </button>
          )}
        </header>

        {/* Split layout: preview (left) + chat (right) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Preview pane */}
          <div className="flex-1 lg:w-1/2 overflow-y-auto bg-[#0d1520] border-l border-[#1f2d3d]">
            <div className="rounded-2xl overflow-hidden border border-[#1f2d3d] shadow-2xl bg-white m-4">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0d1520] border-b border-[#1f2d3d]">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-[#0a0f1a] border border-[#1f2d3d] rounded-lg px-4 py-1 text-xs text-slate-500 font-mono" dir="ltr">
                    tujjar.sy/preview
                  </div>
                </div>
              </div>
              <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
                {isWorking ? (
                  <div className="h-[400px] flex flex-col items-center justify-center bg-[#0d1520] text-center px-6">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00C2CB] to-[#008080] flex items-center justify-center animate-pulse-glow">
                        <Wand2 size={24} className="text-white animate-pulse" />
                      </div>
                      <div className="absolute inset-0 animate-spin-slow">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#00C2CB]" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 mb-4">
                      {builderState === 'refining' ? 'يحسّن الذكاء متجرك...' : 'يبني الذكاء متجرك...'}
                    </p>
                    <div className="w-full max-w-xs space-y-2">
                      {GENERATION_STEPS.map((s, i) => {
                        const done = i < currentStep;
                        const active = i === currentStep;
                        return (
                          <div key={i} className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all duration-500 ${
                            done ? 'bg-emerald-500/5 border-emerald-500/20'
                            : active ? 'glass border-[#00C2CB]/30'
                            : 'bg-[#0d1520] border-[#1f2d3d] opacity-40'
                          }`}>
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              done ? 'bg-emerald-500/15' : active ? 'bg-[#00C2CB]/15' : 'bg-[#1f2d3d]'
                            }`}>
                              {done ? <CheckCircle2 size={14} className="text-emerald-400" />
                              : active ? <s.icon size={14} className="text-[#00C2CB]" />
                              : <s.icon size={14} className="text-slate-600" />}
                            </div>
                            <span className={`text-xs font-medium ${done ? 'text-emerald-400' : active ? 'text-white' : 'text-slate-600'}`}>
                              {s.label}
                            </span>
                            {active && (
                              <div className="flex gap-1 mr-auto">
                                <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <PreviewStorefront config={config!} />
                )}
              </div>
            </div>
          </div>

          {/* Chat pane */}
          <div className="w-full lg:w-[420px] flex flex-col bg-[#0a0f1a] flex-shrink-0">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-3 animate-fade-in-up ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00C2CB] to-[#008080] flex items-center justify-center flex-shrink-0">
                      <Wand2 size={14} className="text-white" />
                    </div>
                  )}
                  <div className={`rounded-2xl px-4 py-3 max-w-[85%] border ${
                    msg.role === 'user'
                      ? 'glass rounded-tr-sm border-[#1f2d3d]'
                      : msg.isError
                        ? 'glass-strong rounded-tl-sm border-red-500/20'
                        : 'glass-strong rounded-tl-sm border-[#00C2CB]/20'
                  }`}>
                    {msg.role === 'assistant' && isWorking && i === chatMessages.length - 1 ? (
                      <div className="flex items-center gap-2">
                        <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                        <span className="text-xs text-slate-500">يعمل على متجرك...</span>
                      </div>
                    ) : (
                      <p className={`text-sm leading-relaxed ${msg.isError ? 'text-red-400' : 'text-slate-200'}`}>{msg.content}</p>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#1f2d3d] flex items-center justify-center flex-shrink-0 text-xs font-bold text-slate-400">أ</div>
                  )}
                </div>
              ))}

              {/* Summary card after generation */}
              {builderState === 'preview' && config && !isWorking && (
                <div className="flex gap-3 animate-fade-in-up">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00C2CB] to-[#008080] flex items-center justify-center flex-shrink-0">
                    <Wand2 size={14} className="text-white" />
                  </div>
                  <div className="glass-strong rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] border border-[#00C2CB]/20">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-[#0d1520] rounded-lg p-2 text-center">
                        <Store size={14} className="text-[#00C2CB] mx-auto mb-1" />
                        <p className="text-[10px] text-slate-500">النوع</p>
                        <p className="text-[11px] font-bold text-white truncate">{config.businessType}</p>
                      </div>
                      <div className="bg-[#0d1520] rounded-lg p-2 text-center">
                        <Package size={14} className="text-[#00C2CB] mx-auto mb-1" />
                        <p className="text-[10px] text-slate-500">المنتجات</p>
                        <p className="text-[11px] font-bold text-white">{config.products.length}</p>
                      </div>
                      <div className="bg-[#0d1520] rounded-lg p-2 text-center">
                        <Palette size={14} className="text-[#00C2CB] mx-auto mb-1" />
                        <p className="text-[10px] text-slate-500">الألوان</p>
                        <div className="flex gap-1 justify-center">
                          {[config.primaryColor, config.secondaryColor, config.accentColor].map(c => (
                            <div key={c} className="w-3 h-3 rounded border border-white/10" style={{ background: c }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Refine suggestions (preview only) */}
            {builderState === 'preview' && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {REFINE_SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => setRefineInput(s)}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-[#0d1520] border border-[#1f2d3d] text-slate-500 hover:border-[#00C2CB]/30 hover:text-[#00C2CB] transition-all duration-200">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Chat input (preview only) */}
            {builderState === 'preview' && (
              <div className="p-4 border-t border-[#1f2d3d] space-y-3 animate-fade-in-up">
                <div className="flex gap-2">
                  <input
                    value={refineInput}
                    onChange={e => setRefineInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && refineInput.trim()) handleRefine(); }}
                    placeholder="اكتب تعديلاً... مثال: غيّر الألوان إلى الأزرق"
                    className="input-dark text-sm flex-1"
                    dir="rtl"
                  />
                  <button onClick={handleRefine} disabled={!refineInput.trim()}
                    className="btn-primary text-sm px-4 py-2.5 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed">
                    <Send size={15} /> تطبيق
                  </button>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => setShowPreview(true)} className="btn-secondary text-sm py-2.5 px-4 flex items-center gap-1.5 flex-1 justify-center">
                    <Eye size={15} /> معاينة كاملة
                  </button>
                  <button onClick={user ? handleCreateStore : undefined} disabled={creatingStore || !user}
                    className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed flex-1 justify-center">
                    {creatingStore ? (
                      <><span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" /></>
                    ) : (
                      <><Store size={15} /> {user ? 'إطلاق المتجر' : 'سجّل لإطلاق المتجر'}</>
                    )}
                  </button>
                </div>
                <p className="text-center text-[10px] text-slate-600">
                  {user ? 'اضغط إطلاق لحفظ متجرك واختيار الباقة' : 'سجّل دخولك أولاً لإطلاق المتجر'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // === IDLE STATE (bolt.new-style homepage) ===
  return (
    <div className="min-h-screen bg-[#0a0f1a] flex flex-col" dir="rtl">
      <header className="glass-strong border-b border-[#1f2d3d] px-4 sm:px-6 py-4 flex items-center gap-3 flex-shrink-0">
        {onClose && (
          <button onClick={onClose} className="btn-ghost text-xs flex items-center gap-1.5 ml-2">
            <ArrowLeft size={14} /> الصفحة الرئيسية
          </button>
        )}
        <img src="/1777583164569.png" alt="تجار" className="w-8 h-8 object-contain" />
        <div>
          <span className="font-black gradient-text text-base sm:text-lg block">تجّار AI</span>
          <p className="text-[10px] sm:text-xs text-slate-600">منشئ المتاجر بالذكاء الاصطناعي</p>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00C2CB]/20 to-[#008080]/10 border border-[#00C2CB]/20 flex items-center justify-center mx-auto mb-5 animate-pulse-glow">
              <Wand2 size={28} className="text-[#00C2CB]" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white mb-3">أنشئ متجرك بكلمة واحدة</h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              صف لنا نشاطك التجاري، والذكاء الاصطناعي سيبني لك متجراً إلكترونياً كاملاً
              بهوية فريدة، منتجات، وأسعار بالليرة السورية — في ثوانٍ.
            </p>
          </div>

          <div className="glass-strong rounded-3xl p-5 sm:p-6 animate-fade-in-up delay-100">
            <label className="text-xs text-slate-500 mb-2 block font-medium">صف متجرك المطلوب</label>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleGenerate();
              }}
              placeholder="مثال: محل عطورات شرقية في حمص يقدم oud ومسك بأسعار منافسة مع توصيل..."
              rows={4}
              className="input-dark text-sm resize-none mb-4 leading-relaxed"
              dir="rtl"
            />

            <div className="flex flex-wrap gap-2 mb-5">
              {PROMPT_SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => setPrompt(s)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-[#0d1520] border border-[#1f2d3d] text-slate-400 hover:border-[#00C2CB]/30 hover:text-[#00C2CB] transition-all duration-200">
                  {s}
                </button>
              ))}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400 mb-4 flex items-center gap-2 animate-fade-in">
                <AlertCircle size={15} className="flex-shrink-0" /> {error}
              </div>
            )}

            <button onClick={handleGenerate} disabled={!prompt.trim()}
              className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
              <Sparkles size={18} /> توليد المتجر بالذكاء الاصطناعي
            </button>

            <p className="text-center text-[10px] text-slate-600 mt-3 flex items-center justify-center gap-1.5">
              <MessageSquare size={11} /> بعد التوليد يمكنك كتابة تعديلات إضافية لتحسين متجرك
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6 animate-fade-in-up delay-200">
            {[
              { icon: Zap, label: 'توليد فوري', desc: 'في ثوانٍ' },
              { icon: Palette, label: 'هوية فريدة', desc: 'ألوان وتصميم مخصص' },
              { icon: Package, label: 'منتجات تلقائية', desc: 'بالليرة السورية' },
            ].map((f, i) => (
              <div key={i} className="card-dark p-4 text-center">
                <f.icon size={20} className="text-[#00C2CB] mx-auto mb-2" />
                <p className="text-xs font-bold text-white">{f.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline mini storefront preview for the builder — pure CSS visuals, no external images
function PreviewStorefront({ config }: { config: AIStoreConfig }) {
  const { primaryColor, secondaryColor, accentColor } = config;

  // Generate a unique SVG pattern per store
  const patternId = `pat-${config.storeName.charCodeAt(0) || 0}`;
  const patternType = (config.storeName.charCodeAt(0) || 0) % 3;

  return (
    <div dir="rtl" className="bg-white" style={{ fontFamily: 'Cairo, sans-serif', color: '#1a1a2e' }}>
      {/* Hero with CSS gradient + SVG pattern overlay */}
      <div className="relative overflow-hidden py-12 px-4 text-center"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: accentColor }} />
        <div className="relative z-10">
          <span className="inline-block text-xs font-bold text-white/90 bg-white/15 px-4 py-1.5 rounded-full mb-3">
            {config.heroLabel || config.tagline}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">{config.heroTitle || config.storeName}</h1>
          <p className="text-white/80 text-sm mb-5 max-w-md mx-auto">{config.heroSubtitle}</p>
          <button className="px-6 py-2.5 rounded-xl bg-white font-bold text-sm transition-all hover:scale-105" style={{ color: primaryColor }}>
            {config.ctaText}
          </button>
        </div>
      </div>

      {/* Trust bar */}
      <div className="border-y py-4 px-4" style={{ borderColor: `${primaryColor}15`, background: `${primaryColor}05` }}>
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-3">
          {config.trustPoints.slice(0, 3).map((tp, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${primaryColor}15` }}>
                <CheckCircle2 size={14} style={{ color: primaryColor }} />
              </div>
              <span className="text-xs font-semibold text-slate-700 truncate">{tp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products with CSS-generated visuals */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-lg font-black mb-4" style={{ color: '#1a1a2e' }}>{config.sections[0] || 'منتجاتنا'}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {config.products.slice(0, 6).map((p, i) => (
            <div key={i} className="rounded-xl border border-slate-100 overflow-hidden">
              {/* CSS-generated product visual — no external images */}
              <div className="h-24 relative overflow-hidden"
                style={{ background: `linear-gradient(${135 + i * 30}deg, ${primaryColor}${i % 2 ? '40' : '25'}, ${secondaryColor}${i % 2 ? '25' : '40'})` }}>
                <ProductVisual index={i} color1={primaryColor} color2={accentColor} />
                {p.badge && (
                  <span className="absolute top-1.5 right-1.5 text-[8px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: accentColor }}>{p.badge}</span>
                )}
              </div>
              <div className="p-2.5">
                <span className="text-[9px] text-slate-400">{p.category}</span>
                <h3 className="font-bold text-xs text-slate-800 truncate">{p.name}</h3>
                <p className="text-[10px] text-slate-500 line-clamp-1 mb-1.5">{p.description}</p>
                <span className="text-sm font-black" style={{ color: primaryColor }}>
                  {p.price.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">ل.س</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center border-t" style={{ borderColor: '#e2e8f0' }}>
        <p className="text-xs font-bold" style={{ color: primaryColor }}>{config.storeName}</p>
        <p className="text-[10px] text-slate-400 mt-1">أنشئ بواسطة تجّار — منصة المتاجر الذكية</p>
      </div>
    </div>
  );
}

// Pure CSS/SVG product visual — generates a unique abstract pattern per product index
function ProductVisual({ index, color1, color2 }: { index: number; color1: string; color2: string }) {
  const styles = [
    // Concentric circles
    <div key="0" className="absolute inset-0 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 opacity-30" style={{ borderColor: '#ffffff' }} />
      <div className="absolute w-8 h-8 rounded-full border-2 opacity-40" style={{ borderColor: '#ffffff' }} />
      <div className="absolute w-4 h-4 rounded-full opacity-50" style={{ background: '#ffffff' }} />
    </div>,
    // Diagonal stripes
    <div key="1" className="absolute inset-0" style={{
      backgroundImage: `repeating-linear-gradient(${45 + index * 15}deg, transparent 0, transparent 6px, rgba(255,255,255,0.12) 6px, rgba(255,255,255,0.12) 8px)`,
    }} />,
    // Dots grid
    <div key="2" className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(rgba(255,255,255,0.25) 1.5px, transparent 1.5px)`,
      backgroundSize: '12px 12px',
    }} />,
    // Wave pattern
    <div key="3" className="absolute inset-0" style={{
      backgroundImage: `repeating-linear-gradient(${-45 + index * 10}deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 10px)`,
    }} />,
    // Centered icon circle
    <div key="4" className="absolute inset-0 flex items-center justify-center">
      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
        <Package size={18} className="text-white/70" />
      </div>
    </div>,
    // Grid pattern
    <div key="5" className="absolute inset-0" style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
      backgroundSize: '10px 10px',
    }} />,
  ];

  return styles[index % styles.length];
}
