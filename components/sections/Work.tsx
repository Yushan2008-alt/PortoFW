'use client';
import { useRouter } from 'next/navigation';
import { projects, Project } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { motion } from 'framer-motion';

export function Work() {
  const router = useRouter();

  return (
    <section
      id="work"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="gradient-text text-sm font-semibold tracking-[0.2em] uppercase">
            Selected Work
          </span>
          <h2
            className="font-display font-bold mt-3 leading-tight"
            style={{
              fontSize: 'clamp(1.4rem, 4vw, 2.5rem)',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Produk yang Kami Bangun
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto"
            style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', color: 'var(--text-secondary)' }}
          >
            Klik salah satu untuk lihat detailnya. Dari MVP sampai production.
          </p>
        </motion.div>

        {/* Compact grid — 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onClick={() => router.push(`/projects/${p.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
