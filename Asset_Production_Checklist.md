# Asset Production Checklist
**Project:** Forza Studio — Business Website Overhaul
**Version:** 1.0
**Owner:** Samenduts / Forza Studio Team (not the coding agent)

> This checklist is for the human team, not the Vibe Coding agent. The agent will use placeholder assets/data so the build doesn't break — these items are what needs to be gathered/created before the site goes live with real content.

---

## How to Use This Checklist

Each item has:
- **Status** — what's already done vs needed
- **Spec** — exact format/dimensions required
- **Priority** — P0 (blocks launch) / P1 (needed soon) / P2 (Phase 2 OK)
- **Where it's used** — which component/data file consumes it

---

## 1. Project Screenshots/Thumbnails

**Priority:** P0 — already partially done, verify completeness

| Project | Status | Needed |
|---|---|---|
| RuangTeduh | ✅ Exists | Verify image is current screenshot, not outdated |
| The Conversion Climb | ✅ Exists | Verify image is current screenshot |
| Entrepreneurship Web (pkwu) | ✅ Exists | Optional — low priority, not featured |
| 4th project (if adding one) | ❌ Needed | Only if Samenduts wants to add a new featured project |

**Spec:**
```
Format:      PNG or WebP
Dimensions:  1200×800px (3:2 ratio) minimum
File size:   < 300KB (compress with Squoosh or similar)
Content:     Full-bleed screenshot of the live project homepage/key screen
             — no browser chrome/mockup frames (keep style consistent
             with current site, which appears to use clean cropped screenshots)
Location:    public/images/projects/{project-id}.png
```

**Per-project metrics to confirm/source (used in MetricBadge):**
```
RuangTeduh:
  [ ] Confirm "12.4k+ Users" — real number or remove/adjust
  [ ] Confirm "50k+ AI Sessions" — real number or remove/adjust
  [ ] Confirm "4.9/5 Rating" — real number, source (App store? Survey?)

The Conversion Climb:
  [ ] Confirm "+47% Conversion Rate" — real number or remove/adjust
  [ ] Confirm "7 days" delivery time — verify accuracy
  [ ] Confirm "99.9% Uptime" — verify or remove if not tracked

⚠️ IMPORTANT: If exact metrics aren't available/verifiable, replace with
   honest qualitative badges instead, e.g.:
   - "Launched 2025" instead of a fake percentage
   - "Custom AI Integration" instead of an unverified user count
   Do NOT publish fabricated statistics — this damages credibility if
   a prospective client asks for verification.
```

---

## 2. Testimonials

**Priority:** P0 — currently 100% placeholder, blocks credible launch

```
Target:      5–10 testimonials (3 minimum for carousel to feel substantial)
Currently:   0 real testimonials collected
```

**Per-testimonial collection checklist:**

| Field | Required | Notes |
|---|---|---|
| Client name | ✅ Yes | Full name, with their permission to publish |
| Photo | ✅ Yes | 200×200px min, square crop, professional/casual headshot |
| Job title | ✅ Yes | e.g. "Founder", "Marketing Manager" |
| Company name | ✅ Yes | Real company name (with permission) |
| Quote | ✅ Yes | 2–5 sentences — see `Content_Strategy.md` Section 2.10 for format |
| LinkedIn URL | ⭐ Recommended | Adds major credibility — request if available |
| Related project | Optional | Link to which project this testimonial is about |

**How to collect (suggested process):**
```
1. Reach out to past 3 clients (RuangTeduh, Conversion Climb client, +1 more)
2. Ask a short question prompt instead of "write me a testimonial":
   - "Apa masalah yang Anda hadapi sebelum bekerja dengan Forza Studio?"
   - "Bagaimana proses kerja sama dengan kami?"
   - "Apa hasil yang Anda rasakan setelah website selesai?"
3. Compile their answers into a 2-5 sentence quote (with their approval)
4. Request a headshot photo + permission to use name/company/LinkedIn
5. If a client prefers anonymity, use "Founder, [Industry] Company" instead
   of real name — better than a fake name
```

**Photo spec:**
```
Format:      JPG or WebP
Dimensions:  200×200px minimum (will display as circular crop)
File size:   < 100KB
Location:    public/images/testimonials/{testimonial-id}.jpg
```

---

## 3. Client Logos

**Priority:** P1 — needed before launch but can soft-launch with 2-3 + placeholders

```
Target:      Minimum 4–6 logos
Currently:   2 confirmed (RuangTeduh, The Conversion Climb) — need logo files
```

**Checklist:**
```
[ ] RuangTeduh — request official logo (SVG preferred) + permission to display
[ ] The Conversion Climb — request official logo + permission to display
[ ] 2-4 additional past clients — request logos + permission
[ ] If fewer than 4 real logos available, consider:
    Option A: Launch ClientLogoWall with available logos only (looks fine with 3-4)
    Option B: Delay ClientLogoWall section until more logos collected
    Option C: Use "industry badges" instead of logos (e.g. "Health Tech",
              "E-Commerce") as a temporary lower-commitment alternative
```

**Spec:**
```
Format:      SVG (preferred, scales cleanly) or PNG with transparent bg
Dimensions:  If PNG: 400px wide minimum, transparent background
Color:       Original color version (CSS grayscale filter handles
             the grayscale display automatically — don't pre-convert)
Location:    public/images/clients/{client-id}.svg
Permission:  ⚠️ Always get explicit permission before displaying any
             client's logo publicly — some companies have brand
             guidelines restricting third-party logo usage
```

---

## 4. Team Photos

**Priority:** P1 — existing photos may need refresh for agency positioning

```
Status:      2 existing photos (Bilal + partner) — verify these still
             match the more "professional agency" brand tone
```

**Checklist:**
```
[ ] Review existing team photos — do they look professional/agency-appropriate?
[ ] If casual/portfolio-era photos, consider reshooting with:
    - Consistent background/lighting between both team members
    - Professional but approachable expression (not overly corporate)
[ ] Confirm photo file format and crop match existing component requirements
```

**Spec:**
```
Format:      PNG or JPG
Dimensions:  400×400px minimum, square crop
Style:       Consistent lighting/background across all team members
Location:    public/images/team/{name}.png
```

---

## 5. FAQ Content

**Priority:** P0 — copy already drafted, needs accuracy review

```
Status:      ✅ 8 FAQs fully drafted in Content_Strategy.md + data/faqs.ts
Action:      Human review only — verify pricing ranges and timelines
             are accurate to actual Forza Studio capacity/rates
```

**Review checklist:**
```
[ ] Confirm pricing tiers in FAQ-01 match real rates
    (currently: Rp 3-8jt landing page / higher for web app)
[ ] Confirm timeline estimates in FAQ-02 are realistic given
    current 2-person team capacity (currently: 7-14 days landing
    page / 3-6 weeks web app)
[ ] Confirm tech stack mentioned in FAQ-07 matches actual capabilities
    (Next.js, Tailwind, Supabase, Vercel — already accurate per
    existing tech stack)
[ ] Confirm 30-day bug-fix guarantee in FAQ-06 is something the
    team can realistically commit to
```

---

## 6. OG Image (Social Share Preview)

**Priority:** P0 — blocks proper social sharing, needed for launch

```
Status:      ❌ Needs creation — likely existing og-image.png is
             portfolio-branded, needs business-website update
```

**Spec:**
```
Format:      PNG or JPG
Dimensions:  1200×630px (standard OG image ratio)
Content:     Forza Studio logo/wordmark + tagline
             "Web Development Agency untuk Bisnis Indonesia"
             Background: use existing brand colors (cream #F4F3EF
             bg with Blewah #E8976A accent, or dark bg with gradient)
File size:   < 1MB
Location:    public/og-image.png
Tool:        Can be created in Figma, Canva, or directly with the
             existing design tokens for brand consistency
```

---

## 7. Blog Posts (Optional — Phase 2)

**Priority:** P2 — not needed for Phase 1 MVP launch

```
Status:      Not started — correctly deferred per PRD Phase 2 scope
Note:        No action needed until Phase 2 planning begins.
             When ready, target 3-5 launch posts covering:
             - Web development tips for SME owners
             - Case study deep-dives (expanding on project metrics)
             - Behind-the-scenes process content
```

---

## 8. Master Priority Summary

### P0 — Blocks Launch (Must complete before going live)
```
[ ] Verify/correct project metrics (RuangTeduh + Conversion Climb)
[ ] Collect minimum 3 real testimonials (name, photo, quote)
[ ] Review FAQ pricing/timeline accuracy
[ ] Create new OG image with agency branding
```

### P1 — Needed Soon (Can soft-launch without, fix within 1-2 weeks)
```
[ ] Collect 4-6 client logos with permission
[ ] Review/refresh team photos if needed
[ ] Expand testimonials from 3 to 5-10
```

### P2 — Phase 2 (Not needed for MVP)
```
[ ] Blog post content
[ ] Additional case study detail content (results[] field — already
    structured in data model, just needs more detail when /projects/[id]
    pages are built)
```

---

## 9. Asset Folder Structure Reference

```
public/
├── images/
│   ├── projects/
│   │   ├── ruangteduh.png          [P0 — verify current]
│   │   ├── conversion-climb.png     [P0 — verify current]
│   │   └── pkwu.png                 [P2 — low priority]
│   ├── team/
│   │   ├── bilal.png                [P1 — review]
│   │   └── partner.png              [P1 — review]
│   ├── testimonials/                [NEW FOLDER]
│   │   ├── testimonial-01.jpg       [P0 — collect]
│   │   ├── testimonial-02.jpg       [P0 — collect]
│   │   └── testimonial-03.jpg       [P0 — collect]
│   └── clients/                     [NEW FOLDER]
│       ├── ruangteduh.svg           [P1 — request from client]
│       ├── conversion-climb.svg     [P1 — request from client]
│       ├── client-3.svg             [P1 — collect]
│       └── client-4.svg             [P1 — collect]
└── og-image.png                     [P0 — create new]
```

---

*Asset Production Checklist v1.0 — Build-blocking items marked P0. Coding agent uses placeholders for all unchecked items; this checklist tracks human follow-up work.*
