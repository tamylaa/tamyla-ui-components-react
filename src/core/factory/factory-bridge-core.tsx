/**
 * Factory Bridge Core - Main React component logic
 * Uses the registry and importer for clean separation of concerns
 */

import React, { useCallback, useRef } from 'react';
import { factoryRegistry } from './factory-registry';
import { globalEventManager } from '../../utils/dom-safety';
import { createFactoryFallback, createFactoryErrorDisplay, safeCleanupFactoryElement } from './safe-factory-elements';
import { memoryManager } from '../../utils/memory-management';
import { Logger } from '../../utils/logger';
import type { ComponentEventHandler } from '../../types/factory';
import type { FactoryCreatedElement, ComponentData } from '../../types/factory-components';

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
const componentInstances = new WeakMap<HTMLElement, ComponentData>();

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

  // Create stable references for props that change frequently
  const stableFactory = useRef(factory);
  const stableConfig = useRef(config);
  const stableOnEvent = useRef(onEvent);
  
  // Update stable refs when props change
  React.useEffect(() => {
    stableFactory.current = factory;
    stableConfig.current = config;
    stableOnEvent.current = onEvent;
  }, [factory, config, onEvent]);

  // State to track current factory instance to avoid unnecessary re-renders
  const currentFactoryRef = React.useRef(factoryRegistry.getFactory(factory));
  const [factoryVersion, setFactoryVersion] = React.useState(0);

  // Stable factory creation function to prevent recreations
  const createFactoryElement = useCallback((signal: AbortSignal) => {
    const currentFactoryInstance = currentFactoryRef.current;
    if (!currentFactoryInstance) return null;

    let element: HTMLElement;

    // Prepare config with container reference using stable refs
    const enhancedConfig = {
      ...stableConfig.current,
      children,
      container: containerRef.current,
      signal
    };

    // Handle different factory types with better detection
    if (typeof currentFactoryInstance === 'function') {
      try {
        const result = currentFactoryInstance(enhancedConfig);

        if (signal.aborted) return null;

        if (result instanceof HTMLElement) {
          element = result;
        } else if (result && typeof result === 'object' && result.element instanceof HTMLElement) {
          element = result.element;
        } else {
          element = createFactoryFallback(stableFactory.current, 'fallback');
        }
      } catch (error) {
        logger.error(`Factory ${stableFactory.current} creation error:`, error, 'FactoryBridgeCore');
        element = createFactoryFallback(stableFactory.current, 'error', String(error));
      }
    } else if (currentFactoryInstance && typeof currentFactoryInstance === 'object' && currentFactoryInstance !== null && 'create' in currentFactoryInstance && typeof (currentFactoryInstance as Record<string, unknown>).create === 'function') {
      const factoryWithCreate = currentFactoryInstance as { create: (config: unknown) => unknown };
      const result = factoryWithCreate.create(enhancedConfig);
      element = (result as { element?: HTMLElement })?.element || (result as HTMLElement);
    } else {
      element = createFactoryFallback(stableFactory.current, 'fallback');
    }

    return element;
  }, [children]); // Only depend on children which can change

  // Enhanced event handler setup with memory management
  const setupEventHandlers = useCallback((element: HTMLElement, signal: AbortSignal) => {
    if (!stableOnEvent.current || signal.aborted) return;

    const handleEvent = (event: Event) => {
      if (!signal.aborted && stableOnEvent.current) {
        const eventData = {
          type: event.type,
          target: stableFactory.current,
          data: { event, factory: stableFactory.current, config: stableConfig.current },
          timestamp: Date.now()
        };
        stableOnEvent.current(eventData);
      }
    };

    const eventTypes = ['click', 'change', 'input', 'submit', 'mouseenter', 'mouseleave'];
    const container = containerRef.current;
    if (!container) return;

    const componentData = componentInstances.get(container);
    
    eventTypes.forEach(eventType => {
      // Track event listeners through memory manager for automatic cleanup
      const eventHandleId = memoryManager.trackEventListener(
        element,
        eventType,
        handleEvent,
        {
          factoryId: stableFactory.current,
          componentType: 'factory-bridge',
          eventType,
          container
        },
        { signal }
      );

      // Store cleanup handle for manual cleanup if needed
      cleanupFunctionsRef.current.push(() => memoryManager.cleanup(eventHandleId));

      if (componentData?.listeners) {
        componentData.listeners.push({ type: eventType, handler: handleEvent });
      }
    });
  }, []); // No dependencies - uses stable refs

  // Comprehensive cleanup function with memory management and stable dependencies
  const performCleanup = useCallback(() => {
    // Abort any pending operations
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // Release managed resources through memory manager
    const container = containerRef.current;
    if (container) {
      // Clean up any tracked resources for this factory
      memoryManager.cleanupByFilter(metadata => 
        metadata?.factoryId === stableFactory.current || 
        metadata?.componentType === 'factory-bridge'
      );
    }

    // Run all cleanup functions
    cleanupFunctionsRef.current.forEach((cleanup: () => void) => {
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

        // Remove event listeners from the actual DOM element, not container
        if (componentData.listeners && componentRef.current instanceof HTMLElement) {
          const element = componentRef.current as HTMLElement;
          componentData.listeners.forEach(({ type, handler }) => {
            element.removeEventListener(type, handler);
          });
        }

        // Clear from WeakMap
        componentInstances.delete(container);
      }

      // Clean DOM - only remove our managed elements
      const children = Array.from(container.children);
      children.forEach((child: Element) => {
        // Only remove elements we created, not React children
        if (child !== componentRef.current && !child.hasAttribute('data-reactroot')) {
          container.removeChild(child);
        }
      });

      // Use safer cleanup
      if (globalEventManager && typeof globalEventManager.cleanupElement === 'function') {
        globalEventManager.cleanupElement(container);
      }
    }

    componentRef.current = null;
  }, []); // Empty dependencies - function is stable

  // Optimized factory upgrade effect with proper dependencies
  React.useEffect(() => {
    if (factoryVersion === 0) return; // Skip initial render

    const container = containerRef.current;
    if (!container) return;

    // Only recreate DOM element when factory actually upgrades
    // This prevents unnecessary recreation on prop changes
    performCleanup();

    // Create abort controller for this upgrade
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
      const element = createFactoryElement(signal);
      
      if (element && element instanceof HTMLElement && !signal.aborted) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }

        container.appendChild(element);
        componentRef.current = element;

        // Register component instance with proper cleanup
        const listeners: Array<{ type: string; handler: EventListener }> = [];
        componentInstances.set(container, {
          instance: element,
          listeners,
          cleanup: () => {
            // Type-safe destroy method check
            const factoryElement = element as FactoryCreatedElement;
            if (factoryElement.destroy && typeof factoryElement.destroy === 'function') {
              try {
                factoryElement.destroy();
              } catch (destroyError) {
                logger.error('Component destroy error:', destroyError, 'FactoryBridgeCore');
              }
            }
          }
        });

        // Set up event handling
        setupEventHandlers(element, signal);
      }
    } catch (error) {
      if (container && !signal.aborted) {
        const errorDiv = createFactoryErrorDisplay(
          stableFactory.current,
          error instanceof Error ? error : new Error(String(error)),
          factoryRegistry.getAvailableFactories()
        );

        container.appendChild(errorDiv);
        componentRef.current = errorDiv;
      }
    }

    return performCleanup;
  }, [factoryVersion, performCleanup, createFactoryElement, setupEventHandlers]); // Proper dependencies

  // Optimized initial setup effect with proper dependencies
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create abort controller for initial setup
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
      const element = createFactoryElement(signal);
      
      if (element && element instanceof HTMLElement && !signal.aborted) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }

        container.appendChild(element);
        componentRef.current = element;

        // Register component instance with proper cleanup
        const listeners: Array<{ type: string; handler: EventListener }> = [];
        componentInstances.set(container, {
          instance: element,
          listeners,
          cleanup: () => {
            // Type-safe destroy method check
            const factoryElement = element as FactoryCreatedElement;
            if (factoryElement.destroy && typeof factoryElement.destroy === 'function') {
              try {
                factoryElement.destroy();
              } catch (destroyError) {
                logger.error('Component destroy error:', destroyError, 'FactoryBridgeCore');
              }
            }
          }
        });

        // Set up event handling
        setupEventHandlers(element, signal);
      }
    } catch (error) {
      if (container && !signal.aborted) {
        const errorDiv = createFactoryErrorDisplay(
          stableFactory.current,
          error instanceof Error ? error : new Error(String(error)),
          factoryRegistry.getAvailableFactories()
        );

        container.appendChild(errorDiv);
        componentRef.current = errorDiv;
      }
    }

    return performCleanup;
  }, [performCleanup, createFactoryElement, setupEventHandlers]); // Stable dependencies only

  // Optimized factory upgrade detection with stable factory reference
  React.useEffect(() => {
    // Only check for upgrades once, after initial mount
    const checkForFactoryUpgrade = () => {
      const latestFactory = factoryRegistry.getFactory(stableFactory.current);
      // Check if we have a real factory now (different reference than initial)
      if (latestFactory !== currentFactoryRef.current) {
        currentFactoryRef.current = latestFactory;
        setFactoryVersion(prev => prev + 1);
      }
    };

    // Check after a delay to allow async factory loading to complete
    const timeoutId = setTimeout(checkForFactoryUpgrade, 100);

    // Add to cleanup functions for proper tracking
    cleanupFunctionsRef.current.push(() => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array - uses stable factory reference

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
