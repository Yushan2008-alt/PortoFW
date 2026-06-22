'use client';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { site } from '@/data/site';
import { NewsletterForm } from '@/components/ui/NewsletterForm';

const NAV_LINKS = [
  { href: '#work',         label: 'Work' },
  { href: '#services',     label: 'Services' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#about',        label: 'About' },
  { href: '#contact',      label: 'Hubungi Kami' },
];

const DIM   = 'rgba(244,243,239,0.5)';
const LABEL = 'rgba(244,243,239,0.35)';
const LINK  = 'rgba(244,243,239,0.6)';
const COPY  = 'rgba(244,243,239,0.3)';

function SocialIcon({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-11 h-11 rounded-lg transition-colors duration-200 -m-1"
      style={{ color: DIM }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--blewah)')}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = DIM)}
    >
      {children}
    </a>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        className="text-sm transition-colors duration-200"
        style={{ color: LINK }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-on-dark)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = LINK)}
      >
        {label}
      </a>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="pt-16 pb-8 px-6" style={{ background: 'var(--bg-dark)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Col 1 — Brand */}
          <div>
            <span
              className="font-bold text-xl"
              style={{
                fontFamily: 'var(--font-syne, sans-serif)',
                color: 'var(--text-on-dark)',
              }}
            >
              {site.name}
            </span>

            <p className="text-sm mt-3 max-w-xs" style={{ color: DIM }}>
              {site.tagline}
            </p>

            <div className="mt-6 flex gap-4 items-center">
              {site.socials.github && (
                <SocialIcon href={site.socials.github}>
                  <Github size={18} />
                </SocialIcon>
              )}
              {site.socials.instagram && (
                <SocialIcon href={site.socials.instagram}>
                  <Instagram size={18} />
                </SocialIcon>
              )}
              {site.socials.linkedin && (
                <SocialIcon href={site.socials.linkedin}>
                  <Linkedin size={18} />
                </SocialIcon>
              )}
              <SocialIcon href={`mailto:${site.email}`}>
                <Mail size={18} />
              </SocialIcon>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: LABEL }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <NavLink key={href} href={href} label={label} />
              ))}
            </ul>
          </div>

          {/* Col 3 — Newsletter + Contact */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: LABEL }}
            >
              Newsletter
            </h4>

            <p className="text-sm mb-3" style={{ color: DIM }}>
              Subscribe untuk update project dan tips digital.
            </p>

            <NewsletterForm />

            {/* Contact info below newsletter */}
            <div className="mt-6 space-y-2">
              <a
                href={`mailto:${site.email}`}
                className="block text-sm hover:underline"
                style={{ color: 'var(--blewah)' }}
              >
                {site.email}
              </a>
              <a
                href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm hover:underline"
                style={{ color: 'var(--blewah)' }}
              >
                {site.whatsapp}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: COPY }}>
            © 2026 Glare Warden. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: COPY }}>
            Designed &amp; Built by Glare Warden
          </p>
        </div>

      </div>
    </footer>
  );
}
