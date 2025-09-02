/**
 * Factory Bridge Core - Main React component logic
 * Uses the registry and importer for clean separation of concerns
 */

import React, { useEffect, useRef } from 'react';
import { factoryRegistry } from './factory-registry';

export interface FactoryComponentProps {
  factory: string;
  config?: Record<string, any>;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onEvent?: (eventType: string, data: any) => void;
}

const FactoryComponent: React.FC<FactoryComponentProps> = ({
  factory,
  config = {},
  children,
  className,
  style,
  onEvent
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<any>(null);

  const factoryInstance = factoryRegistry.getFactory(factory);

  useEffect(() => {
    const container = containerRef.current;
    if (!factoryInstance || !container) {
      console.warn(`FactoryBridge: No factory instance for ${factory}`);
      return;
    }

    try {
      let element: HTMLElement;

      // Handle different factory types
      if (typeof factoryInstance === 'function') {
        const result = factoryInstance({ ...config, children });
        element = (result as any)?.element || result;
      } else if ((factoryInstance as any)?.create) {
        const result = (factoryInstance as any).create({ ...config, children });
        element = (result as any)?.element || result;
      } else {
        throw new Error(`Factory ${factory} doesn't have a recognized creation method`);
      }

      if (!element) {
        throw new Error(`Factory ${factory} returned null/undefined`);
      }

      // Mount the element
      container.appendChild(element);
      componentRef.current = element;

      // Set up event handling if provided
      if (onEvent && (element as any)?.addEventListener) {
        const handleEvent = (event: Event) => {
          onEvent(event.type, { event, factory, config });
        };

        // Listen for common events
        ['click', 'change', 'input', 'submit'].forEach(eventType => {
          element.addEventListener(eventType, handleEvent);
        });

        // Store cleanup function
        componentRef.current._cleanup = () => {
          ['click', 'change', 'input', 'submit'].forEach(eventType => {
            element.removeEventListener(eventType, handleEvent);
          });
        };
      }

    } catch (error) {
      console.error(`FactoryBridge: Error creating component ${factory}:`, error);
      if (container) {
        container.innerHTML = `
          <div style="color: red; padding: 10px; border: 1px solid red; border-radius: 4px; background: #fee;">
            <strong>Factory Error: ${factory}</strong><br/>
            ${error}<br/>
            <small>Available: ${factoryRegistry.getAvailableFactories().join(', ')}</small>
          </div>
        `;
      }
    }

    // Cleanup
    return () => {
      if (container) {
        container.innerHTML = '';
      }
      if (componentRef.current?._cleanup) {
        componentRef.current._cleanup();
      }
      componentRef.current = null;
    };
  }, [factory, config, onEvent, factoryInstance, children]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
      data-factory={factory}
      data-testid={`factory-container-${factory}`}
    >
      {children}
    </div>
  );
};

// Create the main FactoryBridge component
export const FactoryBridge = FactoryComponent;
