# PRD — Forza Studio Portfolio
**Version:** 3.0 (Vibe-Code Optimized)
**Build Target:** Claude Code / coding agent

---

## 1. Context

**Project:** Single-page portfolio website for Forza Studio — a 2-person freelance dev team based in Indonesia.
**Goal:** Showcase 3 projects, capture inbound inquiries via contact form.
**Tone:** Professional, elegant, fun-but-not-childish. Luxury feel without being pretentious.
**Domain:** `forzastudio.dev` (placeholder — confirm with user)

---

## 2. Tech Decisions (Locked)

```
Framework:    Next.js 14 (App Router)
Language:     TypeScript (strict mode)
Styling:      Tailwind CSS v3 (no CSS modules)
Animation:    Framer Motion (no GSAP)
Icons:        Lucide React
Fonts:        next/font/google (Syne + Plus Jakarta Sans)
Form:         Resend + Next.js Server Action
Deploy:       Vercel
Node:         >= 18.17
Package mgr:  pnpm (or npm if preferred)
```

**Do not** add: Redux, state management library, CSS-in-JS, Sass, GSAP, jQuery, or testing libraries. Keep deps minimal.

---

## 3. Design Tokens

Paste this into `app/globals.css` directly:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Background */
  --bg-primary: #F4F3EF;
  --bg-secondary: #EEECEA;
  --bg-card: #F9F8F5;
  --bg-dark: #0F0E0D;

  /* Gemini Gradient */
  --gemini-blue: #4A90D9;
  --gemini-purple: #9B6DFF;
  --gemini-pink: #E879A0;
  --gemini-teal: #3ECFCF;

  --gradient-gemini: linear-gradient(135deg, #4A90D9 0%, #9B6DFF 35%, #E879A0 65%, #3ECFCF 100%);
  --gradient-text: linear-gradient(90deg, #4A90D9, #9B6DFF, #E879A0, #3ECFCF);

  /* Blewah Accent */
  --blewah: #E8976A;
  --blewah-light: #F2B48A;
  --blewah-deep: #C97A4E;

  /* Text */
  --text-primary: #1A1918;
  --text-secondary: #6B6460;
  --text-muted: #A09890;
  --text-on-dark: #F4F3EF;

  /* Borders & Shadows */
  --border-subtle: rgba(26,25,24,0.08);
  --border-medium: rgba(26,25,24,0.14);
  --shadow-sm: 0 2px 8px rgba(26,25,24,0.06);
  --shadow-md: 0 8px 32px rgba(26,25,24,0.10);
  --shadow-lg: 0 24px 64px rgba(26,25,24,0.14);
  --shadow-blewah: 0 8px 32px rgba(232,151,106,0.20);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
}

.gradient-text {
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: gradient-shift 6s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}

@keyframes morph-blob {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50%      { border-radius: 50% 60% 50% 40% / 30% 50% 60% 50%; }
  75%      { border-radius: 70% 40% 60% 30% / 40% 70% 30% 60%; }
}

@keyframes float-orb {
  0%, 100% { transform: translate(0, 0); }
  33%      { transform: translate(40px, -30px); }
  66%      { transform: translate(-30px, 20px); }
}
```

Add to `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          card: 'var(--bg-card)',
          dark: 'var(--bg-dark)',
        },
        gemini: {
          blue: 'var(--gemini-blue)',
          purple: 'var(--gemini-purple)',
          pink: 'var(--gemini-pink)',
          teal: 'var(--gemini-teal)',
        },
        blewah: {
          DEFAULT: 'var(--blewah)',
          light: 'var(--blewah-light)',
          deep: 'var(--blewah-deep)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-jakarta)', 'sans-serif'],
      },
      animation: {
        'morph-blob': 'morph-blob 8s ease-in-out infinite',
        'float-orb': 'float-orb 10s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
```

---

## 4. Asset Checklist & Placeholder System

### Folder Structure
```
public/
├── images/
│   ├── projects/      (1200x800 — user will provide manually)
│   │   ├── ruangteduh.png
│   │   ├── conversion-climb.png
│   │   └── pkwu.png
│   └── team/          (400x400 square — user will provide)
│       ├── bilal.png
│       └── partner.png
└── og-image.png       (1200x630 for social share)
```

### Placeholder Component (Auto-Fallback)

If user hasn't placed image yet, component falls back to themed placeholder. **Build this first.**

```tsx
// components/ui/SmartImage.tsx
'use client';
import Image from 'next/image';
import { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  fallbackText: string;
  width: number;
  height: number;
  className?: string;
  fallbackBg?: 'gemini' | 'blewah' | 'dark';
}

const FALLBACK_COLORS = {
  gemini: { bg: '9B6DFF', text: 'F4F3EF' },
  blewah: { bg: 'E8976A', text: 'F4F3EF' },
  dark:   { bg: '0F0E0D', text: 'F4F3EF' },
};

export function SmartImage({
  src, alt, fallbackText, width, height,
  className = '', fallbackBg = 'gemini',
}: SmartImageProps) {
  const [errored, setErrored] = useState(false);
  const colors = FALLBACK_COLORS[fallbackBg];
  const fallbackUrl = `https://placehold.co/${width}x${height}/${colors.bg}/${colors.text}?text=${encodeURIComponent(fallbackText)}&font=poppins`;

  return (
    <Image
      src={errored ? fallbackUrl : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setErrored(true)}
      unoptimized={errored}
    />
  );
}
```

### `next.config.js` — allow placeholder domain

```javascript
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
};
```

---

## 5. Data Files

Create these as static TypeScript files. User will edit values, no CMS needed.

### `data/projects.ts`

```typescript
export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  thumbnail: string;
  liveUrl?: string;
  repoUrl?: string;
  techStack: string[];
  featured: boolean;
  year: number;
  accentColor: string;
}

export const projects: Project[] = [
  {
    id: 'ruangteduh',
    title: 'RuangTeduh',
    category: 'Health Tech · AI Platform',
    tagline: 'Platform kesehatan mental gratis untuk 12.400+ pengguna Indonesia.',
    description:
      'Dari AI companion 24/7 hingga crisis SOS, kami bangun ekosistem kesehatan mental lengkap yang bisa diakses siapa saja, kapan saja.',
    thumbnail: '/images/projects/ruangteduh.png',
    liveUrl: 'https://ide-bussines.vercel.app',
    techStack: ['Next.js', 'Supabase', 'OpenAI API', 'Tailwind CSS'],
    featured: true,
    year: 2025,
    accentColor: '#10B981',
  },
  {
    id: 'conversion-climb',
    title: 'The Conversion Climb',
    category: 'Landing Page · Conversion',
    tagline: 'Landing page yang menggunakan framework-nya sendiri untuk menjual.',
    description:
      'Sales page ebook marketing dengan Awareness Ladder framework. Kami tangani struktur, copy, dan visual dari nol sampai live.',
    thumbnail: '/images/projects/conversion-climb.png',
    liveUrl: 'https://landing-page-pi-ochre-21.vercel.app',
    techStack: ['Next.js', 'Tailwind CSS', 'Vercel'],
    featured: true,
    year: 2025,
    accentColor: '#D4AF37',
  },
  {
    id: 'pkwu-web',
    title: 'Entrepreneurship Web',
    category: 'Web Project',
    tagline: 'Fondasi awal perjalanan Forza Studio.',
    description:
      'Project web kewirausahaan yang jadi titik awal kami belajar membangun untuk dunia nyata.',
    thumbnail: '/images/projects/pkwu.png',
    repoUrl: 'https://github.com/BilalMayor/pkwu-tugas',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    featured: false,
    year: 2024,
    accentColor: '#6B6460',
  },
];
```

### `data/team.ts`

```typescript
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socials: { github?: string; linkedin?: string; email?: string };
}

export const team: TeamMember[] = [
  {
    id: 'bilal',
    name: 'Bilal',                          // confirm full name
    role: 'Frontend & Product Engineer',
    bio: 'Membangun antarmuka yang terasa hidup. Fokus di Next.js, animasi, dan detail interaksi.',
    avatar: '/images/team/bilal.png',
    socials: {
      github: 'https://github.com/BilalMayor',
      linkedin: '',                          // fill later
      email: 'bilal@forzastudio.dev',        // confirm
    },
  },
  {
    id: 'partner',
    name: 'TBD',                             // user to fill
    role: 'Backend & System Architect',
    bio: 'Menjaga arsitektur tetap rapi. Fokus di API design, database, dan AI integration.',
    avatar: '/images/team/partner.png',
    socials: { github: '', linkedin: '', email: '' },
  },
];
```

### `data/services.ts`

```typescript
import { Code2, Palette, Lightbulb } from 'lucide-react';

export interface Service {
  id: string;
  icon: typeof Code2;
  title: string;
  description: string;
  bullets: string[];
}

export const services: Service[] = [
  {
    id: 'dev',
    icon: Code2,
    title: 'Web & App Development',
    description: 'Dari landing page sampai full-stack web app. Clean code, scalable architecture, fast delivery.',
    bullets: ['Next.js / React / Node.js', 'REST & GraphQL API', 'Database design & optimization'],
  },
  {
    id: 'design',
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Desain yang tidak sekadar cantik, tapi convert. Kami desain untuk pengguna nyata.',
    bullets: ['Wireframe & prototyping', 'Design system', 'Figma handoff'],
  },
  {
    id: 'consult',
    icon: Lightbulb,
    title: 'Technical Consulting',
    description: 'Stuck di arsitektur atau stack choice? Kami bantu evaluasi dan rencanakan dengan tepat.',
    bullets: ['Tech stack audit', 'Architecture review', 'Code review'],
  },
];
```

### `data/techstack.ts`

```typescript
export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'tools';
  level: 'Expert' | 'Proficient';
}

export const techStack: TechItem[] = [
  { name: 'Next.js',       category: 'frontend', level: 'Expert' },
  { name: 'React',         category: 'frontend', level: 'Expert' },
  { name: 'TypeScript',    category: 'frontend', level: 'Proficient' },
  { name: 'Tailwind CSS',  category: 'frontend', level: 'Expert' },
  { name: 'Framer Motion', category: 'frontend', level: 'Proficient' },
  { name: 'Supabase',      category: 'backend',  level: 'Proficient' },
  { name: 'Node.js',       category: 'backend',  level: 'Proficient' },
  { name: 'PostgreSQL',    category: 'backend',  level: 'Proficient' },
  { name: 'OpenAI API',    category: 'ai',       level: 'Proficient' },
  { name: 'Vercel',        category: 'tools',    level: 'Expert' },
  { name: 'Git / GitHub',  category: 'tools',    level: 'Expert' },
  { name: 'Figma',         category: 'tools',    level: 'Proficient' },
];
```

### `data/site.ts` — global config

```typescript
export const site = {
  name: 'Forza Studio',
  tagline: 'We Build Products That Move.',
  description: 'Tim 2 developer freelance yang membangun web app, mobile app, dan produk digital berkualitas.',
  url: 'https://forzastudio.dev',
  email: 'hello@forzastudio.dev',
  whatsapp: '+62XXXXXXXXXX',         // user to fill
  socials: {
    github: 'https://github.com/BilalMayor',
    instagram: '',                    // user to fill
    linkedin: '',                     // user to fill
  },
  stats: {
    projects: '15+',
    clients: '10+',
    years: '2',
  },
};
```

---

## 6. File Structure

```
app/
├── layout.tsx              # Fonts, metadata, global wrapper
├── page.tsx                # Single page — composes all sections
├── globals.css             # Design tokens (Section 3)
└── actions.ts              # Server action for contact form

components/
├── layout/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── sections/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Work.tsx
│   ├── Services.tsx
│   ├── TechStack.tsx
│   └── Contact.tsx
├── ui/
│   ├── SmartImage.tsx      # From Section 4
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── ProjectCard.tsx
│   ├── BlobMorph.tsx
│   ├── FloatingOrb.tsx
│   └── ScrollReveal.tsx

data/
├── projects.ts
├── team.ts
├── services.ts
├── techstack.ts
└── site.ts

public/
├── images/                  # User adds these
└── og-image.png
```

---

## 7. Component Specs

### `<Button />`

```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;              // if present, render as <a>
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}
```

**Visual:**
- `primary`: blewah background, white text, shadow-blewah on hover, scale 1.02
- `secondary`: transparent bg, gradient border, gradient text on hover
- `ghost`: text only, underline animation on hover

### `<BlobMorph />`

```tsx
interface BlobMorphProps {
  size?: number;              // default 600
  opacity?: number;           // default 0.6
  blur?: number;              // default 60
  className?: string;
  variant?: 'gemini' | 'blewah';
}
```

**Implementation:**
```tsx
<div
  className={`absolute pointer-events-none animate-morph-blob ${className}`}
  style={{
    width: size, height: size, opacity,
    filter: `blur(${blur}px)`,
    background: variant === 'gemini'
      ? 'var(--gradient-gemini)'
      : 'var(--blewah)',
  }}
/>
```

### `<FloatingOrb />`

```tsx
interface FloatingOrbProps {
  color: 'blue' | 'purple' | 'pink' | 'teal' | 'blewah';
  size?: number;              // default 200
  top?: string;               // CSS position
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;             // animation delay in seconds
}
```

Apply `animate-float-orb` + `filter: blur(60px)`.

### `<ProjectCard />`

```tsx
interface ProjectCardProps {
  project: Project;           // from data/projects.ts
  index: number;              // for stagger animation
}
```

**Layout:** image top, content bottom. Border-radius 20px. On hover: lift shadow, image zoom 1.05, gradient border reveal.

### `<ScrollReveal />`

Wraps any content. Reveals on scroll using Framer Motion's `whileInView`.

```tsx
'use client';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}

export function ScrollReveal({ children, delay = 0, direction = 'up' }: ScrollRevealProps) {
  const offset = { up: { y: 30 }, left: { x: -30 }, right: { x: 30 } }[direction];
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 8. Sections — Layout & Content

All sections use `<section id="...">` for nav anchor scrolling.

### Navbar
- Sticky top, transparent at scrollY=0, frosted glass (`backdrop-blur-md bg-bg-primary/80`) when scrolled
- Logo left ("Forza Studio" in font-display), nav center (`#work`, `#about`, `#services`, `#contact`), CTA right
- Mobile: hamburger to fullscreen overlay

### Hero — `<section id="hero">`
- 100vh, full-bleed
- Background: 1× `<BlobMorph variant="gemini" size={800} />` positioned right, 2× `<FloatingOrb />` (purple top-left, blewah bottom-right)
- Content centered:
  - Badge: "Available for Projects ✦" (pill, blewah border)
  - H1 (font-display, text-6xl md:text-7xl): `We Build Digital` `<span class="gradient-text">Products That Move.</span>`
  - Subtext (text-lg, text-secondary): "Tim 2 developer yang fokus pada hasil nyata. Dari desain ke produksi, kami tangani semuanya."
  - 2 buttons: primary "See Our Work" (scroll to #work), secondary "Get In Touch →" (scroll to #contact)
  - Below: scroll indicator (animated bouncing arrow)

### About — `<section id="about">`
- 2-column grid (desktop), stack on mobile
- Left: 2× team avatars overlapping with blewah glow, decorative blob behind
- Right: Eyebrow "Who We Are" → H2 "Dua Kepala. Satu Visi." → paragraph (3 lines max) → 3-column stat row pulling from `site.stats`
- Stat counter animates on scroll-in (use Framer Motion's animate from 0)

### Work — `<section id="work">`
- Eyebrow "Selected Work" → H2 "Produk yang Kami Bangun"
- Grid: 2 columns desktop, 1 mobile. Map over `projects` array. Each card uses `<ProjectCard project={p} index={i} />`
- Stagger reveal: each card delayed by `index * 0.1`s

### Services — `<section id="services">` (Dark Section)
- Background: `bg-bg-dark` with subtle gradient mesh overlay
- 3-column grid of `<ServiceCard />`. Map from `services` array
- Each card: icon (gradient stroke), title, description, bullet list
- Hover: card lifts + blewah border glow

### TechStack — `<section id="stack">`
- Eyebrow "Tech Stack" → H2 "Tools yang Kami Kuasai"
- 4 sub-sections (Frontend / Backend / AI / Tools), filter `techStack` by category
- Each tech item: pill badge with name. On hover: scale 1.05, blewah glow, tooltip showing level

### Contact — `<section id="contact">`
- Background: gradient mesh (Gemini colors at 10% opacity)
- Centered, max-width 600px
- Badge "Let's Work Together ✦"
- H2 "Punya Project yang Menarik?"
- Subtext: "Ceritakan projectmu. Kami balas dalam 24 jam."
- Form: 3 fields (name, email, message) → submit triggers Server Action (Section 9)
- Below form: "Atau langsung email: hello@forzastudio.dev" (mailto link)

### Footer
- Dark background, 3 columns
- Col 1: Logo + tagline + © 2025 Forza Studio
- Col 2: Quick links (Work, About, Services, Contact)
- Col 3: Social icons (from `site.socials`)
- Bottom strip: "Designed & Built by Forza Studio"

---

## 9. Contact Form — Server Action with Resend

### Setup
```bash
pnpm add resend
```

### `app/actions.ts`
```typescript
'use server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMessage(formData: FormData) {
  const name = formData.get('name')?.toString() ?? '';
  const email = formData.get('email')?.toString() ?? '';
  const message = formData.get('message')?.toString() ?? '';

  if (!name || !email || !message) {
    return { ok: false, error: 'Semua field wajib diisi.' };
  }

  try {
    await resend.emails.send({
      from: 'Forza Studio <noreply@forzastudio.dev>',  // confirm verified sender
      to: process.env.CONTACT_EMAIL ?? 'hello@forzastudio.dev',
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: 'Gagal mengirim. Coba lagi nanti.' };
  }
}
```

### `.env.local`
```
RESEND_API_KEY=re_xxxxxxxxxx
CONTACT_EMAIL=hello@forzastudio.dev
```

### Form usage in `<Contact />`
Use `useFormStatus` for loading state, show success/error inline. Reset form on success.

---

## 10. Page Load Animation Sequence

In `<Hero />`, use Framer Motion variants for staggered entry:

```typescript
const heroContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
```

Order: badge → headline → subtext → buttons. Blob/orbs fade in via CSS animation with delay.

---

## 11. Layout Root — `app/layout.tsx`

```typescript
import { Syne, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });

export const metadata = {
  title: 'Forza Studio — We Build Products That Move',
  description: 'Tim 2 developer freelance. Web app, mobile app, dan produk digital berkualitas.',
  openGraph: {
    title: 'Forza Studio',
    description: 'We Build Products That Move.',
    url: 'https://forzastudio.dev',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${syne.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 12. Build Order for Coding Agent

1. Init Next.js + Tailwind + install deps (`framer-motion`, `lucide-react`, `resend`)
2. Paste `globals.css` and `tailwind.config.ts` from Section 3
3. Set up fonts in `layout.tsx` (Section 11)
4. Create all `data/*.ts` files (Section 5)
5. Build `<SmartImage />` first (Section 4) — everything depends on this
6. Build `<BlobMorph />`, `<FloatingOrb />`, `<ScrollReveal />` primitives
7. Build `<Button />`, `<Badge />`, `<ProjectCard />`
8. Build sections in order: Navbar → Hero → About → Work → Services → TechStack → Contact → Footer
9. Compose all in `app/page.tsx`
10. Wire up Server Action for contact form (Section 9)
11. Add `.env.local` with Resend key
12. Test responsive (390px, 768px, 1280px), then deploy to Vercel

---

## 13. User-Provided Items (Manual Steps)

These need user input — coding agent should leave clear `// TODO` markers:

- [ ] Project screenshots → `public/images/projects/{ruangteduh,conversion-climb,pkwu}.png` (1200x800)
- [ ] Team avatars → `public/images/team/{bilal,partner}.png` (400x400 square)
- [ ] OG image → `public/og-image.png` (1200x630)
- [ ] Confirm partner's full name in `data/team.ts`
- [ ] Fill social links in `data/site.ts` and `data/team.ts`
- [ ] Resend API key in `.env.local`
- [ ] Verify sender domain in Resend dashboard
- [ ] WhatsApp number in `data/site.ts`

---

*PRD ini lengkap untuk vibe coding. Semua tech decision sudah locked, semua data dan komponen sudah punya kontrak yang jelas.*
