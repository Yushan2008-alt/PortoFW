'use client';
import { team } from '@/data/team';
import { SmartImage } from '@/components/ui/SmartImage';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function CountUp({ target, suffix = '+' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const inc = target / 50;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 25);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const principles = [
  { num: '01', title: 'Ship fast, polish faster', desc: 'Iterasi cepat, feedback nyata, polish setelah validasi.' },
  { num: '02', title: 'Code untuk besok', desc: 'Architecture yang bisa di-handover tanpa drama.' },
  { num: '03', title: 'Detail yang terasa', desc: 'Animasi 0.2 detik bisa bedakan "wah" dari "biasa".' },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      {/* Background decoration */}
      <div
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'var(--gradient-gemini)', opacity: 0.06, filter: 'blur(80px)' }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="gradient-text text-sm font-semibold tracking-[0.2em] uppercase">
            Who We Are
          </span>
        </motion.div>

        {/* Manifesto Quote */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-center max-w-4xl mx-auto leading-[1.05] mb-8"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}
        >
          Tim kecil, <span className="gradient-text">eksekusi besar.</span>
          <br />
          Tanpa overhead agency.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-2xl mx-auto leading-relaxed mb-16"
          style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: 'var(--text-secondary)' }}
        >
          Dua orang, satu meja kerja, satu standar. Dari riset, desain, sampai deploy ke production —
          kami tangani semuanya dengan kualitas yang sama seperti tim in-house, tapi tanpa
          birokrasi dan markup agency.
        </motion.p>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-20 pb-20 border-b"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          {[
            { target: 15, suffix: '+', label: 'Projects Built' },
            { target: 10, suffix: '+', label: 'Happy Clients' },
            { target: 2,  suffix: '',  label: 'Years Together' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="font-display font-bold gradient-text"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1 }}
              >
                <CountUp target={stat.target} suffix={stat.suffix} />
              </div>
              <div
                className="uppercase tracking-wider mt-2"
                style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)', color: 'var(--text-muted)' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative p-6 md:p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
            >
              {/* Gradient blur on hover */}
              <div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'var(--gradient-gemini)', filter: 'blur(20px)', zIndex: -1 }}
              />

              <div className="flex items-start gap-4 mb-4">
                <div
                  className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex-shrink-0"
                  style={{ boxShadow: 'var(--shadow-md)' }}
                >
                  <SmartImage
                    src={member.avatar}
                    alt={member.name}
                    fallbackText={member.name}
                    width={120}
                    height={120}
                    fallbackBg={i === 0 ? 'gemini' : 'blewah'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-display font-bold"
                    style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)', color: 'var(--text-primary)' }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="font-medium mt-1"
                    style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)', color: 'var(--blewah)' }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>

              <p
                className="leading-relaxed mb-4"
                style={{ fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)', color: 'var(--text-secondary)' }}
              >
                {member.bio}
              </p>

              <blockquote
                className="border-l-2 pl-4 my-5 italic"
                style={{
                  borderColor: 'var(--blewah)',
                  fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
                  color: 'var(--text-primary)',
                }}
              >
                &ldquo;{member.quote}&rdquo;
              </blockquote>

              <div className="flex flex-wrap gap-2 mt-4">
                {member.specialty.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full font-medium"
                    style={{
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-secondary)',
                      fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Working Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--text-muted)' }}>
            How We Work
          </span>
          <h3
            className="font-display font-bold mt-3"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}
          >
            Tiga prinsip yang tidak kami kompromikan.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {principles.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl border transition-all duration-300"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div
                className="font-display font-bold gradient-text mb-3"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                {p.num}
              </div>
              <h4
                className="font-semibold mb-2"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--text-primary)' }}
              >
                {p.title}
              </h4>
              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)', color: 'var(--text-secondary)' }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
