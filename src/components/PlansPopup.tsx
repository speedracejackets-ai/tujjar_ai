import { CheckCircle2, X, Zap, Crown, Rocket } from 'lucide-react';

type Props = {
  onSelect: (plan: string) => void;
  onSkip: () => void;
};

const plans = [
  {
    id: 'basic',
    name: 'الأساسي',
    icon: Zap,
    price: '49,900',
    period: 'شهرياً',
    color: '#64748b',
    features: [
      'حتى 50 منتج',
      'متجر إلكتروني كامل',
      'بوابات دفع سورية',
      'دعم فني عبر واتساب',
      'تقارير أساسية',
    ],
    missing: ['أدوات الذكاء الاصطناعي', 'نطاق خاص', 'تحليلات متقدمة'],
  },
  {
    id: 'pro',
    name: 'الاحترافي',
    icon: Crown,
    price: '149,900',
    period: 'شهرياً',
    color: '#00C2CB',
    highlight: true,
    badge: 'الأكثر شيوعاً',
    features: [
      'منتجات غير محدودة',
      'أدوات الذكاء الاصطناعي كاملة',
      'مصمم بانرات AI',
      'نطاق خاص مجاني',
      'تقارير متقدمة وخرائط',
      'دعم فني 24/7',
    ],
    missing: [],
  },
  {
    id: 'business',
    name: 'الأعمال',
    icon: Rocket,
    price: '349,900',
    period: 'شهرياً',
    color: '#008080',
    features: [
      'كل مميزات الاحترافي',
      'متاجر متعددة',
      'API مخصص',
      'مدير حساب شخصي',
      'تكامل ERP',
      'أولوية في الدعم',
    ],
    missing: [],
  },
];

export default function PlansPopup({ onSelect, onSkip }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#00C2CB]/4 blur-3xl" />

      <div className="w-full max-w-5xl relative z-10 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass border border-[#00C2CB]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB] animate-pulse" />
            <span className="text-xs text-[#00C2CB]">اختر خطتك وابدأ البيع</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">خطط تجّار</h1>
          <p className="text-slate-500">أسعار بالليرة السورية، دفع محلي 100%</p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative card-dark p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                plan.highlight
                  ? 'border-[#00C2CB]/40 shadow-2xl shadow-cyan-500/15'
                  : 'hover:border-[#1f2d3d]/80'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00C2CB] to-[#008080] text-white text-xs font-bold px-4 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}30` }}
                >
                  <plan.icon size={18} style={{ color: plan.color }} />
                </div>
                <span className="font-bold text-white text-lg">{plan.name}</span>
              </div>

              <div className="mb-5">
                <span className="text-3xl font-black text-white">{plan.price}</span>
                <span className="text-slate-500 text-sm mr-1">ل.س / {plan.period}</span>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <X size={14} className="flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelect(plan.id)}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-[#00C2CB] to-[#008080] text-white hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02]'
                    : 'border border-[#1f2d3d] text-slate-300 hover:border-[#00C2CB]/30 hover:text-white'
                }`}
              >
                اختر {plan.name}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={onSkip} className="btn-ghost text-sm text-slate-500">
            تخطي الآن، سأختار لاحقاً من لوحة التحكم
          </button>
        </div>
      </div>
    </div>
  );
}
