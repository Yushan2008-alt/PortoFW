import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { ProjectTestimonial } from '@/components/sections/ProjectTestimonial';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  Calendar, 
  Briefcase, 
  Clock, 
  Building2,
  Quote
} from 'lucide-react';

type Props = {
  params: Promise<{ id: string }>;
};

// --- Generate Metadata for SEO ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: 'Project Not Found | Forza Studio',
    };
  }

  return {
    title: `${project.title} - Case Study | Forza Studio`,
    description: project.tagline,
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Cari Prev & Next Project berdasarkan ID
  const prevProject = project.prevProjectId 
    ? projects.find((p) => p.id === project.prevProjectId) 
    : undefined;
  const nextProject = project.nextProjectId 
    ? projects.find((p) => p.id === project.nextProjectId) 
    : undefined;

  return (
    <main className="min-h-screen bg-stone-50 pb-24 pt-32">
      <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          href="/#work" 
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        {/* 1. HERO IMAGE (full-width, 16:9) */}
        <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl bg-stone-200">
          <Image
            src={project.thumbnail}
            alt={`${project.title} - Hero`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* HEADER SECTION */}
        <div className="mb-16 max-w-3xl">
          {/* 2. Title (h1) */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          
          {/* 3. Description (tagline panjang) */}
          <p className="mb-8 text-xl leading-relaxed text-stone-600 sm:text-2xl">
            {project.tagline}
          </p>

          {/* 4. Tags: Industry · Year · Services */}
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-stone-500">
            {project.industry && (
              <span className="flex items-center gap-1.5 rounded-full bg-stone-200/50 px-3 py-1">
                <Building2 className="h-4 w-4" />
                {project.industry}
              </span>
            )}
            <span className="flex items-center gap-1.5 rounded-full bg-stone-200/50 px-3 py-1">
              <Calendar className="h-4 w-4" />
              {project.year}
            </span>
            {project.services && project.services.length > 0 && (
              <span className="flex items-center gap-1.5 rounded-full bg-stone-200/50 px-3 py-1">
                <Briefcase className="h-4 w-4" />
                {project.services.join(', ')}
              </span>
            )}
          </div>
        </div>

        {/* 9. Summary Card (Industry | Duration | Services) */}
        <div className="mb-16 grid grid-cols-1 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="p-6">
            <h3 className="mb-2 text-sm font-semibold text-stone-400 uppercase tracking-wider">Industry</h3>
            <p className="font-medium text-stone-900">{project.industry || project.category}</p>
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-sm font-semibold text-stone-400 uppercase tracking-wider">Duration</h3>
            <p className="flex items-center gap-2 font-medium text-stone-900">
              <Clock className="h-4 w-4 text-stone-400" />
              {project.duration || 'N/A'}
            </p>
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-sm font-semibold text-stone-400 uppercase tracking-wider">Services</h3>
            <p className="font-medium text-stone-900">
              {project.services ? project.services.join(', ') : 'Web Design, Development'}
            </p>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          
          <div className="lg:col-span-8">
            {/* 5. "Tentang Project" section */}
            <section className="mb-16">
              <h2 className="mb-6 text-2xl font-bold text-stone-900 sm:text-3xl">Tentang Project</h2>
              <div className="prose prose-stone max-w-none text-lg leading-relaxed text-stone-600">
                <p>{project.description}</p>
              </div>
            </section>

            {/* 7. "Tantangan" section (Problem -> Solution) */}
            {(project.challengeProblem || project.challengeSolution) && (
              <section className="mb-16 rounded-2xl bg-stone-900 p-8 sm:p-12 text-stone-50">
                <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Tantangan & Solusi</h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-stone-400">Problem</h3>
                    <p className="text-stone-300 leading-relaxed">
                      {project.challengeProblem || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-[#10B981]">Solution</h3>
                    <p className="text-stone-300 leading-relaxed">
                      {project.challengeSolution || 'N/A'}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 6. Image Gallery (2-3 screenshot) */}
            {project.gallery && project.gallery.length > 0 && (
              <section className="mb-16 space-y-8">
                {project.gallery.map((imgSrc, index) => (
                  <div key={index} className="relative overflow-hidden rounded-2xl bg-stone-200 shadow-sm border border-stone-200/50">
                    <Image
                      src={imgSrc}
                      alt={`${project.title} - Screenshot ${index + 1}`}
                      width={1200}
                      height={675}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </section>
            )}
          </div>

          <aside className="lg:col-span-4">
            {/* 8. "Hasil Utama" (Key Takeaways) */}
            {project.keyTakeaways && project.keyTakeaways.length > 0 && (
              <div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
                <h3 className="mb-6 text-xl font-bold text-stone-900">Key Takeaways</h3>
                <ul className="space-y-4">
                  {project.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3 text-stone-600">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#10B981]" />
                      <span className="leading-relaxed">{takeaway}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="mt-8 border-t border-stone-100 pt-8">
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-stone-400">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 11. Project Links */}
                {(project.liveUrl || project.repoUrl) && (
                  <div className="mt-8 border-t border-stone-100 pt-8">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 font-medium text-white transition-all hover:bg-stone-800 hover:shadow-md"
                      >
                        View Live Project
                        <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                    {project.repoUrl && !project.liveUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 font-medium text-white transition-all hover:bg-stone-800 hover:shadow-md"
                      >
                        View Source Code
                        <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </aside>

        </div>

        {/* 10. Testimonial Client (jika ada) */}
        {project.testimonialId && (
          <div className="my-24">
            <ProjectTestimonial testimonialId={project.testimonialId} />
          </div>
        )}

        {/* 12. Navigasi: Prev Project | Next Project */}
        <div className="my-24 flex flex-col justify-between gap-6 border-y border-stone-200 py-12 sm:flex-row sm:items-center">
          <div className="flex-1">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.id}`}
                className="group flex flex-col items-start"
              >
                <span className="mb-2 text-sm font-semibold uppercase tracking-wider text-stone-400 transition-colors group-hover:text-stone-600">
                  Previous Project
                </span>
                <span className="flex items-center gap-3 text-xl font-medium text-stone-900 transition-colors group-hover:text-[#10B981]">
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  {prevProject.title}
                </span>
              </Link>
            )}
          </div>
          
          <div className="flex-1 sm:text-right">
            {nextProject && (
              <Link
                href={`/projects/${nextProject.id}`}
                className="group flex flex-col items-start sm:items-end"
              >
                <span className="mb-2 text-sm font-semibold uppercase tracking-wider text-stone-400 transition-colors group-hover:text-stone-600">
                  Next Project
                </span>
                <span className="flex items-center gap-3 text-xl font-medium text-stone-900 transition-colors group-hover:text-[#10B981]">
                  {nextProject.title}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* 13. CTA: "Mulai Project Anda" */}
        <div className="mt-24 rounded-3xl bg-stone-900 px-6 py-16 text-center sm:px-12 lg:px-24">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            Siap Membangun Project Serupa?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-stone-400">
            Mari diskusikan bagaimana kami bisa membantu mewujudkan ide Anda menjadi produk digital yang luar biasa.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-stone-900 transition-all hover:scale-105 hover:bg-stone-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Mulai Project Anda
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

      </article>
    </main>
  );
}
