/**
 * CSP-Compatible styled-components Configuration
 * Fixes Content Security Policy issues for trading portal integration
 */

import { StyleSheetManager } from 'styled-components';
import React from 'react';

// CSP nonce provider for styled-components
export interface CSPProviderProps {
  children: React.ReactNode;
  nonce?: string;
  disableCSSOMInjection?: boolean;
}

/**
 * CSP-compatible wrapper for styled-components
 * Use this instead of direct styled-components usage in CSP-strict environments
 */
export const CSPProvider: React.FC<CSPProviderProps> = ({
  children,
  nonce,
  disableCSSOMInjection = true
}) => {
  const managerProps: any = {
    enableVendorPrefixes: false,
    disableCSSOMInjection
  };

  // Add nonce to target if provided
  if (nonce && typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.setAttribute('nonce', nonce);
    managerProps.target = style;
  }

  return (
    <StyleSheetManager {...managerProps}>
      {children}
    </StyleSheetManager>
  );
};

/**
 * Get CSP nonce from meta tag or script attributes
 * Trading portals often provide nonce this way
 */
export function getCSPNonce(): string | undefined {
  // Check meta tag first
  const metaNonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content');
  if (metaNonce) return metaNonce;

  // Check script tag nonce
  const scriptNonce = document.querySelector('script[nonce]')?.getAttribute('nonce');
  if (scriptNonce) return scriptNonce;

  // Check window global (some portals set this)
  const windowNonce = (window as any).__CSP_NONCE__;
  if (windowNonce) return windowNonce;

  return undefined;
}

/**
 * Auto-detecting CSP provider
 * Automatically detects nonce and configures styled-components safely
 */
export const AutoCSPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nonce, setNonce] = React.useState<string | undefined>();

  React.useEffect(() => {
    // Only run in browser
    if (typeof window !== 'undefined') {
      const detectedNonce = getCSPNonce();
      setNonce(detectedNonce);
    }
  }, []);

  return (
    <CSPProvider nonce={nonce} disableCSSOMInjection={true}>
      {children}
    </CSPProvider>
  );
};

/**
 * Hook to get current CSP configuration
 */
export function useCSPConfig() {
  const [config, setConfig] = React.useState({
    nonce: undefined as string | undefined,
    hasCSP: false,
    isCompatible: true
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const nonce = getCSPNonce();
      const hasCSPMeta = !!document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      const hasCSPHeader = document.querySelector('meta[name="csp-enabled"]')?.getAttribute('content') === 'true';

      setConfig({
        nonce,
        hasCSP: hasCSPMeta || hasCSPHeader,
        isCompatible: !hasCSPMeta || !!nonce // Compatible if no CSP or nonce available
      });
    }
  }, []);

  return config;
}

export default CSPProvider;
