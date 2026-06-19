'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProjectCTA() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-zinc-900 rounded-[2.5rem] p-12 md:p-24 text-center border border-zinc-800 shadow-2xl"
          >
            {/* Ambient Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
              <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-600/30 blur-[120px] rounded-full" />
              <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-600/30 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                Terinspirasi dengan <br className="hidden md:block" /> apa yang Anda lihat?
              </h2>
              <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl font-light">
                Mari berkolaborasi dan wujudkan ide bisnis Anda menjadi produk digital nyata yang bekerja dengan optimal.
              </p>
              
              <Link 
                href="/#contact"
                className="group inline-flex items-center justify-center gap-3 bg-white text-zinc-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:bg-gray-100 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
              >
                Mulai Project Anda
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
