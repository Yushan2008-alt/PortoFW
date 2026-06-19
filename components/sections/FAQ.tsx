'use client';

import { motion } from 'framer-motion';
import { sortedFaqs, faqsByCategory, type FAQCategory } from '@/data/faqs';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { useState } from 'react';

/**
 * FAQ — Step 3.4
 *
 * Section wrapper: styled header + category filter tabs + FAQAccordion.
 * Komposisi murni — FAQAccordion menangani semua animasi buka/tutup.
 *
 * Filter tab dihandle secara lokal di sini karena ini adalah section-level
 * UX concern (which subset of FAQs to show), bukan component-level concern.
 */

const CATEGORY_TABS: { key: 'all' | FAQCategory; label: string }[] = [
  { key: 'all',       label: 'Semua' },
  { key: 'pricing',   label: 'Harga' },
  { key: 'process',   label: 'Proses' },
  { key: 'technical', label: 'Teknis' },
  { key: 'general',   label: 'Umum' },
];

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState<'all' | FAQCategory>('all');

  const visibleFaqs =
    activeCategory === 'all'
      ? sortedFaqs
      : (faqsByCategory[activeCategory] ?? []).sort((a, b) => a.order - b.order);

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(155,109,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="gradient-text text-sm font-semibold tracking-widest uppercase"
          >
            FAQ
          </span>

          <h2
            className="mt-3 font-display font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Pertanyaan yang Sering Ditanyakan
          </h2>

          <p
            className="mt-4 max-w-xl mx-auto leading-relaxed"
            style={{
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              color: 'var(--text-secondary)',
            }}
          >
            Belum menemukan jawaban? Langsung{' '}
            <a
              href="#contact"
              className="underline underline-offset-4 transition-colors duration-200 hover:text-[var(--blewah)]"
              style={{ color: 'var(--text-primary)' }}
            >
              hubungi kami
            </a>
            .
          </p>
        </motion.div>

        {/* ── Category filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Filter FAQ berdasarkan kategori"
        >
          {CATEGORY_TABS.map(({ key, label }) => {
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                aria-controls="faq-list"
                onClick={() => setActiveCategory(key)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background: isActive ? 'var(--bg-dark)' : 'var(--bg-card)',
                  color: isActive ? 'var(--text-on-dark)' : 'var(--text-secondary)',
                  border: isActive
                    ? '1px solid var(--bg-dark)'
                    : '1px solid var(--border-subtle)',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Accordion ── */}
        <motion.div
          key={activeCategory} /* remount FAQAccordion on category change to reset open state */
          id="faq-list"
          role="tabpanel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="rounded-2xl border"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)',
            padding: 'clamp(1rem, 3vw, 2rem)',
          }}
        >
          {visibleFaqs.length > 0 ? (
            <FAQAccordion faqs={visibleFaqs} />
          ) : (
            <p
              className="text-center py-8 text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              Belum ada pertanyaan di kategori ini.
            </p>
          )}
        </motion.div>

      </div>
    </section>
  );
}
