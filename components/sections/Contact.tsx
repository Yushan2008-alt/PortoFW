'use client';
import { useRef, useState } from 'react';
import { sendContactMessage } from '@/app/actions';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  minHeight: 48,
  borderRadius: 12,
  background: 'var(--bg-card)',
  border: '1px solid var(--border-medium)',
  color: 'var(--text-primary)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 200ms',
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const result = await sendContactMessage(formData);

    if (result.ok) {
      setStatus('success');
      formRef.current?.reset();
    } else {
      setStatus('error');
      setErrorMsg(result.error ?? 'Terjadi kesalahan.');
    }
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = 'var(--gemini-purple)';
  }
  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = 'var(--border-medium)';
  }

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 0% 0%,   rgba(74,144,217,0.08)  0%, transparent 60%),
            radial-gradient(ellipse at 100% 0%,  rgba(155,109,255,0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 100% 100%,rgba(232,121,160,0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 0% 100%,  rgba(62,207,207,0.08)  0%, transparent 60%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <Badge variant="blewah">Let&apos;s Work Together ✦</Badge>

          <h2
            className="mt-4 font-display font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Punya Project yang Menarik?
          </h2>

          <p className="mt-4" style={{ color: 'var(--text-secondary)' }}>
            Ceritakan projectmu. Kami balas dalam 24 jam.
          </p>
        </ScrollReveal>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-5 text-left"
        >
          <Field label="Nama">
            <input
              type="text"
              name="name"
              required
              placeholder="Nama kamu"
              style={inputBase}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              name="email"
              required
              placeholder="email@kamu.com"
              style={inputBase}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </Field>

          <Field label="Ceritakan projectmu">
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Describe your project, goals, and timeline..."
              style={{ ...inputBase, resize: 'vertical' }}
              onFocus={onFocus as React.FocusEventHandler<HTMLTextAreaElement>}
              onBlur={onBlur as React.FocusEventHandler<HTMLTextAreaElement>}
            />
          </Field>

          <Button
            variant="primary"
            size="lg"
            className="w-full justify-center"
            onClick={status === 'loading' ? undefined : undefined}
          >
            {status === 'loading' ? 'Mengirim...' : 'Kirim Brief →'}
          </Button>

          {status === 'success' && (
            <div className="mt-4 rounded-xl p-4 border text-sm"
              style={{
                background: 'rgb(240,253,244)',
                borderColor: 'rgb(187,247,208)',
                color: 'rgb(21,128,61)',
              }}
            >
              Pesan terkirim! Kami akan balas dalam 24 jam.
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 rounded-xl p-4 border text-sm"
              style={{
                background: 'rgb(254,242,242)',
                borderColor: 'rgb(254,202,202)',
                color: 'rgb(185,28,28)',
              }}
            >
              {errorMsg}
            </div>
          )}
        </form>

        {/* Direct email */}
        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Atau langsung email kami:
          </p>
          <a
            href="mailto:hello@forzastudio.dev"
            className="text-sm hover:underline"
            style={{ color: 'var(--gemini-purple)' }}
          >
            hello@forzastudio.dev
          </a>
        </div>
      </div>
    </section>
  );
}
