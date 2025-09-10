/**
 * Factory Bridge Core - Main React component logic
 * Uses the registry and importer for clean separation of concerns
 */

import React, { useEffect, useRef, useCallback } from 'react';
import { factoryRegistry } from './factory-registry';
import { safeSetInnerHTML, safeCreateElementFromHTML, globalEventManager } from '../../utils/dom-safety';
import { Logger } from '../../utils/logger';
import type { ComponentEventHandler } from '../../types/factory';

// Initialize logger instance
const logger = new Logger({ enableConsole: true });

export interface FactoryComponentProps {
  factory: string;
  config?: Record<string, unknown>;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onEvent?: ComponentEventHandler;
}

// WeakMap for tracking component instances to prevent memory leaks
const componentInstances = new WeakMap<HTMLElement, {
  cleanup?: () => void;
  instance?: unknown;
  listeners?: Array<{ type: string; handler: EventListener }>;
}>();

const FactoryComponent: React.FC<FactoryComponentProps> = ({
  factory,
  config = {},
  children,
  className,
  style,
  onEvent
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<unknown>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const cleanupFunctionsRef = useRef<Array<() => void>>([]);

  const factoryInstance = factoryRegistry.getFactory(factory);

  // Comprehensive cleanup function
  const performCleanup = useCallback(() => {
    // Abort any pending operations
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // Run all cleanup functions
    cleanupFunctionsRef.current.forEach(cleanup => {
      try {
        cleanup();
      } catch (error) {
        logger.error('Cleanup function error:', error, 'FactoryBridgeCore');
      }
    });
    cleanupFunctionsRef.current = [];

    // Enhanced component cleanup
    if (componentRef.current && containerRef.current) {
      const container = containerRef.current;
      const componentData = componentInstances.get(container);

      if (componentData) {
        // Run component-specific cleanup
        if (componentData.cleanup) {
          try {
            componentData.cleanup();
          } catch (error) {
            logger.error('Component cleanup error:', error, 'FactoryBridgeCore');
          }
        }

        // Remove event listeners
        if (componentData.listeners) {
          componentData.listeners.forEach(({ type, handler }) => {
            container.removeEventListener(type, handler);
          });
        }

        // Clear from WeakMap
        componentInstances.delete(container);
      }

      // Clean DOM
      globalEventManager.cleanupElement(container);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }

    componentRef.current = null;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!factoryInstance || !container) {
      return performCleanup;
    }

    // Create abort controller for this effect
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    // Check for abort before proceeding
    if (signal.aborted) {
      return performCleanup;
    }

    try {
      let element: HTMLElement;

      // Prepare config with container reference
      const enhancedConfig = {
        ...config,
        children,
        container: container, // Pass the React container to factories that need it
        signal // Pass abort signal for async operations
      };

      // Handle different factory types with better detection
      if (typeof factoryInstance === 'function') {
        // First check if it's a bound method that returns DOM elements
        try {
          const result = factoryInstance(enhancedConfig);

          if (signal.aborted) {
            return performCleanup;
          }

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
          logger.error(`Factory ${factory} creation error:`, error, 'FactoryBridgeCore');
          const fallback = document.createElement('div');
          fallback.className = `factory-bridge-error tamyla-${factory.toLowerCase()}`;
          fallback.textContent = `${factory} component error`;
          element = fallback;
        }
      } else if (factoryInstance && typeof factoryInstance === 'object' && factoryInstance !== null && 'create' in factoryInstance && typeof (factoryInstance as Record<string, unknown>).create === 'function') {
        const factoryWithCreate = factoryInstance as { create: (config: unknown) => unknown };
        const result = factoryWithCreate.create(enhancedConfig);
        element = (result as { element?: HTMLElement })?.element || (result as HTMLElement);
      } else {
        throw new Error(`Factory ${factory} doesn't have a recognized creation method`);
      }

      // Validate that we got a proper DOM element
      if (!element || !(element instanceof HTMLElement)) {
        // Create a safe fallback element
        const fallback = document.createElement('div');
        fallback.className = `factory-bridge-fallback tamyla-${factory.toLowerCase()}`;
        fallback.textContent = `${factory} component (fallback)`;

        // If we got something that might have useful content, try to extract it
        if (element && typeof element === 'object') {
          try {
            if (typeof element === 'string') {
              fallback.textContent = element;
            } else if (element && typeof element === 'object') {
              const elem = element as Record<string, unknown>;
              if ('innerHTML' in elem && typeof elem.innerHTML === 'string') {
                // 🔒 SECURITY FIX: Use safe HTML sanitization
                safeSetInnerHTML(fallback, elem.innerHTML as string, 'moderate');
              } else if ('textContent' in elem && typeof elem.textContent === 'string') {
                fallback.textContent = elem.textContent as string;
              } else if ('outerHTML' in elem && typeof elem.outerHTML === 'string') {
                // 🔒 SECURITY FIX: Use safe element creation
                element = safeCreateElementFromHTML(elem.outerHTML as string, 'moderate');
              } else {
                element = fallback;
              }
            } else {
              element = fallback;
            }
          } catch (conversionError) {
            logger.error(`Factory ${factory} conversion error:`, conversionError, 'FactoryBridgeCore');
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
        if (!signal.aborted) {
          container.appendChild(element);
          componentRef.current = element;

          // Register component instance for memory management
          const listeners: Array<{ type: string; handler: EventListener }> = [];
          componentInstances.set(container, {
            instance: element,
            listeners,
            cleanup: () => {
              // Component-specific cleanup logic
              if ((element as any).destroy && typeof (element as any).destroy === 'function') {
                try {
                  (element as any).destroy();
                } catch (destroyError) {
                  logger.error('Component destroy error:', destroyError, 'FactoryBridgeCore');
                }
              }
            }
          });
        }
      } catch (appendError) {
        if (!signal.aborted) {
          // Create final fallback if even appendChild fails
          const errorFallback = document.createElement('div');
          errorFallback.className = `factory-bridge-error tamyla-${factory.toLowerCase()}`;
          errorFallback.textContent = `${factory} component failed to mount`;
          errorFallback.title = `Error: ${appendError instanceof Error ? appendError.message : 'Unknown append error'}`;

          container.appendChild(errorFallback);
          componentRef.current = errorFallback;
        }
      }

      // Set up event handling if provided
      if (onEvent && element instanceof HTMLElement && !signal.aborted) {
        const handleEvent = (event: Event) => {
          if (!signal.aborted) {
            const eventData = {
              type: event.type,
              target: factory,
              data: { event, factory, config },
              timestamp: Date.now()
            };
            onEvent(eventData);
          }
        };

        // 🔒 SECURITY FIX: Use safe event management
        const eventTypes = ['click', 'change', 'input', 'submit', 'mouseenter', 'mouseleave'];
        const componentData = componentInstances.get(container);

        eventTypes.forEach(eventType => {
          element.addEventListener(eventType, handleEvent, { signal });

          // Track listeners for cleanup
          if (componentData?.listeners) {
            componentData.listeners.push({ type: eventType, handler: handleEvent });
          }
        });

        // Add to cleanup functions
        cleanupFunctionsRef.current.push(() => {
          eventTypes.forEach(eventType => {
            element.removeEventListener(eventType, handleEvent);
          });
        });
      }

    } catch (error) {
      if (container && !signal.aborted) {
        // 🔒 SECURITY FIX: Use safe HTML instead of innerHTML
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'color: var(--color-error-text, #dc2626); padding: var(--spacing-2, 8px); border: 1px solid var(--color-error-border, #ef4444); border-radius: var(--border-radius-md, 4px); background: var(--color-error-bg, #fee2e2);';

        const title = document.createElement('strong');
        title.textContent = `Factory Error: ${factory}`;

        const message = document.createElement('br');
        const errorText = document.createElement('span');
        errorText.textContent = String(error);

        const availableText = document.createElement('small');
        availableText.textContent = `Available: ${factoryRegistry.getAvailableFactories().join(', ')}`;

        errorDiv.appendChild(title);
        errorDiv.appendChild(message);
        errorDiv.appendChild(errorText);
        errorDiv.appendChild(document.createElement('br'));
        errorDiv.appendChild(availableText);

        container.appendChild(errorDiv);
        componentRef.current = errorDiv;
      }
    }

    // Return cleanup function
    return performCleanup;

  }, [factory, config, onEvent, factoryInstance, children, performCleanup]);

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
