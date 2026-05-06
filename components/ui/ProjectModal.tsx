'use client';
import { Project } from '@/data/projects';
import { SmartImage } from './SmartImage';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { useEffect } from 'react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // ESC to close + lock body scroll
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100]"
            style={{
              background: 'rgba(15, 14, 13, 0.7)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-start md:items-center justify-center p-3 md:p-6 overflow-y-auto pointer-events-none">
            <motion.div
              layoutId={`project-card-${project.id}`}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden pointer-events-auto my-auto"
              style={{
                background: 'var(--bg-primary)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
                border: '0.5px solid var(--border-medium)',
              }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: 'var(--shadow-md)',
                }}
                aria-label="Close"
              >
                <X size={18} color="var(--text-primary)" />
              </button>

              {/* Hero image */}
              <motion.div
                layoutId={`project-image-${project.id}`}
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '16 / 9' }}
              >
                <SmartImage
                  src={project.thumbnail}
                  alt={project.title}
                  fallbackText={project.title}
                  width={1200}
                  height={675}
                  fallbackBg="gemini"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Content */}
              <div className="p-5 md:p-8">
                <motion.div
                  layoutId={`project-category-${project.id}`}
                  className="text-xs font-medium tracking-wider uppercase mb-3"
                  style={{ color: 'var(--blewah)' }}
                >
                  {project.category}
                </motion.div>

                <motion.h2
                  layoutId={`project-title-${project.id}`}
                  className="font-display font-bold mb-4"
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  {project.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="leading-relaxed mb-6"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                  }}
                >
                  {project.description}
                </motion.p>

                {/* Tech stack */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="mb-6"
                >
                  <div
                    className="text-xs font-medium tracking-wider uppercase mb-3"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Built with
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-full text-xs font-medium"
                        style={{
                          background: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                          border: '0.5px solid var(--border-subtle)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="flex flex-wrap gap-3"
                >
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105"
                      style={{
                        background: 'var(--blewah)',
                        color: 'white',
                        boxShadow: '0 0 24px rgba(232,151,106,0.35)',
                        fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)',
                      }}
                    >
                      <ExternalLink size={16} />
                      View Live Project
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105"
                      style={{
                        background: 'transparent',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-medium)',
                        fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)',
                      }}
                    >
                      <Github size={16} />
                      View Repository
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
