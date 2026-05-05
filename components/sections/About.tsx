'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { team } from '@/data/team';
import { SmartImage } from '@/components/ui/SmartImage';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

// FIX 1: CountUp with ref directly on the span — not wrapped in ScrollReveal
function CountUp({ target, suffix = '+' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const increment = target / 45;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 28);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  { label: 'Projects Built', target: 15, suffix: '+' },
  { label: 'Happy Clients',  target: 10, suffix: '+' },
  { label: 'Years Together', target: 2,  suffix: ''  },
];

export function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left column — visuals */}
        <div className="relative h-72 sm:h-80 md:h-96 overflow-visible">
          {/* Decorative blob */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: -1,
              background: 'var(--gradient-gemini)',
              opacity: 0.08,
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              filter: 'blur(40px)',
            }}
          />

          {/* Avatar 1 — bottom-left */}
          <div
            className="absolute bottom-0 left-0 rounded-2xl overflow-hidden"
            style={{
              border: '4px solid var(--bg-card)',
              boxShadow: 'var(--shadow-md)',
              width: 'clamp(120px, 46%, 180px)',
              height: 'clamp(120px, 46%, 180px)',
            }}
          >
            <SmartImage
              src={team[0].avatar}
              alt={team[0].name}
              fallbackText={team[0].name}
              fallbackBg="blewah"
              width={180}
              height={180}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Avatar 2 — top-right */}
          <div
            className="absolute top-0 right-0 rounded-2xl overflow-hidden"
            style={{
              border: '4px solid var(--bg-card)',
              boxShadow: 'var(--shadow-md)',
              width: 'clamp(110px, 42%, 160px)',
              height: 'clamp(110px, 42%, 160px)',
            }}
          >
            <SmartImage
              src={team[1].avatar}
              alt={team[1].name}
              fallbackText={team[1].name}
              fallbackBg="gemini"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Right column — text + stats */}
        <div>
          {/* Text content wrapped in ScrollReveal */}
          <ScrollReveal direction="left">
            <span className="gradient-text text-sm font-semibold tracking-widest uppercase">
              Who We Are
            </span>

            <h2
              className="mt-3 font-bold leading-tight text-4xl md:text-5xl"
              style={{ fontFamily: 'var(--font-syne, sans-serif)', color: 'var(--text-primary)' }}
            >
              Dua Kepala. Satu Visi.
            </h2>

            <p
              className="mt-6 text-base leading-relaxed max-w-md"
              style={{ color: 'var(--text-secondary)' }}
            >
              Kami adalah tim kecil yang bergerak cepat. Setiap project kami tangani dari A sampai Z,
              dengan standar yang sama seperti tim in-house.
            </p>
          </ScrollReveal>

          {/* Stat counters — NO ScrollReveal wrapper so useInView triggers correctly */}
          <div className="mt-10 grid grid-cols-3 gap-3 md:gap-6">
            {STATS.map(({ label, target, suffix }) => (
              <div key={label} className="flex flex-col">
                <span
                  className="font-bold text-2xl md:text-4xl gradient-text"
                  style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
                >
                  <CountUp target={target} suffix={suffix} />
                </span>
                <span
                  className="text-[10px] md:text-xs uppercase tracking-wide mt-1 leading-tight"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
