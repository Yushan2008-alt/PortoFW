import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://forzastudio.dev'),
  title: 'Forza Studio — We Build Products That Move',
  description: 'Tim 2 developer freelance. Web app, mobile app, dan produk digital berkualitas.',
  openGraph: {
    title: 'Forza Studio',
    description: 'Tim 2 developer freelance. Web app, mobile app, dan produk digital berkualitas.',
    url: 'https://forzastudio.dev',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${syne.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
