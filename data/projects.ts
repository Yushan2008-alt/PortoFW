// NEW: Metric badge displayed on project card (max 3 per project)
export interface ProjectMetric {
  label: string; // e.g. "Users", "Conversion Lift", "Load Time"
  value: string; // e.g. "12.4k+", "+30%", "0.8s"
  icon?: string; // Optional: Lucide icon name (e.g. "Users", "TrendingUp")
}

// EXTENDED: Project interface — tambah 3 optional field baru
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
  metrics?: ProjectMetric[];  // Up to 3 metric badges on card
  results?: string[];         // Bullet list of outcomes (for case study Phase 2)
  testimonialId?: string;     // FK → testimonials.ts by id
  // --- NEW FIELDS untuk Project Detail Page ---
  challengeProblem?: string;    // Deskripsi masalah (eloqwnt "Problem")
  challengeSolution?: string;  // Deskripsi solusi (eloqwnt "Solution")
  keyTakeaways?: string[];     // Key takeaways bullet
  duration?: string;           // e.g. "3 minggu", "6 minggu"
  industry?: string;           // e.g. "Health Tech, Indonesia"
  services?: string[];         // e.g. ["Web Design", "UI/UX"]
  gallery?: string[];          // Array tambahan gambar screenshot
  nextProjectId?: string;      // ID project selanjutnya (untuk navigasi)
  prevProjectId?: string;      // ID project sebelumnya
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
    metrics: [
      { label: 'Users',       value: '12.4k+', icon: 'Users' },
      { label: 'AI Sessions', value: '50k+',   icon: 'MessageSquare' },
      { label: 'Rating',      value: '4.9/5',  icon: 'Star' },
    ],
    results: [
      'Melayani 12.400+ pengguna aktif dalam 3 bulan pertama',
      'AI companion tersedia 24/7 tanpa downtime',
      'Fitur crisis SOS berhasil menghubungkan pengguna dengan profesional',
    ],
    testimonialId: 'testimonial-01',
    challengeProblem: 'Meningkatnya kebutuhan akan layanan kesehatan mental yang mudah diakses dan gratis di Indonesia, terutama bagi mereka yang membutuhkan bantuan kapan saja tanpa batasan waktu.',
    challengeSolution: 'Kami membangun RuangTeduh dengan integrasi AI companion 24/7 dan fitur crisis SOS untuk memberikan dukungan seketika serta menghubungkan pengguna dengan profesional saat krisis.',
    keyTakeaways: [
      'Integrasi AI dapat memberikan first-response yang baik',
      'Aksesibilitas adalah kunci dalam aplikasi kesehatan',
      'Performa aplikasi harus optimal tanpa downtime'
    ],
    duration: '12 minggu',
    industry: 'Health Tech, Indonesia',
    services: ['Web Design', 'Fullstack Development', 'AI Integration'],
    gallery: [
      '/images/projects/ruangteduh-1.png',
      '/images/projects/ruangteduh-2.png'
    ],
    nextProjectId: 'conversion-climb',
    prevProjectId: 'propvista',
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
    metrics: [
      { label: 'Conversion Rate', value: '+47%',   icon: 'TrendingUp' },
      { label: 'Delivery',        value: '7 days', icon: 'Clock' },
      { label: 'Uptime',          value: '99.9%',  icon: 'Shield' },
    ],
    results: [
      'Conversion rate meningkat 47% dibanding halaman sebelumnya',
      'Selesai dalam 7 hari kerja',
      'Struktur copy menggunakan Awareness Ladder framework',
    ],
    testimonialId: 'testimonial-03',
    challengeProblem: 'Halaman sales page sebelumnya memiliki tingkat konversi yang rendah karena struktur copy yang kurang terarah dan desain visual yang tidak mendukung storytelling.',
    challengeSolution: 'Menerapkan framework Awareness Ladder untuk menstrukturkan copy, dikombinasikan dengan desain visual yang mengarahkan mata pengunjung ke call-to-action.',
    keyTakeaways: [
      'Copywriting yang terstruktur meningkatkan konversi secara signifikan',
      'Desain harus mendukung tujuan copy, bukan sebaliknya',
      'Kecepatan loading berdampak langsung pada bounce rate'
    ],
    duration: '3 minggu',
    industry: 'Digital Marketing, Global',
    services: ['Copywriting', 'Web Design', 'Frontend Development'],
    gallery: [
      '/images/projects/conversion-climb-1.png',
      '/images/projects/conversion-climb-2.png'
    ],
    nextProjectId: 'pkwu-web',
    prevProjectId: 'ruangteduh',
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
    metrics: [
      { label: 'Pages', value: '5',          icon: 'Layout' },
      { label: 'Tech',  value: 'Vanilla JS', icon: 'Code2' },
      { label: 'Year',  value: '2024',       icon: 'Calendar' },
    ],
    results: [
      'Project pertama Forza Studio yang fully deployed',
      'Membangun fondasi pemahaman web development',
    ],
    // testimonialId: undefined — belum ada testimonial untuk project ini
    challengeProblem: 'Sebagai tim baru, kami membutuhkan wadah untuk mengaplikasikan ilmu web development secara langsung ke dalam project nyata sebagai fondasi teknikal kami.',
    challengeSolution: 'Membangun website kewirausahaan menggunakan Vanilla JS untuk benar-benar memahami fundamental web development (DOM manipulation, styling dasar) sebelum beralih ke framework modern.',
    keyTakeaways: [
      'Fundamental HTML, CSS, dan JS sangat penting dan tidak bisa dilewati',
      'Kerja sama dan pembagian tugas dalam project pertama',
      'Pengalaman deployment secara real-world'
    ],
    duration: '4 minggu',
    industry: 'Education, Indonesia',
    services: ['Web Development', 'UI Design'],
    gallery: [
      '/images/projects/pkwu-1.png',
      '/images/projects/pkwu-2.png'
    ],
    nextProjectId: 'propvista',
    prevProjectId: 'conversion-climb',
  },
  {
    id: 'propvista',
    title: 'PropVista',
    category: 'Real Estate · Property Listing',
    tagline: 'Platform pencarian properti terpercaya di Indonesia.',
    description:
      'Dari pencarian rumah impian hingga layanan jual beli, kami menyediakan solusi lengkap untuk kebutuhan properti Anda.',
    thumbnail: '/images/projects/propvista.png',
    liveUrl: 'https://app-properti.vercel.app',
    techStack: ['Next.js', 'Supabase', 'OpenAI API', 'Tailwind CSS'],
    featured: true,
    year: 2025,
    accentColor: '#a1804e',
    metrics: [
      { label: 'Listings',  value: '500+',  icon: 'Home' },
      { label: 'AI Search', value: 'Smart', icon: 'Search' },
      { label: 'Response',  value: '<1s',   icon: 'Zap' },
    ],
    results: [
      'Pencarian properti berbasis AI dengan filter cerdas',
      'Database 500+ listing properti aktif',
      'Response time rata-rata di bawah 1 detik',
    ],
    testimonialId: 'testimonial-02',
    challengeProblem: 'Pencarian properti yang ada saat ini seringkali membingungkan pengguna dengan filter yang terlalu kaku dan tidak dapat mengerti konteks pencarian natural bahasa manusia.',
    challengeSolution: 'Mengimplementasikan pencarian berbasis AI (menggunakan Supabase dan OpenAI) yang memungkinkan pengguna mencari dengan bahasa natural seperti "rumah 3 kamar dekat stasiun MRT".',
    keyTakeaways: [
      'Pencarian berbasis AI sangat mempermudah user experience',
      'Manajemen state untuk filter dan listing harus sangat efisien',
      'Kecepatan load dan performa query database sangat krusial'
    ],
    duration: '8 minggu',
    industry: 'Real Estate, Indonesia',
    services: ['Web Application', 'AI Search Integration', 'UI/UX Design'],
    gallery: [
      '/images/projects/propvista-1.png',
      '/images/projects/propvista-2.png'
    ],
    nextProjectId: 'ruangteduh',
    prevProjectId: 'pkwu-web',
  },
];

// Utility exports
export const featuredProjects = projects.filter((p) => p.featured);
export const allProjects = [...projects].sort((a, b) => b.year - a.year);
