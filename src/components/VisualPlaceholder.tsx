import type { LucideIcon } from 'lucide-react';
import {
  ShoppingBag, UtensilsCrossed, Gem, Smartphone, GraduationCap,
  Briefcase, Palette, Sparkles, Package, Heart, Star,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  retail: ShoppingBag,
  food: UtensilsCrossed,
  jewelry: Gem,
  tech: Smartphone,
  digital: GraduationCap,
  services: Briefcase,
  portfolio: Palette,
  default: Package,
};

const PATTERN_MAP: Record<string, 'dots' | 'stripes' | 'grid' | 'waves' | 'hex'> = {
  retail: 'stripes',
  food: 'waves',
  jewelry: 'hex',
  tech: 'grid',
  digital: 'dots',
  services: 'grid',
  portfolio: 'waves',
  default: 'dots',
};

export function getStoreIcon(storeType: string): LucideIcon {
  return ICON_MAP[storeType] ?? ICON_MAP.default;
}

export function getStorePattern(storeType: string): 'dots' | 'stripes' | 'grid' | 'waves' | 'hex' {
  return PATTERN_MAP[storeType] ?? PATTERN_MAP.default;
}

function patternStyle(pattern: string, color: string): React.CSSProperties {
  const opacity = '26';
  switch (pattern) {
    case 'dots':
      return { backgroundImage: `radial-gradient(${color}${opacity} 1.5px, transparent 1.5px)`, backgroundSize: '16px 16px' };
    case 'stripes':
      return { backgroundImage: `repeating-linear-gradient(45deg, ${color}${opacity} 0, ${color}${opacity} 1px, transparent 1px, transparent 12px)` };
    case 'grid':
      return { backgroundImage: `linear-gradient(${color}${opacity} 1px, transparent 1px), linear-gradient(90deg, ${color}${opacity} 1px, transparent 1px)`, backgroundSize: '20px 20px' };
    case 'waves':
      return { backgroundImage: `radial-gradient(circle at 50% 0%, ${color}${opacity} 0, ${color}${opacity} 8px, transparent 8px), radial-gradient(circle at 0% 50%, ${color}${opacity} 0, ${color}${opacity} 8px, transparent 8px)`, backgroundSize: '24px 24px' };
    case 'hex':
      return { backgroundImage: `linear-gradient(60deg, ${color}${opacity} 25%, transparent 25%), linear-gradient(-60deg, ${color}${opacity} 25%, transparent 25%)`, backgroundSize: '18px 31px' };
    default:
      return {};
  }
}

type Props = {
  storeType: string;
  color: string;
  label?: string;
  className?: string;
  iconSize?: number;
  rounded?: string;
};

export default function VisualPlaceholder({
  storeType,
  color,
  label,
  className = '',
  iconSize = 32,
  rounded = 'rounded-2xl',
}: Props) {
  const Icon = getStoreIcon(storeType);
  const pattern = getStorePattern(storeType);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${rounded} ${className}`}
      style={{ background: `linear-gradient(135deg, ${color}14, ${color}06)` }}
    >
      <div className="absolute inset-0" style={patternStyle(pattern, color)} />
      <div className="relative flex flex-col items-center gap-2">
        <div
          className="flex items-center justify-center rounded-2xl"
          style={{ background: `${color}1f`, border: `1px solid ${color}33` }}
        >
          <Icon size={iconSize} style={{ color }} />
        </div>
        {label && (
          <span className="text-xs font-semibold px-2 text-center" style={{ color }}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

export function ProductVisual({
  storeType,
  color,
  name,
  badge,
  className = '',
  rounded = 'rounded-2xl',
}: {
  storeType: string;
  color: string;
  name: string;
  badge?: string;
  className?: string;
  rounded?: string;
}) {
  const Icon = getStoreIcon(storeType);
  const pattern = getStorePattern(storeType);
  const initial = name?.charAt(0) ?? '؟';

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${rounded} ${className}`}
      style={{ background: `linear-gradient(135deg, ${color}12, ${color}04)` }}
    >
      <div className="absolute inset-0" style={patternStyle(pattern, color)} />
      <div className="relative flex flex-col items-center gap-2 text-center px-3">
        <Icon size={28} style={{ color: `${color}cc` }} />
        <span className="text-2xl font-black" style={{ color: `${color}55` }}>
          {initial}
        </span>
      </div>
      {badge && (
        <span
          className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
          style={{ background: color }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

export function TrustBadge({
  icon: Icon,
  color,
  label,
}: {
  icon: LucideIcon;
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export { Heart, Star, Sparkles };
