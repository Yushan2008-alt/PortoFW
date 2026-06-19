'use client';

import { motion } from 'framer-motion';
import { featuredTestimonials } from '@/data/testimonials';
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel';

/**
 * Testimonials — Step 3.3
 *
 * Section wrapper: styled header + background decoration + TestimonialCarousel.
 * Komposisi murni — tidak ada state atau logic baru di sini.
 * Semua interaktivitas (swipe, keyboard, dots) sudah dihandle oleh
 * TestimonialCarousel (ui/TestimonialCarousel.tsx).
 *
 * Data: featuredTestimonials (filtered & sorted dari data/testimonials.ts).
 */
export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background decoration — subtle gemini glow top-right */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'var(--gradient-gemini)',
          opacity: 0.05,
          filter: 'blur(90px)',
        }}
      />
      {/* Blewah glow bottom-left */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 -left-24 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'var(--blewah)',
          opacity: 0.06,
          filter: 'blur(70px)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="gradient-text text-sm font-semibold tracking-widest uppercase"
          >
            Testimonials
          </span>

          <h2
            className="mt-3 font-display font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Apa Kata Klien Kami
          </h2>

          <p
            className="mt-4 max-w-xl mx-auto leading-relaxed"
            style={{
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              color: 'var(--text-secondary)',
            }}
          >
            Kepuasan klien adalah prioritas utama kami. Berikut pengalaman
            mereka bekerja bersama Forza Studio.
          </p>
        </motion.div>

        {/* ── Carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <TestimonialCarousel testimonials={featuredTestimonials} />
        </motion.div>

      </div>
    </section>
  );
}
