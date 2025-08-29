/**
 * Application Factory Bridge - React wrappers for application components
 * Handles: Enhanced Search, Campaign Selector, Content Manager, TamylaUI System
 */

import React, { useEffect, useRef } from 'react';
import {
  EnhancedSearchApplicationFactory,
  CampaignSelectorSystem,
  ContentManagerApplicationFactory,
  TamylaUISystem
} from '@tamyla/ui-components';

// Application factory instances (these are usually functions that return instances)
const applicationFactories = {
  enhancedSearch: EnhancedSearchApplicationFactory,  // function factory
  campaignSelector: new CampaignSelectorSystem(),    // class factory
  contentManager: ContentManagerApplicationFactory,  // function factory
  tamylaUI: TamylaUISystem                          // function factory
} as const;

// Application factory mapping
export const APPLICATION_FACTORIES = {
  // Enhanced Search Application
  EnhancedSearch: () => applicationFactories.enhancedSearch,

  // Campaign Selector System
  CampaignSelector: () => applicationFactories.campaignSelector,

  // Content Manager Application
  ContentManager: () => applicationFactories.contentManager,

  // Main TamylaUI System
  TamylaUI: () => applicationFactories.tamylaUI
} as const;

// Hook for application factory bridge
export function useApplicationFactory() {
  const createApplicationElement = (applicationType: keyof typeof APPLICATION_FACTORIES, config: any = {}) => {
    const factoryFn = APPLICATION_FACTORIES[applicationType];
    if (!factoryFn) {
      throw new Error(`Application factory ${applicationType} not found`);
    }

    const factory = factoryFn();
    let element: HTMLElement;

    if (typeof factory === 'function') {
      // Function factory that returns instance
      const result = (factory as any)(config);
      element = (result as any)?.element || result;
    } else if ((factory as any)?.create) {
      // Instance with create method
      const result = (factory as any).create(config);
      element = (result as any)?.element || result;
    } else if ((factory as any)?.render) {
      // Instance with render method
      const result = (factory as any).render(config);
      element = (result as any)?.element || result;
    } else {
      throw new Error(`Application factory ${applicationType} has invalid format`);
    }

    return element;
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

    try {
      const element = createApplicationElement(application, { ...config, ...props });
      containerRef.current.appendChild(element);
      onMount?.(element);

      return () => {
        if (containerRef.current?.contains(element)) {
          containerRef.current.removeChild(element);
        }
        onUnmount?.();
      };
    } catch (error) {
      console.error(`Application bridge error for ${application}:`, error);
    }
  }, [application, config, onMount, onUnmount, createApplicationElement]);

  return <div ref={containerRef} />;
};

export default ApplicationBridge;
