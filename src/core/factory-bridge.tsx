/**
 * Factory Bridge - Integration layer between ui-components and React
 * Provides seamless interop with vanilla JS components
 */

import React, { useEffect, useRef, useCallback } from 'react';

// Type definitions for ui-components integration
interface FactoryComponentProps {
  componentType: string;
  config?: Record<string, any>;
  children?: React.ReactNode;
  className?: string;
  onEvent?: (eventType: string, data: any) => void;
}

/**
 * Factory Bridge Component - React wrapper for ui-components
 */
export const FactoryBridge: React.FC<FactoryComponentProps> = ({
  componentType,
  config = {},
  children,
  className,
  onEvent
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<any>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        // Dynamic import from ui-components - handle missing peer dependency gracefully
        let UIComponents: any = null;
        try {
          UIComponents = await import('@tamyla/ui-components');
        } catch (importError) {
          console.warn('Peer dependency @tamyla/ui-components not available:', importError);
          return;
        }

        if (!UIComponents || !(UIComponents as any)[componentType]) {
          console.error(`Component type ${componentType} not found in ui-components`);
          return;
        }

        // Create component instance
        const componentFactory = (UIComponents as any)[componentType];
        const element = componentFactory(config);

        // Store reference for cleanup
        componentRef.current = element;

        // Add to DOM
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(element);
        }

        // Setup event forwarding
        if (onEvent) {
          element.addEventListener('*', (event: any) => {
            onEvent(event.type, event.detail);
          });
        }

      } catch (error) {
        console.error('Failed to load ui-component:', error);
      }
    };

    loadComponent();

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      componentRef.current = null;
    };
  }, [componentType, config, onEvent]);

  return (
    <div
      ref={containerRef}
      className={className}
      data-component-type={componentType}
    >
      {children}
    </div>
  );
};

/**
 * Factory Bridge Service - Static methods for component creation
 */
export class FactoryBridgeService {
  static async createComponent(
    componentType: string,
    config: Record<string, any> = {}
  ): Promise<HTMLElement | null> {
    try {
      // Handle missing peer dependency gracefully
      let UIComponents: any = null;
      try {
        UIComponents = await import('@tamyla/ui-components');
      } catch (importError) {
        console.warn('Peer dependency @tamyla/ui-components not available:', importError);
        return null;
      }

      if (!UIComponents || !(UIComponents as any)[componentType]) {
        throw new Error(`Component type ${componentType} not found`);
      }

      const componentFactory = (UIComponents as any)[componentType];
      return componentFactory(config);
    } catch (error) {
      console.error('Failed to create factory component:', error);
      return null;
    }
  }

  static async loadUIComponents() {
    try {
      // Handle missing peer dependency gracefully
      try {
        return await import('@tamyla/ui-components');
      } catch (importError) {
        console.warn('Peer dependency @tamyla/ui-components not available:', importError);
        return null;
      }
    } catch (error) {
      console.error('Failed to load ui-components:', error);
      return null;
    }
  }
}

/**
 * Hook for using Factory Bridge in React components
 */
export const useFactoryBridge = () => {
  const createFactoryComponent = useCallback(async (
    componentType: string,
    config: Record<string, any> = {}
  ): Promise<HTMLElement | null> => {
    return FactoryBridgeService.createComponent(componentType, config);
  }, []);

  return {
    createFactoryComponent,
    FactoryBridge,
    loadUIComponents: FactoryBridgeService.loadUIComponents
  };
};

export default FactoryBridge;
