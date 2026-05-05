'use client';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-4 px-8 text-lg',
};

const BASE = 'inline-flex items-center gap-2 font-medium rounded-xl transition-all duration-200 cursor-pointer';

function PrimaryButton({ size, icon, children, className }: Omit<ButtonProps, 'variant'>) {
  return (
    <span
      className={`${BASE} ${SIZE_CLASSES[size ?? 'md']} text-white hover:scale-[1.02] ${className ?? ''}`}
      style={{
        background: 'var(--blewah)',
        boxShadow: 'var(--shadow-sm)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-blewah)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      {children}
      {icon}
    </span>
  );
}

function SecondaryButton({ size, icon, children, className }: Omit<ButtonProps, 'variant'>) {
  return (
    <span
      className={`${BASE} ${SIZE_CLASSES[size ?? 'md']} ${className ?? ''}`}
      style={{
        background: 'linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box, var(--gradient-gemini) border-box',
        border: '1.5px solid transparent',
        color: 'var(--text-primary)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.backgroundImage =
          'linear-gradient(var(--bg-primary), var(--bg-primary)), var(--gradient-gemini)';
        (e.currentTarget as HTMLElement).style.webkitTextFillColor = 'transparent';
        (e.currentTarget as HTMLElement).style.backgroundClip = 'padding-box, border-box';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.backgroundImage =
          'linear-gradient(var(--bg-primary), var(--bg-primary)), var(--gradient-gemini)';
        (e.currentTarget as HTMLElement).style.webkitTextFillColor = '';
        (e.currentTarget as HTMLElement).style.backgroundClip = 'padding-box, border-box';
      }}
    >
      {children}
      {icon}
    </span>
  );
}

function GhostButton({ size, icon, children, className }: Omit<ButtonProps, 'variant'>) {
  return (
    <span
      className={`${BASE} ${SIZE_CLASSES[size ?? 'md']} relative group ${className ?? ''}`}
      style={{ color: 'var(--text-secondary)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
      }}
    >
      <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-200 group-hover:after:w-full">
        {children}
      </span>
      {icon}
    </span>
  );
}

export function Button({ variant, size = 'md', href, onClick, children, icon, className }: ButtonProps) {
  const isFullWidth = className?.includes('w-full');
  const outerCls = isFullWidth ? 'flex w-full' : 'inline-flex';

  const inner =
    variant === 'primary' ? (
      <PrimaryButton size={size} icon={icon} className={className}>{children}</PrimaryButton>
    ) : variant === 'secondary' ? (
      <SecondaryButton size={size} icon={icon} className={className}>{children}</SecondaryButton>
    ) : (
      <GhostButton size={size} icon={icon} className={className}>{children}</GhostButton>
    );

  if (href) {
    return (
      <a href={href} className={outerCls}>
        {inner}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${outerCls} bg-transparent border-0 p-0`}>
      {inner}
    </button>
  );
}
