/**
 * Design Tokens - Migrated from ui-components with TypeScript safety
 * Single source of truth for all visual design decisions
 */
export declare const designTokens: {
    readonly colors: {
        readonly primary: {
            readonly 50: "#eff6ff";
            readonly 100: "#dbeafe";
            readonly 200: "#bfdbfe";
            readonly 300: "#93c5fd";
            readonly 400: "#60a5fa";
            readonly 500: "#3b82f6";
            readonly 600: "#2563eb";
            readonly 700: "#1d4ed8";
            readonly 800: "#1e40af";
            readonly 900: "#1e3a8a";
            readonly contrast: "#ffffff";
        };
        readonly neutral: {
            readonly 50: "#f9fafb";
            readonly 100: "#f3f4f6";
            readonly 200: "#e5e7eb";
            readonly 300: "#d1d5db";
            readonly 400: "#9ca3af";
            readonly 500: "#6b7280";
            readonly 600: "#4b5563";
            readonly 700: "#374151";
            readonly 800: "#1f2937";
            readonly 900: "#111827";
        };
        readonly semantic: {
            readonly success: {
                readonly light: "#d1fae5";
                readonly main: "#10b981";
                readonly dark: "#047857";
                readonly contrast: "#ffffff";
            };
            readonly warning: {
                readonly light: "#fef3c7";
                readonly main: "#f59e0b";
                readonly dark: "#d97706";
                readonly contrast: "#ffffff";
            };
            readonly error: {
                readonly light: "#fee2e2";
                readonly main: "#ef4444";
                readonly dark: "#dc2626";
                readonly contrast: "#ffffff";
            };
            readonly info: {
                readonly light: "#dbeafe";
                readonly main: "#3b82f6";
                readonly dark: "#1d4ed8";
                readonly contrast: "#ffffff";
            };
        };
        readonly surface: {
            readonly primary: "#ffffff";
            readonly secondary: "#f9fafb";
            readonly tertiary: "#f3f4f6";
            readonly elevated: "#ffffff";
        };
        readonly text: {
            readonly primary: "#111827";
            readonly secondary: "#6b7280";
            readonly tertiary: "#9ca3af";
            readonly inverse: "#ffffff";
            readonly disabled: "#d1d5db";
        };
        readonly border: {
            readonly primary: "#e5e7eb";
            readonly secondary: "#d1d5db";
            readonly focus: "#3b82f6";
            readonly error: "#ef4444";
        };
    };
    readonly spacing: {
        readonly 0: "0";
        readonly px: "1px";
        readonly 0.5: "0.125rem";
        readonly 1: "0.25rem";
        readonly 1.5: "0.375rem";
        readonly 2: "0.5rem";
        readonly 2.5: "0.625rem";
        readonly 3: "0.75rem";
        readonly 3.5: "0.875rem";
        readonly 4: "1rem";
        readonly 5: "1.25rem";
        readonly 6: "1.5rem";
        readonly 7: "1.75rem";
        readonly 8: "2rem";
        readonly 9: "2.25rem";
        readonly 10: "2.5rem";
        readonly 11: "2.75rem";
        readonly 12: "3rem";
        readonly 14: "3.5rem";
        readonly 16: "4rem";
        readonly 20: "5rem";
        readonly 24: "6rem";
        readonly 28: "7rem";
        readonly 32: "8rem";
        readonly 36: "9rem";
        readonly 40: "10rem";
        readonly 44: "11rem";
        readonly 48: "12rem";
        readonly 52: "13rem";
        readonly 56: "14rem";
        readonly 60: "15rem";
        readonly 64: "16rem";
        readonly 72: "18rem";
        readonly 80: "20rem";
        readonly 96: "24rem";
    };
    readonly typography: {
        readonly fontFamily: {
            readonly sans: readonly ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"];
            readonly mono: readonly ["SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "source-code-pro", "monospace"];
        };
        readonly fontSize: {
            readonly xs: "0.75rem";
            readonly sm: "0.875rem";
            readonly base: "1rem";
            readonly lg: "1.125rem";
            readonly xl: "1.25rem";
            readonly '2xl': "1.5rem";
            readonly '3xl': "1.875rem";
            readonly '4xl': "2.25rem";
            readonly '5xl': "3rem";
            readonly '6xl': "3.75rem";
            readonly '7xl': "4.5rem";
            readonly '8xl': "6rem";
            readonly '9xl': "8rem";
        };
        readonly fontWeight: {
            readonly thin: 100;
            readonly extralight: 200;
            readonly light: 300;
            readonly normal: 400;
            readonly medium: 500;
            readonly semibold: 600;
            readonly bold: 700;
            readonly extrabold: 800;
            readonly black: 900;
        };
        readonly lineHeight: {
            readonly none: 1;
            readonly tight: 1.25;
            readonly snug: 1.375;
            readonly normal: 1.5;
            readonly relaxed: 1.625;
            readonly loose: 2;
        };
    };
    readonly radii: {
        readonly none: "0";
        readonly sm: "0.125rem";
        readonly base: "0.25rem";
        readonly md: "0.375rem";
        readonly lg: "0.5rem";
        readonly xl: "0.75rem";
        readonly '2xl': "1rem";
        readonly '3xl': "1.5rem";
        readonly full: "9999px";
    };
    readonly shadows: {
        readonly sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
        readonly base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
        readonly md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
        readonly lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        readonly xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
        readonly '2xl': "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
        readonly inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)";
        readonly none: "none";
    };
    readonly zIndex: {
        readonly auto: "auto";
        readonly 0: 0;
        readonly 10: 10;
        readonly 20: 20;
        readonly 30: 30;
        readonly 40: 40;
        readonly 50: 50;
        readonly dropdown: 1000;
        readonly sticky: 1020;
        readonly fixed: 1030;
        readonly modal: 1040;
        readonly popover: 1050;
        readonly tooltip: 1060;
        readonly toast: 1070;
    };
    readonly animations: {
        readonly duration: {
            readonly 75: "75ms";
            readonly 100: "100ms";
            readonly 150: "150ms";
            readonly 200: "200ms";
            readonly 300: "300ms";
            readonly 500: "500ms";
            readonly 700: "700ms";
            readonly 1000: "1000ms";
        };
        readonly easing: {
            readonly linear: "linear";
            readonly in: "cubic-bezier(0.4, 0, 1, 1)";
            readonly out: "cubic-bezier(0, 0, 0.2, 1)";
            readonly inOut: "cubic-bezier(0.4, 0, 0.2, 1)";
        };
    };
    readonly components: {
        readonly button: {
            readonly height: {
                readonly xs: "1.5rem";
                readonly sm: "2rem";
                readonly md: "2.5rem";
                readonly lg: "3rem";
                readonly xl: "3.5rem";
            };
            readonly padding: {
                readonly xs: "0.25rem 0.5rem";
                readonly sm: "0.375rem 0.75rem";
                readonly md: "0.5rem 1rem";
                readonly lg: "0.625rem 1.25rem";
                readonly xl: "0.75rem 1.5rem";
            };
        };
        readonly input: {
            readonly height: {
                readonly sm: "2rem";
                readonly md: "2.5rem";
                readonly lg: "3rem";
            };
        };
    };
    readonly breakpoints: {
        readonly xs: "0px";
        readonly sm: "640px";
        readonly md: "768px";
        readonly lg: "1024px";
        readonly xl: "1280px";
        readonly '2xl': "1536px";
    };
};
type SpacingScale = keyof typeof designTokens.spacing;
type FontSize = keyof typeof designTokens.typography.fontSize;
type BorderRadius = keyof typeof designTokens.radii;
type Shadow = keyof typeof designTokens.shadows;
export declare const getColor: (path: string) => any;
export declare const getSpacing: (scale: SpacingScale) => "1rem" | "0.375rem" | "0.5rem" | "1px" | "0" | "0.25rem" | "0.75rem" | "1.25rem" | "1.5rem" | "2rem" | "2.5rem" | "3rem" | "4rem" | "5rem" | "6rem" | "8rem" | "10rem" | "12rem" | "14rem" | "16rem" | "0.875rem" | "2.25rem" | "3.5rem" | "1.75rem" | "0.125rem" | "0.625rem" | "2.75rem" | "7rem" | "9rem" | "11rem" | "13rem" | "15rem" | "18rem" | "20rem" | "24rem";
export declare const getFontSize: (scale: FontSize) => "1rem" | "0.75rem" | "1.25rem" | "1.5rem" | "3rem" | "6rem" | "8rem" | "0.875rem" | "1.125rem" | "1.875rem" | "2.25rem" | "3.75rem" | "4.5rem";
export declare const getBorderRadius: (scale: BorderRadius) => "1rem" | "0.375rem" | "0.5rem" | "0" | "0.25rem" | "0.75rem" | "1.5rem" | "9999px" | "0.125rem";
export declare const getShadow: (scale: Shadow) => "none" | "0 1px 2px 0 rgba(0, 0, 0, 0.05)" | "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" | "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" | "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" | "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)" | "0 25px 50px -12px rgba(0, 0, 0, 0.25)" | "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
export {};
//# sourceMappingURL=design-tokens.d.ts.map