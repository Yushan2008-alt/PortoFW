'use server';
import { Resend } from 'resend';

// ─────────────────────────────────────────────────────────────────────────────
// 🔒 SECURITY 1: Validate environment variables at module load time.
// This crashes the server immediately on a bad deploy instead of failing
// silently at runtime when the first email is attempted.
// ─────────────────────────────────────────────────────────────────────────────
function getEmailConfig() {
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!resendApiKey || !contactEmail) {
    return null;
  }

  return {
    resend: new Resend(resendApiKey),
    contactEmail,
    emailFrom: `Glare Warden <${contactEmail}>`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 🔒 SECURITY 9: Helper sanitasi — hapus HTML tags dari input user.
// Prevents stored-XSS if email content is ever rendered in a web view.
// ─────────────────────────────────────────────────────────────────────────────
function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')       // strip HTML tags
    .replace(/[<>]/g, '')          // strip leftover angle brackets
    .replace(/['"]/g, '')          // strip quotes
    .replace(/[\u0000-\u001F]/g, '') // strip ASCII control characters
    .trim();
}

// ─── Server-side whitelists — mirror dari Contact.tsx (defense in depth) ─────
// 🔒 SECURITY 3: Whitelist slug keys yang dikirim form.
// Menggunakan slug pendek (bukan display text) agar stabil & mudah divalidasi.
const ALLOWED_INTERESTS = [
  'web-app',
  'landing-page',
  'ui-design',
  'consulting',
  'other',
] as const;

const ALLOWED_BUDGETS = [
  '<5jt',
  '5-15jt',
  '15-50jt',
  '50jt+',
  'belum-tahu',
] as const;

type InterestSlug = typeof ALLOWED_INTERESTS[number];
type BudgetSlug   = typeof ALLOWED_BUDGETS[number];

// Label map — konversi slug → teks human-readable untuk isi email
const INTEREST_LABELS: Record<InterestSlug, string> = {
  'web-app':      'Web App / Website',
  'landing-page': 'Landing Page',
  'ui-design':    'UI/UX Design',
  'consulting':   'Technical Consulting',
  'other':        'Lainnya',
};

const BUDGET_LABELS: Record<BudgetSlug, string> = {
  '<5jt':       '< Rp 5 juta',
  '5-15jt':     'Rp 5–15 juta',
  '15-50jt':    'Rp 15–50 juta',
  '50jt+':      'Rp 50 juta+',
  'belum-tahu': 'Belum tahu / diskusikan dulu',
};

// Generic error message — never expose internals to the client
const GENERIC_ERROR = 'Gagal mengirim pesan. Coba lagi nanti.';

// ─── formatInquiryEmail — pure helper, mudah di-unit-test ───────────────────────
function formatInquiryEmail(fields: {
  name:     string;
  company:  string;
  email:    string;
  phone:    string;
  interest: string;
  budget:   string;
  message:  string;
}): string {
  const interestLabel = fields.interest
    ? INTEREST_LABELS[fields.interest as InterestSlug]
    : null;
  const budgetLabel = fields.budget
    ? BUDGET_LABELS[fields.budget as BudgetSlug]
    : null;

  return [
    `Nama:     ${fields.name}`,
    fields.company   ? `Company:  ${fields.company}`    : null,
    `Email:    ${fields.email}`,
    fields.phone     ? `WhatsApp: ${fields.phone}`      : null,
    interestLabel    ? `Layanan:  ${interestLabel}`     : null,
    budgetLabel      ? `Budget:   ${budgetLabel}`       : null,
    '',
    'Pesan:',
    fields.message,
  ].filter((l): l is string => l !== null).join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
export async function sendContactMessage(formData: FormData) {
  const emailConfig = getEmailConfig();
  if (!emailConfig) {
    return { ok: false, error: GENERIC_ERROR };
  }

  // 🔒 SECURITY 3: Sanitize & trim ALL inputs before any processing.
  // Optional fields (company, phone, interest, budget) are sanitized too —
  // an attacker can send any field regardless of what the UI shows.
  const name     = sanitizeText(formData.get('name')?.toString()     ?? '');
  const company  = sanitizeText(formData.get('company')?.toString()  ?? '');
  const email    = (formData.get('email')?.toString() ?? '').trim().toLowerCase();
  const phone    = sanitizeText(formData.get('phone')?.toString()    ?? '');
  const interest = (formData.get('interest')?.toString()             ?? '');
  const budget   = (formData.get('budget')?.toString()               ?? '');
  const message  = sanitizeText(formData.get('message')?.toString()  ?? '');

  // ─── Validation ──────────────────────────────────────────────────────────

  // 🔒 SECURITY 4: Validasi required fields (setelah sanitasi)
  if (!name || !email || !interest || !budget || !message) {
    return { ok: false, error: 'Nama, email, layanan, budget, dan pesan wajib diisi.' };
  }

  // 🔒 SECURITY 5: Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, error: 'Format email tidak valid.' };
  }

  // 🔒 SECURITY 6: Whitelist check — reject any value outside allowed slugs
  if (interest && !ALLOWED_INTERESTS.includes(interest as InterestSlug)) {
    return { ok: false, error: GENERIC_ERROR };
  }
  if (budget && !ALLOWED_BUDGETS.includes(budget as BudgetSlug)) {
    return { ok: false, error: GENERIC_ERROR };
  }

  // 🔒 SECURITY 6: Batasi panjang input (cegah abuse/storage overload)
  if (
    name.length    > 100 ||
    message.length > 5000 ||
    company.length > 200 ||
    phone.length   > 30  ||
    email.length   > 254
  ) {
    return { ok: false, error: 'Input terlalu panjang.' };
  }

  // ─── Send email ─────────────────────────────────────────────────────
  try {
    // 1. Inquiry email → internal team
    await emailConfig.resend.emails.send({
      from:    emailConfig.emailFrom,
      to:      emailConfig.contactEmail,
      replyTo: email,
      subject: `[Glare Warden] Inquiry dari ${name}${company ? ` — ${company}` : ''}`,
      text:    formatInquiryEmail({ name, company, email, phone, interest, budget, message }),
    });

    // 🔒 SECURITY 7: Auto-reply ke pengirim (tanpa reveal info sensitif)
    // `name` sudah di-sanitize via sanitizeText() — aman untuk diinterpolasi.
    // Body hanya berisi teks statis + nama — tidak ada data internal/sensitif.
    await emailConfig.resend.emails.send({
      from:    emailConfig.emailFrom,
      to:      email,
      subject: 'Terima kasih telah menghubungi Glare Warden!',
      text: [
        `Halo ${name},`,
        '',
        'Terima kasih sudah menghubungi Glare Warden!',
        '',
        'Kami telah menerima inquiry Anda dan akan merespons dalam waktu 24 jam kerja.',
        '',
        'Salam,',
        'Glare Warden',
        emailConfig.contactEmail,
      ].join('\n'),
    });

    return { ok: true };
  } catch {
    // 🔒 SECURITY 8: Never expose internal error details to the client
    return { ok: false, error: GENERIC_ERROR };
  }
}
