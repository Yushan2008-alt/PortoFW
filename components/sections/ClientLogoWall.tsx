'use client';

import { clients } from '@/data/clients';
import { SmartImage } from '@/components/ui/SmartImage';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

/**
 * ClientLogoWall — Step 3.2
 *
 * Grid logo klien: grayscale by default → full color on hover.
 * Interaksi: klik membuka websiteUrl klien (jika ada) di tab baru.
 *
 * SECURITY:
 * - `client.logo` path berasal dari data/clients.ts yang hardcoded static.
 *   Tidak ada interpolasi user-input → tidak ada URL injection risk.
 * - SmartImage fallback menggunakan encodeURIComponent() untuk client.name
 *   (sudah diamankan di SmartImage component).
 * - `client.websiteUrl` di-open di tab baru dengan rel="noopener noreferrer"
 *   untuk mencegah reverse tabnapping.
 */

export function ClientLogoWall() {
  return (
    <section
      id="clients"
      className="py-20 md:py-28 px-6"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: 'var(--text-muted)' }}
            >
              Trusted By
            </p>
            <h2
              className="font-display font-bold"
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              Klien yang Telah Mempercayai Kami
            </h2>
          </div>
        </ScrollReveal>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {clients.map((client, idx) => {
            const isLink = Boolean(client.websiteUrl);

            const logoCard = (
              <div
                className="client-logo-card group relative flex items-center justify-center rounded-2xl p-6 cursor-pointer"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  minHeight: '100px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(155,109,255,0.07) 0%, transparent 70%)',
                    transition: 'opacity 0.3s ease',
                  }}
                />

                {/* Logo image — grayscale default, color on hover */}
                <div
                  className="relative z-10 transition-all duration-300"
                  style={{
                    filter: 'grayscale(100%) opacity(0.55)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.filter =
                      'grayscale(0%) opacity(1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.filter =
                      'grayscale(100%) opacity(0.55)';
                  }}
                >
                  <SmartImage
                    src={client.logo}
                    alt={client.logoAlt}
                    fallbackText={client.name}
                    width={140}
                    height={60}
                    className="object-contain max-h-[60px] w-auto"
                    fallbackBg="gemini"
                  />
                </div>

                {/* Industry badge — visible on hover */}
                <span
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-medium px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 whitespace-nowrap"
                  style={{
                    background: 'var(--bg-dark)',
                    color: 'var(--text-on-dark)',
                    transition: 'opacity 0.25s ease, transform 0.25s ease',
                    transform: 'translateX(-50%) translateY(4px)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.transform =
                      'translateX(-50%) translateY(0)';
                  }}
                >
                  {client.industry}
                </span>
              </div>
            );

            return (
              <ScrollReveal key={client.id} delay={idx * 0.08}>
                {isLink ? (
                  <a
                    href={client.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${client.name} — visit website`}
                    className="block"
                    title={`Visit ${client.name}`}
                  >
                    {logoCard}
                  </a>
                ) : (
                  <div aria-label={client.name}>{logoCard}</div>
                )}
              </ScrollReveal>
            );
          })}
        </div>

        {/* Subtle tagline below grid */}
        <ScrollReveal delay={0.35}>
          <p
            className="text-center mt-10 text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Dan terus bertambah — setiap proyek adalah kemitraan jangka panjang.
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
