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

  if (!testimonial) return null;

  return (
    <section className="py-16 md:py-20 rounded-2xl border px-6"
      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
            style={{ background: 'var(--blewah)', color: 'white' }}>
            <Quote className="w-6 h-6" />
          </div>

          <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium leading-snug mb-10"
            style={{ color: 'var(--text-primary)' }}>
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2"
              style={{ borderColor: 'var(--border-medium)' }}>
              <Image
                src={testimonial.photo}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                {testimonial.name}
              </h4>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {testimonial.title}, {testimonial.company}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
