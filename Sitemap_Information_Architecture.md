# Sitemap & Information Architecture
**Project:** Forza Studio — Business Website Overhaul
**Version:** 1.0
**Build Target:** Vibe Coding Agent

---

## Overview

The architecture is split into two phases:
- **Phase 1 (MVP):** Single-page application — all content on `app/page.tsx` with section-based navigation via anchor links.
- **Phase 2 (Post-Launch):** Multi-page structure with dedicated routes.

The Phase 1 → Phase 2 migration is designed to be additive — no Phase 1 components need to be deleted or rewritten.

---

## Phase 1 — Single-Page Architecture

### URL Structure

```
/       → app/page.tsx (single page, all sections)
/api/   → app/actions.ts (server action, no direct URL needed)
```

### Section Anchor Map

All navigation is anchor-link based. These IDs must be on the wrapping `<section>` element.

```
#hero           → Hero section (full viewport, above fold)
#metrics        → MetricsTicker (auto-scroll banner)
#about          → About the agency
#work           → Selected projects grid
#clients        → Client logo wall
#services       → Services overview (3 cards)
#testimonials   → Testimonials carousel
#faq            → FAQ accordion
#stack          → Tech stack display
#contact        → Contact form
```

### Navbar Link Structure (Phase 1)

```
Logo (left)
├── "Work"          → #work
├── "Services"      → #services
├── "Testimonials"  → #testimonials
└── "About"         → #about

CTA Button (right)
└── "Hubungi Kami"  → #contact (primary blewah button)
```

### Page Section Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR (sticky, frosted glass on scroll)               │
│  Logo | Work · Services · Testimonials · About | [CTA]  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  #hero — HERO                           (100vh)         │
│  BlobMorph bg │ Badge │ H1 │ Sub │ 2 CTAs              │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─            │
│  #metrics — METRICS TICKER              (~60px)         │
│  Dark bg | scrolling: "15+ projects · 10+ clients ..." │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  #about — ABOUT                                         │
│  Left: Team avatars │ Right: Who We Are copy + stats   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  #work — SELECTED WORK                                  │
│  2-col grid: ProjectCard × N                            │
│  Each card: image │ category │ [MetricBadge × 3]        │
│             title │ tagline │ Explore → link            │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  #clients — CLIENT LOGO WALL                            │
│  "Dipercaya oleh..." │ Logo grid (3–5 cols)             │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  #services — SERVICES                    (dark section) │
│  3-col grid: ServiceCard × 3                            │
│  Icon │ Title │ Desc │ Bullets │ "Pelajari lebih →"     │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  #testimonials — TESTIMONIALS                           │
│  Draggable carousel: TestimonialCard × N                │
│  Quote │ Photo │ Name │ Title │ Company │ LinkedIn       │
│  [◀ prev] [● ● ○ ○] [next ▶]                           │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  #faq — FAQ                                             │
│  Accordion: 01 Q? ─── [+]                              │
│             02 Q? ─── [+]                              │
│             (6–10 items)                                │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  #stack — TECH STACK                                    │
│  4 categories: Frontend │ Backend │ AI │ Tools          │
│  Pill badges with hover tooltip                         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  #contact — CONTACT                                     │
│  Badge │ H2 │ Sub                                       │
│  Form: name · company · email · phone                   │
│        interest (radio) · budget (select) · message     │
│  [Send] │ WhatsApp alt │ Email alt                      │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  FOOTER                                                 │
│  Col1: Logo + tagline + © │ Col2: Quick links           │
│  Col3: Social icons │ Col4: Newsletter email input      │
│  Bottom: "Designed & Built by Forza Studio"             │
└─────────────────────────────────────────────────────────┘

⊙ FLOATING: WhatsAppButton (fixed, bottom-right)
```

---

## Phase 2 — Multi-Page Architecture

> **Note for Agent:** Do NOT implement Phase 2 routes in this build. This section is planning-only documentation for future reference.

### Full Route Map

```
/                     → Home (single-page with all sections)
/about                → About the agency (extended story, values, mission)
/team                 → Team members (cards with bios, photos, socials)
/services             → All services overview (expanded grid)
/services/web-dev     → Web Development service detail page
/services/ui-design   → UI/UX Design service detail page
/services/consulting  → Technical Consulting service detail page
/projects             → All projects grid (filterable by category)
/projects/[id]        → Project detail/case study page
  └── /projects/ruangteduh
  └── /projects/conversion-climb
  └── /projects/pkwu-web
/testimonials         → Full testimonials page (all client reviews)
/blog                 → Blog list (Phase 3 optional)
/blog/[slug]          → Individual blog post
/contact              → Standalone contact page
/privacy              → Privacy policy (legal requirement)
```

### Phase 2 Navigation Structure

```
Navbar:
├── About         (dropdown)
│   ├── Company     → /about
│   ├── Our Team    → /team
│   └── Careers     → /careers (Phase 3)
├── Works         (dropdown)
│   ├── All Projects → /projects
│   ├── Web Dev      → /projects?type=web-dev
│   └── UI Design    → /projects?type=ui-design
├── Services      (dropdown)
│   ├── All Services   → /services
│   ├── Web Dev        → /services/web-dev
│   ├── UI Design      → /services/ui-design
│   └── Consulting     → /services/consulting
├── Resources     (dropdown)
│   ├── Blog        → /blog
│   └── FAQ         → /#faq
└── [Hubungi Kami] → /contact
```

### Phase 2 File Structure (Future)

```
app/
├── page.tsx                    ← Home (updated)
├── about/
│   └── page.tsx
├── team/
│   └── page.tsx
├── services/
│   ├── page.tsx                ← All services overview
│   └── [serviceId]/
│       └── page.tsx            ← Service detail
├── projects/
│   ├── page.tsx                ← Projects grid
│   └── [id]/
│       └── page.tsx            ← Case study
├── testimonials/
│   └── page.tsx
├── blog/                       ← Phase 3
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
└── contact/
    └── page.tsx
```

---

## Content Hierarchy Per Section (Phase 1)

### Hero — Information Priority

```
Priority 1 (above fold, seen immediately):
  → Agency name (Navbar logo)
  → H1 headline — what we do
  → Subtext — for whom
  → Primary CTA — "Mulai Project Anda"
  → Secondary CTA — "Lihat Karya Kami"

Priority 2 (scroll-trigger, still in viewport):
  → Metrics ticker — proof of results
```

### Work — Information Priority per Card

```
Priority 1: Project thumbnail image (visual impact)
Priority 2: MetricBadge row (proof — numbers)
Priority 3: Project title
Priority 4: Tagline (one line)
Priority 5: "Explore →" CTA
```

### Testimonials — Information Priority per Card

```
Priority 1: Quote text (the actual testimony — most persuasive)
Priority 2: Client photo (face = trust)
Priority 3: Name + Title + Company
Priority 4: LinkedIn verification link (credibility signal)
```

### FAQ — Questions Priority (by conversion impact)

```
Order 1: "Berapa biaya untuk membuat website?" (price transparency)
Order 2: "Berapa lama proses pembuatan website?" (timeline)
Order 3: "Apa yang saya butuhkan untuk memulai?" (barrier reduction)
Order 4: "Apakah saya bisa update website sendiri?" (control)
Order 5: "Apakah Forza Studio berpengalaman dengan bisnis saya?" (fit)
Order 6: "Apa yang terjadi setelah website selesai?" (post-delivery)
Order 7+: Additional questions as available
```

---

## SEO Metadata Map (Phase 1)

```typescript
// app/layout.tsx — Base metadata
export const metadata = {
  title: 'Forza Studio — Web Development Agency Indonesia',
  description: 'Forza Studio adalah web development agency yang membangun website profesional untuk bisnis Indonesia. Landing page, web app, dan produk digital berkualitas.',
  keywords: ['web development Indonesia', 'pembuatan website', 'landing page', 'web developer Jakarta', 'Forza Studio'],
  openGraph: {
    title: 'Forza Studio — Web Development Agency Indonesia',
    description: 'Kami bangun website yang menggerakkan bisnis Anda.',
    url: 'https://forzastudio.dev',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forza Studio',
    description: 'Web Development Agency Indonesia',
    images: ['/og-image.png'],
  },
};
```

---

## Scroll Behavior & Anchor Navigation

```typescript
// Smooth scroll configuration (already in globals.css):
// html { scroll-behavior: smooth; }

// For Navbar anchor clicks — add offset for sticky navbar:
// Use scroll-margin-top on each section element

// Each <section> should have:
// id="section-name"           ← anchor target
// className="scroll-mt-20"   ← 80px offset for navbar height
```

Example:
```tsx
<section id="work" className="scroll-mt-20 py-24">
  ...
</section>
```

---

*Sitemap v1.0 — Phase 1 single-page architecture. Phase 2 routing planned but not implemented in this build.*
