'use client';

import Image from 'next/image';
import { Project } from '@/data/projects';
import { motion } from 'framer-motion';

interface ProjectGalleryProps {
  project: Project;
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
  if (!project.gallery || project.gallery.length === 0) {
    return null;
  }

  const isFullWidth = (index: number, total: number) => {
    // Jika gambar ganjil (misal 3), buat gambar pertama full width
    if (total % 2 !== 0 && index === 0) return true;
    return false;
  };

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Project Highlights
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Sekilas tentang UI dan implementasi fitur
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {project.gallery.map((imgSrc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative w-full overflow-hidden rounded-3xl bg-gray-100 dark:bg-zinc-800 border border-gray-200/50 dark:border-white/5 ${
                  isFullWidth(index, project.gallery!.length) 
                    ? 'md:col-span-2 aspect-[16/9] lg:aspect-[21/9]' 
                    : 'aspect-video'
                }`}
              >
                <Image
                  src={imgSrc}
                  alt={`${project.title} highlight ${index + 1}`}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
