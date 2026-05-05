interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'blewah' | 'gemini';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const base = 'inline-flex items-center gap-2 rounded-[100px] px-4 py-1.5 text-sm font-medium';

  if (variant === 'blewah') {
    return (
      <span
        className={`${base} ${className}`}
        style={{
          background: 'transparent',
          border: '1px solid var(--blewah)',
          color: 'var(--blewah)',
        }}
      >
        {children}
      </span>
    );
  }

  if (variant === 'gemini') {
    return (
      <span
        className={`${base} ${className}`}
        style={{
          background:
            'linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box, var(--gradient-gemini) border-box',
          border: '1px solid transparent',
          WebkitBackgroundClip: 'unset',
          color: 'transparent',
          backgroundClip: 'unset',
        }}
      >
        <span
          style={{
            background: 'var(--gradient-text)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {children}
        </span>
      </span>
    );
  }

  // default
  return (
    <span
      className={`${base} ${className}`}
      style={{
        background: 'rgba(255,255,255,0.8)',
        border: '1px solid var(--border-medium)',
        color: 'var(--text-secondary)',
      }}
    >
      {children}
    </span>
  );
}
