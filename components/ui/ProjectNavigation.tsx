import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ProjectNavigationProps {
  prevProject?: Project;
  nextProject?: Project;
}

export function ProjectNavigation({ prevProject, nextProject }: ProjectNavigationProps) {
  if (!prevProject && !nextProject) return null;

  return (
    <section className="py-20 md:py-32 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-white/5">
          
          {/* Previous Project */}
          <div className="pt-8 md:pt-0 md:pr-12 flex flex-col justify-center">
            {prevProject ? (
              <Link href={`/projects/${prevProject.id}`} className="group block w-full">
                <span className="flex items-center gap-2 text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6 group-hover:-translate-x-2 transition-transform duration-300">
                  <ArrowLeft className="w-4 h-4" />
                  Previous Project
                </span>
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                    <Image 
                      src={prevProject.thumbnail} 
                      alt={prevProject.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {prevProject.title}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
                      {prevProject.category}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="w-full h-full" />
            )}
          </div>

          {/* Next Project */}
          <div className="pt-12 md:pt-0 md:pl-12 flex flex-col justify-center text-right">
            {nextProject ? (
              <Link href={`/projects/${nextProject.id}`} className="group block w-full">
                <span className="flex items-center justify-end gap-2 text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6 group-hover:translate-x-2 transition-transform duration-300">
                  Next Project
                  <ArrowRight className="w-4 h-4" />
                </span>
                <div className="flex items-center justify-end gap-6 flex-row-reverse">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                    <Image 
                      src={nextProject.thumbnail} 
                      alt={nextProject.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {nextProject.title}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
                      {nextProject.category}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="w-full h-full" />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
