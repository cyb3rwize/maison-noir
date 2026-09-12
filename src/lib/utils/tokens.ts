export const tokens = {
  colors: {
    bg: { primary: '#0A0A0A', secondary: '#141414', tertiary: '#1C1C1C' },
    gold: { DEFAULT: '#C9A961', light: '#E0C485', dark: '#9A7F3F' },
    ember: '#E85D2F',
    bone: '#F5F0E8',
    muted: '#8A857C',
  },
  motion: {
    ease: { out: [0.16, 1, 0.3, 1], spring: [0.34, 1.56, 0.64, 1] },
    duration: { fast: 0.2, base: 0.4, slow: 0.8, float: 4 },
  },
  radius: { sm: 8, md: 16, lg: 24, pill: 999 },
} as const
