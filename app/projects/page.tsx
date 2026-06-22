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
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Case Studies
            </h1>
            <p className="mt-4 max-w-xl" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', color: 'var(--text-secondary)' }}>
              Every project had a business reason behind it. Here&apos;s what we built.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-2 mt-10"
          >
            {FILTERS.map((f) => (
              <button
                key={f.slug}
                onClick={() => setActiveFilter(f.slug)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background: activeFilter === f.slug ? 'var(--blewah)' : 'transparent',
                  color: activeFilter === f.slug ? 'white' : 'var(--text-secondary)',
                  borderColor: activeFilter === f.slug ? 'var(--blewah)' : 'var(--border-subtle)',
                  borderWidth: 1,
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

          <div className="mt-10 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </section>
    </main>
  );
}
