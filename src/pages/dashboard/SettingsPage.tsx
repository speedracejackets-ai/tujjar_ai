import { useState } from 'react';
import { Store, Phone, CreditCard, Truck, Globe, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

type SettingTab = 'store' | 'payments' | 'shipping' | 'plan';

export default function SettingsPage() {
  const { store, refreshStore } = useAuth();
  const [tab, setTab] = useState<SettingTab>('store');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [storeForm, setStoreForm] = useState({
    name: store?.name ?? '',
    description: store?.description ?? '',
    contact_email: store?.contact_email ?? '',
    contact_phone: store?.contact_phone ?? '',
    instagram: store?.instagram ?? '',
    facebook: store?.facebook ?? '',
    whatsapp: store?.whatsapp ?? '',
    primary_color: store?.primary_color ?? '#00C2CB',
  });

  const handleSaveStore = async () => {
    if (!store) return;
    setSaving(true);
    await supabase.from('stores').update(storeForm).eq('id', store.id);
    await refreshStore();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs: { id: SettingTab; label: string; icon: React.ElementType }[] = [
    { id: 'store', label: 'المتجر', icon: Store },
    { id: 'payments', label: 'طرق الدفع', icon: CreditCard },
    { id: 'shipping', label: 'الشحن', icon: Truck },
    { id: 'plan', label: 'خطة الاشتراك', icon: Globe },
  ];

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-white">الإعدادات</h1>
        <p className="text-slate-500 text-sm mt-1">إدارة إعدادات متجرك</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#1f2d3d] pb-0 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap -mb-px ${
              tab === t.id
                ? 'border-[#00C2CB] text-[#00C2CB]'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <t.icon size={15} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'store' && (
        <div className="card-dark p-6 space-y-4 max-w-2xl">
          <h2 className="text-base font-bold text-white">معلومات المتجر</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">اسم المتجر</label>
              <input className="input-dark text-sm" value={storeForm.name} onChange={e => setStoreForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">البريد الإلكتروني</label>
              <input className="input-dark text-sm ltr" type="email" value={storeForm.contact_email} onChange={e => setStoreForm(f => ({ ...f, contact_email: e.target.value }))} dir="ltr" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">رقم الهاتف</label>
              <input className="input-dark text-sm" dir="ltr" value={storeForm.contact_phone} onChange={e => setStoreForm(f => ({ ...f, contact_phone: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">واتساب</label>
              <input className="input-dark text-sm" dir="ltr" value={storeForm.whatsapp} onChange={e => setStoreForm(f => ({ ...f, whatsapp: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">إنستغرام</label>
              <input className="input-dark text-sm" dir="ltr" placeholder="@username" value={storeForm.instagram} onChange={e => setStoreForm(f => ({ ...f, instagram: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">فيسبوك</label>
              <input className="input-dark text-sm" dir="ltr" value={storeForm.facebook} onChange={e => setStoreForm(f => ({ ...f, facebook: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">وصف المتجر</label>
            <textarea className="input-dark text-sm resize-none" rows={3} value={storeForm.description} onChange={e => setStoreForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">اللون الرئيسي</label>
            <div className="flex items-center gap-3">
              <input type="color" value={storeForm.primary_color} onChange={e => setStoreForm(f => ({ ...f, primary_color: e.target.value }))} className="w-10 h-10 rounded-lg border border-[#1f2d3d] bg-transparent cursor-pointer" />
              <input className="input-dark text-sm w-32" dir="ltr" value={storeForm.primary_color} onChange={e => setStoreForm(f => ({ ...f, primary_color: e.target.value }))} />
            </div>
          </div>
          <button onClick={handleSaveStore} disabled={saving} className="btn-primary flex items-center gap-2">
            {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saving ? 'جارٍ الحفظ...' : saved ? 'تم الحفظ!' : 'حفظ التغييرات'}
          </button>
        </div>
      )}

      {tab === 'payments' && (
        <div className="card-dark p-6 max-w-2xl space-y-4">
          <h2 className="text-base font-bold text-white">طرق الدفع المتاحة</h2>
          {[
            { id: 'syriatel', label: 'سيريتل كاش', desc: 'دفع إلكتروني عبر سيريتل', enabled: true },
            { id: 'shamcash', label: 'شام كاش', desc: 'دفع عبر تطبيق شام كاش', enabled: true },
            { id: 'cash', label: 'الدفع عند الاستلام', desc: 'الدفع نقداً عند الاستلام', enabled: true },
            { id: 'bank', label: 'تحويل بنكي', desc: 'حوالة مصرفية لحساب المتجر', enabled: false },
          ].map(m => (
            <div key={m.id} className="flex items-center justify-between py-3 border-b border-[#1f2d3d] last:border-0">
              <div>
                <p className="text-sm font-medium text-white">{m.label}</p>
                <p className="text-xs text-slate-500">{m.desc}</p>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors cursor-pointer flex items-center ${m.enabled ? 'bg-gradient-to-r from-[#00C2CB] to-[#008080]' : 'bg-[#1f2d3d]'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${m.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>
          ))}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
            <AlertCircle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-300 leading-relaxed">
              لتلقي المدفوعات عبر سيريتل كاش وشام كاش، يرجى إدخال رقم حسابك في إعدادات كل طريقة دفع.
            </p>
          </div>
        </div>
      )}

      {tab === 'shipping' && (
        <div className="card-dark p-6 max-w-2xl space-y-4">
          <h2 className="text-base font-bold text-white">خطط الشحن</h2>
          {[
            { zone: 'دمشق وريفها', price: '5,000', days: '1-2 أيام' },
            { zone: 'المدن الرئيسية', price: '10,000', days: '2-3 أيام' },
            { zone: 'جميع المحافظات', price: '15,000', days: '3-5 أيام' },
          ].map((z, i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-[#1f2d3d] last:border-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{z.zone}</p>
                <p className="text-xs text-slate-500">{z.days}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="input-dark text-sm w-32"
                  dir="ltr"
                  defaultValue={z.price}
                  placeholder="السعر (ل.س)"
                />
                <span className="text-xs text-slate-500">ل.س</span>
              </div>
            </div>
          ))}
          <button className="btn-primary flex items-center gap-2 text-sm">
            <Save size={15} />
            حفظ إعدادات الشحن
          </button>
        </div>
      )}

      {tab === 'plan' && (
        <div className="card-dark p-6 max-w-2xl space-y-4">
          <h2 className="text-base font-bold text-white">خطة الاشتراك</h2>
          <div className="bg-gradient-to-br from-[#00C2CB]/10 to-[#008080]/5 border border-[#00C2CB]/20 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C2CB]/30 to-[#008080]/20 flex items-center justify-center">
                <Globe size={18} className="text-[#00C2CB]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">الخطة الاحترافية</p>
                <p className="text-xs text-slate-500">نشطة حتى 21 يونيو 2025</p>
              </div>
              <span className="mr-auto badge-success">نشطة</span>
            </div>
            <div className="flex gap-4 text-sm">
              <div>
                <p className="text-slate-500 text-xs">السعر الشهري</p>
                <p className="text-white font-bold">149,900 ل.س</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">المنتجات</p>
                <p className="text-white font-bold">غير محدودة</p>
              </div>
            </div>
          </div>
          <button className="btn-secondary text-sm">ترقية الخطة</button>
        </div>
      )}
    </div>
  );
}
