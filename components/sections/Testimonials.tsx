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
        className="absolute -top-24 -right-24 w-[480px] h-[480px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'var(--gradient-gemini)',
          opacity: 0.08,
          filter: 'blur(100px)',
        }}
      />
      {/* Blewah glow bottom-left */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 -left-24 w-72 h-72 md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'var(--blewah)',
          opacity: 0.08,
          filter: 'blur(90px)',
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
            className="mt-3 font-display font-bold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
            }}
          >
            Apa Kata Klien Kami
          </h2>

          <p
            className="mt-4 max-w-xl mx-auto leading-relaxed"
            style={{
              fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
              color: 'var(--text-secondary)',
            }}
          >
            Kepuasan klien adalah prioritas utama kami. Berikut pengalaman
            mereka bekerja bersama Glare Warden.
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
