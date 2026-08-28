import { Bell, ShoppingBag, Package, CreditCard, AlertCircle, CheckCircle2 } from 'lucide-react';

const mockNotifications = [
  { id: 1, type: 'order', title: 'طلب جديد!', message: 'أحمد محمد طلب جاكيت شتوي بقيمة 125,000 ل.س', time: 'منذ 5 دقائق', read: false },
  { id: 2, type: 'payment', title: 'دفعة تحت التحقق', message: 'تم استلام إشعار دفع سيريتل كاش. جارٍ التحقق.', time: 'منذ ساعة', read: false },
  { id: 3, type: 'product', title: 'مخزون منخفض', message: 'الحقيبة الجلدية الفاخرة — تبقى 5 قطع فقط', time: 'منذ 3 ساعات', read: false },
  { id: 4, type: 'system', title: 'تم تفعيل متجرك!', message: 'مبروك! متجرك تجّار جاهز للاستقبال الآن', time: 'أمس', read: true },
  { id: 5, type: 'order', title: 'تم تسليم الطلب #1038', message: 'أُكد تسليم الطلب لمحمد كريم بنجاح', time: 'أمس', read: true },
];

const typeConfig = {
  order: { icon: ShoppingBag, color: '#00C2CB', bg: '#00C2CB15' },
  payment: { icon: CreditCard, color: '#10b981', bg: '#10b98115' },
  product: { icon: Package, color: '#f59e0b', bg: '#f59e0b15' },
  system: { icon: Bell, color: '#8b5cf6', bg: '#8b5cf615' },
};

export default function NotificationsPage() {
  const unread = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">الإشعارات</h1>
          <p className="text-slate-500 text-sm mt-1">{unread} إشعارات غير مقروءة</p>
        </div>
        <button className="btn-ghost text-sm text-[#00C2CB]">تحديد الكل كمقروء</button>
      </div>

      <div className="space-y-3 max-w-2xl">
        {mockNotifications.map(n => {
          const t = typeConfig[n.type as keyof typeof typeConfig];
          return (
            <div
              key={n.id}
              className={`card-dark p-4 flex items-start gap-4 transition-all duration-200 hover:border-[#00C2CB]/15 ${!n.read ? 'border-[#00C2CB]/10 bg-[#00C2CB]/3' : ''}`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: t.bg }}>
                <t.icon size={18} style={{ color: t.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-white">{n.title}</p>
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB] animate-pulse" />}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{n.message}</p>
                <p className="text-xs text-slate-600 mt-1.5">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
