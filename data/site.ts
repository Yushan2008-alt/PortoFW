export const site = {
  name: 'Forza Studio',

  // UPDATED: tagline sesuai Data_Model_Definitions.md §5
  tagline: 'Web Development Agency untuk Bisnis Indonesia.',

  // UPDATED: description lebih deskriptif untuk SEO & meta tag
  description:
    'Forza Studio adalah web development agency yang membangun website profesional untuk UMKM dan korporat Indonesia.',

  url: 'https://forzastudio.dev',
  email: 'glarewardengroup@gmail.com',

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
    projects: '3',
    clients: '0',
    years: '1',
  },

};
