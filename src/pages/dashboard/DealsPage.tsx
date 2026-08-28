import { useState } from 'react';
import { Tag, Plus, Percent, Clock, Trash2 } from 'lucide-react';

const mockDeals = [
  { id: 1, name: 'خصم الصيف', code: 'SUMMER25', discount: 25, type: 'percent', uses: 48, expires: '2025-07-01', active: true },
  { id: 2, name: 'عرض العيد', code: 'EID2025', discount: 50000, type: 'fixed', uses: 12, expires: '2025-06-15', active: true },
  { id: 3, name: 'خصم الشحن', code: 'FREESHIP', discount: 100, type: 'shipping', uses: 89, expires: '2025-05-31', active: false },
];

export default function DealsPage() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">العروض والخصومات</h1>
          <p className="text-slate-500 text-sm mt-1">إدارة أكواد الخصم والعروض</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2">
          <Plus size={15} />
          كود خصم جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'أكواد نشطة', value: '2', color: '#00C2CB' },
          { label: 'استخدامات هذا الشهر', value: '149', color: '#008080' },
          { label: 'توفير العملاء', value: '3,200,000 ل.س', color: '#10b981' },
        ].map((s, i) => (
          <div key={i} className="card-dark p-4">
            <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Deals list */}
      <div className="space-y-3">
        {mockDeals.map(d => (
          <div key={d.id} className="card-dark p-4 flex items-center gap-4 hover:border-[#00C2CB]/15 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#00C2CB]/10 flex items-center justify-center flex-shrink-0">
              <Tag size={18} className="text-[#00C2CB]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-bold text-white">{d.name}</p>
                <span className={d.active ? 'badge-success' : 'badge-default'}>{d.active ? 'نشط' : 'منتهي'}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Percent size={11} />
                  {d.type === 'percent' ? `${d.discount}% خصم` : d.type === 'fixed' ? `${d.discount.toLocaleString()} ل.س` : 'شحن مجاني'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {d.expires}
                </span>
                <span>{d.uses} استخدام</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-[#0d1520] border border-[#1f2d3d] px-3 py-1.5 rounded-lg text-[#00C2CB]" dir="ltr">{d.code}</span>
              <button className="text-slate-600 hover:text-red-400 transition-colors p-1">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in" onClick={e => e.target === e.currentTarget && setShowAdd(false)}>
          <div className="glass-strong rounded-3xl p-6 w-full max-w-md animate-fade-in-up">
            <h2 className="text-lg font-bold text-white mb-5">إنشاء كود خصم</h2>
            <div className="space-y-3">
              <input className="input-dark text-sm" placeholder="اسم الكود" />
              <input className="input-dark text-sm ltr" placeholder="SUMMER25" dir="ltr" />
              <div className="grid grid-cols-2 gap-3">
                <input className="input-dark text-sm" placeholder="نسبة الخصم %" type="number" dir="ltr" />
                <input className="input-dark text-sm" placeholder="تاريخ الانتهاء" type="date" dir="ltr" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAdd(false)} className="btn-ghost flex-1">إلغاء</button>
              <button onClick={() => setShowAdd(false)} className="btn-primary flex-1">إنشاء الكود</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
