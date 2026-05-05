import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function Work() {
  return (
    <section
      id="work"
      className="py-24 md:py-32 px-6"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="gradient-text text-sm font-semibold tracking-widest uppercase">
              Selected Work
            </span>
            <h2
              className="mt-3 font-bold text-4xl md:text-5xl"
              style={{ fontFamily: 'var(--font-syne, sans-serif)', color: 'var(--text-primary)' }}
            >
              Produk yang Kami Bangun
            </h2>
            <p
              className="mt-4 max-w-xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Dari MVP sampai production. Ini hasilnya.
            </p>
          </ScrollReveal>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
