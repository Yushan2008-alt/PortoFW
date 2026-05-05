import { Code2, Palette, Lightbulb } from 'lucide-react';

export interface Service {
  id: string;
  icon: typeof Code2;
  title: string;
  description: string;
  bullets: string[];
}

export const services: Service[] = [
  {
    id: 'dev',
    icon: Code2,
    title: 'Web & App Development',
    description: 'Dari landing page sampai full-stack web app. Clean code, scalable architecture, fast delivery.',
    bullets: ['Next.js / React / Node.js', 'REST & GraphQL API', 'Database design & optimization'],
  },
  {
    id: 'design',
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Desain yang tidak sekadar cantik, tapi convert. Kami desain untuk pengguna nyata.',
    bullets: ['Wireframe & prototyping', 'Design system', 'Figma handoff'],
  },
  {
    id: 'consult',
    icon: Lightbulb,
    title: 'Technical Consulting',
    description: 'Stuck di arsitektur atau stack choice? Kami bantu evaluasi dan rencanakan dengan tepat.',
    bullets: ['Tech stack audit', 'Architecture review', 'Code review'],
  },
];
