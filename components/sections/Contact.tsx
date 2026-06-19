'use client';
import { useRef, useState } from 'react';
import { sendContactMessage } from '@/app/actions';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { interestOptions, budgetOptions } from '@/types/contact';

// ─── Regex email sederhana — mencegah request sia-sia ke server ───────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
        {label}
        {required && <span aria-hidden="true" style={{ color: 'var(--blewah)', marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus]         = useState<Status>('idle');
  // ─── Security: hanya pesan generik — detail error tidak diekspos ke user ──
  const [clientError, setClientError] = useState('');

  function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = 'var(--gemini-purple)';
  }
  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = 'var(--border-medium)';
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setClientError('');

    const form     = e.currentTarget;
    const formData = new FormData(form);

    // ─── Client-side validation ────────────────────────────────────────────
    const name     = (formData.get('name')    as string).trim();
    const email    = (formData.get('email')   as string).trim();
    const message  = (formData.get('message') as string).trim();
    const interest = formData.get('interest') as string;
    const budget   = formData.get('budget')   as string;

    // 1. Required field check
    if (!name || !email || !interest || !budget || !message) {
      setClientError('Nama, email, layanan, budget, dan pesan wajib diisi.');
      setStatus('idle');
      return;
    }

    // 2. Email format check (regex) — cegah request sia-sia ke server
    if (!EMAIL_REGEX.test(email)) {
      setClientError('Format email tidak valid.');
      setStatus('idle');
      return;
    }

    // 3. Whitelist validation — interest & budget harus dari opsi yang tersedia
    const validInterests = interestOptions.map((o) => o.value) as readonly string[];
    const validBudgets   = budgetOptions.map((o) => o.value)   as readonly string[];
    if (interest && !validInterests.includes(interest)) {
      setClientError('Pilihan layanan tidak valid.');
      setStatus('idle');
      return;
    }
    if (budget && !validBudgets.includes(budget)) {
      setClientError('Pilihan budget tidak valid.');
      setStatus('idle');
      return;
    }

    setStatus('loading');

    // ─── Server call ───────────────────────────────────────────────────────
    const result = await sendContactMessage(formData);

    if (result.ok) {
      setStatus('success');
      formRef.current?.reset();
    } else {
      setStatus('error');
      // Security: selalu tampilkan pesan generik — jangan ekspos detail server
      setClientError('Gagal mengirim pesan. Coba lagi nanti.');
    }
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
          {/* Header copy — Content_Strategy.md §2.13 */}
          <Badge variant="blewah">Mulai Project Anda ✦</Badge>

          <h2
            className="mt-4 font-display font-bold"
            style={{
              fontSize: 'clamp(1.4rem, 4vw, 2.5rem)',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Punya Ide yang Ingin Diwujudkan?
          </h2>

          <p className="mt-4" style={{ color: 'var(--text-secondary)' }}>
            Ceritakan kebutuhan bisnismu. Tim kami akan merespons dalam 24 jam.
          </p>
        </ScrollReveal>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-5 text-left"
          noValidate   /* Kita handle sendiri via JS — lebih konsisten antar browser */
        >
          {/* Nama */}
          <Field label="Nama lengkap" required>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              maxLength={100}
              placeholder="Nama lengkap*"
              autoComplete="name"
              style={inputBase}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </Field>

          {/* Email — type="email" aktifkan validasi browser sebagai fallback */}
          <Field label="Email" required>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              maxLength={254}
              placeholder="Email*"
              autoComplete="email"
              style={inputBase}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </Field>

          {/* No. WhatsApp — opsional */}
          <Field label="No. WhatsApp">
            <input
              type="tel"
              id="contact-phone"
              name="phone"
              maxLength={30}
              placeholder="No. WhatsApp"
              autoComplete="tel"
              style={inputBase}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </Field>

          {/* Interest — whitelist radio/select, bukan free-text */}
          <Field label="Saya tertarik dengan" required>
            <select
              id="contact-interest"
              name="interest"
              required
              defaultValue=""
              style={{ ...inputBase, cursor: 'pointer' }}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              <option value="" disabled>Pilih layanan...</option>
              {interestOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>

          {/* Budget — whitelist select, bukan free-text */}
          <Field label="Estimasi budget" required>
            <select
              id="contact-budget"
              name="budget"
              required
              defaultValue=""
              style={{ ...inputBase, cursor: 'pointer' }}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              <option value="" disabled>Pilih range budget...</option>
              {budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>

          {/* Pesan — maxlength cegah payload abuse */}
          <Field label="Ceritakan tentang project Anda" required>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              maxLength={5000}
              placeholder="Ceritakan tentang project Anda*"
              style={{ ...inputBase, resize: 'vertical' }}
              onFocus={onFocus as React.FocusEventHandler<HTMLTextAreaElement>}
              onBlur={onBlur as React.FocusEventHandler<HTMLTextAreaElement>}
            />
          </Field>

          {/* Client-side validation error */}
          {clientError && status !== 'error' && (
            <p role="alert" className="text-sm" style={{ color: 'rgb(185,28,28)' }}>
              {clientError}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full justify-center"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
          </Button>

          {/* Success */}
          {status === 'success' && (
            <div
              role="status"
              className="mt-4 rounded-xl p-4 border text-sm"
              style={{
                background: 'rgb(240,253,244)',
                borderColor: 'rgb(187,247,208)',
                color: 'rgb(21,128,61)',
              }}
            >
              Pesan terkirim! 🎉 Tim kami akan merespons dalam 24 jam.
            </div>
          )}

          {/* Error — pesan generik saja, tidak ada detail server */}
          {status === 'error' && (
            <div
              role="alert"
              className="mt-4 rounded-xl p-4 border text-sm"
              style={{
                background: 'rgb(254,242,242)',
                borderColor: 'rgb(254,202,202)',
                color: 'rgb(185,28,28)',
              }}
            >
              {clientError}
            </div>
          )}
        </form>

        {/* Alt contact */}
        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Atau hubungi kami langsung:
          </p>
          <a
            href="mailto:glarewardengroup@gmail.com"
            className="text-sm hover:underline"
            style={{ color: 'var(--gemini-purple)' }}
          >
            glarewardengroup@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
