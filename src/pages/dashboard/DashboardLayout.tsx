import { useState } from 'react';
import {
  LayoutDashboard, ShoppingBag, Package, BarChart3, Map, Settings,
  Bell, Tag, MessageSquare, Wand2, Image, FileText, Layers,
  LogOut, Menu, X, ExternalLink, ChevronDown, ChevronUp,
  Sparkles, Camera, Type, Palette, Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { signOut } from '../../lib/auth';
import OverviewPage from './OverviewPage';
import OrdersPage from './OrdersPage';
import ProductsPage from './ProductsPage';
import AnalyticsPage from './AnalyticsPage';
import SettingsPage from './SettingsPage';
import NotificationsPage from './NotificationsPage';
import DealsPage from './DealsPage';
import AIProductPage from './AIProductPage';
import AIToolsPage from './AIToolsPage';
import SupportBubble from '../../components/SupportBubble';

export type DashPage =
  | 'overview' | 'orders' | 'products' | 'analytics' | 'settings'
  | 'notifications' | 'deals' | 'ai-product' | 'ai-tools';

type NavItem = {
  id: DashPage;
  label: string;
  icon: React.ElementType;
  badge?: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const NAV: NavGroup[] = [
  {
    title: 'الرئيسية',
    items: [
      { id: 'overview', label: 'لوحة التحكم', icon: LayoutDashboard },
      { id: 'orders', label: 'الطلبات', icon: ShoppingBag, badge: 'جديد' },
      { id: 'products', label: 'المنتجات', icon: Package },
    ],
  },
  {
    title: 'التسويق',
    items: [
      { id: 'deals', label: 'العروض والخصومات', icon: Tag },
      { id: 'notifications', label: 'الإشعارات', icon: Bell },
    ],
  },
  {
    title: 'التحليلات',
    items: [
      { id: 'analytics', label: 'التقارير والتحليلات', icon: BarChart3 },
    ],
  },
  {
    title: 'الذكاء الاصطناعي',
    items: [
      { id: 'ai-product', label: 'إضافة منتج بـ AI', icon: Sparkles },
      { id: 'ai-tools', label: 'أدوات الذكاء الاصطناعي', icon: Wand2 },
    ],
  },
  {
    title: 'الإعدادات',
    items: [
      { id: 'settings', label: 'إعدادات المتجر', icon: Settings },
    ],
  },
];

export default function DashboardLayout() {
  const { store, user } = useAuth();
  const [page, setPage] = useState<DashPage>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (p: DashPage) => {
    setPage(p);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (page) {
      case 'overview': return <OverviewPage onNavigate={navigate} />;
      case 'orders': return <OrdersPage />;
      case 'products': return <ProductsPage onNavigate={navigate} />;
      case 'analytics': return <AnalyticsPage />;
      case 'settings': return <SettingsPage />;
      case 'notifications': return <NotificationsPage />;
      case 'deals': return <DealsPage />;
      case 'ai-product': return <AIProductPage />;
      case 'ai-tools': return <AIToolsPage />;
    }
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside className={`${mobile ? 'w-full' : 'w-64'} flex flex-col h-full bg-[#0d1520] border-l border-[#1f2d3d]`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#1f2d3d]">
        <img src="/1777583164569.png" alt="تجار" className="w-8 h-8 object-contain" />
        <div className="flex-1 min-w-0">
          <span className="text-base font-black gradient-text">تجّار</span>
          <p className="text-xs text-slate-600 truncate">{store?.name ?? 'متجرك'}</p>
        </div>
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} className="text-slate-500 hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Store pill */}
      <div className="px-4 py-3 border-b border-[#1f2d3d]">
        <div className="flex items-center gap-2 bg-[#00C2CB]/8 border border-[#00C2CB]/15 rounded-xl px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-300 truncate flex-1">{store?.store_slug ?? '...'}</span>
          <a href="#" className="text-slate-500 hover:text-[#00C2CB] transition-colors">
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
        {NAV.map((group) => (
          <div key={group.title}>
            <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider px-3 mb-1">{group.title}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    page === item.id
                      ? 'bg-gradient-to-l from-[#00C2CB]/15 to-[#008080]/8 text-[#00C2CB] border border-[#00C2CB]/20'
                      : 'text-slate-400 hover:bg-white/4 hover:text-slate-200'
                  }`}
                >
                  <item.icon size={16} className="flex-shrink-0" />
                  <span className="flex-1 text-right">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-[#00C2CB]/20 text-[#00C2CB] px-1.5 py-0.5 rounded-full">{item.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-[#1f2d3d]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00C2CB]/30 to-[#008080]/20 flex items-center justify-center text-sm font-bold text-[#00C2CB]">
            {(user?.email ?? 'U')[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">{user?.email ?? ''}</p>
            <p className="text-[10px] text-slate-600">تاجر</p>
          </div>
          <button
            onClick={() => signOut()}
            className="text-slate-600 hover:text-red-400 transition-colors"
            title="تسجيل الخروج"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-[#0a0f1a] overflow-hidden" dir="rtl">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 animate-slide-in">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 glass-strong border-b border-[#1f2d3d] flex items-center gap-4 px-5 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-slate-400 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <button
            onClick={() => navigate('notifications')}
            className="relative text-slate-400 hover:text-white transition-colors"
          >
            <Bell size={18} />
            <span className="absolute -top-1 -left-1 w-3.5 h-3.5 bg-[#00C2CB] rounded-full text-[9px] font-bold text-white flex items-center justify-center">3</span>
          </button>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00C2CB]/30 to-[#008080]/20 flex items-center justify-center text-xs font-bold text-[#00C2CB]">
            {(user?.email ?? 'U')[0].toUpperCase()}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>

      <SupportBubble />
    </div>
  );
}
