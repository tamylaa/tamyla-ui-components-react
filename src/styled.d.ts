import 'styled-components';

// Type declarations for peer dependencies - make conditional to avoid compile errors
declare module '@tamyla/ui-components' {
  export interface ComponentConfig {
    [key: string]: any;
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

// Global type for dynamic imports - use 'any' to avoid compilation errors when peer dep is missing
declare global {
  const UIComponents: any;
}

declare module 'styled-components' {
  export interface DefaultTheme {
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