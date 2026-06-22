export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  quote: string;
  specialty: string[];
  avatar: string;
  socials: { github?: string; linkedin?: string; email?: string };
}

export const team: TeamMember[] = [
  {
    id: 'bilal',
    name: 'Bilal',
    role: 'Frontend & Product Engineer',
    bio: 'Membangun antarmuka yang terasa hidup. Obsesi pada detail interaksi, animasi, dan performance — karena UX bukan sekadar "berfungsi".',
    quote: 'Kalau user harus mikir cara pakainya, desainnya gagal.',
    specialty: ['Next.js', 'Animation', 'UI Systems'],
    avatar: '/images/team/bilal.png',
    socials: {
      github: 'https://github.com/BilalMayor',
      linkedin: '',
      email: 'bilal@glarewarden.com',
    },
  },
  {
    id: 'yushan',
    name: 'Yushan',
    role: 'Backend & System Architect',
    bio: 'Menjaga arsitektur tetap rapi sebelum scaling jadi mimpi buruk. Fokus di API design, database modeling, dan integrasi AI yang tidak bocor.',
    quote: 'Kode yang baik adalah kode yang besok masih bisa dibaca tanpa nangis.',
    specialty: ['Node.js', 'PostgreSQL', 'AI Integration'],
    avatar: '/images/team/yushan.png',
    socials: {
      github: '',
      linkedin: '',
      email: 'yushan@glarewarden.com',
    },
  },
];
