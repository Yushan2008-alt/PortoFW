'use server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMessage(formData: FormData) {
  const name    = formData.get('name')?.toString().trim()    ?? '';
  const email   = formData.get('email')?.toString().trim()   ?? '';
  const message = formData.get('message')?.toString().trim() ?? '';

  if (!name || !email || !message) {
    return { ok: false, error: 'Semua field wajib diisi.' };
  }

  try {
    await resend.emails.send({
      from:    'Forza Studio <noreply@forzastudio.dev>',
      to:      process.env.CONTACT_EMAIL ?? 'hello@forzastudio.dev',
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text:    `From: ${name} <${email}>\n\n${message}`,
    });
    return { ok: true };
  } catch {
    return { ok: false, error: 'Gagal mengirim. Coba lagi nanti.' };
  }
}
