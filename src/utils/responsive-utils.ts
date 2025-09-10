/**
 * Responsive Design Utilities
 * Provides utilities for mobile-first responsive design and touch-friendly interactions
 */

import { designTokens } from '../core/design-tokens';

/**
 * Responsive breakpoint utilities
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

/**
 * Touch-friendly size mappings (minimum 44px for touch targets)
 */
export const touchFriendlySizes = {
  button: {
    sm: 'min-h-[44px] px-3 py-2 text-sm',      // 44px min height
    default: 'min-h-[44px] px-4 py-2 text-base', // 44px min height
    lg: 'min-h-[48px] px-6 py-3 text-lg',       // 48px for larger screens
    icon: 'min-h-[44px] min-w-[44px] w-11 h-11' // 44px square for icons
  },
  input: {
    sm: 'min-h-[44px] px-3 py-2 text-sm',
    default: 'min-h-[44px] px-3 py-2 text-base',
    lg: 'min-h-[48px] px-4 py-3 text-lg'
  },
  card: {
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  }
} as const;

/**
 * Responsive size variants that scale with screen size
 */
export const responsiveSizes = {
  button: {
    xs: 'h-8 px-2 py-1 text-xs sm:h-9 sm:px-3 sm:py-2 sm:text-sm', // Mobile: 32px, Desktop: 36px
    sm: 'min-h-[44px] px-3 py-2 text-sm sm:h-10 sm:px-4 sm:py-2 sm:text-base', // Mobile: 44px, Desktop: 40px
    default: 'min-h-[44px] px-4 py-2 text-base sm:h-11 sm:px-6 sm:py-3 sm:text-lg', // Mobile: 44px, Desktop: 44px
    lg: 'min-h-[48px] px-6 py-3 text-lg sm:h-12 sm:px-8 sm:py-4 sm:text-xl', // Mobile: 48px, Desktop: 48px
    icon: 'min-h-[44px] min-w-[44px] w-11 h-11 sm:w-12 sm:h-12' // Mobile: 44px, Desktop: 48px
  },
  input: {
    xs: 'h-8 px-2 py-1 text-xs sm:h-9 sm:px-3 sm:py-2 sm:text-sm',
    sm: 'min-h-[44px] px-3 py-2 text-sm sm:h-10 sm:px-4 sm:py-2 sm:text-base',
    default: 'min-h-[44px] px-3 py-2 text-base sm:h-11 sm:px-4 sm:py-3 sm:text-lg',
    lg: 'min-h-[48px] px-4 py-3 text-lg sm:h-12 sm:px-6 sm:py-4 sm:text-xl'
  },
  badge: {
    xs: 'px-1.5 py-0.5 text-xs sm:px-2 sm:py-0.5 sm:text-xs',
    sm: 'px-2 py-0.5 text-xs sm:px-2.5 sm:py-0.5 sm:text-sm',
    default: 'px-2.5 py-0.5 text-sm sm:px-3 sm:py-1 sm:text-base',
    lg: 'px-3 py-1 text-base sm:px-4 sm:py-1.5 sm:text-lg'
  },
  status: {
    xs: 'w-2 h-2 sm:w-3 sm:h-3',
    sm: 'w-3 h-3 sm:w-4 sm:h-4',
    default: 'w-4 h-4 sm:w-5 sm:h-5',
    lg: 'w-5 h-5 sm:w-6 sm:h-6'
  },
  card: {
    xs: 'p-2 sm:p-3',
    sm: 'p-3 sm:p-4',
    default: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8'
  },
  navigation: {
    xs: 'h-8 px-2 py-1 text-xs sm:h-9 sm:px-3 sm:py-2 sm:text-sm',
    sm: 'min-h-[44px] px-3 py-2 text-sm sm:h-10 sm:px-4 sm:py-2 sm:text-base',
    default: 'min-h-[44px] px-4 py-2 text-base sm:h-11 sm:px-6 sm:py-3 sm:text-lg',
    lg: 'min-h-[48px] px-6 py-3 text-lg sm:h-12 sm:px-8 sm:py-4 sm:text-xl'
  },
  dialog: {
    sm: 'max-w-sm sm:max-w-md',
    default: 'max-w-md sm:max-w-lg',
    lg: 'max-w-lg sm:max-w-xl',
    xl: 'max-w-xl sm:max-w-2xl'
  },
  hovercard: {
    sm: 'w-48 sm:w-64',
    default: 'w-64 sm:w-80',
    lg: 'w-80 sm:w-96'
  },
  popover: {
    sm: 'w-56 sm:w-72',
    default: 'w-72 sm:w-80',
    lg: 'w-80 sm:w-96'
  }
} as const;

/**
 * Responsive typography utilities
 */
export const responsiveTypography = {
  heading: {
    h1: 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl',
    h2: 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl',
    h3: 'text-lg sm:text-xl lg:text-2xl xl:text-3xl',
    h4: 'text-base sm:text-lg lg:text-xl xl:text-2xl',
    h5: 'text-sm sm:text-base lg:text-lg xl:text-xl',
    h6: 'text-xs sm:text-sm lg:text-base xl:text-lg'
  },
  body: {
    sm: 'text-sm sm:text-base',
    default: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl'
  }
} as const;

/**
 * Responsive spacing utilities
 */
export const responsiveSpacing = {
  gap: {
    xs: 'gap-2 sm:gap-3',
    sm: 'gap-3 sm:gap-4',
    default: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-12'
  },
  margin: {
    xs: 'm-2 sm:m-3',
    sm: 'm-3 sm:m-4',
    default: 'm-4 sm:m-6',
    lg: 'm-6 sm:m-8'
  },
  padding: {
    xs: 'p-2 sm:p-3',
    sm: 'p-3 sm:p-4',
    default: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8'
  }
} as const;

/**
 * Mobile-first responsive grid utilities
 */
export const responsiveGrid = {
  cols: {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  },
  gap: {
    xs: 'gap-2 sm:gap-3 lg:gap-4',
    sm: 'gap-3 sm:gap-4 lg:gap-6',
    default: 'gap-4 sm:gap-6 lg:gap-8',
    lg: 'gap-6 sm:gap-8 lg:gap-12'
  }
} as const;

/**
 * Responsive layout utilities
 */
export const responsiveLayout = {
  container: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  flex: {
    stack: 'flex flex-col sm:flex-row',
    reverse: 'flex flex-col-reverse sm:flex-row',
    center: 'flex flex-col sm:flex-row items-center justify-center'
  },
  hidden: {
    mobile: 'block sm:hidden',
    tablet: 'hidden sm:block lg:hidden',
    desktop: 'hidden lg:block'
  }
} as const;

/**
 * Touch and interaction utilities
 */
export const touchUtilities = {
  // Minimum touch target sizes
  minTouch: 'min-h-[44px] min-w-[44px]',
  // Touch feedback
  tap: 'active:scale-95 transition-transform duration-75',
  // Focus states for keyboard navigation
  focus: 'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2',
  // Hover states (desktop only)
  hover: 'hover:opacity-80 sm:hover:opacity-100'
} as const;

/**
 * Utility function to combine responsive classes
 */
export const combineResponsive = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Check if device is mobile (screen width < 768px)
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Check if device is tablet (screen width >= 768px and < 1024px)
 */
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

/**
 * Check if device is desktop (screen width >= 1024px)
 */
export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
};

/**
 * Get responsive size based on current screen size
 */
export const getResponsiveSize = (component: keyof typeof responsiveSizes, size: string): string => {
  const componentSizes = responsiveSizes[component];
  return componentSizes[size as keyof typeof componentSizes] || componentSizes.default;
};
