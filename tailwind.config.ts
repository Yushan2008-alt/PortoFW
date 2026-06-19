import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          card: 'var(--bg-card)',
          dark: 'var(--bg-dark)',
        },
        gemini: {
          blue: 'var(--gemini-blue)',
          purple: 'var(--gemini-purple)',
          pink: 'var(--gemini-pink)',
          teal: 'var(--gemini-teal)',
        },
        blewah: {
          DEFAULT: 'var(--blewah)',
          light: 'var(--blewah-light)',
          deep: 'var(--blewah-deep)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-jakarta)', 'sans-serif'],
      },
      animation: {
        'morph-blob': 'morph-blob 8s ease-in-out infinite',
        'float-orb': 'float-orb 10s ease-in-out infinite',
        'bounce-scroll': 'bounce-scroll 1.5s ease-in-out infinite',
        // WhatsApp floating button — subtle attention pulse (not an error state)
        'wa-pulse': 'wa-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'wa-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
