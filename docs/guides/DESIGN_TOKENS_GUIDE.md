# Design Tokens Guide - @tamyla/ui-components-react

## 🎨 Design Tokens System

This guide provides structured access to the design tokens system used throughout the component library.

## 📊 Token Categories

### Colors
The color system uses a structured palette with semantic naming.

#### Primary Colors
```css
--tamyla-color-primary-50: #eff6ff;   /* Lightest */
--tamyla-color-primary-100: #dbeafe;
--tamyla-color-primary-200: #bfdbfe;
--tamyla-color-primary-300: #93c5fd;
--tamyla-color-primary-400: #60a5fa;
--tamyla-color-primary-500: #3b82f6;  /* Base */
--tamyla-color-primary-600: #2563eb;  /* Hover */
--tamyla-color-primary-700: #1d4ed8;
--tamyla-color-primary-800: #1e40af;
--tamyla-color-primary-900: #1e3a8a;
--tamyla-color-primary-950: #172554;  /* Darkest */
```

#### Neutral Colors
```css
--tamyla-color-neutral-50: #fafafa;   /* Lightest */
--tamyla-color-neutral-100: #f5f5f5;
--tamyla-color-neutral-200: #e5e5e5;
--tamyla-color-neutral-300: #d4d4d4;
--tamyla-color-neutral-400: #a3a3a3;
--tamyla-color-neutral-500: #737373;  /* Base */
--tamyla-color-neutral-600: #525252;
--tamyla-color-neutral-700: #404040;
--tamyla-color-neutral-800: #262626;
--tamyla-color-neutral-900: #171717;
--tamyla-color-neutral-950: #0a0a0a;  /* Darkest */
```

#### Semantic Colors
```css
/* Success */
--tamyla-color-success-50: #f0fdf4;
--tamyla-color-success-500: #10b981;
--tamyla-color-success-900: #14532d;

/* Warning */
--tamyla-color-warning-50: #fffbeb;
--tamyla-color-warning-500: #f59e0b;
--tamyla-color-warning-900: #78350f;

/* Error */
--tamyla-color-error-50: #fef2f2;
--tamyla-color-error-500: #ef4444;
--tamyla-color-error-900: #7f1d1d;
```

### Spacing Scale
```css
--tamyla-spacing-0: 0;
--tamyla-spacing-1: 0.25rem;    /* 4px */
--tamyla-spacing-2: 0.5rem;     /* 8px */
--tamyla-spacing-3: 0.75rem;    /* 12px */
--tamyla-spacing-4: 1rem;       /* 16px */
--tamyla-spacing-5: 1.25rem;    /* 20px */
--tamyla-spacing-6: 1.5rem;     /* 24px */
--tamyla-spacing-8: 2rem;       /* 32px */
--tamyla-spacing-10: 2.5rem;    /* 40px */
--tamyla-spacing-12: 3rem;      /* 48px */
--tamyla-spacing-16: 4rem;      /* 64px */
--tamyla-spacing-20: 5rem;      /* 80px */
--tamyla-spacing-24: 6rem;      /* 96px */
```

### Border Radius
```css
--tamyla-border-radius-none: 0;
--tamyla-border-radius-sm: 0.125rem;   /* 2px */
--tamyla-border-radius-md: 0.375rem;   /* 6px */
--tamyla-border-radius-lg: 0.5rem;     /* 8px */
--tamyla-border-radius-xl: 0.75rem;    /* 12px */
--tamyla-border-radius-2xl: 1rem;      /* 16px */
--tamyla-border-radius-full: 9999px;   /* Fully rounded */
```

### Font Sizes
```css
--tamyla-font-size-xs: 0.75rem;     /* 12px */
--tamyla-font-size-sm: 0.875rem;    /* 14px */
--tamyla-font-size-base: 1rem;      /* 16px */
--tamyla-font-size-lg: 1.125rem;    /* 18px */
--tamyla-font-size-xl: 1.25rem;     /* 20px */
--tamyla-font-size-2xl: 1.5rem;     /* 24px */
--tamyla-font-size-3xl: 1.875rem;   /* 30px */
--tamyla-font-size-4xl: 2.25rem;    /* 36px */
```

### Shadows
```css
--tamyla-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--tamyla-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--tamyla-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--tamyla-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

## 🎯 Usage Patterns

### Customizing Component Colors
```css
/* Override button primary color */
.my-button {
  --tamyla-color-primary-500: #your-brand-color;
  --tamyla-color-primary-600: #your-brand-color-hover;
}
```

### Custom Spacing
```css
/* Custom card padding */
.my-card {
  padding: var(--tamyla-spacing-6);
  gap: var(--tamyla-spacing-4);
}
```

### Theme Integration
```tsx
import { TamylaThemeProvider } from '@tamyla/ui-components-react';

// Wrap your app for automatic token application
<TamylaThemeProvider>
  <App />
</TamylaThemeProvider>
```

### CSS Custom Properties Override
```css
:root {
  /* Override entire color palette */
  --tamyla-color-primary-500: #6366f1;  /* Indigo */
  --tamyla-color-primary-600: #4f46e5;

  /* Override spacing */
  --tamyla-spacing-4: 1.25rem;

  /* Override border radius */
  --tamyla-border-radius-lg: 0.625rem;
}
```

## 🔧 Token Reference

### Programmatic Access
Design tokens are available in the component registry:

```javascript
import registry from './component-registry.json';

const primaryColors = registry.designTokens.colors.primary;
const spacing = registry.designTokens.spacing;
```

### TypeScript Types
```typescript
interface DesignTokens {
  colors: {
    primary: Record<string, string>;
    neutral: Record<string, string>;
    success: Record<string, string>;
    warning: Record<string, string>;
    error: Record<string, string>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  fontSize: Record<string, string>;
  shadows: Record<string, string>;
}
```

## 📚 Related Resources

- [Component Discovery Guide](COMPONENT_DISCOVERY_GUIDE.md) - Find components that use these tokens
- [API Reference](API_REFERENCE.md) - Component prop documentation
- [Examples](../examples/) - See tokens in action</content>
<parameter name="filePath">c:\Users\Admin\Documents\coding\tamyla\ui-platform\packages\ui-components-react\docs\guides\DESIGN_TOKENS_GUIDE.md
