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
  metadataBase: new URL('https://glarewarden.com'),
  title: 'Glare Warden — Web Development Agency',
  description: 'Glare Warden adalah web development agency yang membangun website, web app, dan produk digital yang mengkonversi pengunjung jadi pelanggan.',
  openGraph: {
    title: 'Glare Warden',
    description: 'Glare Warden adalah web development agency yang membangun website, web app, dan produk digital yang mengkonversi pengunjung jadi pelanggan.',
    url: 'https://glarewarden.com',
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
