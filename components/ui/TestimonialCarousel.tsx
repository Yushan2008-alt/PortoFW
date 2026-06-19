'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';
import type { Testimonial } from '@/data/testimonials';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

// Card width and gap — must stay in sync with the inline style below
const CARD_WIDTH_DESKTOP = 360; // px
const GAP = 24; // gap-6 = 24px

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH_DESKTOP);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxIndex = testimonials.length - 1;

  // Responsive card width: full-width on mobile, fixed on desktop
  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        const containerW = containerRef.current.offsetWidth;
        // Mobile (<640px): fill container; desktop: fixed 360px
        setCardWidth(containerW < 640 ? containerW : CARD_WIDTH_DESKTOP);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const goTo = useCallback(
    (index: number) => setActiveIndex(Math.max(0, Math.min(maxIndex, index))),
    [maxIndex],
  );

  // SECURITY: Keyboard listener cleaned up in useEffect return
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey); // ← cleanup
  }, [activeIndex, goTo]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 50; // px — minimum drag to register swipe
    if (info.offset.x < -threshold) goTo(activeIndex + 1);
    else if (info.offset.x > threshold) goTo(activeIndex - 1);
  };

  const trackOffset = -(activeIndex * (cardWidth + GAP));

  return (
    <div className="w-full" role="region" aria-label="Testimonial carousel">
      {/* Track */}
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          style={{ gap: GAP }}
          drag="x"
          dragConstraints={{
            left: -(maxIndex * (cardWidth + GAP)),
            right: 0,
          }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          animate={{ x: trackOffset }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              style={{ width: cardWidth, flexShrink: 0 }}
              aria-hidden={i !== activeIndex}
            >
              <TestimonialCard testimonial={t} isActive={i === activeIndex} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls: prev arrow · dots · next arrow */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {/* Prev */}
        <button
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Testimonial sebelumnya"
          className="w-10 h-10 rounded-full border border-black/10 bg-[var(--bg-card)]
            flex items-center justify-center
            hover:border-[var(--blewah)] transition-colors
            disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Pilih testimonial">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={[
                'h-2 rounded-full transition-all duration-300',
                i === activeIndex
                  ? 'w-6 bg-[var(--blewah)]'  // active: pill shape
                  : 'w-2 bg-black/10',          // inactive: dot
              ].join(' ')}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === maxIndex}
          aria-label="Testimonial berikutnya"
          className="w-10 h-10 rounded-full border border-black/10 bg-[var(--bg-card)]
            flex items-center justify-center
            hover:border-[var(--blewah)] transition-colors
            disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
