import { useState } from 'react';
import { MessageCircle, X, Phone, MessageSquare, Mail, ExternalLink } from 'lucide-react';

const options = [
  { icon: MessageSquare, label: 'واتساب', href: 'https://wa.me/963988000111', color: '#25D366' },
  { icon: Phone, label: 'اتصال', href: 'tel:+963988000111', color: '#00C2CB' },
  { icon: Mail, label: 'بريد إلكتروني', href: 'mailto:support@tujjar.sy', color: '#008080' },
];

export default function SupportBubble() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-3">
      {open && (
        <div className="flex flex-col gap-2 animate-fade-in-up">
          <div className="glass-strong rounded-2xl p-4 min-w-[180px] border border-[#00C2CB]/20 mb-1">
            <p className="text-xs font-semibold text-white mb-1">الدعم الفني 24/7</p>
            <p className="text-[10px] text-slate-500">نحن هنا لمساعدتك دائماً</p>
          </div>
          {options.map(o => (
            <a
              key={o.label}
              href={o.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-3 px-4 py-3 rounded-xl border border-[#1f2d3d] hover:border-[#00C2CB]/30 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${o.color}20` }}>
                <o.icon size={15} style={{ color: o.color }} />
              </div>
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{o.label}</span>
              <ExternalLink size={11} className="text-slate-600 mr-auto" />
            </a>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 animate-pulse-glow ${
          open ? 'bg-[#1f2d3d] border border-[#1f2d3d]' : 'bg-gradient-to-br from-[#00C2CB] to-[#008080]'
        }`}
      >
        {open ? <X size={22} className="text-slate-400" /> : <MessageCircle size={22} className="text-white" />}
      </button>
    </div>
  );
}
