interface BlobMorphProps {
  size?: number;
  opacity?: number;
  blur?: number;
  className?: string;
  variant?: 'gemini' | 'blewah';
}

export function BlobMorph({
  size = 600,
  opacity = 0.6,
  blur = 60,
  className = '',
  variant = 'gemini',
}: BlobMorphProps) {
  return (
    <div
      className={`absolute pointer-events-none animate-morph-blob ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        filter: `blur(${blur}px)`,
        background: variant === 'gemini' ? 'var(--gradient-gemini)' : 'var(--blewah)',
      }}
    />
  );
}
