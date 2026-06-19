'use client';

import { Project } from '@/data/projects';
import { Clock, Building2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectSummaryProps {
  project: Project;
}

export function ProjectSummary({ project }: ProjectSummaryProps) {
  // Jika data kosong semua, jangan render
  if (!project.industry && !project.duration && (!project.services || project.services.length === 0)) {
    return null;
  }

  return (
    <section className="relative z-20 -mt-16 md:-mt-24 px-6">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }} // Staggered after hero load
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 p-8 md:p-10 bg-white dark:bg-zinc-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-100 dark:border-zinc-800/80 backdrop-blur-xl"
          >
            {/* Industry */}
            {project.industry && (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-gray-400 dark:text-zinc-500">
                  <Building2 className="w-5 h-5" />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Industry</h4>
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                  {project.industry}
                </p>
              </div>
            )}

            {/* Duration */}
            {project.duration && (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-gray-400 dark:text-zinc-500">
                  <Clock className="w-5 h-5" />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Timeline</h4>
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                  {project.duration}
                </p>
              </div>
            )}

            {/* Services */}
            {project.services && project.services.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-gray-400 dark:text-zinc-500">
                  <Layers className="w-5 h-5" />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Services</h4>
                </div>
                <ul className="flex flex-wrap gap-2 pt-1">
                  {project.services.map((service, idx) => (
                    <li 
                      key={idx}
                      className="text-xs font-semibold px-3 py-1.5 bg-gray-50 dark:bg-zinc-800/50 text-gray-700 dark:text-zinc-300 rounded-full border border-gray-200/60 dark:border-zinc-700/50"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
