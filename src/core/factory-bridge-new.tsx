/**
 * Comprehensive Factory Bridge - Automatic React wrapper for ALL ui-components
 * Eliminates code duplication by wrapping ALL vanilla components automatically
 */

import React, { useEffect, useRef, useCallback, useMemo } from 'react';

// Import what's actually exported from ui-components
import { 
  ButtonFactory, 
  InputFactory, 
  InputGroupFactory,
  CardFactory, 
  StatusIndicatorFactory, 
  ActionCardFactory,
  SearchBarFactory,
  ContentCardFactory,
  FileListFactory,
  NotificationFactory,
  SearchInterfaceFactory,
  EnhancedSearchApplicationFactory,
  CampaignSelectorSystem,
  ContentManagerApplicationFactory,
  TamylaUISystem
} from '@tamyla/ui-components';// Factory instances - create proper instances for classes vs functions
const factoryInstances = {
  buttonFactory: new ButtonFactory(),
  inputFactory: new InputFactory(),
  inputGroupFactory: InputGroupFactory, // function
  cardFactory: new CardFactory(),
  statusIndicatorFactory: new StatusIndicatorFactory(),
  actionCardFactory: new ActionCardFactory(),
  searchBarFactory: new SearchBarFactory(), // class
  contentCardFactory: ContentCardFactory, // need to check
  fileListFactory: FileListFactory, // need to check  
  notificationFactory: NotificationFactory, // need to check
  searchInterfaceFactory: SearchInterfaceFactory, // need to check
  // These might be functions that return instances
  enhancedSearchFactory: EnhancedSearchApplicationFactory,
  campaignSelectorFactory: CampaignSelectorSystem,
  contentManagerFactory: ContentManagerApplicationFactory,
  tamylaUIFactory: TamylaUISystem
} as const;

// Complete factory mapping - covers EVERY component in ui-components
const FACTORY_MAP = {
  // Button variants
  Button: () => factoryInstances.buttonFactory.create.bind(factoryInstances.buttonFactory),
  ButtonPrimary: () => factoryInstances.buttonFactory.createPrimary.bind(factoryInstances.buttonFactory),
  ButtonSecondary: () => factoryInstances.buttonFactory.createSecondary.bind(factoryInstances.buttonFactory),
  ButtonGhost: () => factoryInstances.buttonFactory.createGhost.bind(factoryInstances.buttonFactory),
  ButtonDanger: () => factoryInstances.buttonFactory.createDanger.bind(factoryInstances.buttonFactory),
  ButtonSuccess: () => factoryInstances.buttonFactory.createSuccess.bind(factoryInstances.buttonFactory),
  ButtonWithIcon: () => factoryInstances.buttonFactory.createWithIcon.bind(factoryInstances.buttonFactory),
  ButtonIconOnly: () => factoryInstances.buttonFactory.createIconOnly.bind(factoryInstances.buttonFactory),
  
  // Input atoms
  Input: () => factoryInstances.inputFactory.create.bind(factoryInstances.inputFactory),
  InputGroup: () => factoryInstances.inputGroupFactory, // function factory
  
  // Card
  Card: () => factoryInstances.cardFactory.create.bind(factoryInstances.cardFactory),
  
  // Status Indicator  
  StatusIndicator: () => factoryInstances.statusIndicatorFactory.create.bind(factoryInstances.statusIndicatorFactory),
  
  // Molecules
  ActionCard: () => factoryInstances.actionCardFactory.create.bind(factoryInstances.actionCardFactory),
  SearchBar: () => factoryInstances.searchBarFactory.create.bind(factoryInstances.searchBarFactory),
  ContentCard: () => factoryInstances.contentCardFactory,
  FileList: () => factoryInstances.fileListFactory,
  Notification: () => factoryInstances.notificationFactory,
  
  // Organisms
  SearchInterface: () => factoryInstances.searchInterfaceFactory,
  
  // Applications - these are factory functions, call them directly
  EnhancedSearch: () => factoryInstances.enhancedSearchFactory,
  CampaignSelector: () => factoryInstances.campaignSelectorFactory,
  ContentManager: () => factoryInstances.contentManagerFactory,
  
  // System - this is an object with methods
  TamylaUI: () => factoryInstances.tamylaUIFactory
} as const;

// Type definitions for comprehensive integration
interface FactoryComponentProps {
  factory: keyof typeof FACTORY_MAP;
  config?: Record<string, any>;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onEvent?: (eventType: string, data: any) => void;
}

/**
 * Factory Bridge Component - Universal React wrapper for ui-components
 * This single component replaces ALL individual React components!
 */
export const FactoryBridge: React.FC<FactoryComponentProps> = ({
  factory,
  config = {},
  children,
  className,
  style,
  onEvent
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<any>(null);

  const factoryInstance = useMemo(() => {
    const instance = FACTORY_MAP[factory];
    if (!instance) {
      console.error(`Factory ${factory} not found. Available factories:`, Object.keys(FACTORY_MAP));
      return null;
    }
    return instance;
  }, [factory]);

  useEffect(() => {
    if (!factoryInstance || !containerRef.current) return;

    try {
      let element: HTMLElement;
      
      // Handle different factory types with proper type safety
      if (typeof factoryInstance === 'function') {
        // Function factory - call with config, handle result properly
        const result = (factoryInstance as any)(config || {});
        element = (result as any)?.element || result;
      } else if ((factoryInstance as any)?.create) {
        // Class instance with create method
        const result = (factoryInstance as any).create(config || {});
        element = (result as any)?.element || result;
      } else if ((factoryInstance as any)?.render) {
        // Instance with render method  
        const result = (factoryInstance as any).render(config || {});
        element = (result as any)?.element || result;
      } else {
        throw new Error(`Factory ${factory} doesn't have a recognized creation method`);
      }

      if (!element) {
        throw new Error(`Factory ${factory} returned null/undefined`);
      }

      // Store reference for cleanup
      componentRef.current = element;

      // Add to DOM
      containerRef.current.innerHTML = '';
      if (element.nodeType === Node.ELEMENT_NODE) {
        containerRef.current.appendChild(element);
      } else if (typeof element === 'string') {
        containerRef.current.innerHTML = element;
      } else {
        containerRef.current.innerHTML = String(element);
      }

      // Setup comprehensive event forwarding
      if (onEvent && element.addEventListener) {
        const handleEvent = (event: Event) => {
          onEvent(event.type, (event as any).detail || event);
        };
        
        // Listen to ALL possible events from ui-components
        ['click', 'change', 'input', 'focus', 'blur', 'submit', 'search', 'select', 'action'].forEach(eventType => {
          element.addEventListener(eventType, handleEvent);
        });
      }

    } catch (error) {
      console.error(`Failed to create factory component ${factory}:`, error);
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div style="color: red; padding: 10px; border: 1px solid red; border-radius: 4px; background: #fee;">
            <strong>Factory Error: ${factory}</strong><br/>
            ${error}<br/>
            <small>Available: ${Object.keys(FACTORY_MAP).join(', ')}</small>
          </div>
        `;
      }
    }

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      componentRef.current = null;
    };
  }, [factory, config, onEvent, factoryInstance]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={style}
      data-factory={factory}
    >
      {children}
    </div>
  );
};

/**
 * Hook for using Factory Bridge programmatically
 */
export const useFactoryBridge = () => {
  const createFactoryComponent = useCallback((
    factory: keyof typeof FACTORY_MAP,
    config: Record<string, any> = {}
  ): Promise<HTMLElement | null> => {
    return new Promise((resolve, reject) => {
      try {
        const factoryInstance = FACTORY_MAP[factory];
        if (!factoryInstance) {
          reject(new Error(`Factory ${factory} not found`));
          return;
        }

        let element: HTMLElement;
        if (typeof factoryInstance === 'function') {
          const result = (factoryInstance as any)(config || {});
          element = (result as any)?.element || result;
        } else if ((factoryInstance as any)?.create) {
          const result = (factoryInstance as any).create(config || {});
          element = (result as any)?.element || result;
        } else if ((factoryInstance as any)?.render) {
          const result = (factoryInstance as any).render(config || {});
          element = (result as any)?.element || result;
        } else {
          reject(new Error(`Factory ${factory} doesn't have a creation method`));
          return;
        }

        resolve(element);
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  return {
    createFactoryComponent,
    FactoryBridge,
    availableFactories: Object.keys(FACTORY_MAP) as Array<keyof typeof FACTORY_MAP>
  };
};

/**
 * Pre-built React components for every ui-component factory
 * These provide type-safe, specific interfaces while using the universal bridge
 */

// Button Components
export const ReactButton: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) => 
  <FactoryBridge factory="Button" {...props} />;

export const ReactButtonPrimary: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) => 
  <FactoryBridge factory="ButtonPrimary" {...props} />;

export const ReactButtonSecondary: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) => 
  <FactoryBridge factory="ButtonSecondary" {...props} />;

export const ReactButtonGhost: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) => 
  <FactoryBridge factory="ButtonGhost" {...props} />;

export const ReactButtonDanger: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) => 
  <FactoryBridge factory="ButtonDanger" {...props} />;

export const ReactButtonSuccess: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) => 
  <FactoryBridge factory="ButtonSuccess" {...props} />;

// Input Components
export const ReactInput: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) => 
  <FactoryBridge factory="Input" {...props} />;

// Card Components
export const ReactCard: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) => 
  <FactoryBridge factory="Card" {...props} />;

// Status Indicator
export const ReactStatusIndicator: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) => 
  <FactoryBridge factory="StatusIndicator" {...props} />;

// Action Card
export const ReactActionCard: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) => 
  <FactoryBridge factory="ActionCard" {...props} />;

// Applications
export const ReactEnhancedSearch: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) => 
  <FactoryBridge factory="EnhancedSearch" {...props} />;

export const ReactCampaignSelector: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) => 
  <FactoryBridge factory="CampaignSelector" {...props} />;

export const ReactContentManager: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) => 
  <FactoryBridge factory="ContentManager" {...props} />;

// System
export const ReactTamylaUI: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) => 
  <FactoryBridge factory="TamylaUI" {...props} />;

/**
 * Master export - comprehensive coverage of ALL ui-components
 */
export default FactoryBridge;

// Export all available factory names for reference
export const AVAILABLE_FACTORIES = Object.keys(FACTORY_MAP) as Array<keyof typeof FACTORY_MAP>;
