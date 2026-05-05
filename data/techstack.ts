export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'tools';
  level: 'Expert' | 'Proficient';
}

export const techStack: TechItem[] = [
  { name: 'Next.js',       category: 'frontend', level: 'Expert' },
  { name: 'React',         category: 'frontend', level: 'Expert' },
  { name: 'TypeScript',    category: 'frontend', level: 'Proficient' },
  { name: 'Tailwind CSS',  category: 'frontend', level: 'Expert' },
  { name: 'Framer Motion', category: 'frontend', level: 'Proficient' },
  { name: 'Supabase',      category: 'backend',  level: 'Proficient' },
  { name: 'Node.js',       category: 'backend',  level: 'Proficient' },
  { name: 'PostgreSQL',    category: 'backend',  level: 'Proficient' },
  { name: 'OpenAI API',    category: 'ai',       level: 'Proficient' },
  { name: 'Vercel',        category: 'tools',    level: 'Expert' },
  { name: 'Git / GitHub',  category: 'tools',    level: 'Expert' },
  { name: 'Figma',         category: 'tools',    level: 'Proficient' },
];
