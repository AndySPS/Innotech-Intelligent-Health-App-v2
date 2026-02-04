
/**
 * MATERIAL 3 DESIGN TOKENS - PREMIUM UPGRADE
 */

export const M3_SPACING = {
  xs: 'dp-4',   // 4dp
  sm: 'dp-8',   // 8dp (Grid base)
  md: 'dp-16',  // 16dp
  lg: 'dp-24',  // 24dp
  xl: 'dp-32',  // 32dp
  touch: 'dp-48' // 48dp (Min touch target)
} as const;

export const M3_TYPOGRAPHY = {
  display: {
    large: 'text-7xl font-extrabold tracking-[-2px]',
    medium: 'text-5xl font-extrabold tracking-[-1px]',
    small: 'text-4xl font-bold tracking-[-0.5px]',
  },
  headline: {
    large: 'text-3xl font-extrabold tracking-[-0.5px]',
    medium: 'text-2xl font-bold tracking-[-0.25px]',
    small: 'text-xl font-bold',
  },
  title: {
    large: 'text-lg font-bold tracking-tight',
    medium: 'text-base font-bold tracking-tight',
    small: 'text-sm font-semibold uppercase tracking-widest',
  },
  body: {
    large: 'text-base font-medium text-slate-700',
    medium: 'text-sm font-medium text-slate-600',
    small: 'text-xs font-semibold text-slate-500',
  },
  label: {
    large: 'text-sm font-bold tracking-wide',
    medium: 'text-xs font-bold uppercase tracking-widest',
    small: 'text-[10px] font-extrabold uppercase tracking-[0.1em]',
  }
} as const;

export const M3_SHAPE = {
  none: 'rounded-m3-none',
  extraSmall: 'rounded-m3-xs',
  small: 'rounded-m3-sm',
  medium: 'rounded-m3-md',
  large: 'rounded-m3-lg',
  extraLarge: 'rounded-m3-xl',
  full: 'rounded-m3-full',
  // Standardized semantic tokens
  card: 'rounded-m3-xl',      // 32dp - Refined for premium feel
  container: 'rounded-m3-lg', // 28dp
} as const;
