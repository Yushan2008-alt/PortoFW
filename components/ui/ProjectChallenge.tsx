'use client';

import { Project } from '@/data/projects';
import { Target, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectChallengeProps {
  project: Project;
}

export function ProjectChallenge({ project }: ProjectChallengeProps) {
  // Jika tidak ada data problem & solution, jangan render section ini
  if (!project.challengeProblem && !project.challengeSolution) {
    return null;
  }

  return (
    <section className="py-20 md:py-32 bg-gray-50 dark:bg-zinc-900/50 border-y border-gray-200 dark:border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Problem Column */}
            {project.challengeProblem && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20">
                    <Target className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                    The Challenge
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg md:text-xl font-light">
                  {project.challengeProblem}
                </p>
              </motion.div>
            )}

            {/* Solution Column */}
            {project.challengeSolution && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                    <Lightbulb className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                    The Solution
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg md:text-xl font-light">
                  {project.challengeSolution}
                </p>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
