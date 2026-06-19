import { Linkedin } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import type { Testimonial } from '@/data/testimonials';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive?: boolean; // true = centered card (full opacity/scale), false = side card
}

export function TestimonialCard({
  testimonial,
  isActive = true,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        // Layout
        'relative flex flex-col justify-between min-h-[380px] md:min-h-[340px] rounded-3xl p-8 md:p-10',
        // Appearance
        'bg-[var(--bg-card)] border border-black/5 dark:border-white/5 shadow-lg hover:shadow-xl',
        // Active / side-card state transition
        'transition-all duration-500',
        isActive ? 'scale-100 opacity-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-black/5 dark:ring-white/10' : 'scale-[0.92] opacity-40 shadow-none',
      )}
    >
      {/* Decorative opening quote mark */}
      <span
        className="absolute top-4 left-6 font-syne text-6xl leading-none text-[var(--blewah)]/20 select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote body */}
      <p className="relative z-10 font-jakarta text-lg md:text-xl text-[var(--text-primary)] leading-relaxed pt-8 font-medium">
        {testimonial.quote}
      </p>

      {/* Author row */}
      <div className="mt-6 pt-4 border-t border-black/5 flex items-center gap-3">
        {/* Avatar */}
        <SmartImage
          src={testimonial.photo}
          alt={testimonial.name}
          width={48}
          height={48}
          fallbackText={testimonial.name.charAt(0)}
          fallbackBg="blewah"
          className="w-12 h-12 rounded-full object-cover border-2 border-white flex-shrink-0"
        />

        {/* Name + title */}
        <div className="flex-1 min-w-0">
          <p className="font-syne font-semibold text-sm text-[var(--text-primary)] truncate">
            {testimonial.name}
          </p>
          <p className="font-jakarta text-xs text-[var(--text-secondary)] truncate">
            {testimonial.title} at {testimonial.company}
          </p>
        </div>

        {/* LinkedIn link — SECURITY: noopener noreferrer prevents tabnabbing */}
        {testimonial.linkedInUrl && (
          <a
            href={testimonial.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${testimonial.name} di LinkedIn`}
            className="text-[var(--text-secondary)] hover:text-[var(--blewah)] transition-colors flex-shrink-0"
          >
            <Linkedin size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}
