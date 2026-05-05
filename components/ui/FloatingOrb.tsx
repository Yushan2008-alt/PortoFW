interface FloatingOrbProps {
  color: 'blue' | 'purple' | 'pink' | 'teal' | 'blewah';
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
}

const COLOR_MAP = {
  blue:   '#4A90D9',
  purple: '#9B6DFF',
  pink:   '#E879A0',
  teal:   '#3ECFCF',
  blewah: '#E8976A',
};

export function FloatingOrb({
  color,
  size = 200,
  top,
  left,
  right,
  bottom,
  delay = 0,
}: FloatingOrbProps) {
  return (
    <div
      className="absolute pointer-events-none animate-float-orb"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: COLOR_MAP[color],
        filter: 'blur(60px)',
        opacity: 0.5,
        top,
        left,
        right,
        bottom,
        animationDelay: `${delay}s`,
      }}
    />
  );
}
