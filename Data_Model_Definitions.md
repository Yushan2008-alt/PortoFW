# Data Model Definitions
**Project:** Forza Studio — Business Website Overhaul
**Version:** 1.0
**Build Target:** Vibe Coding Agent

> **IMPORTANT:** Copy these TypeScript files VERBATIM into the `data/` directory. Do not modify field names or types — they are referenced by component specs.

---

## 1. New: `data/testimonials.ts`

```typescript
export interface Testimonial {
  id: string;
  name: string;
  title: string;               // Job title, e.g. "CEO", "Founder"
  company: string;             // Company name
  photo: string;               // Path to photo: /images/testimonials/{id}.jpg
  quote: string;               // Full testimonial quote (2–5 sentences)
  linkedInUrl?: string;        // LinkedIn profile URL (optional but recommended)
  projectId?: string;          // Links to a project in data/projects.ts (optional)
  featured: boolean;           // Show in main carousel if true
  order: number;               // Display order in carousel
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-01',
    name: 'Placeholder Name',             // TODO: Replace with real client
    title: 'Founder',
    company: 'Placeholder Company',
    photo: '/images/testimonials/testimonial-01.jpg',
    quote:
      'Forza Studio membangun website bisnis kami dari nol. Hasilnya melebihi ekspektasi — desainnya profesional dan loading-nya sangat cepat. Dalam 2 minggu setelah launch, kami sudah mendapat 3 inquiries dari website.',
    linkedInUrl: '',
    projectId: 'ruangteduh',
    featured: true,
    order: 1,
  },
  {
    id: 'testimonial-02',
    name: 'Placeholder Name 2',
    title: 'Marketing Manager',
    company: 'Placeholder Company 2',
    photo: '/images/testimonials/testimonial-02.jpg',
    quote:
      'Tim Forza Studio sangat responsif dan profesional. Mereka memahami kebutuhan bisnis kami dengan baik dan menghasilkan website yang benar-benar merepresentasikan brand kami.',
    linkedInUrl: '',
    projectId: undefined,
    featured: true,
    order: 2,
  },
  {
    id: 'testimonial-03',
    name: 'Placeholder Name 3',
    title: 'CEO',
    company: 'Placeholder Company 3',
    photo: '/images/testimonials/testimonial-03.jpg',
    quote:
      'Landing page yang dibuat Forza Studio berhasil meningkatkan conversion rate kami secara signifikan. Mereka tidak hanya membuat website yang cantik, tapi juga yang bekerja untuk bisnis.',
    linkedInUrl: '',
    projectId: 'conversion-climb',
    featured: true,
    order: 3,
  },
];

// Utility: Get featured testimonials only
export const featuredTestimonials = testimonials
  .filter((t) => t.featured)
  .sort((a, b) => a.order - b.order);
```

---

## 2. New: `data/faqs.ts`

```typescript
export type FAQCategory = 'pricing' | 'process' | 'technical' | 'general';

export interface FAQ {
  id: string;
  question: string;
  answer: string;              // Can contain plain text; no HTML
  category: FAQCategory;
  order: number;               // Display order on page
}

export const faqs: FAQ[] = [
  {
    id: 'faq-01',
    question: 'Berapa biaya untuk membuat website di Forza Studio?',
    answer:
      'Biaya pembuatan website sangat bergantung pada kebutuhan dan kompleksitas project Anda. Landing page sederhana biasanya mulai dari Rp 3–8 juta, sementara web app dengan fitur khusus bisa lebih. Kami selalu menyesuaikan solusi dengan budget klien — ceritakan kebutuhan Anda dan kami siapkan penawaran yang tepat.',
    category: 'pricing',
    order: 1,
  },
  {
    id: 'faq-02',
    question: 'Berapa lama proses pembuatan website?',
    answer:
      'Durasi project tergantung pada kompleksitas dan kelengkapan materi yang Anda siapkan. Landing page biasanya selesai dalam 7–14 hari kerja. Web app dengan fitur lengkap membutuhkan 3–6 minggu. Kami selalu memberikan timeline yang jelas di awal project dan berkomitmen untuk menyelesaikannya tepat waktu.',
    category: 'process',
    order: 2,
  },
  {
    id: 'faq-03',
    question: 'Apa yang saya butuhkan untuk memulai project?',
    answer:
      'Untuk memulai, kami hanya perlu memahami tujuan bisnis Anda, target audiens, dan konten yang ingin ditampilkan (teks, foto, logo). Kami akan memandu Anda selangkah demi selangkah — Anda tidak perlu paham teknis untuk bekerja sama dengan kami.',
    category: 'process',
    order: 3,
  },
  {
    id: 'faq-04',
    question: 'Apakah saya bisa mengupdate konten website sendiri setelah jadi?',
    answer:
      'Ya, tentu. Kami membangun sistem yang mudah dikelola, dan kami selalu memberikan panduan penggunaan setelah handover. Untuk update konten sederhana seperti teks dan gambar, Anda bisa melakukannya sendiri. Untuk perubahan yang lebih besar, kami juga siap membantu dengan biaya yang terjangkau.',
    category: 'technical',
    order: 4,
  },
  {
    id: 'faq-05',
    question: 'Apakah Forza Studio berpengalaman dengan jenis bisnis saya?',
    answer:
      'Kami telah membangun website untuk berbagai jenis bisnis — mulai dari startup tech, UMKM, platform edukasi, hingga bisnis e-commerce. Sebelum memulai, kami selalu melakukan riset mendalam tentang industri dan kompetitor Anda untuk memastikan hasilnya relevan dan kompetitif.',
    category: 'general',
    order: 5,
  },
  {
    id: 'faq-06',
    question: 'Apa yang terjadi setelah website selesai?',
    answer:
      'Setelah website live, kami memberikan garansi perbaikan bug selama 30 hari tanpa biaya tambahan. Kami juga memberikan training singkat tentang cara mengelola website. Untuk kebutuhan maintenance jangka panjang, kami menawarkan paket dukungan bulanan.',
    category: 'process',
    order: 6,
  },
  {
    id: 'faq-07',
    question: 'Teknologi apa yang Forza Studio gunakan?',
    answer:
      'Kami menggunakan teknologi modern dan terpercaya: Next.js untuk web app (cepat, SEO-friendly), Tailwind CSS untuk desain yang konsisten, Supabase untuk database, dan hosting di Vercel yang menjamin uptime tinggi. Semua teknologi yang kami pilih fokus pada performa, keamanan, dan kemudahan maintenance jangka panjang.',
    category: 'technical',
    order: 7,
  },
  {
    id: 'faq-08',
    question: 'Apakah website yang dibuat sudah mobile-friendly dan SEO-ready?',
    answer:
      'Semua website yang kami bangun sudah responsive di semua ukuran layar — dari smartphone hingga desktop. Kami juga memastikan website Anda memenuhi standar SEO dasar: meta tags, sitemap, struktur heading yang benar, dan loading speed yang optimal.',
    category: 'technical',
    order: 8,
  },
];

// Utility: Get faqs sorted by order
export const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);
```

---

## 3. New: `data/clients.ts`

```typescript
export interface Client {
  id: string;
  name: string;
  logo: string;                // Path: /images/clients/{id}.svg or .png
  industry: string;            // e.g. "Health Tech", "E-Commerce", "Education"
  logoAlt: string;             // Alt text for accessibility
  websiteUrl?: string;         // Client's website (optional)
}

export const clients: Client[] = [
  {
    id: 'ruangteduh',
    name: 'RuangTeduh',
    logo: '/images/clients/ruangteduh.svg',
    industry: 'Health Tech',
    logoAlt: 'RuangTeduh logo',
    websiteUrl: 'https://ide-bussines.vercel.app',
  },
  {
    id: 'conversion-climb',
    name: 'The Conversion Climb',
    logo: '/images/clients/conversion-climb.svg',
    industry: 'Digital Marketing',
    logoAlt: 'The Conversion Climb logo',
    websiteUrl: 'https://landing-page-pi-ochre-21.vercel.app',
  },
  {
    id: 'placeholder-client-3',
    name: 'Placeholder Client',       // TODO: Replace with real client
    logo: '/images/clients/placeholder-3.svg',
    industry: 'Placeholder',
    logoAlt: 'Client logo',
  },
  {
    id: 'placeholder-client-4',
    name: 'Placeholder Client 2',     // TODO: Replace with real client
    logo: '/images/clients/placeholder-4.svg',
    industry: 'Placeholder',
    logoAlt: 'Client logo',
  },
];
```

---

## 4. Updated: `data/projects.ts` — Extended

```typescript
// NEW: ProjectMetric interface
export interface ProjectMetric {
  label: string;               // e.g. "Users", "Conversion Lift", "Load Time"
  value: string;               // e.g. "12.4k+", "+30%", "0.8s"
  icon?: string;               // Optional: Lucide icon name (e.g. "Users", "TrendingUp")
}

// EXTENDED: Project interface (adds 3 new optional fields)
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
  // --- NEW FIELDS ---
  metrics?: ProjectMetric[];   // Up to 3 metric badges displayed on card
  results?: string[];          // Bullet list of results for case study (Phase 2)
  testimonialId?: string;      // Links to testimonials.ts by id
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
    // NEW:
    metrics: [
      { label: 'Users', value: '12.4k+', icon: 'Users' },
      { label: 'AI Sessions', value: '50k+', icon: 'MessageSquare' },
      { label: 'Rating', value: '4.9/5', icon: 'Star' },
    ],
    results: [
      'Melayani 12.400+ pengguna aktif dalam 3 bulan pertama',
      'AI companion tersedia 24/7 tanpa downtime',
      'Fitur crisis SOS berhasil menghubungkan pengguna dengan profesional',
    ],
    testimonialId: 'testimonial-01',
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
    // NEW:
    metrics: [
      { label: 'Conversion Rate', value: '+47%', icon: 'TrendingUp' },
      { label: 'Delivery', value: '7 days', icon: 'Clock' },
      { label: 'Uptime', value: '99.9%', icon: 'Shield' },
    ],
    results: [
      'Conversion rate meningkat 47% dibanding halaman sebelumnya',
      'Selesai dalam 7 hari kerja',
      'Struktur copy menggunakan Awareness Ladder framework',
    ],
    testimonialId: 'testimonial-03',
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
    // NEW:
    metrics: [
      { label: 'Pages', value: '5', icon: 'Layout' },
      { label: 'Tech', value: 'Vanilla JS', icon: 'Code2' },
      { label: 'Year', value: '2024', icon: 'Calendar' },
    ],
    results: [
      'Project pertama Forza Studio yang fully deployed',
      'Membangun fondasi pemahaman web development',
    ],
  },
];

// Utility functions
export const featuredProjects = projects.filter((p) => p.featured);
export const allProjects = [...projects].sort((a, b) => b.year - a.year);
```

---

## 5. Updated: `data/site.ts` — Extended

```typescript
export interface TickerItem {
  value: string;               // e.g. "15+ Projects Delivered"
}

export const site = {
  name: 'Forza Studio',
  tagline: 'Web Development Agency untuk Bisnis Indonesia.',     // UPDATED
  description:
    'Forza Studio adalah web development agency yang membangun website profesional untuk UMKM dan korporat Indonesia.',
  url: 'https://forzastudio.dev',
  email: 'hello@forzastudio.dev',
  whatsapp: '+62XXXXXXXXXX',   // TODO: User to fill
  socials: {
    github: 'https://github.com/BilalMayor',
    instagram: '',             // TODO: User to fill
    linkedin: '',              // TODO: User to fill
  },
  stats: {
    projects: '15+',
    clients: '10+',
    years: '2',
  },
  // NEW: Metrics ticker items
  tickerItems: [
    { value: '15+ Projects Delivered' },
    { value: '10+ Happy Clients' },
    { value: '2 Years Experience' },
    { value: 'Fast Turnaround' },
    { value: 'Clean Code' },
    { value: 'Results-Oriented' },
    { value: 'Mobile-First Design' },
    { value: '24-Hour Response Time' },
  ] as TickerItem[],
};
```

---

## 6. New: `ContactFormFields` Interface

> **Note:** This is a TypeScript interface used in `components/sections/Contact.tsx` — not a data file. Place it in the component or in `types/contact.ts`.

```typescript
// types/contact.ts  (create this new file)
export type ServiceInterest =
  | 'web-app'
  | 'landing-page'
  | 'ui-design'
  | 'consulting'
  | 'other';

export type ProjectBudget =
  | '<5jt'
  | '5-15jt'
  | '15-50jt'
  | '50jt+'
  | 'belum-tahu';

export interface ContactFormFields {
  name: string;                // Required — full name
  company: string;             // Optional — company/business name
  email: string;               // Required — email address
  phone: string;               // Optional — WhatsApp/phone number
  interest: ServiceInterest;   // Required — which service they're interested in
  budget: ProjectBudget;       // Required — project budget range
  message: string;             // Required — project details
}

// Radio/select option labels (for UI rendering)
export const interestOptions: { value: ServiceInterest; label: string }[] = [
  { value: 'web-app',      label: 'Web App / Website' },
  { value: 'landing-page', label: 'Landing Page' },
  { value: 'ui-design',    label: 'UI/UX Design' },
  { value: 'consulting',   label: 'Technical Consulting' },
  { value: 'other',        label: 'Lainnya' },
];

export const budgetOptions: { value: ProjectBudget; label: string }[] = [
  { value: '<5jt',      label: '< Rp 5 juta' },
  { value: '5-15jt',   label: 'Rp 5–15 juta' },
  { value: '15-50jt',  label: 'Rp 15–50 juta' },
  { value: '50jt+',    label: 'Rp 50 juta+' },
  { value: 'belum-tahu', label: 'Belum tahu / diskusikan dulu' },
];
```

---

## 7. Data Relationship Map

```
projects.ts ──────────────────────────── testimonials.ts
  project.testimonialId ───────────────► testimonial.id
  project.id ◄─────────────────────────── testimonial.projectId

data/clients.ts ──────────────────────── projects.ts
  client.id ─────────────────────────── (loosely) project.id

data/site.ts ─────────────────────────── components/sections/MetricsTicker.tsx
  site.tickerItems[] ──────────────────► rendered as ticker items
  site.whatsapp ───────────────────────► WhatsAppButton + Contact form

types/contact.ts ──────────────────────── app/actions.ts
  ContactFormFields ───────────────────► sendContactMessage(formData)
```

---

## 8. Placeholder Asset Paths

All these paths must exist in `public/`. Create placeholder versions for build to succeed:

```
public/
├── images/
│   ├── projects/
│   │   ├── ruangteduh.png         (1200×800) — existing
│   │   ├── conversion-climb.png   (1200×800) — existing
│   │   └── pkwu.png               (1200×800) — existing
│   ├── team/
│   │   ├── bilal.png              (400×400) — existing
│   │   └── partner.png            (400×400) — existing
│   ├── testimonials/              ← NEW FOLDER
│   │   ├── testimonial-01.jpg     (200×200) — TODO: user provides
│   │   ├── testimonial-02.jpg     (200×200) — TODO: user provides
│   │   └── testimonial-03.jpg     (200×200) — TODO: user provides
│   └── clients/                   ← NEW FOLDER
│       ├── ruangteduh.svg         — TODO: user provides
│       ├── conversion-climb.svg   — TODO: user provides
│       ├── placeholder-3.svg      — TODO: user provides
│       └── placeholder-4.svg      — TODO: user provides
└── og-image.png                   (1200×630) — existing
```

**SmartImage fallback** (already implemented in `components/ui/SmartImage.tsx`) will handle missing images gracefully — no build errors if files don't exist yet.

---

*Data Model Definitions v1.0 — All TypeScript interfaces ready for implementation.*
