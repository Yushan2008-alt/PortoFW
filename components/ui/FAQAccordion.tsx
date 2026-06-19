'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '@/data/faqs';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  // Single-open mode: only one item open at a time
  // Default: first item open
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="w-full max-w-3xl mx-auto" role="list">
      {faqs.map((faq, index) => {
        const isOpen = openId === faq.id;

        return (
          <div
            key={faq.id}
            role="listitem"
            className="border-b border-black/5 last:border-b-0"
          >
            <button
              onClick={() => toggle(faq.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${faq.id}`}
              id={`faq-trigger-${faq.id}`}
              className="w-full flex items-center gap-4 py-5 text-left group"
            >
              {/* Number */}
              <span
                className="font-syne text-sm text-[var(--blewah)] w-8 flex-shrink-0 tabular-nums"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Question */}
              <span className="flex-1 font-syne font-medium text-base md:text-lg text-[var(--text-primary)] group-hover:text-[var(--blewah)] transition-colors">
                {faq.question}
              </span>

              {/* Chevron — rotates 180° when open */}
              <ChevronDown
                size={20}
                aria-hidden="true"
                className={[
                  'flex-shrink-0 text-[var(--text-secondary)] transition-transform duration-300',
                  isOpen ? 'rotate-180' : '',
                ].join(' ')}
              />
            </button>

            {/* Answer — animated height 0 → auto */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${faq.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="font-jakarta text-sm md:text-base text-[var(--text-secondary)] leading-relaxed pl-12 pb-6">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
