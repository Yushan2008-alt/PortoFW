export type FAQCategory = 'pricing' | 'process' | 'technical' | 'general';

export interface FAQ {
  id: string;
  question: string;
  answer: string;       // Plain text only — no HTML
  category: FAQCategory;
  order: number;        // Display order on page
}

export const faqs: FAQ[] = [
  {
    id: 'faq-01',
    question: 'Berapa biaya untuk membuat website di Glare Warden?',
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
    question: 'Apakah Glare Warden berpengalaman dengan jenis bisnis saya?',
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
    question: 'Teknologi apa yang Glare Warden gunakan?',
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

// Utility: semua FAQ diurutkan berdasarkan field order
export const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);

// Utility: FAQ dikelompokkan per kategori
export const faqsByCategory = faqs.reduce<Record<FAQCategory, FAQ[]>>(
  (acc, faq) => {
    acc[faq.category].push(faq);
    return acc;
  },
  { pricing: [], process: [], technical: [], general: [] },
);
