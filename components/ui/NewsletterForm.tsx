'use client';

import { useState } from 'react';
import { Send, Check } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // SECURITY: Email is kept in local React state only.
  // It is NOT persisted to localStorage, sessionStorage, or any cookie.
  // Phase 1 = UI feedback only; Phase 2 will wire this to Resend Audience API.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Email wajib diisi.');
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError('Format email tidak valid.');
      return;
    }

    // Phase 1: no backend — show success state then reset after 3s
    setError('');
    setSubmitted(true);
    setEmail(''); // clear input immediately

    const timer = setTimeout(() => setSubmitted(false), 3000);
    // Note: no cleanup needed here — setState after unmount is safe in React 18+
    // and the component is persistent in the footer. If needed, use useEffect.
    return () => clearTimeout(timer);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2"
      aria-label="Newsletter subscription"
      noValidate
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Alamat email
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email kamu"
        required
        autoComplete="email"
        disabled={submitted}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? 'newsletter-email-error' : undefined}
        className={[
          'flex-1 px-4 py-2.5 rounded-lg text-sm',
          'bg-white/5 border border-white/10',
          'text-white placeholder:text-white/40',
          'focus:border-[var(--blewah)] focus:outline-none',
          'transition-colors duration-200',
          'disabled:opacity-50',
        ].join(' ')}
      />
      <button
        type="submit"
        disabled={submitted || !email.trim()}
        aria-label={submitted ? 'Berhasil berlangganan' : 'Subscribe newsletter'}
        className={[
          'px-4 py-2.5 rounded-lg',
          'bg-[var(--blewah)] text-white',
          'hover:scale-105 active:scale-95',
          'transition-transform duration-200',
          'disabled:opacity-50 disabled:pointer-events-none',
          'flex items-center justify-center',
        ].join(' ')}
      >
        {submitted ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Send size={16} aria-hidden="true" />
        )}
      </button>
      {error && (
        <p id="newsletter-email-error" role="alert" className="sr-only">
          {error}
        </p>
      )}
    </form>
  );
}
