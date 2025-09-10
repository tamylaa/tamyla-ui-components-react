import 'styled-components';
import type { ThemeExtensions } from './types/common';

// Global DOM API types to fix ESLint no-undef errors
declare global {
  interface MediaQueryListEvent extends Event {
    matches: boolean;
    media: string;
  }

  interface EventListener {
    (evt: Event): void;
  }

  interface AddEventListenerOptions {
    once?: boolean;
    passive?: boolean;
    capture?: boolean;
    signal?: AbortSignal;
  }

  interface RequestInit {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
    signal?: AbortSignal;
    [key: string]: any;
  }

  interface Response {
    ok: boolean;
    status: number;
    statusText: string;
    json(): Promise<any>;
    text(): Promise<string>;
    blob(): Promise<Blob>;
    [key: string]: any;
  }

  class AbortController {
    signal: AbortSignal;
    abort(): void;
  }

  interface Navigator {
    userAgent: string;
  }

  var navigator: Navigator;
}

// Type declarations for peer dependencies - make conditional to avoid compile errors
declare module '@tamyla/ui-components' {
  export interface ComponentConfig {
    [key: string]: unknown;
  }

  export interface UIComponent {
    (config?: ComponentConfig): HTMLElement;
  }

  export interface UIComponentsModule {
    [componentName: string]: UIComponent;
    Button?: UIComponent;
    Card?: UIComponent;
    Input?: UIComponent;
    Dialog?: UIComponent;
    // Add other component types as needed
  }

  const UIComponents: UIComponentsModule;
  export default UIComponents;
}

// Global type for dynamic imports - use proper typing to avoid compilation errors when peer dep is missing
declare global {
  const UIComponents: {
    [componentName: string]: unknown;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme {
    // Theme mode and colors
    mode?: 'light' | 'dark' | 'auto';
    primaryColor?: string;

    colors: {
      background: string;
      foreground: string;
      primary: string;
      secondary: string;
      success: string;
      warning: string;
      error: string;
      muted: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    typography: {
      fontFamily: string;
      fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}