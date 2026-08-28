import { useState, useEffect, useMemo } from 'react';
import {
  X, ShoppingBag, Star, Phone, Mail, Facebook, Instagram, ChevronRight,
  Menu, Search, ArrowRight, Clock, MapPin, Award, Zap, Users, CheckCircle2,
  MessageCircle, Heart, Sparkles, TrendingUp, Shield, Truck
} from 'lucide-react';
import type { AIStoreConfig } from '../lib/storeAI';

type ContactInfo = {
  email: string;
  phone: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
};

type Props = {
  config: AIStoreConfig;
  storeName: string;
  contact: ContactInfo;
  onClose?: () => void;
};

/**
 * AI-DRIVEN STOREFRONT
 *
 * Renders a unique storefront from the AI-generated config.
 * No external images, no themes, no templates.
 * Visual placeholders are CSS-generated from the store's color palette.
 */

export default function PremiumStorefrontPreview({ config, storeName, contact, onClose }: Props) {
  const [cart, setCart] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<typeof config.products[0] | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  const { primaryColor, secondaryColor, accentColor } = config;

  // Generate a unique visual pattern for each store based on its name
  const pattern = useMemo(() => {
    const hash = (config.storeName || 'store').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const patterns = ['dots', 'grid', 'waves', 'diagonal', 'circles', 'hexagon'];
    return patterns[hash % patterns.length];
  }, [config.storeName]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleLike = (productName: string) => {
    setLikedProducts(prev => {
      const next = new Set(prev);
      if (next.has(productName)) next.delete(productName);
      else next.add(productName);
      return next;
    });
  };

  const addToCart = (productName: string) => {
    setCart(prev => [...prev, productName]);
  };

  const navItems = config.navigation.map((label, i) => {
    const ids = ['home', 'products', 'about', 'contact'];
    return { label, id: ids[i] ?? `section-${i}` };
  });

  // Pick layout archetype based on business type
  const isServices = config.businessType === 'services' || config.ctaText?.includes('احجز') || config.ctaText?.includes('موعد');
  const isFood = config.businessType?.includes('مطعم') || config.businessType?.includes('مقهى') || config.businessType?.includes('طعام');
  const isPortfolio = config.businessType === 'portfolio' || config.ctaText?.includes('أعمال') || config.ctaText?.includes('استكشف');

  return (
    <div
      dir="rtl"
      className="min-h-screen overflow-x-hidden"
      style={{
        background: `linear-gradient(180deg, ${primaryColor}08, ${secondaryColor}05)`,
        color: '#1a1a2e',
        fontFamily: 'Cairo, sans-serif',
      }}
    >
      {/* Navigation */}
      <nav
        className="sticky top-0 z-40 backdrop-blur-xl border-b transition-all"
        style={{
          background: `rgba(255,255,255,0.92)`,
          borderColor: `${primaryColor}20`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
            >
              {(config.storeName || storeName)[0] || 'ت'}
            </div>
            <div className="min-w-0">
              <h1 className="font-black text-base sm:text-lg truncate" style={{ color: primaryColor }}>
                {config.storeName || storeName}
              </h1>
              <p className="text-[10px] text-slate-500 truncate">{config.tagline}</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: activeSection === item.id ? primaryColor : '#475569' }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => scrollToSection('products')}
                className="p-2 rounded-lg transition-colors hover:bg-slate-100"
                style={{ color: primaryColor }}
              >
                <ShoppingBag size={20} />
              </button>
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-bold"
                  style={{ background: accentColor }}
                >
                  {cart.length}
                </span>
              )}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-slate-100"
              style={{ color: primaryColor }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t px-4 py-3 space-y-2 animate-fade-in" style={{ borderColor: `${primaryColor}20` }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-right py-2 text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: activeSection === item.id ? primaryColor : '#475569' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden py-16 sm:py-24">
        {/* CSS pattern background */}
        <div
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: getPatternBackground(pattern, primaryColor, secondaryColor),
            opacity: 0.06,
          }}
        />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: primaryColor }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ background: secondaryColor }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-right animate-fade-in-up">
              <span
                className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-4"
                style={{ background: `${primaryColor}15`, color: primaryColor }}
              >
                {config.heroLabel}
              </span>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight"
                style={{ color: '#1a1a2e' }}
              >
                {config.heroTitle || config.storeName}
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-lg mx-auto md:mx-0">
                {config.heroSubtitle || config.description}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <button
                  onClick={() => scrollToSection('products')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-105 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                >
                  {config.ctaText}
                  <ArrowRight size={18} className="rotate-180" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 border-2"
                  style={{ borderColor: `${primaryColor}40`, color: primaryColor }}
                >
                  <MessageCircle size={18} />
                  تواصل معنا
                </button>
              </div>
            </div>

            {/* Hero visual card */}
            <div className="relative animate-fade-in-up delay-200">
              <div
                className="aspect-square max-w-md mx-auto rounded-3xl overflow-hidden relative shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: getPatternBackground(pattern, '#ffffff', '#ffffff'), opacity: 0.1 }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                  <Sparkles size={48} className="mb-4 opacity-80" />
                  <p className="text-2xl font-black mb-2">{config.storeName}</p>
                  <p className="text-sm opacity-80">{config.tone}</p>
                  <div className="flex gap-2 mt-6">
                    {config.trustPoints.slice(0, 3).map((tp, i) => (
                      <span key={i} className="text-[10px] px-3 py-1 rounded-full bg-white/20">
                        {tp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Points Bar */}
      <section className="py-8 border-y" style={{ borderColor: `${primaryColor}15`, background: `${primaryColor}05` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {config.trustPoints.map((point, i) => {
              const icons = [Shield, Truck, TrendingUp, Award];
              const Icon = icons[i % icons.length];
              return (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${primaryColor}15` }}
                  >
                    <Icon size={18} style={{ color: primaryColor }} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{point}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: '#1a1a2e' }}>
              {config.sections[0] || 'منتجاتنا'}
            </h2>
            <p className="text-slate-500">{config.description}</p>
          </div>

          {/* Category filter */}
          {config.categories.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {config.categories.map((cat, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-4 py-2 rounded-full transition-colors cursor-pointer"
                  style={{
                    background: i === 0 ? `${primaryColor}15` : '#f1f5f9',
                    color: i === 0 ? primaryColor : '#64748b',
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.products.map((product, i) => (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden border transition-all hover:shadow-xl cursor-pointer"
                style={{ borderColor: '#e2e8f0', background: '#fff' }}
                onClick={() => setSelectedProduct(product)}
              >
                {/* Visual placeholder */}
                <div
                  className="relative h-48 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}${i % 2 ? '30' : '20'}, ${secondaryColor}${i % 2 ? '20' : '30'})` }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ backgroundImage: getPatternBackground(pattern, '#ffffff', '#ffffff'), opacity: 0.08 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag size={40} style={{ color: '#ffffff80' }} />
                  </div>
                  {product.badge && (
                    <span
                      className="absolute top-3 right-3 text-[10px] font-bold px-3 py-1 rounded-full text-white"
                      style={{ background: accentColor }}
                    >
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleLike(product.name); }}
                    className="absolute top-3 left-3 p-2 rounded-full bg-white/80 transition-all hover:scale-110"
                  >
                    <Heart
                      size={14}
                      fill={likedProducts.has(product.name) ? '#ef4444' : 'none'}
                      color={likedProducts.has(product.name) ? '#ef4444' : '#64748b'}
                    />
                  </button>
                </div>

                <div className="p-4">
                  <span className="text-[10px] font-medium text-slate-400">{product.category}</span>
                  <h3 className="font-bold text-base mt-1 mb-1 truncate" style={{ color: '#1a1a2e' }}>{product.name}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black" style={{ color: primaryColor }}>
                      {product.price.toLocaleString()} <span className="text-xs font-normal">ل.س</span>
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(product.name); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg text-white transition-all hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                    >
                      <ShoppingBag size={14} />
                      أضف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20" style={{ background: `${primaryColor}05` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#1a1a2e' }}>
            {config.sections[1] || 'لماذا نحن'}
          </h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">{config.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.trustPoints.map((point, i) => {
              const icons = [Zap, Users, Award];
              const Icon = icons[i % icons.length];
              return (
                <div key={i} className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#e2e8f0' }}>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)` }}
                  >
                    <Icon size={24} style={{ color: primaryColor }} />
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#1a1a2e' }}>{point}</h3>
                  <p className="text-sm text-slate-500">{config.tone}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div
            className="rounded-3xl p-8 sm:p-12 text-center"
            style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {config.sections[3] || 'تواصل معنا'}
            </h2>
            <p className="text-white/80 mb-8">{config.audience}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="bg-white/15 backdrop-blur rounded-xl p-4 transition-all hover:bg-white/25">
                  <Phone size={20} className="text-white mx-auto mb-2" />
                  <p className="text-[10px] text-white/60">اتصل بنا</p>
                  <p className="text-xs font-bold text-white truncate" dir="ltr">{contact.phone}</p>
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="bg-white/15 backdrop-blur rounded-xl p-4 transition-all hover:bg-white/25">
                  <Mail size={20} className="text-white mx-auto mb-2" />
                  <p className="text-[10px] text-white/60">البريد</p>
                  <p className="text-xs font-bold text-white truncate">{contact.email}</p>
                </a>
              )}
              {contact.instagram && (
                <a href={`https://instagram.com/${contact.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="bg-white/15 backdrop-blur rounded-xl p-4 transition-all hover:bg-white/25">
                  <Instagram size={20} className="text-white mx-auto mb-2" />
                  <p className="text-[10px] text-white/60">إنستغرام</p>
                  <p className="text-xs font-bold text-white truncate">{contact.instagram}</p>
                </a>
              )}
              {contact.whatsapp && (
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-white/15 backdrop-blur rounded-xl p-4 transition-all hover:bg-white/25">
                  <MessageCircle size={20} className="text-white mx-auto mb-2" />
                  <p className="text-[10px] text-white/60">واتساب</p>
                  <p className="text-xs font-bold text-white truncate" dir="ltr">{contact.whatsapp}</p>
                </a>
              )}
            </div>

            <button
              className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white font-bold transition-all hover:scale-105"
              style={{ color: primaryColor }}
            >
              {config.ctaText}
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t" style={{ borderColor: '#e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
            >
              {(config.storeName || storeName)[0] || 'ت'}
            </div>
            <span className="font-bold" style={{ color: primaryColor }}>{config.storeName || storeName}</span>
          </div>
          <p className="text-xs text-slate-400">{config.tagline}</p>
          <p className="text-[10px] text-slate-300 mt-2">أنشئ بواسطة تجّار — منصة المتاجر الذكية</p>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative h-56"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
            >
              <div
                className="absolute inset-0"
                style={{ backgroundImage: getPatternBackground(pattern, '#ffffff', '#ffffff'), opacity: 0.1 }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShoppingBag size={56} style={{ color: '#ffffff60' }} />
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
              >
                <X size={20} />
              </button>
              {selectedProduct.badge && (
                <span
                  className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ background: accentColor }}
                >
                  {selectedProduct.badge}
                </span>
              )}
            </div>
            <div className="p-6">
              <span className="text-xs font-medium text-slate-400">{selectedProduct.category}</span>
              <h3 className="text-2xl font-black mt-1 mb-3" style={{ color: '#1a1a2e' }}>{selectedProduct.name}</h3>
              <p className="text-slate-600 mb-6">{selectedProduct.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black" style={{ color: primaryColor }}>
                  {selectedProduct.price.toLocaleString()} <span className="text-sm font-normal">ل.س</span>
                </span>
                <button
                  onClick={() => { addToCart(selectedProduct.name); setSelectedProduct(null); }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                >
                  <ShoppingBag size={18} />
                  أضف إلى السلة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 sm:left-auto sm:w-80 z-40 animate-fade-in-up">
          <div
            className="p-4 flex items-center justify-between shadow-2xl rounded-xl text-white"
            style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
          >
            <span className="font-bold">السلة: {cart.length} منتج</span>
            <button className="px-6 py-2 rounded-lg font-bold transition-all hover:scale-105 bg-white/20">
              إتمام الطلب
            </button>
          </div>
        </div>
      )}

      {/* Exit Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white shadow-lg transition-all hover:scale-110"
          style={{ color: primaryColor }}
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}

// CSS pattern generator — creates unique visual backgrounds without external images
function getPatternBackground(pattern: string, color1: string, color2: string): string {
  switch (pattern) {
    case 'dots':
      return `radial-gradient(${color1} 1.5px, transparent 1.5px)`;
    case 'grid':
      return `linear-gradient(${color1} 1px, transparent 1px), linear-gradient(90deg, ${color1} 1px, transparent 1px)`;
    case 'waves':
      return `repeating-linear-gradient(45deg, ${color1} 0, ${color1} 1px, transparent 1px, transparent 12px)`;
    case 'diagonal':
      return `repeating-linear-gradient(-45deg, ${color1} 0, ${color1} 1px, transparent 1px, transparent 10px)`;
    case 'circles':
      return `radial-gradient(circle at 50% 50%, ${color1} 2px, transparent 3px)`;
    case 'hexagon':
      return `linear-gradient(60deg, ${color1} 25%, transparent 25%), linear-gradient(-60deg, ${color1} 25%, transparent 25%)`;
    default:
      return `radial-gradient(${color1} 1.5px, transparent 1.5px)`;
  }
}
