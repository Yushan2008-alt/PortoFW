'use client';
import { useState } from 'react';
import { services, type Service } from '@/data/services';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={delay}>
      <div
        className="p-8 rounded-2xl transition-all duration-300 h-full"
        style={{
          border: `1px solid ${hovered ? 'rgba(232,151,106,0.35)' : 'rgba(255,255,255,0.07)'}`,
          background: 'rgba(255,255,255,0.03)',
          boxShadow: hovered ? 'var(--shadow-blewah)' : 'none',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
          style={{ background: 'var(--gradient-gemini)' }}
        >
          <service.icon size={22} color="white" />
        </div>

        {/* Title */}
        <h3
          className="text-xl font-semibold"
          style={{
            fontFamily: 'var(--font-syne, sans-serif)',
            color: 'var(--text-on-dark)',
          }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mt-3"
          style={{ color: 'rgba(244,243,239,0.65)' }}
        >
          {service.description}
        </p>

        {/* Bullets */}
        <ul className="mt-5 space-y-2">
          {service.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-2 text-xs"
              style={{ color: 'rgba(244,243,239,0.5)' }}
            >
              <span style={{ color: 'var(--blewah)' }}>·</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 px-6"
      style={{ background: 'var(--bg-dark)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="gradient-text text-sm font-semibold tracking-widest uppercase">
              What We Do
            </span>
            <h2
              className="mt-3 font-display font-bold"
              style={{
                fontSize: 'clamp(1.4rem, 4vw, 2.5rem)',
                letterSpacing: '-0.02em',
                color: 'var(--text-on-dark)',
              }}
            >
              Apa yang Bisa Kami Kerjakan
            </h2>
          </ScrollReveal>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} delay={index * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}
