import { useState, useEffect } from 'react';
import { Plus, Search, Sparkles, Package, CreditCard as Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import type { Product } from '../../lib/supabase';
import type { DashPage } from './DashboardLayout';

type Props = { onNavigate: (p: DashPage) => void };

const mockProducts: Product[] = [
  { id: '1', store_id: '', name: 'جاكيت شتوي كاجوال', description: 'جاكيت دافئ وعصري', price: 125000, compare_price: 150000, image_urls: [], category: 'ملابس رجالية', sku: 'JK-001', stock: 15, is_active: true, ai_generated: false, metadata: {}, created_at: '', updated_at: '' },
  { id: '2', store_id: '', name: 'فستان سهرة أنيق', description: '', price: 95000, compare_price: null, image_urls: [], category: 'ملابس نسائية', sku: 'DR-001', stock: 8, is_active: true, ai_generated: true, metadata: {}, created_at: '', updated_at: '' },
  { id: '3', store_id: '', name: 'حقيبة جلدية فاخرة', description: '', price: 210000, compare_price: 250000, image_urls: [], category: 'إكسسوارات', sku: 'BG-001', stock: 5, is_active: false, ai_generated: false, metadata: {}, created_at: '', updated_at: '' },
];

export default function ProductsPage({ onNavigate }: Props) {
  const { store } = useAuth();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', category: '', stock: '', description: '' });
  const [saving, setSaving] = useState(false);

  const filtered = products.filter(p => p.name.includes(search));

  const handleAdd = async () => {
    if (!store || !form.name || !form.price) return;
    setSaving(true);
    const { data, error } = await supabase.from('products').insert({
      store_id: store.id,
      name: form.name,
      price: Number(form.price),
      category: form.category,
      stock: Number(form.stock) || 0,
      description: form.description,
    }).select().maybeSingle();
    setSaving(false);
    if (!error && data) {
      setProducts(prev => [data as Product, ...prev]);
      setShowAdd(false);
      setForm({ name: '', price: '', category: '', stock: '', description: '' });
    }
  };

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">المنتجات</h1>
          <p className="text-slate-500 text-sm mt-1">{products.length} منتج</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('ai-product')}
            className="btn-secondary text-sm py-2.5 px-4 flex items-center gap-2"
          >
            <Sparkles size={15} />
            إضافة بـ AI
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2"
          >
            <Plus size={15} />
            إضافة يدوي
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-500" />
        <input
          type="text"
          placeholder="ابحث في المنتجات..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-dark pr-10 text-sm"
        />
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="card-dark overflow-hidden hover:border-[#00C2CB]/15 transition-all duration-300 group">
            <div className="relative h-40 bg-[#0d1520] overflow-hidden">
              {p.image_urls[0] ? (
                <img src={p.image_urls[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-700">
                  <Package size={40} />
                </div>
              )}
              {p.ai_generated && (
                <span className="absolute top-2 right-2 bg-[#00C2CB]/80 text-white text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Sparkles size={9} /> AI
                </span>
              )}
              {!p.is_active && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-slate-400 text-xs">غير نشط</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-white mb-1 truncate">{p.name}</p>
              <p className="text-xs text-slate-500 mb-2">{p.category}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-base font-bold text-[#00C2CB]">{p.price.toLocaleString()}</span>
                  <span className="text-xs text-slate-600 mr-1">ل.س</span>
                  {p.compare_price && (
                    <span className="text-xs text-slate-600 line-through mr-1">{p.compare_price.toLocaleString()}</span>
                  )}
                </div>
                <span className="text-xs text-slate-500">{p.stock} قطعة</span>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-[#1f2d3d]">
                <button className="flex-1 text-xs text-slate-400 hover:text-[#00C2CB] transition-colors flex items-center justify-center gap-1">
                  <Edit size={12} /> تعديل
                </button>
                <button className="flex-1 text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center justify-center gap-1">
                  <Trash2 size={12} /> حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in" onClick={e => e.target === e.currentTarget && setShowAdd(false)}>
          <div className="glass-strong rounded-3xl p-6 w-full max-w-md animate-fade-in-up">
            <h2 className="text-lg font-bold text-white mb-5">إضافة منتج جديد</h2>
            <div className="space-y-3">
              <input className="input-dark text-sm" placeholder="اسم المنتج *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <div className="grid grid-cols-2 gap-3">
                <input className="input-dark text-sm" placeholder="السعر (ل.س) *" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} dir="ltr" />
                <input className="input-dark text-sm" placeholder="الكمية" type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} dir="ltr" />
              </div>
              <input className="input-dark text-sm" placeholder="الفئة" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
              <textarea className="input-dark text-sm resize-none" rows={3} placeholder="وصف المنتج" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAdd(false)} className="btn-ghost flex-1">إلغاء</button>
              <button onClick={handleAdd} disabled={saving} className="btn-primary flex-1">
                {saving ? 'جارٍ الحفظ...' : 'إضافة المنتج'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
