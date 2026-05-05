'use client';
import Image from 'next/image';
import { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  fallbackText: string;
  width: number;
  height: number;
  className?: string;
  fallbackBg?: 'gemini' | 'blewah' | 'dark';
}

const FALLBACK_COLORS = {
  gemini: { bg: '9B6DFF', text: 'F4F3EF' },
  blewah: { bg: 'E8976A', text: 'F4F3EF' },
  dark:   { bg: '0F0E0D', text: 'F4F3EF' },
};

export function SmartImage({
  src,
  alt,
  fallbackText,
  width,
  height,
  className = '',
  fallbackBg = 'gemini',
}: SmartImageProps) {
  const [errored, setErrored] = useState(false);
  const colors = FALLBACK_COLORS[fallbackBg];
  const fallbackUrl = `https://placehold.co/${width}x${height}/${colors.bg}/${colors.text}?text=${encodeURIComponent(fallbackText)}&font=poppins`;

  return (
    <Image
      src={errored ? fallbackUrl : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setErrored(true)}
      unoptimized={errored}
    />
  );
}
