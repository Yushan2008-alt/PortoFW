export interface TickerItem {
  value: string; // e.g. "15+ Projects Delivered"
}

export const site = {
  name: 'Forza Studio',

  // UPDATED: tagline sesuai Data_Model_Definitions.md §5
  tagline: 'Web Development Agency untuk Bisnis Indonesia.',

  // UPDATED: description lebih deskriptif untuk SEO & meta tag
  description:
    'Forza Studio adalah web development agency yang membangun website profesional untuk UMKM dan korporat Indonesia.',

  url: 'https://forzastudio.dev',
  email: 'hello@forzastudio.dev',

  // SECURITY NOTE: disimpan tanpa karakter khusus — hanya digit.
  // Konstruksi URL WhatsApp: `https://wa.me/${site.whatsapp}`
  // Format: kode negara + nomor tanpa leading 0, tanpa +/-/spasi.
  // Contoh: Indonesia 08xx → 628xx
  whatsapp: '62XXXXXXXXXX', // TODO: ganti dengan nomor asli, contoh: '6281234567890'

  socials: {
    github: 'https://github.com/BilalMayor',
    instagram: '', // TODO: isi dengan URL Instagram Forza Studio
    linkedin: '', // TODO: isi dengan URL LinkedIn Forza Studio
  },

  stats: {
    projects: '15+',
    clients: '10+',
    years: '2',
  },

  // NEW: Metrics ticker items — digunakan oleh MetricsTicker component
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
