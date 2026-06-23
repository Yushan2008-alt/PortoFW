'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { projects, type ProjectCategory, CATEGORY_LABELS } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { motion } from 'framer-motion';

const FILTERS: { slug: ProjectCategory | 'all'; label: string }[] = [
  { slug: 'all', label: 'All' },
  { slug: 'web-design', label: 'Web Design' },
  { slug: 'branding', label: 'Branding' },
  { slug: 'ux-ui', label: 'UX/UI' },
];

export default function ProjectsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.categorySlug === activeFilter);

  return (
    <main style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold tracking-[0.2em] uppercase gradient-text">
              Our Work
            </span>
            <h1 className="font-display font-bold mt-3"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Case Studies
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', color: 'var(--text-secondary)' }}>
              Every project has a story. Here&apos;s what we&apos;ve built and the impact it made.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-12"
          >
            {FILTERS.map((f) => (
              <button
                key={f.slug}
                onClick={() => setActiveFilter(f.slug)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: activeFilter === f.slug ? 'var(--blewah)' : 'var(--bg-card)',
                  color: activeFilter === f.slug ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${activeFilter === f.slug ? 'var(--blewah)' : 'var(--border-subtle)'}`,
                  boxShadow: activeFilter === f.slug ? 'var(--shadow-blewah)' : 'none',
                }}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
                No projects found in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                  onClick={() => router.push(`/projects/${p.id}`)}
                />
              ))}
            </div>
          )}

          <div className="mt-12 text-center text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>
    </main>
  );
}
