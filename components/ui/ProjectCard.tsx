'use client';
import { Project } from '@/data/projects';
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
      layoutId={`project-card-${project.id}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative w-full text-left rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
    >
      {/* Image — 4:3 aspect ratio */}
      <motion.div
        layoutId={`project-image-${project.id}`}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '4 / 3' }}
      >
        <SmartImage
          src={project.thumbnail}
          alt={project.title}
          fallbackText={project.title}
          width={600}
          height={450}
          fallbackBg="gemini"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Click hint icon */}
        <div
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          style={{ background: 'var(--blewah)' }}
        >
          <ArrowUpRight size={16} color="white" />
        </div>
      </motion.div>

      {/* Content — tight padding */}
      <div className="p-4 md:p-5">
        <motion.div
          layoutId={`project-category-${project.id}`}
          className="font-medium tracking-wide mb-2"
          style={{ color: 'var(--blewah)', fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}
        >
          {project.category}
        </motion.div>

        {/* Metric badges — max 3, purely from props */}
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

        <motion.h3
          layoutId={`project-title-${project.id}`}
          className="font-display font-bold mb-2"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}
        >
          {project.title}
        </motion.h3>

        <p
          className="leading-relaxed line-clamp-2"
          style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.85rem)', color: 'var(--text-secondary)' }}
        >
          {project.tagline}
        </p>
      </div>
    </motion.button>
  );
}
