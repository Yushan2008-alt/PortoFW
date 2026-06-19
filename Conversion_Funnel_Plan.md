# Conversion Funnel Plan
**Project:** Forza Studio — Business Website Overhaul
**Version:** 1.0
**Build Target:** Strategic reference for Vibe Coding agent + future CRO work

---

## 1. Funnel Overview

The website is structured around a 5-stage funnel that maps directly to the section order on the page. Each stage has a specific job — moving the visitor one step closer to submitting the contact form.

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  AWARENESS   │ → │   INTEREST   │ → │    DESIRE    │ → │    ACTION    │ → │  FOLLOW-UP   │
│              │   │              │   │              │   │              │   │              │
│ Hero +       │   │ Testimonials │   │ Services +   │   │ Contact Form │   │ Auto-reply + │
│ Project      │   │ + Metrics    │   │ FAQ (objec-  │   │ + CTA every  │   │ WhatsApp     │
│ Highlights   │   │ Results      │   │ tion handle) │   │ page         │   │ click-chat   │
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
```

---

## 2. Stage-by-Stage Breakdown

### Stage 1 — Awareness

**Goal:** Capture attention immediately, communicate core value proposition within 3 seconds.

**Sections involved:**
- Hero (H1 + subtext + CTA)
- MetricsTicker (proof banner)
- Work (project thumbnails — visual proof of capability)

**What the visitor sees:**
```
1. Bold headline: "Kami Bangun Website Yang Menggerakkan Bisnis."
2. Immediate scroll-trigger: ticker showing "15+ Projects · 10+ Clients..."
3. Project grid with visual thumbnails + metric badges
```

**Conversion mechanism:** Visual + numeric credibility signals reduce
the "is this a real, capable team?" doubt within the first scroll.

**Component dependencies:** `Hero.tsx`, `MetricsTicker.tsx`, `Work.tsx`, `ProjectCard.tsx`, `MetricBadge.tsx`

**Tracking (Phase 2):**
```
- Scroll depth to #metrics (should be ~100% — it's right below hero)
- Scroll depth to #work (target: 70%+ of visitors)
- Hero CTA click rate (target: 12%+)
```

---

### Stage 2 — Interest

**Goal:** Build trust through third-party validation — visitors don't just see claims, they see other people vouching for results.

**Sections involved:**
- ClientLogoWall (who has trusted us)
- Testimonials (what they said + measurable results)

**What the visitor sees:**
```
1. Recognizable or credible client logos
2. Testimonial quotes describing specific outcomes
   (e.g. "3 inquiries within 2 weeks of launch")
3. Named, verifiable people (LinkedIn link increases trust)
```

**Conversion mechanism:** Social proof addresses the "will this actually
work for a business like mine?" question. The LinkedIn link in particular
signals these are real people, not fabricated reviews.

**Component dependencies:** `ClientLogoWall.tsx`, `Testimonials.tsx`, `TestimonialCarousel.tsx`, `TestimonialCard.tsx`

**Tracking (Phase 2):**
```
- Scroll depth to #testimonials (target: 70%+ per PRD KPI)
- Carousel interaction rate (% of visitors who drag/click arrows)
- LinkedIn click-through rate from testimonial cards
```

---

### Stage 3 — Desire

**Goal:** Make the visitor want to act NOW by clarifying exactly what they'd get and removing remaining objections.

**Sections involved:**
- Services (what exactly is offered)
- FAQ (overcoming objections: price, timeline, technical concerns)

**What the visitor sees:**
```
1. Clear service breakdown (Web Dev, UI/UX Design, Consulting)
2. Direct answers to the questions they're silently asking:
   "How much will this cost?" → FAQ-01
   "How long will this take?" → FAQ-02
   "Do I need to know anything technical?" → FAQ-03
```

**Conversion mechanism:** FAQ is positioned as an objection-handling tool,
not just an information section. Order matters — price and timeline
questions come first because they're the top 2 reasons visitors hesitate
to fill out a contact form.

**Component dependencies:** `Services.tsx`, `ServiceCard.tsx`, `FAQ.tsx`, `FAQAccordion.tsx`

**Tracking (Phase 2):**
```
- FAQ accordion open rate (which questions get opened most —
  signals what objections are most common)
- Service card "Pelajari lebih" click rate
```

---

### Stage 4 — Action

**Goal:** Make taking action as frictionless as possible, with multiple paths to conversion.

**Sections involved:**
- Contact (primary form)
- WhatsAppButton (floating, always-available alternate path)
- CTA buttons embedded throughout (Hero, Navbar)

**What the visitor sees:**
```
1. Multi-field form that feels consultative, not transactional
   (asking about interest + budget signals "we'll tailor this to you")
2. Always-visible WhatsApp button for visitors who prefer chat
   over forms (very common preference in Indonesian market)
3. Direct email as a third fallback option
```

**Conversion mechanism:** Different visitors prefer different contact
methods. Indonesian SME owners in particular often default to WhatsApp
over email/forms — offering all three removes friction for different
visitor preferences.

**Component dependencies:** `Contact.tsx`, `ContactFormEnhanced`, `WhatsAppButton.tsx`, `app/actions.ts`

**Why the form has 6 fields, not 3 (this is intentional, not friction):**
```
The interest + budget fields aren't just data collection — they make
the visitor feel like they're starting a real consultative process
rather than submitting into a void. This is a deliberate trade-off:
slightly more form friction in exchange for higher-quality, pre-
qualified leads (aligns with PRD KPI: "≥60% qualified lead rate").
```

**Tracking (Phase 2):**
```
- Form completion rate (started vs submitted)
- Form field drop-off point (which field causes abandonment)
- WhatsApp button click rate (target: 5+/month per PRD KPI)
- Form submissions/month (target: 8+/month per PRD KPI)
```

---

### Stage 5 — Follow-Up

**Goal:** Maintain momentum immediately after submission so leads don't go cold.

**Mechanisms:**
```
1. Instant auto-reply email confirming receipt + setting 24-hour
   response expectation (reduces anxiety, prevents "did this even work?"
   doubt that causes people to seek competitors)
2. WhatsApp pre-filled message template — when clicked, opens WhatsApp
   with "Halo Forza Studio, saya ingin konsultasi project." already
   typed, reducing the effort needed to start the conversation
3. (Phase 2) Newsletter signup — for visitors not ready to start a
   project now, but want to stay aware of Forza Studio for later
```

**Component dependencies:** `app/actions.ts` (auto-reply logic), `WhatsAppButton.tsx` (pre-filled message), `NewsletterForm.tsx` (Phase 2 backend)

**Tracking (Phase 2):**
```
- Auto-reply email open rate
- Time-to-first-response from Forza Studio team (internal metric,
  should stay under 24 hours per the promise made in the email)
- Newsletter signup rate (Phase 2, once backend is wired)
```

---

## 3. Cross-Cutting Conversion Elements

These appear at multiple funnel stages, not confined to one section.

### CTA Placement Map

```
Navbar:           "Hubungi Kami" — visible on every scroll position (sticky)
Hero:              "Mulai Project Anda" (primary) + "Lihat Karya Kami →" (secondary)
Project Cards:     "Explore →" (Phase 2: leads to case study, Phase 1: scrolls
                   to contact or opens live project URL)
Service Cards:     "Pelajari lebih →"
Contact Section:   "Kirim Pesan" (form submit)
Floating:          WhatsApp button — present from page load until #contact
                   is in viewport (then hides, since the form is already visible)
```

**Rationale for WhatsApp button hide-on-contact-visible behavior:** Avoids
redundant/competing CTAs when the visitor has already reached the primary
conversion point — reduces decision paralysis at the critical moment.

### Trust Signal Distribution

Trust signals are deliberately spread throughout the funnel rather than
concentrated in one "testimonials" section, so doubt is addressed
continuously as it arises:

```
Stage 1 (Awareness):   MetricBadge on every project card (early proof)
Stage 2 (Interest):    Full testimonials + client logos (concentrated proof)
Stage 3 (Desire):      FAQ answers reference real process/guarantees
                       (e.g. "garansi perbaikan bug selama 30 hari")
Stage 4 (Action):      24-hour response commitment stated directly on
                       the contact form sub-headline
```

---

## 4. Funnel Metrics Dashboard (Phase 2 Reference)

> Not implemented in Phase 1 — this defines what Phase 2 analytics
> instrumentation should track, once Google Analytics 4 / Vercel
> Analytics is wired in.

```
AWARENESS METRICS
  - Total unique visitors
  - Bounce rate (target: <55% per PRD)
  - Avg. session duration (target: >2:30 per PRD)
  - Hero CTA click rate (target: 12%+ per PRD)

INTEREST METRICS
  - Scroll depth to #testimonials (target: 70%+ per PRD)
  - Testimonial carousel interaction rate
  - Client logo section view rate

DESIRE METRICS
  - FAQ accordion open rate (per question — identifies top objections)
  - Service card click-through rate
  - Time spent in Services + FAQ sections combined

ACTION METRICS
  - Contact form submissions/month (target: 8+ per PRD)
  - Form completion rate (started → submitted)
  - Qualified lead rate (target: 60%+ per PRD — has company + budget filled)
  - WhatsApp click-to-chat rate (target: 5+/month per PRD)

FOLLOW-UP METRICS
  - Auto-reply email open rate
  - Internal: avg. time to first human response (should be <24hr)
  - Newsletter signup rate (Phase 2 only)
```

---

## 5. Funnel-to-Component Traceability Matrix

For the coding agent to confirm every funnel stage has a corresponding built component:

| Funnel Stage | Section(s) | Key Component(s) | Status |
|---|---|---|---|
| Awareness | Hero, MetricsTicker, Work | `Hero.tsx`, `MetricsTicker.tsx`, `ProjectCard.tsx`, `MetricBadge.tsx` | Phase 1 |
| Interest | ClientLogoWall, Testimonials | `ClientLogoWall.tsx`, `TestimonialCarousel.tsx`, `TestimonialCard.tsx` | Phase 1 |
| Desire | Services, FAQ | `ServiceCard.tsx`, `FAQAccordion.tsx` | Phase 1 |
| Action | Contact, WhatsApp, Navbar CTA | `ContactFormEnhanced`, `WhatsAppButton.tsx` | Phase 1 |
| Follow-up | Server action, Footer | `app/actions.ts` (auto-reply), `NewsletterForm.tsx` (UI only) | Phase 1 (partial — newsletter backend is Phase 2) |

---

## 6. Future CRO Experiments (Phase 2 — Not for Initial Build)

Documented here for future reference once real traffic data exists:

```
[ ] A/B test Hero primary CTA: "Mulai Project Anda" vs "Free Consultation"
    vs "Get a Quote" — measure click-through rate
[ ] Test FAQ order — does moving "technical" questions earlier change
    engagement for the corporate persona vs SME persona?
[ ] Test form field count — does removing "phone" field increase
    completion rate without hurting lead quality?
[ ] Test WhatsApp button placement/visibility logic — always-visible
    vs hide-on-contact (current Phase 1 default)
[ ] Test testimonial carousel autoplay vs manual-only (current
    Phase 1 default is manual-only)
```

---

*Conversion Funnel Plan v1.0 — Maps directly to section order in app/page.tsx. No new components required beyond what's specified in UI_Component_Specs_Addendum.md.*
