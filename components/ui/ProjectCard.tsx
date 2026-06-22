'use client';
import { Project, CATEGORY_LABELS } from '@/data/projects';
import { SmartImage } from './SmartImage';
import { MetricBadge } from './MetricBadge';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative w-full text-left rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer hover:shadow-lg"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
    >
      {/* Image — 16:9 aspect ratio */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
        <SmartImage
          src={project.thumbnail}
          alt={project.title}
          fallbackText={project.title}
          width={600}
          height={338}
          fallbackBg="gemini"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          style={{ background: 'var(--blewah)' }}
        >
          <ArrowUpRight size={16} color="white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Row: category badge + year */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-block font-medium tracking-wide"
            style={{ color: 'var(--blewah)', fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}
          >
            {CATEGORY_LABELS[project.categorySlug]}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            · {project.year}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold mb-2"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}
        >
          {project.title}
        </h3>

        {/* Tagline */}
        <p
          className="leading-relaxed line-clamp-2 mb-3"
          style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.85rem)', color: 'var(--text-secondary)' }}
        >
          {project.tagline}
        </p>

        {/* Metric badges — max 3 */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.metrics.slice(0, 3).map((metric) => (
              <MetricBadge
                key={metric.label}
                label={metric.label}
                value={metric.value}
                icon={metric.icon}
                variant="light"
              />
            ))}
          </div>
        )}

        {/* Explore CTA */}
        <div className="flex items-center gap-1 text-sm font-medium transition-all duration-300 group-hover:gap-2" style={{ color: 'var(--blewah)' }}>
          Explore
          <ArrowUpRight size={14} />
        </div>
      </div>
    </motion.button>
  );
}
