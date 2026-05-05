'use client';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { BlobMorph } from '@/components/ui/BlobMorph';
import { FloatingOrb } from '@/components/ui/FloatingOrb';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <BlobMorph
          variant="gemini"
          size={700}
          opacity={0.55}
          blur={80}
          className="-right-48 -top-48"
        />
        <FloatingOrb color="purple" size={300} top="10%" left="5%"   delay={0} />
        <FloatingOrb color="blewah" size={200} bottom="15%" right="8%" delay={2} />
        <FloatingOrb color="teal"   size={150} top="60%" left="15%"  delay={4} />
      </div>

      {/* Content layer */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* 1. Badge */}
          <motion.div variants={itemVariants}>
            <Badge variant="blewah">Available for Projects ✦</Badge>
          </motion.div>

          {/* 2. Headline */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 font-bold leading-tight text-4xl sm:text-5xl md:text-7xl"
            style={{ fontFamily: 'var(--font-syne, sans-serif)', color: 'var(--text-primary)' }}
          >
            We Build Digital
            <br />
            <span className="gradient-text">Products That Move.</span>
          </motion.h1>

          {/* 3. Subtext */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Tim 2 developer yang fokus pada hasil nyata. Dari desain ke produksi, kami tangani semuanya.
          </motion.p>

          {/* 4. Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
          >
            <Button variant="primary" size="lg" href="#work">
              See Our Work
            </Button>
            <Button variant="secondary" size="lg" href="#contact">
              Get In Touch →
            </Button>
          </motion.div>

          {/* 5. Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-20 flex flex-col items-center gap-2"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="text-xs">Scroll</span>
            <ChevronDown size={20} className="animate-bounce-scroll" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
