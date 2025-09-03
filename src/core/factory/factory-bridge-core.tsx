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

      // Prepare config with container reference
      const enhancedConfig = {
        ...config,
        children,
        container: container // Pass the React container to factories that need it
      };

      // Handle different factory types with better detection
      if (typeof factoryInstance === 'function') {
        // First check if it's a bound method that returns DOM elements
        try {
          const result = factoryInstance(enhancedConfig);
          
          // If it's already a DOM element, use it directly
          if (result instanceof HTMLElement) {
            element = result;
          } else if (result && typeof result === 'object' && result.element instanceof HTMLElement) {
            element = result.element;
          } else {
            // Create fallback
            const fallback = document.createElement('div');
            fallback.className = `factory-bridge-fallback tamyla-${factory.toLowerCase()}`;
            fallback.textContent = `${factory} component`;
            element = fallback;
          }
        } catch (error) {
          console.warn(`FactoryBridge: Error calling factory function for ${factory}:`, error);
          const fallback = document.createElement('div');
          fallback.className = `factory-bridge-error tamyla-${factory.toLowerCase()}`;
          fallback.textContent = `${factory} component error`;
          element = fallback;
        }
      } else if (factoryInstance && typeof factoryInstance.create === 'function') {
        const result = factoryInstance.create(enhancedConfig);
        element = (result as any)?.element || result;
      } else {
        throw new Error(`Factory ${factory} doesn't have a recognized creation method`);
      }

      // Validate that we got a proper DOM element
      if (!element || !(element instanceof HTMLElement)) {
        console.warn(`FactoryBridge: Factory ${factory} did not return a valid HTMLElement:`, element);
        
        // Create a safe fallback element
        const fallback = document.createElement('div');
        fallback.className = `factory-bridge-fallback tamyla-${factory.toLowerCase()}`;
        fallback.textContent = `${factory} component (fallback)`;
        
        // If we got something that might have useful content, try to extract it
        if (element && typeof element === 'object') {
          try {
            if (typeof element === 'string') {
              fallback.textContent = element;
            } else if ('innerHTML' in element && typeof (element as any).innerHTML === 'string') {
              fallback.innerHTML = (element as any).innerHTML;
            } else if ('textContent' in element && typeof (element as any).textContent === 'string') {
              fallback.textContent = (element as any).textContent;
            } else if ('outerHTML' in element && typeof (element as any).outerHTML === 'string') {
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = (element as any).outerHTML;
              const firstChild = tempDiv.firstElementChild;
              if (firstChild instanceof HTMLElement) {
                element = firstChild;
              } else {
                element = fallback;
              }
            } else {
              element = fallback;
            }
          } catch (conversionError) {
            console.warn(`Failed to convert result to DOM element:`, conversionError);
            element = fallback;
          }
        } else {
          element = fallback;
        }
      }

      if (!element) {
        throw new Error(`Factory ${factory} returned null/undefined after fallback creation`);
      }

      // Ensure element is properly detached before appending
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }

      // Mount the element
      try {
        container.appendChild(element);
        componentRef.current = element;
      } catch (appendError) {
        console.error(`FactoryBridge: Failed to append element for ${factory}:`, appendError);
        console.error('Element type:', element.constructor.name);
        console.error('Element:', element);
        
        // Create final fallback if even appendChild fails
        const errorFallback = document.createElement('div');
        errorFallback.className = `factory-bridge-error tamyla-${factory.toLowerCase()}`;
        errorFallback.textContent = `${factory} component failed to mount`;
        errorFallback.title = `Error: ${appendError instanceof Error ? appendError.message : 'Unknown append error'}`;
        
        container.appendChild(errorFallback);
        componentRef.current = errorFallback;
      }

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
