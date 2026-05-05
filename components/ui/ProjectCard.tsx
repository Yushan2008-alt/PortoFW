'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/data/projects';
import { SmartImage } from './SmartImage';
import { Badge } from './Badge';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -4,
        boxShadow: 'var(--shadow-lg)',
        borderColor: 'rgba(155,109,255,0.3)',
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      className="rounded-[20px] overflow-hidden flex flex-col"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        transition: 'box-shadow 300ms ease, border-color 300ms ease',
      }}
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <SmartImage
            src={project.thumbnail}
            alt={project.title}
            fallbackText={project.title}
            fallbackBg="gemini"
            width={800}
            height={500}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Content area */}
      <div className="p-6 flex flex-col flex-1">
        <Badge variant="default" className="mb-3 self-start">
          {project.category}
        </Badge>

        <h3
          className="text-xl font-semibold"
          style={{ fontFamily: 'var(--font-syne, sans-serif)', color: 'var(--text-primary)' }}
        >
          {project.title}
        </h3>

        <p
          className="text-sm mt-2 line-clamp-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          {project.tagline}
        </p>

        {/* Tech stack chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-muted)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-4 flex gap-3 items-center">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm hover:underline"
              style={{ color: 'var(--gemini-purple)' }}
            >
              <ExternalLink size={14} />
              Live →
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm hover:underline"
              style={{ color: 'var(--text-muted)' }}
            >
              <Github size={14} />
              Repo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
