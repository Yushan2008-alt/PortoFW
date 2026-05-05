export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socials: { github?: string; linkedin?: string; email?: string };
}

export const team: TeamMember[] = [
  {
    id: 'bilal',
    name: 'Bilal', // TODO: confirm full name
    role: 'Frontend & Product Engineer',
    bio: 'Membangun antarmuka yang terasa hidup. Fokus di Next.js, animasi, dan detail interaksi.',
    avatar: '/images/team/bilal.png',
    socials: {
      github: 'https://github.com/BilalMayor',
      linkedin: '', // TODO: user to fill
      email: 'bilal@forzastudio.dev',
    },
  },
  {
    id: 'partner',
    name: 'TBD', // TODO: user to fill
    role: 'Backend & System Architect',
    bio: 'Menjaga arsitektur tetap rapi. Fokus di API design, database, dan AI integration.',
    avatar: '/images/team/partner.png',
    socials: {
      github: '',
      linkedin: '',
      email: '',
    },
  },
];
