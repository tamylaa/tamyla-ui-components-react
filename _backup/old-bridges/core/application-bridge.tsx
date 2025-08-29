/**
 * Application Factory Bridge - React wrappers for application components
 * Handles: Application-level components (currently disabled due to missing exports)
 */

import React, { useEffect, useRef } from 'react';
// TODO: Re-enable when actual exports are available
// import {
//   EnhancedSearchApplicationFactory,
//   CampaignSelectorSystem,
//   ContentManagerApplicationFactory,
//   TamylaUISystem
// } from '@tamyla/ui-components';

// Application factory instances (disabled until exports are available)
const applicationFactories = {
  // enhancedSearch: EnhancedSearchApplicationFactory,
  // campaignSelector: CampaignSelectorSystem,
  // contentManager: ContentManagerApplicationFactory,
  // tamylaUI: TamylaUISystem
} as const;

// Application factory mapping
export const APPLICATION_FACTORIES = {
  // TODO: Re-enable application factories when exports are available
} as const;

// Hook for application factory bridge
export function useApplicationFactory() {
  const createApplicationElement = (applicationType: keyof typeof APPLICATION_FACTORIES, config: Record<string, any> = {}) => {
    // Currently disabled - no application factories available
    throw new Error(`Application factory ${String(applicationType)} not available - missing exports`);
  };

  return { createApplicationElement };
}

// Generic Application Bridge Component
interface ApplicationBridgeProps {
  application: keyof typeof APPLICATION_FACTORIES;
  config?: Record<string, any>;
  onMount?: (element: HTMLElement) => void;
  onUnmount?: () => void;
}

export const ApplicationBridge: React.FC<ApplicationBridgeProps> = ({
  application,
  config = {},
  onMount,
  onUnmount,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { createApplicationElement } = useApplicationFactory();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    try {
      const element = createApplicationElement(application, { ...config, ...props });
      container.appendChild(element);
      onMount?.(element);

      return () => {
        if (container?.contains(element)) {
          container.removeChild(element);
        }
        onUnmount?.();
      };
    } catch (error) {
      console.error(`Application bridge error for ${application}:`, error);
    }
  }, [application, config, onMount, onUnmount, createApplicationElement, props]);

  return <div ref={containerRef} />;
};

export default ApplicationBridge;
