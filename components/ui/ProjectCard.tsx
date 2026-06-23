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
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative w-full text-left rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer"
      style={{ 
        background: 'var(--bg-card)', 
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Image with overlay */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
        <SmartImage
          src={project.thumbnail}
          alt={project.title}
          fallbackText={project.title}
          width={600}
          height={338}
          fallbackBg="gemini"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient overlay that intensifies on hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
        />

        {/* Category badge — top left */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-block px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md transition-all duration-300"
            style={{ 
              background: 'rgba(244, 243, 239, 0.95)',
              color: 'var(--text-primary)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Arrow icon — top right */}
        <div
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          style={{ background: 'rgba(232, 151, 106, 0.95)' }}
        >
          <ArrowUpRight size={18} color="white" strokeWidth={2.5} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3
          className="font-display font-bold mb-2 group-hover:text-[var(--blewah)] transition-colors duration-300"
          style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', 
            letterSpacing: '-0.02em', 
            color: 'var(--text-primary)',
            lineHeight: 1.2
          }}
        >
          {project.title}
        </h3>

        {/* Tagline */}
        <p
          className="leading-relaxed line-clamp-2 mb-4"
          style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)', color: 'var(--text-secondary)' }}
        >
          {project.tagline}
        </p>

        {/* Metric badges — max 3 */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.metrics.slice(0, 3).map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <MetricBadge
                  label={metric.label}
                  value={metric.value}
                  icon={metric.icon}
                  variant="light"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Explore CTA */}
        <div 
          className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5" 
          style={{ color: 'var(--blewah)' }}
        >
          <span>Explore Project</span>
          <ArrowUpRight size={16} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.button>
  );
}
