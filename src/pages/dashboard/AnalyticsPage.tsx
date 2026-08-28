import { TrendingUp, ShoppingBag, Users, MapPin, ArrowUpRight } from 'lucide-react';
import SyriaMap from '../../components/SyriaMap';

const salesData = [
  { month: 'يناير', value: 320000, orders: 18 },
  { month: 'فبراير', value: 520000, orders: 28 },
  { month: 'مارس', value: 680000, orders: 35 },
  { month: 'أبريل', value: 950000, orders: 48 },
  { month: 'مايو', value: 1320000, orders: 65 },
];

const cityData = [
  { city: 'دمشق', orders: 48, pct: 38 },
  { city: 'حلب', orders: 32, pct: 25 },
  { city: 'حمص', orders: 18, pct: 14 },
  { city: 'اللاذقية', orders: 15, pct: 12 },
  { city: 'طرطوس', orders: 10, pct: 8 },
  { city: 'أخرى', orders: 4, pct: 3 },
];

const maxVal = Math.max(...salesData.map(d => d.value));
const totalRevenue = salesData.reduce((sum, d) => sum + d.value, 0);
const avgOrderValue = totalRevenue / salesData.reduce((sum, d) => sum + d.orders, 0);
const conversionRate = ((salesData.reduce((sum, d) => sum + d.orders, 0) / (5280 * 2.5)) * 100).toFixed(1);

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-white">التحليلات والتقارير</h1>
        <p className="text-slate-500 text-sm mt-1">بيانات أداء متجرك</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي الإيرادات', value: (totalRevenue).toLocaleString(), unit: 'ل.س', change: '+38.5%', icon: TrendingUp, color: '#00C2CB' },
          { label: 'معدل التحويل', value: conversionRate, unit: '%', change: '+2.3%', icon: ArrowUpRight, color: '#008080' },
          { label: 'متوسط قيمة الطلب', value: (Math.round(avgOrderValue) / 1000).toFixed(0) + 'k', unit: 'ل.س', change: '+12.5%', icon: ShoppingBag, color: '#0ea5e9' },
          { label: 'إجمالي الطلبات', value: '194', unit: 'طلب', change: '+45%', icon: Users, color: '#10b981' },
        ].map((k, i) => (
          <div key={i} className="card-dark p-4 sm:p-5 hover:border-[#00C2CB]/15 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${k.color}15` }}>
                <k.icon size={16} className="sm:w-4.5 sm:h-4.5" style={{ color: k.color }} />
              </div>
              <span className="text-[10px] sm:text-xs text-emerald-400 font-semibold">{k.change}</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-white">{k.value}</p>
            <p className="text-[10px] sm:text-xs text-slate-500">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales chart */}
        <div className="lg:col-span-2 card-dark p-5">
          <h2 className="text-base font-bold text-white mb-5">المبيعات الشهرية</h2>
          <div className="flex items-end gap-3 h-48">
            {salesData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] text-slate-500 font-medium">
                  {(d.value / 1000).toFixed(0)}k
                </span>
                <div className="w-full rounded-t-lg overflow-hidden relative group" style={{ height: `${(d.value / maxVal) * 160}px`, minHeight: 12 }}>
                  <div
                    className="w-full h-full bg-gradient-to-t from-[#008080] to-[#00C2CB] opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ borderRadius: '6px 6px 0 0' }}
                  />
                </div>
                <span className="text-[10px] text-slate-600">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Syria map */}
        <div className="card-dark p-5">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <MapPin size={16} className="text-[#00C2CB]" />
            التوزيع الجغرافي
          </h2>
          <SyriaMap />
          <div className="mt-4 space-y-2">
            {cityData.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-slate-400 w-16 truncate">{c.city}</span>
                <div className="flex-1 bg-[#1f2d3d] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00C2CB] to-[#008080] rounded-full transition-all duration-700"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 w-8 text-left">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart review */}
      <div className="card-dark p-5">
        <h2 className="text-base font-bold text-white mb-4">مراجعة السلة الحية</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'سلال نشطة الآن', value: '7', color: '#00C2CB' },
            { label: 'متوسط عناصر السلة', value: '2.4', color: '#008080' },
            { label: 'سلال مهجورة اليوم', value: '12', color: '#f59e0b' },
            { label: 'قيمة سلل منتظرة', value: '840,000 ل.س', color: '#10b981' },
          ].map((item, i) => (
            <div key={i} className="bg-[#0d1520] rounded-xl p-4 border border-[#1f2d3d]">
              <p className="text-xl font-black" style={{ color: item.color }}>{item.value}</p>
              <p className="text-xs text-slate-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
