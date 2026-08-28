import { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Package } from 'lucide-react';

const mockOrders = [
  { id: '#1042', customer: 'أحمد محمد', phone: '0988112233', address: 'دمشق، المزة', items: [{ name: 'جاكيت شتوي', qty: 1, price: 125000 }], total: 125000, status: 'new', date: '2025-05-21' },
  { id: '#1041', customer: 'سارة علي', phone: '0933445566', address: 'حلب، الفرقان', items: [{ name: 'فستان سهرة', qty: 1, price: 95000 }], total: 95000, status: 'processing', date: '2025-05-20' },
  { id: '#1040', customer: 'خالد عمر', phone: '0988776655', address: 'حمص، عكرمة', items: [{ name: 'حذاء رياضي', qty: 2, price: 37500 }], total: 75000, status: 'delivered', date: '2025-05-19' },
  { id: '#1039', customer: 'ليلى حسن', phone: '0944332211', address: 'اللاذقية، الرمل الجنوبي', items: [{ name: 'حقيبة جلدية', qty: 1, price: 210000 }], total: 210000, status: 'cancelled', date: '2025-05-18' },
  { id: '#1038', customer: 'محمد كريم', phone: '0988001122', address: 'دمشق، باب توما', items: [{ name: 'ساعة رجالية', qty: 1, price: 350000 }], total: 350000, status: 'delivered', date: '2025-05-17' },
];

const statusConfig: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
  new: { label: 'جديد', cls: 'badge-info', icon: Clock },
  processing: { label: 'قيد التجهيز', cls: 'badge-warning', icon: Package },
  delivered: { label: 'تم التوصيل', cls: 'badge-success', icon: CheckCircle },
  cancelled: { label: 'ملغي', cls: 'badge-error', icon: XCircle },
};

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = mockOrders.filter(o =>
    (filter === 'all' || o.status === filter) &&
    (o.customer.includes(search) || o.id.includes(search))
  );

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">الطلبات</h1>
          <p className="text-slate-500 text-sm mt-1">{mockOrders.length} طلب إجمالاً</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-500" />
          <input
            type="text"
            placeholder="ابحث باسم العميل أو رقم الطلب..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-dark pr-10 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'new', 'processing', 'delivered', 'cancelled'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                filter === s
                  ? 'bg-gradient-to-r from-[#00C2CB] to-[#008080] text-white'
                  : 'border border-[#1f2d3d] text-slate-500 hover:border-[#00C2CB]/30 hover:text-slate-300'
              }`}
            >
              {s === 'all' ? 'الكل' : statusConfig[s]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f2d3d]">
                {['رقم الطلب', 'العميل', 'المنتجات', 'المجموع', 'الحالة', 'التاريخ', ''].map(h => (
                  <th key={h} className="text-right px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => {
                const s = statusConfig[o.status];
                return (
                  <tr key={o.id} className="border-b border-[#1f2d3d] last:border-0 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3.5 text-sm font-bold text-[#00C2CB]">{o.id}</td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-medium text-white">{o.customer}</p>
                      <p className="text-xs text-slate-500 ltr">{o.phone}</p>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-400 max-w-[160px]">
                      {o.items.map(i => i.name).join('، ')}
                    </td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-white whitespace-nowrap">
                      {o.total.toLocaleString()} ل.س
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={s.cls}>{s.label}</span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 ltr">{o.date}</td>
                    <td className="px-4 py-3.5">
                      <button className="text-slate-500 hover:text-[#00C2CB] transition-colors">
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-600">لا توجد طلبات مطابقة</div>
          )}
        </div>
      </div>
    </div>
  );
}
