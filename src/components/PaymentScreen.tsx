import { useState } from 'react';
import { CheckCircle2, Copy, Phone, QrCode } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Props = {
  plan: string;
  userId: string;
  onDone: () => void;
};

type Method = 'syriatel' | 'shamcash' | 'cash';

const PLAN_PRICES: Record<string, { label: string; price: string }> = {
  basic: { label: 'الأساسي', price: '49,900' },
  pro: { label: 'الاحترافي', price: '149,900' },
  business: { label: 'الأعمال', price: '349,900' },
};

const SYRIATEL_NUMBER = '0988 000 111';
const SHAMCASH_USER = '@tujjar.pay';

export default function PaymentScreen({ plan, userId, onDone }: Props) {
  const [method, setMethod] = useState<Method>('syriatel');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [done, setDone] = useState(false);

  const planInfo = PLAN_PRICES[plan] ?? PLAN_PRICES.basic;

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaid = async () => {
    setLoading(true);
    await supabase.from('subscriptions').insert({
      user_id: userId,
      plan,
      price_syp: Number(planInfo.price.replace(',', '')),
      payment_method: method,
      payment_status: 'pending',
      transaction_ref: `TJ-${Date.now()}`,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
    setLoading(false);
    setDone(true);
    setTimeout(onDone, 2500);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-6">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00C2CB]/20 to-[#008080]/10 border border-[#00C2CB]/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={36} className="text-[#00C2CB]" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">تم تسجيل طلبك!</h2>
          <p className="text-slate-400 text-sm mb-1">جارٍ التحقق من الدفع...</p>
          <p className="text-slate-600 text-xs">سيتم تفعيل متجرك خلال ساعات قليلة بعد التأكيد</p>
          <div className="flex gap-1.5 justify-center mt-6">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#00C2CB]/4 blur-3xl" />

      <div className="w-full max-w-lg relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <img src="/1777583164569.png" alt="تجار" className="w-12 h-12 object-contain mx-auto mb-3" />
          <h1 className="text-2xl font-black text-white mb-1">إتمام الدفع</h1>
          <p className="text-slate-500 text-sm">خطة {planInfo.label} — {planInfo.price} ل.س / شهر</p>
        </div>

        <div className="glass-strong rounded-3xl p-6">
          {/* Method selector */}
          <div className="mb-6">
            <p className="text-sm text-slate-400 mb-3 font-medium">اختر طريقة الدفع</p>
            <div className="grid grid-cols-3 gap-2">
              {(['syriatel', 'shamcash', 'cash'] as Method[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`py-3 px-2 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                    method === m
                      ? 'border-[#00C2CB]/50 bg-[#00C2CB]/10 text-[#00C2CB]'
                      : 'border-[#1f2d3d] text-slate-500 hover:border-[#1f2d3d] hover:text-slate-300'
                  }`}
                >
                  {m === 'syriatel' ? 'سيريتل كاش' : m === 'shamcash' ? 'شام كاش' : 'كاش عند الاستلام'}
                </button>
              ))}
            </div>
          </div>

          {/* Instructions */}
          {method === 'syriatel' && (
            <div className="card-dark rounded-2xl p-5 mb-5 space-y-3 animate-fade-in">
              <div className="flex items-center gap-2 text-[#00C2CB] font-semibold text-sm">
                <Phone size={16} />
                سيريتل كاش
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                قم بتحويل مبلغ <strong className="text-white">{planInfo.price} ل.س</strong> إلى الرقم التالي عبر تطبيق سيريتل كاش:
              </p>
              <div className="flex items-center justify-between bg-[#0a0f1a] rounded-xl px-4 py-3">
                <span className="text-white font-bold text-lg ltr">{SYRIATEL_NUMBER}</span>
                <button onClick={() => copy(SYRIATEL_NUMBER)} className="text-[#00C2CB] hover:text-white transition-colors">
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <p className="text-slate-600 text-xs">ملاحظة: أرسل اسمك في ملاحظة التحويل ليتم التعرف على دفعتك</p>
            </div>
          )}

          {method === 'shamcash' && (
            <div className="card-dark rounded-2xl p-5 mb-5 space-y-3 animate-fade-in">
              <div className="flex items-center gap-2 text-[#00C2CB] font-semibold text-sm">
                <QrCode size={16} />
                شام كاش
              </div>
              <p className="text-slate-400 text-sm">
                حوّل مبلغ <strong className="text-white">{planInfo.price} ل.س</strong> إلى الحساب التالي:
              </p>
              {/* Mock QR */}
              <div className="flex items-center justify-center bg-white rounded-xl p-4">
                <div className="w-32 h-32 bg-[#1f2d3d] rounded-lg flex items-center justify-center">
                  <QrCode size={64} className="text-[#00C2CB]" />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#0a0f1a] rounded-xl px-4 py-3">
                <span className="text-white font-bold ltr">{SHAMCASH_USER}</span>
                <button onClick={() => copy(SHAMCASH_USER)} className="text-[#00C2CB] hover:text-white transition-colors">
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          )}

          {method === 'cash' && (
            <div className="card-dark rounded-2xl p-5 mb-5 animate-fade-in">
              <p className="text-slate-400 text-sm leading-relaxed">
                سيتواصل معك فريق تجّار خلال ساعات لترتيب الدفع النقدي.
                سيتم تفعيل متجرك فور استلام المبلغ.
              </p>
            </div>
          )}

          <button
            onClick={handlePaid}
            disabled={loading}
            className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" /></>
            ) : (
              <><CheckCircle2 size={18} />لقد أتممت الدفع</>
            )}
          </button>

          <p className="text-center text-xs text-slate-600 mt-4">
            سيتم تفعيل اشتراكك خلال 2-4 ساعات بعد التحقق من الدفع
          </p>
        </div>
      </div>
    </div>
  );
}
