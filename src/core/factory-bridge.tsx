/**
 * Factory Bridge - Integration layer between ui-components and React
 * Provides seamless interop with vanilla JS components
 */

import React, { useEffect, useRef, useCallback } from 'react';
import logger from '../utils/logger';
import type {
  UIComponentsModule,
  BaseFactoryComponent,
  ComponentEventData,
  FactoryBridgeProps
} from '../types/factory';

/**
 * Factory Bridge Component - React wrapper for ui-components
 */
export const FactoryBridge: React.FC<FactoryBridgeProps> = ({
  componentType,
  config = {},
  children,
  className,
  onEvent,
  onMount,
  onUnmount
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<BaseFactoryComponent | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        // Dynamic import from ui-components - handle missing peer dependency gracefully
        let UIComponents: UIComponentsModule | null = null;
        try {
          const moduleName = '@tamyla/ui-components';
          UIComponents = await import(moduleName) as UIComponentsModule;
        } catch (importError) {
          logger.warn('Peer dependency @tamyla/ui-components not available:', importError, 'FactoryBridge');
          return;
        }

        if (!UIComponents || !UIComponents[componentType]) {
          logger.error(`Component type ${componentType} not found in ui-components`, undefined, 'FactoryBridge');
          return;
        }

        // Create component instance
        const componentFactory = UIComponents[componentType] as any; // Temporary any until we have proper factory typing
        const element = componentFactory(config);

        // Store reference for cleanup
        componentRef.current = element;

        // Add to DOM
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(element.element);
        }

        // Setup event forwarding
        if (onEvent) {
          element.element.addEventListener('*', (event: Event) => {
            const customEvent = event as any as { type: string; detail: unknown };
            const eventData: ComponentEventData = {
              type: customEvent.type,
              target: componentType,
              data: customEvent.detail,
              timestamp: Date.now()
            };
            onEvent(eventData);
          });
        }

        // Call onMount callback
        if (onMount) {
          onMount(element);
        }

      } catch (error) {
        logger.error('Failed to load ui-component:', error, 'FactoryBridge');
      }
    };

    loadComponent();

    // Cleanup
    return () => {
      if (componentRef.current) {
        componentRef.current.destroy();
        componentRef.current = null;
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      if (onUnmount) {
        onUnmount();
      }
    };
  }, [componentType, config, onEvent, onMount, onUnmount]);

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
      const moduleName = '@tamyla/ui-components';
      UIComponents = await import(moduleName);
    } catch (importError) {
      logger.warn('Peer dependency @tamyla/ui-components not available:', importError, 'FactoryBridge');
      return null;
    }      if (!UIComponents || !(UIComponents as any)[componentType]) {
        throw new Error(`Component type ${componentType} not found`);
      }

      const componentFactory = (UIComponents as any)[componentType];
      return componentFactory(config);
    } catch (error) {
      logger.error('Failed to create factory component:', error, 'FactoryBridge');
      return null;
    }
  }

  static async loadUIComponents() {
    try {
      // Handle missing peer dependency gracefully
      try {
        const moduleName = '@tamyla/ui-components';
        return await import(moduleName);
      } catch (importError) {
        logger.warn('Peer dependency @tamyla/ui-components not available:', importError, 'FactoryBridge');
        return null;
      }
    } catch (error) {
      logger.error('Failed to load ui-components:', error, 'FactoryBridge');
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
