import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, CATEGORY_LABELS } from '@/data/projects';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  Clock,
  CheckCircle2,
} from 'lucide-react';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return { title: 'Project Not Found | Glare Warden' };
  }

  return {
    title: `${project.title} - Case Study | Glare Warden`,
    description: project.tagline,
  };
}

/* ─── Section heading accent ─── */
function SectionAccent() {
  return (
    <div
      className="h-[2px] w-10 rounded-full mb-4"
      style={{
        background: 'linear-gradient(90deg, var(--blewah), var(--gemini-purple))',
      }}
    />
  );
}

export default async function ProjectDetail({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const prevProject = project.prevProjectId
    ? projects.find((p) => p.id === project.prevProjectId)
    : undefined;
  const nextProject = project.nextProjectId
    ? projects.find((p) => p.id === project.nextProjectId)
    : undefined;

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>

      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO — Full-bleed image + overlay
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[80vh] min-h-[520px] overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={`${project.title} — Hero`}
          fill
          className="object-cover"
          priority
        />
        {/* Layered gradient overlay for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to top, rgba(15,14,13,0.92) 0%, rgba(15,14,13,0.4) 40%, transparent 70%),
              linear-gradient(to bottom, rgba(15,14,13,0.15) 0%, transparent 30%)
            `,
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-14 lg:p-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-xs font-semibold tracking-widest uppercase rounded-full px-4 py-1.5"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {CATEGORY_LABELS[project.categorySlug]}
              </span>
              <span className="text-sm text-white/50">&mdash;</span>
              <span
                className="flex items-center gap-1.5 text-sm text-white/60"
              >
                <Calendar size={14} />
                {project.year}
              </span>
            </div>
            <h1
              className="font-display font-bold text-white leading-[1.05] max-w-4xl text-fluid-3xl md:text-fluid-4xl"
            >
              {project.title}
            </h1>
            <p className="mt-5 text-fluid-lg md:text-fluid-xl text-white/60 max-w-2xl leading-relaxed">
              {project.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          Content wrapper — negative margin pulls it above hero bottom
         ═══════════════════════════════════════════════════════════════════ */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">

        {/* ── 2. AT A GLANCE ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 rounded-2xl shadow-sm overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {[
            { label: 'Industry', value: project.industry || CATEGORY_LABELS[project.categorySlug] },
            {
              label: 'Duration',
              value: (
                <span className="flex items-center gap-2">
                  <Clock size={15} style={{ color: 'var(--text-muted)' }} />
                  {project.duration || 'N/A'}
                </span>
              ),
            },
            { label: 'Services', value: project.services ? project.services.join(', ') : 'Web Design, Development' },
          ].map((item, i) => (
            <div
              key={item.label}
              className="p-6 sm:p-8"
              style={{
                borderRight: i < 2 ? '1px solid var(--border-subtle)' : 'none',
                borderBottom: 'none',
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                {item.label}
              </p>
              <p className="font-medium leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── 3. METRICS ── */}
        {project.metrics && project.metrics.length > 0 && (
          <div
            className="mt-10 grid grid-cols-3 gap-6 md:gap-10 p-8 sm:p-10 rounded-2xl"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {project.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="font-display font-bold gradient-text text-3xl md:text-4xl">
                  {metric.value}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════
            Main content: 2-column grid (sidebar on right)
           ═════════════════════════════════════════════════════════════════ */}
        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-14">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-8 space-y-20">

            {/* 4. ABOUT */}
            <section>
              <SectionAccent />
              <h2
                className="font-display font-bold text-2xl sm:text-3xl mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                About the Project
              </h2>
              <div
                className="text-fluid-base leading-[1.75] space-y-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                <p>{project.description}</p>
              </div>
            </section>

            {/* 5. GALLERY */}
            {project.gallery && project.gallery.length > 0 && (
              <section className="space-y-8">
                {project.gallery.map((imgSrc, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-2xl shadow-sm transition-all duration-500 hover:shadow-md"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <Image
                      src={imgSrc}
                      alt={`${project.title} — Screenshot ${index + 1}`}
                      width={1200}
                      height={675}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </section>
            )}

            {/* 6. CHALLENGES — Problem / Solution */}
            {(project.challengeProblem || project.challengeSolution) && (
              <section
                className="rounded-2xl p-8 sm:p-12 lg:p-14 relative overflow-hidden"
                style={{ background: 'var(--bg-dark)' }}
              >
                {/* Subtle gradient orb decoration */}
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-10"
                  style={{
                    background:
                      'radial-gradient(circle, var(--gemini-purple), transparent 70%)',
                  }}
                />
                <div
                  className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full opacity-10"
                  style={{
                    background:
                      'radial-gradient(circle, var(--gemini-teal), transparent 70%)',
                  }}
                />

                <div className="relative z-10">
                  <SectionAccent />
                  <h2
                    className="font-display font-bold text-2xl sm:text-3xl mb-10 text-white"
                  >
                    Challenges &amp; Solutions
                  </h2>
                  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                    <div>
                      <h3
                        className="text-xs font-semibold uppercase tracking-widest mb-4"
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                      >
                        Problem
                      </h3>
                      <p className="leading-relaxed text-white/75">
                        {project.challengeProblem || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <h3
                        className="text-xs font-semibold uppercase tracking-widest mb-4"
                        style={{ color: 'var(--blewah)' }}
                      >
                        Solution
                      </h3>
                      <p className="leading-relaxed text-white/75">
                        {project.challengeSolution || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT COLUMN — Sidebar ── */}
          <aside className="lg:col-span-4">
            {project.keyTakeaways && project.keyTakeaways.length > 0 && (
              <div
                className="sticky top-24 rounded-2xl p-6 sm:p-8 shadow-sm"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <h3
                  className="font-display font-bold text-lg mb-6"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Key Takeaways
                </h3>
                <ul className="space-y-4">
                  {project.keyTakeaways.map((takeaway, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: 'var(--blewah)' }}
                      />
                      {takeaway}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                {project.techStack && project.techStack.length > 0 && (
                  <div
                    className="mt-8 pt-8"
                    style={{ borderTop: '1px solid var(--border-subtle)' }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-4"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 tech-pill-hover"
                          style={{
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)',
                            border: '1px solid transparent',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Links */}
                {(project.liveUrl || project.repoUrl) && (
                  <div
                    className="mt-8 pt-8 space-y-3"
                    style={{ borderTop: '1px solid var(--border-subtle)' }}
                  >
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-2 w-full rounded-xl px-6 py-3.5 text-sm font-medium transition-all duration-300"
                        style={{
                          background: 'var(--bg-dark)',
                          color: 'var(--text-on-dark)',
                        }}
                      >
                        <span>View Live Project</span>
                        <ExternalLink
                          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    )}
                    {project.repoUrl && !project.liveUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-2 w-full rounded-xl px-6 py-3.5 text-sm font-medium transition-all duration-300"
                        style={{
                          background: 'var(--bg-dark)',
                          color: 'var(--text-on-dark)',
                        }}
                      >
                        <span>View Source Code</span>
                        <ExternalLink
                          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            8. PREV / NEXT NAVIGATION
            ═════════════════════════════════════════════════════════════════ */}
        <div
          className="my-28 flex flex-col justify-between gap-8 py-14 sm:flex-row sm:items-center"
          style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div className="flex-1">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.id}`}
                className="group flex flex-col items-start gap-1"
              >
                <span
                  className="text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Previous Project
                </span>
                <span
                  className="flex items-center gap-3 text-lg sm:text-xl font-medium transition-colors duration-300 group-hover:opacity-70"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <ArrowLeft
                    className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1.5"
                    style={{ color: 'var(--blewah)' }}
                  />
                  {prevProject.title}
                </span>
              </Link>
            )}
          </div>

          <div className="flex-1 sm:text-right">
            {nextProject && (
              <Link
                href={`/projects/${nextProject.id}`}
                className="group flex flex-col items-start sm:items-end gap-1"
              >
                <span
                  className="text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Next Project
                </span>
                <span
                  className="flex items-center gap-3 text-lg sm:text-xl font-medium transition-colors duration-300 group-hover:opacity-70"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {nextProject.title}
                  <ArrowRight
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
                    style={{ color: 'var(--blewah)' }}
                  />
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            9. CTA
            ═════════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden rounded-3xl px-6 py-20 sm:px-12 lg:px-20 text-center"
          style={{ background: 'var(--bg-dark)' }}
        >
          {/* Subtle gradient orbs */}
          <div
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-[0.07]"
            style={{
              background:
                'radial-gradient(circle, var(--gemini-pink), transparent 70%)',
            }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-[0.07]"
            style={{
              background:
                'radial-gradient(circle, var(--gemini-blue), transparent 70%)',
            }}
          />

          <div className="relative z-10">
            <h2
              className="font-display font-bold text-3xl sm:text-4xl text-white mb-5"
            >
              Ready to Build Something Similar?
            </h2>
            <p className="mx-auto max-w-xl text-fluid-base text-white/50 mb-10 leading-relaxed">
              Let&apos;s discuss how we can help bring your ideas to life.
            </p>
            <Link
              href="/#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span>Start Your Project</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* ── 10. BACK LINK ── */}
        <div className="text-center py-16">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300"
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to All Projects</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
