# UI Component Specs Addendum
**Project:** Forza Studio — Business Website Overhaul
**Version:** 1.0
**Build Target:** Vibe Coding Agent

> All components below MUST reuse existing design tokens from `globals.css` / `tailwind.config.ts`. No new colors, fonts, or spacing scales. Reference existing components (`Button.tsx`, `Badge.tsx`, `Card`-pattern in `ProjectCard.tsx`) for consistent class patterns before writing new ones.

---

## 1. `MetricBadge.tsx`

**Location:** `components/ui/MetricBadge.tsx`
**Purpose:** Small pill displaying a single project/result metric (e.g., "12.4k+ Users").
**Used by:** `ProjectCard.tsx`, project detail pages (Phase 2).

### Props
```typescript
interface MetricBadgeProps {
  label: string;
  value: string;
  icon?: string;          // Lucide icon name, e.g. "Users", "TrendingUp"
  variant?: 'light' | 'dark';   // light = on cream bg, dark = on dark bg
}
```

### Visual Spec
```
Shape:        Rounded-full pill, px-3 py-1.5
Background:   variant=light → bg-white/60 border border-black/5
              variant=dark  → bg-white/10 border border-white/10
Icon:         14px, text-blewah, left of value
Value:        font-syne (display), font-semibold, text-sm
Label:        font-jakarta, text-xs, text-secondary, below or beside value
Layout:       flex items-center gap-1.5
Hover:        scale-105 transition (if interactive, optional)
```

### Reference Implementation
```tsx
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricBadgeProps {
  label: string;
  value: string;
  icon?: string;
  variant?: 'light' | 'dark';
}

export function MetricBadge({ label, value, icon, variant = 'light' }: MetricBadgeProps) {
  const IconComponent = icon ? (Icons as any)[icon] : null;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 border',
        variant === 'light'
          ? 'bg-white/60 border-black/5'
          : 'bg-white/10 border-white/10'
      )}
    >
      {IconComponent && <IconComponent size={14} className="text-[var(--blewah)]" />}
      <span className="font-syne font-semibold text-sm text-[var(--text-primary)]">
        {value}
      </span>
      <span className="font-jakarta text-xs text-[var(--text-secondary)]">
        {label}
      </span>
    </div>
  );
}
```

### Usage Example (inside ProjectCard)
```tsx
<div className="flex flex-wrap gap-2 my-3">
  {project.metrics?.slice(0, 3).map((metric) => (
    <MetricBadge key={metric.label} {...metric} variant="light" />
  ))}
</div>
```

---

## 2. `TestimonialCard.tsx`

**Location:** `components/ui/TestimonialCard.tsx`
**Purpose:** Single testimonial display — circular photo, quote, name/title/company, LinkedIn icon.
**Used by:** `TestimonialCarousel.tsx`.

### Props
```typescript
interface TestimonialCardProps {
  testimonial: Testimonial;   // from data/testimonials.ts
  isActive?: boolean;         // true if currently centered in carousel
}
```

### Visual Spec
```
Container:     bg-[var(--bg-card)] rounded-2xl p-8 border border-black/5
               shadow-sm, min-h-[320px], flex flex-col justify-between
Quote mark:    Large decorative " character, text-blewah/20, top-left,
               font-syne text-6xl, absolute positioned, leading-none
Quote text:    font-jakarta text-base md:text-lg text-primary leading-relaxed
               line-clamp-6 (or no clamp if card is tall enough)
Divider:       border-t border-black/5, my-4
Photo:         w-12 h-12 rounded-full object-cover, border-2 border-white
Name:          font-syne font-semibold text-sm
Title/Company: font-jakarta text-xs text-secondary
               format: "{title} at {company}"
LinkedIn icon: Lucide "Linkedin" icon, 16px, text-secondary,
               hover:text-blewah, opens linkedInUrl in new tab
Active state:  isActive=true → scale-100 opacity-100
               isActive=false → scale-95 opacity-60 (for carousel side cards)
```

### Reference Implementation
```tsx
import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import type { Testimonial } from '@/data/testimonials';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive?: boolean;
}

export function TestimonialCard({ testimonial, isActive = true }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col justify-between min-h-[320px] rounded-2xl p-8',
        'bg-[var(--bg-card)] border border-black/5 shadow-sm transition-all duration-300',
        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'
      )}
    >
      <span className="absolute top-4 left-6 font-syne text-6xl leading-none text-[var(--blewah)]/20 select-none">
        "
      </span>

      <p className="relative z-10 font-jakarta text-base md:text-lg text-[var(--text-primary)] leading-relaxed pt-6">
        {testimonial.quote}
      </p>

      <div className="mt-6 pt-4 border-t border-black/5 flex items-center gap-3">
        <Image
          src={testimonial.photo}
          alt={testimonial.name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
        <div className="flex-1 min-w-0">
          <p className="font-syne font-semibold text-sm text-[var(--text-primary)] truncate">
            {testimonial.name}
          </p>
          <p className="font-jakarta text-xs text-[var(--text-secondary)] truncate">
            {testimonial.title} at {testimonial.company}
          </p>
        </div>
        {testimonial.linkedInUrl && (
          <a
            href={testimonial.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${testimonial.name} on LinkedIn`}
            className="text-[var(--text-secondary)] hover:text-[var(--blewah)] transition-colors"
          >
            <Linkedin size={16} />
          </a>
        )}
      </div>
    </div>
  );
}
```

---

## 3. `TestimonialCarousel.tsx`

**Location:** `components/ui/TestimonialCarousel.tsx`
**Purpose:** Drag/swipe carousel containing `TestimonialCard`s. Uses Framer Motion.
**Used by:** `components/sections/Testimonials.tsx`.

### Props
```typescript
interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}
```

### Behavior Spec
```
Layout:        Mobile: 1 card visible, full-width
               Tablet: 1.5 cards visible (peek next card)
               Desktop: 2.5–3 cards visible (peek both sides)
Drag:          Framer Motion drag="x", dragConstraints set dynamically
               based on container width vs total track width
Snap:          On drag end, snap to nearest card index (dragSnapToOrigin
               not used — use onDragEnd to calculate nearest index)
Arrows:        Prev/Next buttons — circular, bg-card, border, icon centered
               Disabled state at start/end (opacity-30, pointer-events-none)
Dots:          Below carousel, one dot per testimonial, active dot is
               wider (pill shape) and bg-blewah, inactive dots bg-black/10
Keyboard:      Optional — ArrowLeft/ArrowRight navigates (nice-to-have)
Auto-play:     OFF (per PRD — trust content needs deliberate reading)
```

### Reference Implementation
```tsx
'use client';

import { useState, useRef } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';
import type { Testimonial } from '@/data/testimonials';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const CARD_WIDTH = 360; // px, matches card width in CSS
const GAP = 24;         // px, gap-6

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const trackOffset = -(activeIndex * (CARD_WIDTH + GAP));
  const maxIndex = testimonials.length - 1;

  const goTo = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(maxIndex, index)));
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) goTo(activeIndex + 1);
    else if (info.offset.x > threshold) goTo(activeIndex - 1);
  };

  return (
    <div className="w-full">
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          className="flex gap-6 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -(maxIndex * (CARD_WIDTH + GAP)), right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          animate={{ x: trackOffset }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {testimonials.map((t, i) => (
            <div key={t.id} style={{ width: CARD_WIDTH, flexShrink: 0 }}>
              <TestimonialCard testimonial={t} isActive={i === activeIndex} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full border border-black/10 bg-[var(--bg-card)] flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none hover:border-[var(--blewah)] transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? 'w-6 bg-[var(--blewah)]' : 'w-2 bg-black/10'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === maxIndex}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full border border-black/10 bg-[var(--bg-card)] flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none hover:border-[var(--blewah)] transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
```

> **Agent note:** `CARD_WIDTH` must be responsive — use a `useEffect` + `window.innerWidth` check or CSS clamp if testing shows fixed 360px breaks mobile layout below 400px viewport. Simplify to single-card full-width swipe on mobile if needed.

---

## 4. `FAQAccordion.tsx`

**Location:** `components/ui/FAQAccordion.tsx`
**Purpose:** Expandable accordion list for FAQ section.
**Used by:** `components/sections/FAQ.tsx`.

### Props
```typescript
interface FAQAccordionProps {
  faqs: FAQ[];
}
```

### Behavior Spec
```
Mode:          Single-open accordion (opening one closes others)
Item layout:   Number (01, 02...) │ Question text │ Chevron icon (right)
Trigger:       Entire row is clickable (button, full width)
Border:        border-b border-black/5 between items
Animation:     Framer Motion AnimatePresence + height auto via
               motion.div with initial/animate/exit height 0→auto
Chevron:       Rotates 180deg when open (transition-transform)
Answer text:   font-jakarta text-sm text-secondary, pt-2 pb-6 pl-10
               (indented to align with question text, not number)
```

### Reference Implementation
```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '@/data/faqs';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="border-b border-black/5">
            <button
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="w-full flex items-center gap-4 py-5 text-left group"
              aria-expanded={isOpen}
            >
              <span className="font-syne text-sm text-[var(--blewah)] w-8 flex-shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 font-syne font-medium text-base md:text-lg text-[var(--text-primary)] group-hover:text-[var(--blewah)] transition-colors">
                {faq.question}
              </span>
              <ChevronDown
                size={20}
                className={`flex-shrink-0 text-[var(--text-secondary)] transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
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
```

---

## 5. `ClientLogoWall.tsx`

**Location:** `components/sections/ClientLogoWall.tsx` (section-level, not `ui/`)
**Purpose:** Display grid of client logos, grayscale → color on hover.

### Props
```typescript
interface ClientLogoWallProps {
  clients: Client[];
}
```

### Visual Spec
```
Section pad:   py-16 (smaller than full sections — this is a proof strip)
Eyebrow:       "Klien Kami" — same style as other section eyebrows
H2:            "Dipercaya oleh bisnis yang sedang berkembang."
Grid:          grid-cols-2 md:grid-cols-3 lg:grid-cols-5, gap-8
               items-center justify-center
Logo:          max-h-10 md:max-h-12, w-auto, mx-auto
               filter: grayscale(1) opacity-50
               hover: filter: grayscale(0) opacity-100, transition-all duration-300
Fallback:      If logo image 404s (handled by SmartImage), show
               client.name as text badge instead — bg-black/5 rounded px-4 py-2
```

### Reference Implementation
```tsx
import { SmartImage } from '@/components/ui/SmartImage';
import { clients } from '@/data/clients';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function ClientLogoWall() {
  return (
    <section id="clients" className="scroll-mt-20 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="font-jakarta text-sm text-[var(--blewah)] text-center mb-2 tracking-wide uppercase">
            Klien Kami
          </p>
          <h2 className="font-syne text-2xl md:text-3xl text-center text-[var(--text-primary)] mb-12">
            Dipercaya oleh bisnis yang sedang berkembang.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-center">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              title={client.name}
            >
              <SmartImage
                src={client.logo}
                alt={client.logoAlt}
                width={140}
                height={48}
                className="max-h-10 md:max-h-12 w-auto object-contain"
                fallback={
                  <span className="bg-black/5 rounded px-4 py-2 font-jakarta text-xs text-[var(--text-secondary)]">
                    {client.name}
                  </span>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

> **Agent note:** If `SmartImage` doesn't currently support a `fallback` prop, add it as an optional prop that renders instead of the broken image — check existing `SmartImage.tsx` implementation first and extend minimally.

---

## 6. `ContactFormEnhanced` (update existing `Contact.tsx` form block)

**Location:** Inline within `components/sections/Contact.tsx`
**Purpose:** Multi-field form replacing the existing 3-field version.

### Field Spec
```
1. Name*      — text input, full width
2. Company    — text input, full width (optional)
3. Email*     — email input, full width
4. Phone      — tel input, full width (optional, for WhatsApp follow-up)
5. Interest*  — radio button group, horizontal wrap on desktop,
                vertical stack on mobile. Options from
                types/contact.ts interestOptions
6. Budget*    — select dropdown. Options from types/contact.ts
                budgetOptions
7. Message*   — textarea, 4 rows min, full width

* = required field, marked with red asterisk or "required" text
```

### Radio Group Visual (Interest)
```
Layout:        flex flex-wrap gap-3
Each option:   Pill-shaped label wrapping hidden radio input
               Unselected: border border-black/10 bg-transparent
               Selected:   border-blewah bg-blewah/10 text-blewah
               Padding:    px-4 py-2, rounded-full, cursor-pointer
               Text:       font-jakarta text-sm
```

### Select Visual (Budget)
```
Reuse existing input styling pattern (border, rounded-lg, px-4 py-3)
Add native <select> with same border/padding as text inputs
Use a Lucide ChevronDown icon absolutely positioned on the right
```

### Reference Implementation (form block only)
```tsx
'use client';

import { useState } from 'react';
import { sendContactMessage } from '@/app/actions';
import { interestOptions, budgetOptions } from '@/types/contact';
import { ChevronDown } from 'lucide-react';

export function ContactFormEnhanced() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    const result = await sendContactMessage(formData);
    if (result.ok) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(result.error ?? 'Terjadi kesalahan.');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <p className="font-syne text-xl text-[var(--text-primary)] mb-2">
          Pesan terkirim! 🎉
        </p>
        <p className="font-jakarta text-sm text-[var(--text-secondary)]">
          Tim kami akan merespons dalam 24 jam.
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <input name="name" required placeholder="Nama lengkap*"
          className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white/50 font-jakarta text-sm focus:border-[var(--blewah)] outline-none transition-colors" />
        <input name="company" placeholder="Nama perusahaan/bisnis"
          className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white/50 font-jakarta text-sm focus:border-[var(--blewah)] outline-none transition-colors" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input name="email" type="email" required placeholder="Email*"
          className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white/50 font-jakarta text-sm focus:border-[var(--blewah)] outline-none transition-colors" />
        <input name="phone" type="tel" placeholder="No. WhatsApp"
          className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white/50 font-jakarta text-sm focus:border-[var(--blewah)] outline-none transition-colors" />
      </div>

      <div>
        <label className="block font-jakarta text-sm text-[var(--text-secondary)] mb-2">
          Saya tertarik dengan*
        </label>
        <div className="flex flex-wrap gap-3">
          {interestOptions.map((opt) => (
            <label key={opt.value} className="cursor-pointer">
              <input type="radio" name="interest" value={opt.value} required className="sr-only peer" />
              <span className="px-4 py-2 rounded-full border border-black/10 font-jakarta text-sm
                peer-checked:border-[var(--blewah)] peer-checked:bg-[var(--blewah)]/10 peer-checked:text-[var(--blewah)]
                transition-colors inline-block">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="relative">
        <label className="block font-jakarta text-sm text-[var(--text-secondary)] mb-2">
          Estimasi budget*
        </label>
        <select name="budget" required
          className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white/50 font-jakarta text-sm focus:border-[var(--blewah)] outline-none appearance-none transition-colors">
          <option value="" disabled>Pilih range budget</option>
          {budgetOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={18} className="absolute right-4 top-[42px] text-[var(--text-secondary)] pointer-events-none" />
      </div>

      <textarea name="message" required rows={4} placeholder="Ceritakan tentang project Anda*"
        className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white/50 font-jakarta text-sm focus:border-[var(--blewah)] outline-none transition-colors resize-none" />

      {status === 'error' && (
        <p className="text-sm text-red-500 font-jakarta">{errorMsg}</p>
      )}

      <button type="submit" disabled={status === 'submitting'}
        className="w-full md:w-auto px-8 py-3 rounded-full bg-[var(--blewah)] text-white font-jakarta font-medium
          hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50">
        {status === 'submitting' ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
    </form>
  );
}
```

---

## 7. `NewsletterForm.tsx`

**Location:** `components/ui/NewsletterForm.tsx`
**Purpose:** Simple email capture in footer. Phase 1 = UI only (no backend send).

### Reference Implementation
```tsx
'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Phase 1: no backend — just show success state
    // Phase 2: wire to Resend Audience API
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email kamu"
        required
        className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/40 focus:border-[var(--blewah)] outline-none transition-colors"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="px-4 py-2.5 rounded-lg bg-[var(--blewah)] text-white hover:scale-105 transition-transform"
      >
        {submitted ? '✓' : <Send size={16} />}
      </button>
    </form>
  );
}
```

---

## 8. `ServiceCard.tsx` (Redesign — Update Existing)

**Location:** `components/ui/ServiceCard.tsx`
**Change:** Add "Pelajari lebih →" link at bottom, anchor-linked for Phase 1.

### Diff from existing implementation
```diff
  <div className="service-card">
    <Icon />
    <h3>{service.title}</h3>
    <p>{service.description}</p>
    <ul>{service.features.map(...)}</ul>
+   <a href={`#services-${service.id}`} className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-[var(--blewah)] hover:gap-2 transition-all">
+     Pelajari lebih <ArrowRight size={14} />
+   </a>
  </div>
```

---

## 9. `WhatsAppButton.tsx`

**Location:** `components/ui/WhatsAppButton.tsx`
**Purpose:** Floating fixed action button, hidden when Contact section is in view.

### Reference Implementation
```tsx
'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { site } from '@/data/site';

export function WhatsAppButton() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  const message = encodeURIComponent('Halo Forza Studio, saya ingin konsultasi project.');
  const href = `https://wa.me/${site.whatsapp.replace(/\D/g, '')}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg
        flex items-center justify-center text-white
        hover:scale-110 transition-transform duration-200
        animate-[pulse_3s_ease-in-out_infinite]"
    >
      <MessageCircle size={26} fill="white" />
    </a>
  );
}
```

> Add a `pulse` keyframe to `tailwind.config.ts` if not already present (subtle scale 1 → 1.08 → 1, opacity unaffected — must not look like an error state).

---

## 10. Component Build Checklist

| Component | New/Update | Depends On | Used By |
|---|---|---|---|
| `MetricBadge.tsx` | NEW | `data/projects.ts` types | `ProjectCard.tsx` |
| `TestimonialCard.tsx` | NEW | `data/testimonials.ts` | `TestimonialCarousel.tsx` |
| `TestimonialCarousel.tsx` | NEW | `TestimonialCard.tsx` | `sections/Testimonials.tsx` |
| `FAQAccordion.tsx` | NEW | `data/faqs.ts` | `sections/FAQ.tsx` |
| `ClientLogoWall.tsx` | NEW | `data/clients.ts`, `SmartImage.tsx` | `app/page.tsx` |
| `ContactFormEnhanced` | UPDATE | `types/contact.ts`, `app/actions.ts` | `sections/Contact.tsx` |
| `NewsletterForm.tsx` | NEW | none | `layout/Footer.tsx` |
| `ServiceCard.tsx` | UPDATE | none | `sections/Services.tsx` |
| `WhatsAppButton.tsx` | NEW | `data/site.ts` | `app/page.tsx` |

---

*UI Component Specs Addendum v1.0 — All components designed to inherit existing tokens. No new design system needed.*
