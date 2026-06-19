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

// FIX 4D — scale added to entry animation
const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
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
        {/* FIX 4A — gemini blob: higher opacity, less blur, larger */}
        <BlobMorph
          variant="gemini"
          size={780}
          opacity={0.78}
          blur={48}
          className="-right-48 -top-48"
        />
        {/* FIX 4A — second blewah blob, bottom-left */}
        <BlobMorph
          variant="blewah"
          size={380}
          opacity={0.45}
          blur={50}
          className="absolute -left-20 bottom-10"
        />
        <FloatingOrb color="purple" size={300} top="10%" left="5%"    delay={0} />
        <FloatingOrb color="blewah" size={200} bottom="15%" right="8%" delay={2} />
        <FloatingOrb color="teal"   size={150} top="60%" left="15%"   delay={4} />
      </div>

      {/* Content layer */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* FIX 6D — Radial glow, inset-0 */}
          <div
            className="absolute pointer-events-none inset-0"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 35%, rgba(155,109,255,0.12) 0%, transparent 70%)',
              zIndex: 0,
            }}
          />

          {/* 1. Badge */}
          <motion.div variants={itemVariants} className="relative z-10">
            <Badge variant="blewah">Tersedia untuk Project Baru ✦</Badge>
          </motion.div>

          {/* 2. Headline — FIX 6A: fluid clamp typography */}
          <motion.h1
            variants={itemVariants}
            className="relative z-10 mt-6 font-display font-bold leading-[0.95]"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}
          >
            Kami Bangun Website
            <br />
            <span className="gradient-text">Yang Menggerakkan Bisnis.</span>
          </motion.h1>

          {/* 3. Subtext — FIX 6B: fluid clamp */}
          <motion.p
            variants={itemVariants}
            className="relative z-10 mt-6 leading-relaxed max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'var(--text-secondary)' }}
          >
            Dari landing page hingga web app, Forza Studio membangun
            produk digital yang mengkonversi pengunjung jadi pelanggan.
          </motion.p>

          {/* 4. Buttons */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
          >
            <Button variant="primary" size="lg" href="#contact">
              Mulai Project Anda
            </Button>
            <Button variant="secondary" size="lg" href="#work">
              Lihat Karya Kami →
            </Button>
          </motion.div>

          {/* 5. Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 mt-20 flex flex-col items-center gap-2"
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
