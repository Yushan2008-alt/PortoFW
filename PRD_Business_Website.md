# PRD — Forza Studio Business Website
**Version:** 4.0 (Business Overhaul — Vibe-Code Optimized)
**Replaces:** PRD_Portfolio_Website.md v3.0
**Build Target:** Claude Code / Vibe Coding Agent
**Phase:** 1 (MVP — Single-Page Multi-Section)
**Status:** Ready for Implementation

---

## 0. Delta Summary — What Changes vs v3.0

This document supersedes v3.0. Read this table before anything else.

| Area | v3.0 (Portfolio) | v4.0 (Business Website) | Action |
|---|---|---|---|
| Brand Positioning | "Tim 2 developer freelance" | "Forza Studio — Web Development Agency" | REWRITE |
| Hero Copy | Showcase tagline | Results-driven agency statement | REWRITE |
| Project Cards | Image + title + stack | Image + **MetricBadge row** + title + description + Explore CTA | EXTEND |
| Sections | Hero, About, Work, Services, TechStack, Contact | + **MetricsTicker, ClientLogoWall, Testimonials, FAQ** | ADD |
| Contact Form | 3 fields (name, email, message) | 6 fields + interest radio + budget select | EXTEND |
| Data Models | Project, TeamMember, Service, TechItem | + **Testimonial, ProjectMetric, FAQ, Client** | ADD |
| Components | Button, Card, BlobMorph, etc. | + **TestimonialCard, FAQAccordion, MetricBadge, ClientLogoWall, MetricsTicker** | ADD |
| Tech Stack | No change | No change | KEEP |
| Design Tokens | No change | No change | KEEP |
| Fonts | No change | No change | KEEP |

> ⚠️ **CRITICAL FOR AGENT:** Do NOT change `globals.css`, `tailwind.config.ts`, font setup, or any existing design tokens. All visual identity (colors, typography, shadows, animations) is preserved.

---

## 1. Business Context

### 1.1 Project Overview
**Studio:** Forza Studio — a web development agency based in Indonesia.
**Goal:** Transform the existing portfolio website into a lead-generating business website that positions Forza Studio as a credible web development agency for SMEs and corporate clients.
**Primary Outcome:** Inbound project inquiries via contact form (qualified leads only).
**Secondary Outcome:** Build brand credibility through social proof (testimonials, metrics, client logos).
**Domain:** `forzastudio.dev`

### 1.2 Business Goals & KPIs

| KPI | Target (Month 1–3) | Measurement |
|---|---|---|
| Contact form submissions | ≥ 8/month | Resend dashboard / email count |
| Qualified lead rate | ≥ 60% of submissions | Manual review (has company + budget info) |
| Bounce rate | < 55% | Google Analytics / Vercel Analytics |
| Avg. session duration | > 2 min 30 sec | GA4 |
| CTA click rate (hero) | ≥ 12% | Vercel Analytics |
| Testimonial section scroll depth | ≥ 70% users reach it | GA4 scroll events |
| WhatsApp click-to-chat | ≥ 5 clicks/month | UTM tracking |

### 1.3 Target Audience

**Primary Persona — SME Owner "Budi"**
- Age: 30–50
- Business type: Small-to-medium Indonesian business (retail, F&B, service, education)
- Pain point: Has a business but no professional web presence, or has an outdated site
- Goal: Get a website that makes the business look credible and drives customers
- Decision factor: Portfolio quality, testimonials, clear pricing signals, easy to contact
- Language: Indonesian (Bahasa) for body copy; English OK for section headers/labels

**Secondary Persona — Corporate Project Manager "Sari"**
- Age: 28–45
- Business type: Mid-to-large Indonesian company seeking web development vendor
- Pain point: Needs a reliable vendor with proven results and professional communication
- Goal: Find a team that can deliver on time, within budget, and communicate clearly
- Decision factor: Case studies with metrics, testimonials from similar companies, team credentials

### 1.4 Brand Repositioning

| Dimension | Before (Portfolio) | After (Business Website) |
|---|---|---|
| Brand voice | Personal, casual-professional | Professional, results-oriented, confident |
| Self-description | "Tim 2 developer freelance" | "Web Development Agency" |
| Value proposition | "We build cool products" | "We build websites that grow your business" |
| Proof | Project screenshots | Project metrics + client testimonials |
| CTA | "Get In Touch" | "Start Your Project" / "Free Consultation" |
| Language | Mix of Indonesian/English | Indonesian body copy, English for labels/CTAs |

---

## 2. Tech Stack (Locked — No Changes)

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
Package mgr:  pnpm
```

**Do NOT add:** Redux, Zustand, CSS-in-JS, Sass, GSAP, jQuery, CMS, or testing libraries.
**New packages to install:**
```bash
# No new packages needed — all new components use existing deps
# Framer Motion (already installed) handles carousel + accordion
# Lucide React (already installed) handles all icons
```

---

## 3. Design Tokens (Locked — No Changes)

All tokens remain identical to v3.0. Copy them from `app/globals.css` and `tailwind.config.ts` exactly as-is.

**Quick reference for new components:**
```
Primary bg:      var(--bg-primary)      #F4F3EF  ← warm cream
Card bg:         var(--bg-card)         #F9F8F5
Dark bg:         var(--bg-dark)         #0F0E0D
Accent:          var(--blewah)          #E8976A  ← warm orange-coral
Gradient:        var(--gradient-gemini) blue→purple→pink→teal
Text primary:    var(--text-primary)    #1A1918
Text secondary:  var(--text-secondary)  #6B6460
Display font:    var(--font-syne)
Body font:       var(--font-jakarta)
```

---

## 4. Updated File Structure

```
app/
├── layout.tsx              ← KEEP as-is
├── page.tsx                ← UPDATE (add new sections)
├── globals.css             ← KEEP as-is (no token changes)
└── actions.ts              ← UPDATE (enhanced form fields)

components/
├── layout/
│   ├── Navbar.tsx          ← MINOR UPDATE (new nav items)
│   └── Footer.tsx          ← UPDATE (newsletter form)
├── sections/
│   ├── Hero.tsx            ← UPDATE (new copy + MetricsTicker)
│   ├── MetricsTicker.tsx   ← NEW
│   ├── About.tsx           ← KEEP (minor copy update)
│   ├── Work.tsx            ← UPDATE (ProjectCards now show MetricBadge)
│   ├── Services.tsx        ← UPDATE (ServiceCards link to detail anchors)
│   ├── ClientLogoWall.tsx  ← NEW
│   ├── Testimonials.tsx    ← NEW
│   ├── FAQ.tsx             ← NEW
│   ├── TechStack.tsx       ← KEEP as-is
│   └── Contact.tsx         ← UPDATE (enhanced form)
├── ui/
│   ├── SmartImage.tsx      ← KEEP as-is
│   ├── Button.tsx          ← KEEP as-is
│   ├── Badge.tsx           ← KEEP as-is
│   ├── ProjectCard.tsx     ← UPDATE (add MetricBadge row)
│   ├── BlobMorph.tsx       ← KEEP as-is
│   ├── FloatingOrb.tsx     ← KEEP as-is
│   ├── ScrollReveal.tsx    ← KEEP as-is
│   ├── MetricBadge.tsx     ← NEW
│   ├── TestimonialCard.tsx ← NEW
│   ├── TestimonialCarousel.tsx ← NEW
│   ├── FAQAccordion.tsx    ← NEW
│   ├── ClientLogoWall.tsx  ← NEW (or in sections/)
│   └── WhatsAppButton.tsx  ← NEW (floating)

data/
├── projects.ts             ← EXTEND (add metrics[], testimonialId, results[])
├── team.ts                 ← KEEP as-is
├── services.ts             ← KEEP as-is
├── techstack.ts            ← KEEP as-is
├── site.ts                 ← UPDATE (add whatsapp, updated tagline)
├── testimonials.ts         ← NEW
├── faqs.ts                 ← NEW
└── clients.ts              ← NEW
```

---

## 5. Updated Section Order in `app/page.tsx`

The new page composition order (top to bottom):

```tsx
<Navbar />
<Hero />              {/* Updated copy + MetricsTicker embedded */}
<MetricsTicker />     {/* Scrolling metrics banner below hero */}
<About />             {/* Minor copy update */}
<Work />              {/* ProjectCards now include MetricBadge */}
<ClientLogoWall />    {/* NEW — client logo grid */}
<Services />          {/* ServiceCards with links */}
<Testimonials />      {/* NEW — testimonial carousel */}
<FAQ />               {/* NEW — FAQ accordion */}
<TechStack />         {/* Unchanged */}
<Contact />           {/* Enhanced form */}
<Footer />            {/* + newsletter */}
<WhatsAppButton />    {/* NEW — floating fixed button */}
```

---

## 6. Section Specifications

### 6.1 Navbar — MINOR UPDATE

**Changes from v3.0:**
- Add `#testimonials` and `#faq` to nav links
- Nav order: Work | Services | Testimonials | About | Contact
- "Hubungi Kami" primary CTA button (scroll to #contact)

```tsx
const navLinks = [
  { label: 'Work',         href: '#work' },
  { label: 'Services',     href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'About',        href: '#about' },
];
// CTA: "Hubungi Kami" → scrolls to #contact
```

### 6.2 Hero — REWRITE COPY

**Keep:** Layout, BlobMorph, FloatingOrb, animation sequence from v3.0.
**Change:** All copy content. New hero text:

```
Badge:    "Tersedia untuk Project Baru ✦"
H1:       "Kami Bangun Website"
          "<span class='gradient-text'>Yang Menggerakkan Bisnis.</span>"
Subtext:  "Dari landing page hingga web app, Forza Studio membangun
           produk digital yang mengkonversi pengunjung jadi pelanggan."
CTA 1:    "Mulai Project Anda" (primary, scroll to #contact)
CTA 2:    "Lihat Karya Kami →" (secondary, scroll to #work)
```

**After the button row** — embed `<MetricsTicker />` as a bottom anchor inside the hero section. It sits at the very bottom of the 100vh hero viewport.

### 6.3 MetricsTicker — NEW SECTION

**Reference:** eloqwnt.com — the auto-scrolling banner showing key results.
**Placement:** Immediately below hero (or embedded at hero bottom, touching the next section).
**Behavior:** Horizontal infinite-scroll marquee, auto-play, no pause on hover needed for Phase 1.
**Content:** Pull from `site.stats.tickerItems` array (see Data Models).

```
Visual:   dark background (var(--bg-dark)), 60px height
Items:    "/ {value}" format with a separator dot "·"
Motion:   CSS animation (not Framer Motion) — translate X from 0 to -50% on loop
          (duplicate the array once to create seamless loop)
Font:     font-body, text-sm, text-muted/70
```

Sample ticker items:
```
/ 15+ Projects Delivered  ·  / 10+ Happy Clients  ·  / 2 Years Experience
/ Fast Delivery  ·  / Clean Code  ·  / Result-Oriented
```

### 6.4 About — MINOR UPDATE

**Keep:** All layout, avatar display, stat counters, BlobMorph.
**Change:** One sentence in the paragraph copy to reflect agency positioning:

```
Old: "Tim 2 developer freelance yang membangun web app..."
New: "Forza Studio adalah web development agency yang fokus membangun
      produk digital berkualitas untuk bisnis Indonesia yang ingin
      tumbuh secara online."
```

Stats row (keep existing values from `site.stats`).

### 6.5 Work — UPDATE ProjectCard

**Keep:** Section layout, grid, eyebrow/H2 text, ScrollReveal.
**Change:** `<ProjectCard />` now renders a `MetricBadge` row below the project category label.

See `UI_Component_Specs_Addendum.md` for `<MetricBadge />` and updated `<ProjectCard />` specs.

Updated card layout (top to bottom):
1. Project thumbnail (SmartImage)
2. Category pill + year
3. **Metric badges row (NEW)** — max 3 badges, pulls from `project.metrics[]`
4. Project title
5. Short tagline (one line max)
6. "Explore →" CTA link

### 6.6 ClientLogoWall — NEW SECTION

**Placement:** Between Work and Services.
**Purpose:** Social proof — shows logos of client companies.
**Layout:** 2-row infinite scroll OR static centered grid (Phase 1: static grid).

```
Eyebrow:  "Klien Kami"
H2:       "Dipercaya oleh bisnis yang sedang berkembang."
Grid:     Responsive — 3 cols mobile, 5 cols desktop
Items:    Map over `clients` array (data/clients.ts)
Each:     <img src={client.logo} alt={client.name} /> in grayscale,
          full color on hover (filter: grayscale(1) → grayscale(0))
Fallback: If < 4 clients, use placeholder text badges instead of logos
```

### 6.7 Services — UPDATE

**Keep:** Dark section background, 3-column grid, ServiceCard layout.
**Change:** Each `<ServiceCard />` now has a "Pelajari lebih →" text link that smoothly scrolls to a dedicated anchor (#services-{id}) or links to a future `/services/{id}` route (use `href="#services-${service.id}"` for Phase 1).

### 6.8 Testimonials — NEW SECTION

**Reference:** eloqwnt.com testimonials layout (full quote prominent, photo circular, name/title/company below, LinkedIn icon).
**Behavior:** `<TestimonialCarousel />` — drag/swipe carousel (Framer Motion `drag="x"`).

```
Section bg:   var(--bg-secondary) — slightly darker cream
Eyebrow:      "Testimonials"
H2:           "Apa Kata Klien Kami."
Sub:          "Hasil nyata dari project nyata."
Carousel:     Horizontal, shows 1 card on mobile, 2 on tablet, 3 on desktop (partial)
Controls:     Prev/Next arrow buttons + dot indicators below
Auto-play:    No (users must drag/click — trust-critical content)
```

See `UI_Component_Specs_Addendum.md` for `<TestimonialCard />` and `<TestimonialCarousel />`.

### 6.9 FAQ — NEW SECTION

**Reference:** eloqwnt.com FAQ accordion.
**Layout:** Numbered accordion list, full-width, centered max-w-3xl.

```
Eyebrow:   "FAQ"
H2:        "Pertanyaan yang Sering Diajukan."
Items:     Map over `faqs` array (data/faqs.ts) — 6–10 questions
Each:      Number prefix (01, 02...) + question + expand/collapse chevron
Expanded:  Answer slides down with Framer Motion AnimatePresence
Behavior:  Only one open at a time (accordion mode)
```

See `UI_Component_Specs_Addendum.md` for `<FAQAccordion />`.

### 6.10 Contact — ENHANCED FORM

**Keep:** Section layout, background gradient mesh, badge, headline copy.
**Change:** Expand form fields from 3 to 6 + add interest checkboxes + budget select.

Updated headline:
```
Badge:    "Mulai Project Anda ✦"
H2:       "Punya Ide yang Ingin Diwujudkan?"
Sub:      "Ceritakan kebutuhan bisnismu. Tim kami akan merespons dalam 24 jam."
```

Form fields — see Data Models section for full `ContactFormFields` interface.

Below form: Two secondary options:
```
"Atau hubungi kami langsung:"
[WhatsApp icon + button] "Chat via WhatsApp" → wa.me/{site.whatsapp}
[Email icon] "hello@forzastudio.dev" → mailto link
```

### 6.11 Footer — UPDATE

**Keep:** 3-column layout, dark background, quick links, social icons.
**Add:** Newsletter form (Col 4 or below main grid on mobile).

```tsx
// Newsletter form — simple, no backend required in Phase 1
// Phase 1: just UI (show success toast after submit, no real send)
// Phase 2: wire to Resend Audience or Mailchimp
<input placeholder="Email kamu" />
<button>Subscribe</button>
```

Add to footer text: "Forza Studio — Web Development Agency · Indonesia"

### 6.12 WhatsAppButton — NEW (Floating Fixed)

**Placement:** Fixed bottom-right, `z-50`, always visible.
**Behavior:** Pulsing blewah circle with WhatsApp icon. On click → opens wa.me link.
**Hide on:** Contact section visible in viewport (use Intersection Observer).

```tsx
// Position: fixed bottom-6 right-6
// Size: w-14 h-14
// Color: bg-[#25D366] (WhatsApp brand green)
// Icon: MessageCircle from Lucide
// Animation: subtle scale pulse (CSS keyframe)
// Link: `https://wa.me/${site.whatsapp}?text=Halo Forza Studio, saya ingin konsultasi project.`
```

---

## 7. User Stories

### Must-Have (Phase 1 MVP)

```
US-001: As a business owner, I want to immediately see what results Forza Studio
        has delivered for other clients, so I can trust they will deliver for me.
        → MetricsTicker + MetricBadge on project cards

US-002: As a business owner, I want to read testimonials from real clients,
        so I know other businesses have succeeded with Forza Studio.
        → TestimonialCarousel section

US-003: As a business owner, I want to quickly understand what services
        Forza Studio offers, so I know if they can help my business.
        → Services section with clear service titles

US-004: As a business owner, I want to contact Forza Studio easily via form
        or WhatsApp, so I can start a conversation without friction.
        → Enhanced ContactForm + WhatsAppButton

US-005: As a business owner, I want to see FAQ answers without having to email,
        so I can overcome my objections and decide faster.
        → FAQAccordion section

US-006: As a business owner, I want to see which companies have worked with
        Forza Studio, so I can gauge their experience level.
        → ClientLogoWall section
```

### Nice-to-Have (Phase 2)

```
US-007: As a returning visitor, I want to read blog posts about web development,
        so I know Forza Studio is knowledgeable.

US-008: As a project manager, I want to see detailed project case studies
        with full metrics, process, and results.

US-009: As a potential client, I want to subscribe to updates from Forza Studio.
```

---

## 8. Scope — MVP vs Post-Launch

### Phase 1 (MVP — This PRD)

- [x] Repositioned hero copy
- [x] MetricsTicker (scrolling banner)
- [x] Updated ProjectCard with MetricBadge
- [x] ClientLogoWall (static grid)
- [x] TestimonialCarousel (Framer Motion drag)
- [x] FAQAccordion (6–8 questions)
- [x] Enhanced contact form (6 fields + interest + budget)
- [x] WhatsApp floating button
- [x] Updated footer + newsletter UI
- [x] Updated Navbar

### Phase 2 (Post-Launch — Separate PRD)

- [ ] `/about` separate page
- [ ] `/team` page
- [ ] `/services` overview + `/services/:id` detail pages
- [ ] `/projects` grid + `/projects/:id` case study pages
- [ ] `/testimonials` full page
- [ ] `/blog` list + post pages
- [ ] `/contact` standalone page
- [ ] Newsletter backend (Resend Audience)
- [ ] Google Analytics 4 integration
- [ ] WhatsApp click tracking

---

## 9. Enhanced Contact Form — Server Action

**File:** `app/actions.ts` — UPDATE existing `sendContactMessage`.

```typescript
'use server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMessage(formData: FormData) {
  const name     = formData.get('name')?.toString() ?? '';
  const company  = formData.get('company')?.toString() ?? '';
  const email    = formData.get('email')?.toString() ?? '';
  const phone    = formData.get('phone')?.toString() ?? '';
  const interest = formData.get('interest')?.toString() ?? '';
  const budget   = formData.get('budget')?.toString() ?? '';
  const message  = formData.get('message')?.toString() ?? '';

  // Required fields
  if (!name || !email || !message) {
    return { ok: false, error: 'Nama, email, dan pesan wajib diisi.' };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, error: 'Format email tidak valid.' };
  }

  try {
    await resend.emails.send({
      from: 'Forza Studio <noreply@forzastudio.dev>',
      to: process.env.CONTACT_EMAIL ?? 'hello@forzastudio.dev',
      replyTo: email,
      subject: `[Forza Studio] Inquiry dari ${name}${company ? ` — ${company}` : ''}`,
      text: `
INQUIRY BARU — FORZA STUDIO
=============================
Nama:       ${name}
Perusahaan: ${company || '-'}
Email:      ${email}
Phone:      ${phone || '-'}
Interest:   ${interest || '-'}
Budget:     ${budget || '-'}

Pesan:
${message}
      `.trim(),
    });

    // Auto-reply to client
    await resend.emails.send({
      from: 'Forza Studio <noreply@forzastudio.dev>',
      to: email,
      subject: 'Terima kasih telah menghubungi Forza Studio!',
      text: `Halo ${name},\n\nTerima kasih sudah menghubungi Forza Studio!\n\nKami telah menerima inquiry Anda dan akan merespons dalam waktu 24 jam.\n\nSalam,\nForza Studio Team\nhello@forzastudio.dev`,
    });

    return { ok: true };
  } catch {
    return { ok: false, error: 'Gagal mengirim pesan. Coba lagi nanti.' };
  }
}
```

---

## 10. Updated Build Order for Coding Agent

Build in this exact sequence to avoid import errors:

1. Update `data/site.ts` — add `whatsapp`, update tagline, add `tickerItems[]`
2. Create `data/testimonials.ts` — Testimonial interface + placeholder array
3. Create `data/faqs.ts` — FAQ interface + 6–8 questions
4. Create `data/clients.ts` — Client interface + placeholder array
5. Update `data/projects.ts` — add `metrics: ProjectMetric[]`, `results: string[]`, `testimonialId?`
6. Create `components/ui/MetricBadge.tsx`
7. Create `components/ui/TestimonialCard.tsx`
8. Create `components/ui/TestimonialCarousel.tsx`
9. Create `components/ui/FAQAccordion.tsx`
10. Create `components/ui/WhatsAppButton.tsx`
11. Create `components/sections/MetricsTicker.tsx`
12. Create `components/sections/ClientLogoWall.tsx`
13. Create `components/sections/Testimonials.tsx`
14. Create `components/sections/FAQ.tsx`
15. Update `components/ui/ProjectCard.tsx` — add MetricBadge row
16. Update `components/sections/Hero.tsx` — new copy
17. Update `components/sections/Contact.tsx` — enhanced form
18. Update `components/layout/Navbar.tsx` — new links
19. Update `components/layout/Footer.tsx` — newsletter UI
20. Update `app/actions.ts` — new form fields + auto-reply
21. Update `app/page.tsx` — add all new sections in correct order
22. Test responsive: 390px, 768px, 1280px

---

## 11. Success Metrics (How to Know It's Done)

- [ ] All sections render without console errors
- [ ] MetricsTicker scrolls infinitely without jump/glitch
- [ ] TestimonialCarousel drags on mobile, arrows work on desktop
- [ ] FAQAccordion opens/closes with smooth animation, only 1 open at a time
- [ ] Contact form submits, shows success state, sends email via Resend
- [ ] Auto-reply email sent to form submitter
- [ ] WhatsApp button opens correct wa.me link in new tab
- [ ] ProjectCards show MetricBadge row with placeholder data
- [ ] ClientLogoWall renders with grayscale → color hover effect
- [ ] Page is fully responsive at 390px, 768px, 1280px
- [ ] No layout shifts on scroll
- [ ] Lighthouse Performance ≥ 85 on mobile

---

*PRD v4.0 — Forza Studio Business Website Overhaul. All tech decisions locked. Maintain existing design tokens.*
