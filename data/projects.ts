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
  },
];
