'use client';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '#work',          label: 'Work' },
  { href: '#services',      label: 'Services' },
  { href: '#testimonials',  label: 'Testimonials' },
  { href: '#about',         label: 'About' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={
          scrolled
            ? {
                background: 'rgba(244,243,239,0.90)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderBottom: '1px solid var(--border-subtle)',
              }
            : { background: 'transparent' }
        }
      >
        <div className="mx-auto flex items-center justify-between px-6 md:px-10" style={{ maxWidth: 1200, height: 72 }}>

          {/* FIX 4E — Logo: "Forza" gradient, "Studio" dark */}
          <a href="#hero" className="flex items-center">
            <span style={{ fontFamily: 'var(--font-syne, sans-serif)', fontSize: '1.25rem', fontWeight: 700 }}>
              <span className="gradient-text">Forza</span>
              <span style={{ color: 'var(--text-primary)' }}> Studio</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="relative text-sm font-medium transition-colors duration-200 group"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button variant="primary" size="sm" href="#contact">
              Hubungi Kami
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors duration-200"
            style={{ color: 'var(--text-primary)' }}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ background: 'var(--bg-primary)' }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-2xl font-medium transition-colors duration-200"
              style={{ fontFamily: 'var(--font-syne, sans-serif)', color: 'var(--text-primary)' }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <Button variant="primary" size="md" href="#contact">
            Hubungi Kami
          </Button>
        </div>
      )}
    </>
  );
}
