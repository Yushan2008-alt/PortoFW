// SECURITY NOTE: field `quote` bersumber dari data static hardcoded.
// Jika di masa depan testimonial diterima dari form/input manual,
// pastikan konten di-sanitize sebelum disimpan (trim whitespace,
// strip HTML tags) — bukan di sini, tapi di layer input/action.

export interface Testimonial {
  id: string;
  name: string;
  title: string;          // Job title, e.g. "CEO", "Founder"
  company: string;        // Company name
  photo: string;          // Path: /images/testimonials/{id}.jpg
  quote: string;          // Full testimonial quote (2–5 sentences)
  linkedInUrl?: string;   // LinkedIn profile URL (optional)
  projectId?: string;     // FK → projects.ts by id (optional)
  featured: boolean;      // Show in main carousel if true
  order: number;          // Display order in carousel
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-01',
    name: 'Placeholder Name',             // TODO: ganti dengan nama klien asli
    title: 'Founder',
    company: 'Placeholder Company',
    photo: '/images/testimonials/testimonial-01.jpg',
    quote:
      'Glare Warden membangun website bisnis kami dari nol. Hasilnya melebihi ekspektasi — desainnya profesional dan loading-nya sangat cepat. Dalam 2 minggu setelah launch, kami sudah mendapat 3 inquiries dari website.',
    linkedInUrl: '',
    projectId: 'ruangteduh',
    featured: true,
    order: 1,
  },
  {
    id: 'testimonial-02',
    name: 'Placeholder Name 2',           // TODO: ganti dengan nama klien asli
    title: 'Marketing Manager',
    company: 'Placeholder Company 2',
    photo: '/images/testimonials/testimonial-02.jpg',
    quote:
      'Tim Glare Warden sangat responsif dan profesional. Mereka memahami kebutuhan bisnis kami dengan baik dan menghasilkan website yang benar-benar merepresentasikan brand kami.',
    linkedInUrl: '',
    projectId: 'propvista',
    featured: true,
    order: 2,
  },
  {
    id: 'testimonial-03',
    name: 'Placeholder Name 3',           // TODO: ganti dengan nama klien asli
    title: 'CEO',
    company: 'Placeholder Company 3',
    photo: '/images/testimonials/testimonial-03.jpg',
    quote:
      'Landing page yang dibuat Glare Warden berhasil meningkatkan conversion rate kami secara signifikan. Mereka tidak hanya membuat website yang cantik, tapi juga yang bekerja untuk bisnis.',
    linkedInUrl: '',
    projectId: 'conversion-climb',
    featured: true,
    order: 3,
  },
];

// Utility: ambil featured testimonials, urut berdasarkan order
export const featuredTestimonials = testimonials
  .filter((t) => t.featured)
  .sort((a, b) => a.order - b.order);
