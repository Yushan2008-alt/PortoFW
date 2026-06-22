'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { site } from '@/data/site';

export function WhatsAppButton() {
  const [visible, setVisible] = useState(true);

  // Hide the button when Contact section is visible in viewport
  useEffect(() => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(contactSection);

    // Cleanup — disconnect observer on unmount to prevent memory leak
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  // SECURITY:
  // 1. site.whatsapp is digits-only in data/site.ts, but strip non-digits
  //    defensively in case the value is ever edited incorrectly.
  // 2. encodeURIComponent() prevents URL injection via the pre-filled message.
  // 3. target="_blank" rel="noopener noreferrer" prevents tabnabbing.
  const phone = site.whatsapp.replace(/\D/g, '');
  const message = encodeURIComponent(
    'Halo Glare Warden, saya ingin konsultasi project.',
  );
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      title="Chat via WhatsApp"
      className={[
        // Position & size
        'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full',
        // WhatsApp green
        'bg-[#25D366] shadow-lg shadow-[#25D366]/30',
        // Layout
        'flex items-center justify-center text-white',
        // Micro-animation: scale on hover, subtle pulse at rest
        'hover:scale-110 transition-transform duration-200',
        'animate-[wa-pulse_3s_ease-in-out_infinite]',
      ].join(' ')}
    >
      <MessageCircle size={26} fill="white" aria-hidden="true" />
    </a>
  );
}
