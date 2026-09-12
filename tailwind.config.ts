import type { Config } from 'tailwindcss'

const withAlpha = (varName: string) => `rgb(var(${varName}) / <alpha-value>)`

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        bg: {
          primary: withAlpha('--bg-primary-rgb'),
          secondary: withAlpha('--bg-secondary-rgb'),
          tertiary: withAlpha('--bg-tertiary-rgb'),
        },
        gold: {
          DEFAULT: withAlpha('--gold-rgb'),
          light: withAlpha('--gold-light-rgb'),
          dark: withAlpha('--gold-dark-rgb'),
        },
        ember: withAlpha('--ember-rgb'),
        bone: withAlpha('--bone-rgb'),
        muted: withAlpha('--muted-rgb'),
        border: withAlpha('--border-rgb'),
        glass: withAlpha('--glass-rgb'),
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        accent: ['var(--font-accent)', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        pill: '999px',
      },
      boxShadow: {
        'float-sm': '0 4px 12px rgb(0 0 0 / 0.3)',
        'float-md': '0 12px 32px -8px rgb(0 0 0 / 0.5)',
        'float-lg': '0 24px 64px -16px rgb(0 0 0 / 0.7)',
        'glow-gold': '0 0 40px rgb(var(--gold-rgb) / 0.25)',
        'glow-gold-lg': '0 0 80px rgb(var(--gold-rgb) / 0.35)',
      },
      backdropBlur: {
        glass: '20px',
        ambient: '120px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgb(var(--gold-rgb) / 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgb(var(--gold-rgb) / 0)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        drift: 'drift 20s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
