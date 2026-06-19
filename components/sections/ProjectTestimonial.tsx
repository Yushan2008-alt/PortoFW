'use client';

import { testimonials } from '@/data/testimonials';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectTestimonialProps {
  testimonialId?: string;
}

export function ProjectTestimonial({ testimonialId }: ProjectTestimonialProps) {
  if (!testimonialId) return null;

  const testimonial = testimonials.find(t => t.id === testimonialId);

  // Jika ID diberikan tapi tidak ditemukan di database, jangan render
  if (!testimonial) return null;

  return (
    <section className="py-24 md:py-32 bg-blue-50/50 dark:bg-blue-900/10 border-y border-blue-100 dark:border-blue-900/30">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-10 shadow-sm">
              <Quote className="w-8 h-8 fill-current" />
            </div>
            
            <blockquote className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900 dark:text-white leading-tight md:leading-tight lg:leading-tight mb-12 tracking-tight">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            
            <div className="flex items-center gap-5">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-md">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-base">
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
