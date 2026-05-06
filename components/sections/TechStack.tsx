'use client';
import { useState } from 'react';
import { techStack, type TechItem } from '@/data/techstack';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const CATEGORIES: { key: TechItem['category']; label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend',  label: 'Backend' },
  { key: 'ai',       label: 'AI & APIs' },
  { key: 'tools',    label: 'Tools & Deploy' },
];

// FIX 7 — Add tech-pill-hover class; keep state only for tooltip
function TechChip({ item }: { item: TechItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="tech-pill-hover relative px-4 py-2 rounded-full text-sm font-medium cursor-default transition-all duration-200 select-none"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        color: 'var(--text-secondary)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {item.name}
      {/* Tooltip */}
      <span
        className="absolute -top-9 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap transition-opacity duration-150"
        style={{
          background: 'var(--bg-dark)',
          color: 'var(--text-on-dark)',
          opacity: hovered ? 1 : 0,
        }}
      >
        {item.level}
      </span>
    </span>
  );
}

export function TechStack() {
  return (
    <section
      id="stack"
      className="py-24 md:py-32 px-6"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="gradient-text text-sm font-semibold tracking-widest uppercase">
              Tech Stack
            </span>
            <h2
              className="mt-3 font-display font-bold"
              style={{
                fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              Tools yang Kami Kuasai
            </h2>
          </ScrollReveal>
        </div>

        {/* 2×2 category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {CATEGORIES.map(({ key, label }, i) => (
            <ScrollReveal key={key} delay={i * 0.1}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                {label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {techStack
                  .filter((item) => item.category === key)
                  .map((item) => (
                    <TechChip key={item.name} item={item} />
                  ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
