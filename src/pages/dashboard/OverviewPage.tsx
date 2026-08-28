import { ShoppingBag, Package, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Eye, Sparkles, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { DashPage } from './DashboardLayout';

type Props = { onNavigate: (p: DashPage) => void };

const mockStats = [
  { label: 'إجمالي المبيعات', value: '1,250,000', unit: 'ل.س', change: '+12.5%', up: true, icon: TrendingUp, color: '#00C2CB' },
  { label: 'الطلبات', value: '38', unit: 'طلب', change: '+8.3%', up: true, icon: ShoppingBag, color: '#008080' },
  { label: 'المنتجات النشطة', value: '24', unit: 'منتج', change: '+2', up: true, icon: Package, color: '#0ea5e9' },
  { label: 'زوار المتجر', value: '1,842', unit: 'زيارة', change: '-3.1%', up: false, icon: Users, color: '#64748b' },
];

const mockRecentOrders = [
  { id: '#1042', customer: 'أحمد محمد', product: 'جاكيت شتوي', amount: '125,000', status: 'new' },
  { id: '#1041', customer: 'سارة علي', product: 'فستان سهرة', amount: '95,000', status: 'processing' },
  { id: '#1040', customer: 'خالد عمر', product: 'حذاء رياضي', amount: '75,000', status: 'delivered' },
  { id: '#1039', customer: 'ليلى حسن', product: 'حقيبة جلدية', amount: '210,000', status: 'cancelled' },
];

const statusMap: Record<string, { label: string; cls: string }> = {
  new: { label: 'جديد', cls: 'badge-info' },
  processing: { label: 'قيد التجهيز', cls: 'badge-warning' },
  delivered: { label: 'تم التوصيل', cls: 'badge-success' },
  cancelled: { label: 'ملغي', cls: 'badge-error' },
};

const mockTopProducts = [
  { name: 'جاكيت شتوي كاجوال', sales: 28, revenue: '3,500,000', color: '#00C2CB' },
  { name: 'فستان سهرة أنيق', sales: 19, revenue: '1,805,000', color: '#008080' },
  { name: 'حقيبة جلدية فاخرة', sales: 14, revenue: '2,940,000', color: '#0ea5e9' },
];

export default function OverviewPage({ onNavigate }: Props) {
  const { store } = useAuth();

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            مرحباً، <span className="gradient-text">{store?.name?.split(' ')[0] ?? 'تاجر'}</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">إليك ملخص متجرك اليوم</p>
        </div>
        <button
          onClick={() => onNavigate('ai-product')}
          className="btn-primary text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-4 flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Sparkles size={14} className="sm:w-4 sm:h-4" />
          <span>إضافة بـ AI</span>
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {mockStats.map((s, i) => (
          <div key={i} className="card-dark p-3 sm:p-5 hover:border-[#00C2CB]/15 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
                <s.icon size={16} className="sm:w-4.5 sm:h-4.5" style={{ color: s.color }} />
              </div>
              <span className={`text-[10px] sm:text-xs font-semibold flex items-center gap-0.5 flex-shrink-0 ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>
                {s.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {s.change}
              </span>
            </div>
            <p className="text-lg sm:text-2xl font-black text-white">{s.value}</p>
            <p className="text-[10px] sm:text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 card-dark p-3 sm:p-5">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-sm sm:text-base font-bold text-white">آخر الطلبات</h2>
            <button onClick={() => onNavigate('orders')} className="text-[10px] sm:text-xs text-[#00C2CB] flex items-center gap-0.5 hover:underline flex-shrink-0">
              عرض الكل <ChevronLeft size={10} className="sm:w-3 sm:h-3" />
            </button>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {mockRecentOrders.map((o) => (
              <div key={o.id} className="flex items-center gap-2 sm:gap-3 py-1.5 sm:py-2.5 border-b border-[#1f2d3d] last:border-0">
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-[#1f2d3d] flex items-center justify-center text-[10px] sm:text-xs font-bold text-slate-400 flex-shrink-0">
                  {o.id.slice(1, 3)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-white truncate">{o.customer}</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 truncate">{o.product}</p>
                </div>
                <div className="text-left flex-shrink-0">
                  <p className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">{o.amount} ل.س</p>
                  <span className={statusMap[o.status].cls}>{statusMap[o.status].label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="card-dark p-3 sm:p-5">
          <h2 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">أكثر المنتجات مبيعاً</h2>
          <div className="space-y-2 sm:space-y-3">
            {mockTopProducts.map((p, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3">
                <span className="text-[10px] sm:text-xs text-slate-600 w-3 flex-shrink-0">{i + 1}</span>
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${p.color}40, ${p.color}20)` }}>
                  <Package size={14} style={{ color: p.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-white truncate">{p.name}</p>
                  <p className="text-[10px] sm:text-xs text-slate-500">{p.sales} مبيعة</p>
                </div>
                <span className="text-[10px] sm:text-xs text-[#00C2CB] font-semibold whitespace-nowrap">{p.revenue} ل.س</span>
              </div>
            ))}
          </div>

          <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-[#1f2d3d]">
            <button
              onClick={() => onNavigate('ai-tools')}
              className="w-full py-2 sm:py-2.5 rounded-xl border border-dashed border-[#00C2CB]/30 text-[#00C2CB] text-[10px] sm:text-xs font-medium hover:bg-[#00C2CB]/8 transition-all flex items-center justify-center gap-1 sm:gap-2"
            >
              <Sparkles size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">أدوات AI</span>
              <span className="sm:hidden">AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card-dark p-3 sm:p-5">
        <h2 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {[
            { label: 'إضافة منتج', icon: Package, page: 'products' as DashPage, color: '#00C2CB' },
            { label: 'إدارة الطلبات', icon: ShoppingBag, page: 'orders' as DashPage, color: '#008080' },
            { label: 'تحليلات', icon: TrendingUp, page: 'analytics' as DashPage, color: '#0ea5e9' },
            { label: 'أدوات الذكاء', icon: Sparkles, page: 'ai-tools' as DashPage, color: '#8b5cf6' },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => onNavigate(a.page)}
              className="flex flex-col items-center gap-1.5 sm:gap-2 p-2.5 sm:p-4 rounded-xl border border-[#1f2d3d] hover:border-[#00C2CB]/20 hover:bg-[#00C2CB]/5 transition-all duration-200 group"
            >
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 flex-shrink-0" style={{ background: `${a.color}15` }}>
                <a.icon size={16} className="sm:w-4.5 sm:h-4.5" style={{ color: a.color }} />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-slate-400 group-hover:text-white transition-colors text-center">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
