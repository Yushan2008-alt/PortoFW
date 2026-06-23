// NEW: Metric badge displayed on project card (max 3 per project)
export interface ProjectMetric {
  label: string;
  value: string;
  icon?: string;
}

// Project category for filtering (eloqwnt-style)
export type ProjectCategory = 'web-design' | 'branding' | 'ux-ui';

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  'web-design': 'Web Design',
  'branding': 'Branding',
  'ux-ui': 'UX/UI',
};

export interface Project {
  id: string;
  title: string;
  category: string;
  categorySlug: ProjectCategory;
  tagline: string;
  description: string;
  thumbnail: string;
  liveUrl?: string;
  repoUrl?: string;
  techStack: string[];
  featured: boolean;
  year: number;
  accentColor: string;
  metrics?: ProjectMetric[];
  results?: string[];
  testimonialId?: string;
  challengeProblem?: string;
  challengeSolution?: string;
  keyTakeaways?: string[];
  duration?: string;
  industry?: string;
  services?: string[];
  gallery?: string[];
  nextProjectId?: string;
  prevProjectId?: string;
}

export const projects: Project[] = [
  {
    id: 'media-pearl',
    title: 'Media Pearl',
    category: 'Analytics · Media Performance',
    categorySlug: 'web-design',
    tagline: 'Website analisis kinerja tim media dengan dashboard real-time.',
    description:
      'Platform dashboard untuk menganalisis performa tim media. Dari traffic breakdown hingga engagement metrics, semua data tersaji dalam satu tempat yang mudah dipahami.',
    thumbnail: '/images/projects/media-pearl.png',
    liveUrl: 'https://media-pearl-five.vercel.app',
    techStack: ['Next.js', 'Tailwind CSS', 'Vercel', 'Chart.js'],
    featured: true,
    year: 2025,
    accentColor: '#4A90D9',
    metrics: [
      { label: 'Real-time', value: 'Live',   icon: 'Activity' },
      { label: 'Response',  value: '<500ms', icon: 'Zap' },
      { label: 'Uptime',    value: '99.9%',  icon: 'Shield' },
    ],
    results: [
      'Dashboard real-time dengan performa optimal',
      'Response time rata-rata di bawah 500ms',
      'Visualisasi data yang mudah dipahami stakeholder',
    ],
    testimonialId: 'testimonial-01',
    challengeProblem: 'Tim media membutuhkan cara cepat untuk memonitor performa konten mereka tanpa harus membuka banyak tools berbeda atau export-import data manual.',
    challengeSolution: 'Membangun dashboard terpusat dengan visualisasi real-time yang mengintegrasikan semua metrics penting dalam satu halaman, dengan breakdown per kategori dan periode waktu.',
    keyTakeaways: [
      'Data visualization yang baik membuat stakeholder lebih mudah mengambil keputusan',
      'Real-time update meningkatkan responsivitas tim terhadap performa konten',
      'Performance optimization sangat penting untuk dashboard dengan data banyak',
    ],
    duration: '6 minggu',
    industry: 'Media, Indonesia',
    services: ['Web Application', 'Dashboard Design', 'Data Visualization'],
    gallery: [
      '/images/projects/media-pearl-1.png',
      '/images/projects/media-pearl-2.png',
      '/images/projects/media-pearl-3.png',
    ],
    nextProjectId: 'placeholder-02',
    prevProjectId: 'placeholder-03',
  },
  {
    id: 'placeholder-02',
    title: 'Project Title Here',
    category: 'Industry · Type',
    categorySlug: 'web-design',
    tagline: 'One-line description of the project value proposition.',
    description:
      'Longer description (2-3 paragraphs) about the project, what it does, why it matters, and the impact it has on users or business.',
    thumbnail: '/images/projects/placeholder-02.png',
    liveUrl: 'https://example.com',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    featured: true,
    year: 2025,
    accentColor: '#9B6DFF',
    metrics: [
      { label: 'Metric 1', value: '100+',  icon: 'TrendingUp' },
      { label: 'Metric 2', value: '50%',   icon: 'BarChart3' },
      { label: 'Metric 3', value: '4.8/5', icon: 'Star' },
    ],
    results: [
      'Result 1: quantifiable impact or achievement',
      'Result 2: another measurable outcome',
      'Result 3: key performance indicator',
    ],
    testimonialId: 'testimonial-02',
    challengeProblem: 'Brief description of the problem the client faced before this project.',
    challengeSolution: 'Brief description of how we solved the problem with this solution.',
    keyTakeaways: [
      'Key learning or insight from this project',
      'Another important takeaway',
      'Technical or strategic lesson learned',
    ],
    duration: '8 minggu',
    industry: 'Industry Name, Country',
    services: ['Service 1', 'Service 2', 'Service 3'],
    gallery: [
      '/images/projects/placeholder-02-1.png',
      '/images/projects/placeholder-02-2.png',
    ],
    nextProjectId: 'placeholder-03',
    prevProjectId: 'media-pearl',
  },
  {
    id: 'placeholder-03',
    title: 'Another Project',
    category: 'Category · Type',
    categorySlug: 'ux-ui',
    tagline: 'Tagline describing the core value or outcome.',
    description:
      'Full description with context about the project, the client needs, and what we delivered.',
    thumbnail: '/images/projects/placeholder-03.png',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/username/repo',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    featured: false,
    year: 2024,
    accentColor: '#E8976A',
    metrics: [
      { label: 'Users',    value: '5k+',  icon: 'Users' },
      { label: 'Growth',   value: '+120%', icon: 'TrendingUp' },
      { label: 'Delivery', value: '4 wks', icon: 'Clock' },
    ],
    results: [
      'Achievement 1',
      'Achievement 2',
      'Achievement 3',
    ],
    testimonialId: 'testimonial-03',
    challengeProblem: 'What was the core problem we needed to solve?',
    challengeSolution: 'How did we approach and solve it?',
    keyTakeaways: [
      'Takeaway 1',
      'Takeaway 2',
      'Takeaway 3',
    ],
    duration: '4 minggu',
    industry: 'Industry, Location',
    services: ['Design', 'Development', 'Consulting'],
    gallery: [
      '/images/projects/placeholder-03-1.png',
    ],
    nextProjectId: 'media-pearl',
    prevProjectId: 'placeholder-02',
  },
];

// Utility exports
export const featuredProjects = projects.filter((p) => p.featured);
export const allProjects = [...projects].sort((a, b) => b.year - a.year);
