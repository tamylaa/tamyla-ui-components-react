/**
 * Design Tokens - Migrated from ui-components with TypeScript safety
 * Single source of truth for all visual design decisions
 */

export const designTokens = {
  // Color system with semantic naming
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      contrast: '#ffffff'
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    },
    semantic: {
      success: {
        light: '#d1fae5',
        main: '#10b981',
        dark: '#047857',
        contrast: '#ffffff'
      },
      warning: {
        light: '#fef3c7',
        main: '#f59e0b',
        dark: '#d97706',
        contrast: '#ffffff'
      },
      error: {
        light: '#fee2e2',
        main: '#ef4444',
        dark: '#dc2626',
        contrast: '#ffffff'
      },
      info: {
        light: '#dbeafe',
        main: '#3b82f6',
        dark: '#1d4ed8',
        contrast: '#ffffff'
      }
    },
    surface: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
      elevated: '#ffffff'
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      tertiary: '#9ca3af',
      inverse: '#ffffff',
      disabled: '#d1d5db'
    },
    border: {
      primary: '#e5e7eb',
      secondary: '#d1d5db',
      focus: '#3b82f6',
      error: '#ef4444'
    }
  },

  // Spacing system - consistent throughout
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',   // 2px
    1: '0.25rem',      // 4px
    1.5: '0.375rem',   // 6px
    2: '0.5rem',       // 8px
    2.5: '0.625rem',   // 10px
    3: '0.75rem',      // 12px
    3.5: '0.875rem',   // 14px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    7: '1.75rem',      // 28px
    8: '2rem',         // 32px
    9: '2.25rem',      // 36px
    10: '2.5rem',      // 40px
    11: '2.75rem',     // 44px
    12: '3rem',        // 48px
    14: '3.5rem',      // 56px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    28: '7rem',        // 112px
    32: '8rem',        // 128px
    36: '9rem',        // 144px
    40: '10rem',       // 160px
    44: '11rem',       // 176px
    48: '12rem',       // 192px
    52: '13rem',       // 208px
    56: '14rem',       // 224px
    60: '15rem',       // 240px
    64: '16rem',       // 256px
    72: '18rem',       // 288px
    80: '20rem',       // 320px
    96: '24rem'        // 384px
  },

  // Typography system
  typography: {
    fontFamily: {
      sans: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif'
      ],
      mono: [
        'SF Mono',
        'Monaco',
        'Inconsolata',
        'Roboto Mono',
        'source-code-pro',
        'monospace'
      ]
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
      '8xl': '6rem',     // 96px
      '9xl': '8rem'      // 128px
    },
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    }
  },

  // Border radius system
  radii: {
    none: '0',
    sm: '0.125rem',    // 2px
    base: '0.25rem',   // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px'
  },

  // Shadow system
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none'
  },

  // Z-index system
  zIndex: {
    auto: 'auto',
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
    toast: 1070
  },

  // Animation system
  animations: {
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms'
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  // Component-specific tokens
  components: {
    button: {
      height: {
        xs: '1.5rem',    // 24px
        sm: '2rem',      // 32px
        md: '2.5rem',    // 40px
        lg: '3rem',      // 48px
        xl: '3.5rem'     // 56px
      },
      padding: {
        xs: '0.25rem 0.5rem',
        sm: '0.375rem 0.75rem',
        md: '0.5rem 1rem',
        lg: '0.625rem 1.25rem',
        xl: '0.75rem 1.5rem'
      }
    },
    input: {
      height: {
        sm: '2rem',      // 32px
        md: '2.5rem',    // 40px
        lg: '3rem'       // 48px
      }
    }
  },

  // Breakpoints for responsive design
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
} as const;

// Type definitions for TypeScript safety
// Type definitions (not exported due to Rollup build issues)
// TODO: Fix Rollup TypeScript configuration to enable type exports
type _DesignTokens = typeof designTokens;
type _ColorScale = keyof typeof designTokens.colors.primary;
type SpacingScale = keyof typeof designTokens.spacing;
type FontSize = keyof typeof designTokens.typography.fontSize;
type BorderRadius = keyof typeof designTokens.radii;
type Shadow = keyof typeof designTokens.shadows;
type _Breakpoint = keyof typeof designTokens.breakpoints;

// Helper functions for design token usage
export const getColor = (path: string) => {
  return path.split('.').reduce((obj: unknown, key) => (obj as Record<string, unknown>)?.[key], designTokens.colors);
};

export const getSpacing = (scale: SpacingScale) => {
  return designTokens.spacing[scale];
};

export const getFontSize = (scale: FontSize) => {
  return designTokens.typography.fontSize[scale];
};

export const getBorderRadius = (scale: BorderRadius) => {
  return designTokens.radii[scale];
};

export const getShadow = (scale: Shadow) => {
  return designTokens.shadows[scale];
};
