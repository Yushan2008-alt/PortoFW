'use client';

import { testimonials } from '@/data/testimonials';

/**
 * MetricsTicker — Step 3.1
 *
 * Infinite-scroll marquee dari testimonials[].company.
 * Implementasi: CSS animation murni (transform: translateX) pada dua set
 * array identik yang di-render sekali. Tidak ada setInterval / RAF loop,
 * sehingga tidak ada risiko memory leak.
 *
 * Array max 10 items (sesuai data/site.ts) — duplikasi negligible.
 *
 * SECURITY: Tidak ada URL/HTML interpolation. Hanya teks statis dari
 * testimonials[].company (hardcoded in data/testimonials.ts).
 */

const SEPARATOR = '✦';

// Duplicate once → dua salinan identik untuk seamless infinite loop.
// Ketika track pertama selesai (50% translateX), animation reset ke 0
// dan langsung dilanjutkan oleh salinan kedua — invisible seam.
const companies = testimonials.map(t => t.company);
const tickerItems = [...companies, ...companies];

export function MetricsTicker() {
  return (
    <div
      id="metrics"
      className="overflow-hidden select-none py-5"
      style={{
        background: 'var(--bg-dark)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        contain: 'layout paint',
      }}
      aria-hidden="true" /* decorative — screen readers skip */
    >
      {/* Fade edges — gradient mask */}
      <div
        className="relative w-full max-w-full min-w-0 overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="ticker-track flex items-center gap-0">
          {tickerItems.map((item, idx) => (
            <span
              key={idx}
              className="flex items-center gap-6 flex-shrink-0 px-6"
            >
              {/* Metric value */}
              <span
                className="font-display font-semibold whitespace-nowrap"
                style={{
                  fontSize: 'clamp(0.8rem, 1.4vw, 0.95rem)',
                  letterSpacing: '0.01em',
                  color: 'var(--text-on-dark)',
                }}
              >
                / {item}
              </span>

              {/* Separator dot */}
              <span
                className="flex-shrink-0 text-xs"
                style={{ color: 'var(--blewah)', opacity: 0.7 }}
              >
                {SEPARATOR}
              </span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
