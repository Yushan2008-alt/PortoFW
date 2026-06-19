import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricBadgeProps {
  label: string;
  value: string;
  icon?: string;                   // Lucide icon name, e.g. "Users", "TrendingUp"
  variant?: 'light' | 'dark';      // light = on cream bg, dark = on dark bg
  className?: string;
}

export function MetricBadge({
  label,
  value,
  icon,
  variant = 'light',
  className,
}: MetricBadgeProps) {
  // Dynamically resolve Lucide icon by name — safe because data is hardcoded static
  const IconComponent = icon ? (Icons as Record<string, any>)[icon] : null;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 border',
        variant === 'light'
          ? 'bg-white/60 border-black/5'
          : 'bg-white/10 border-white/10',
        className,
      )}
    >
      {IconComponent && (
        <IconComponent
          size={14}
          className="text-[var(--blewah)] flex-shrink-0"
          aria-hidden="true"
        />
      )}
      <span className="font-syne font-semibold text-sm text-[var(--text-primary)]">
        {value}
      </span>
      <span className="font-jakarta text-xs text-[var(--text-secondary)]">
        {label}
      </span>
    </div>
  );
}
