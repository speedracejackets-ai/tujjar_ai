import { useState } from 'react';
import { Eye, EyeOff, Phone, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { signUp, signIn } from '../lib/auth';

type Props = { onBack: () => void };
type Mode = 'login' | 'register';

export default function AuthPage({ onBack }: Props) {
  const [mode, setMode] = useState<Mode>('register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'register') {
        const { error } = await signUp(form.email, form.password, form.phone);
        if (error) throw error;
      } else {
        const { error } = await signIn(form.email, form.password);
        if (error) throw error;
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      if (e.message?.includes('already registered')) {
        setError('البريد الإلكتروني مسجل مسبقاً. يرجى تسجيل الدخول.');
      } else if (e.message?.includes('Invalid login')) {
        setError('البريد أو كلمة المرور غير صحيحة.');
      } else {
        setError(e.message ?? 'حدث خطأ، يرجى المحاولة مجدداً');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* BG */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#00C2CB]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#008080]/6 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <button onClick={onBack} className="inline-flex items-center gap-2 mb-6">
            <img src="/1777583164569.png" alt="تجار" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-black gradient-text">تجّار</span>
          </button>
          <h1 className="text-2xl font-black text-white mb-2">
            {mode === 'register' ? 'أنشئ حسابك مجاناً' : 'مرحباً بعودتك'}
          </h1>
          <p className="text-slate-500 text-sm">
            {mode === 'register' ? 'ابدأ رحلة البيع الإلكتروني في سوريا' : 'سجّل دخولك لإدارة متجرك'}
          </p>
        </div>

        {/* Card */}
        <div className="glass-strong rounded-3xl p-8">
          {/* Mode toggle */}
          <div className="flex gap-1 p-1 bg-[#0d1520] rounded-xl mb-6">
            {(['register', 'login'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  mode === m
                    ? 'bg-gradient-to-r from-[#00C2CB] to-[#008080] text-white shadow'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {m === 'register' ? 'حساب جديد' : 'تسجيل الدخول'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <User size={16} className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="اسمك الكامل"
                  value={form.name}
                  onChange={set('name')}
                  className="input-dark pr-10"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail size={16} className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-500" />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={form.email}
                onChange={set('email')}
                className="input-dark pr-10"
                required
                dir="ltr"
              />
            </div>

            {mode === 'register' && (
              <div className="relative">
                <Phone size={16} className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-500" />
                <input
                  type="tel"
                  placeholder="رقم الهاتف (اختياري) مثال: 0988xxxxxx"
                  value={form.phone}
                  onChange={set('phone')}
                  className="input-dark pr-10"
                  dir="ltr"
                />
              </div>
            )}

            <div className="relative">
              <Lock size={16} className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-500" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="كلمة المرور"
                value={form.password}
                onChange={set('password')}
                className="input-dark pr-10 pl-10"
                required
                minLength={6}
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400 animate-fade-in">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex gap-1.5">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              ) : (
                <>
                  <Sparkles size={16} />
                  {mode === 'register' ? 'إنشاء الحساب وبدء الإعداد' : 'تسجيل الدخول'}
                  <ArrowRight size={16} className="rotate-180" />
                </>
              )}
            </button>
          </form>

          {mode === 'register' && (
            <p className="text-center text-xs text-slate-600 mt-5">
              بإنشاء حساب، أنت توافق على{' '}
              <span className="text-[#00C2CB] cursor-pointer hover:underline">شروط الاستخدام</span>
              {' '}و{' '}
              <span className="text-[#00C2CB] cursor-pointer hover:underline">سياسة الخصوصية</span>
            </p>
          )}
        </div>

        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 text-sm mt-6 mx-auto hover:text-slate-300 transition-colors">
          <ArrowRight size={14} />
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
}
