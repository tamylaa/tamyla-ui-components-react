/**
 * Comprehensive Factory Bridge - Automatic React wrapper for ALL ui-components
 * Eliminates code duplication by wrapping ALL vanilla components automatically
 */

import React, { useEffect, useRef, useCallback, useMemo } from 'react';

// Import what's actually exported from ui-components
import {
  ButtonFactory,
  InputFactory as InputFactoryClass,
  CardFactory as CardFactoryClass,
  ActionCardFactory,
  SearchBarFactory,
  ContentCardFactory,
  FileListFactory,
  NotificationFactory,
  SearchInterfaceFactory,
  RewardSystem
} from '@tamyla/ui-components';

// Try to import additional factories (may not be available yet)

let InputGroupFactory: any, StatusIndicatorFactory: any, EnhancedSearchApplicationFactory: any,

  CampaignSelectorSystem: any, ContentManagerApplicationFactory: any, TamylaUISystem: any,

  OrganismFactory: any, OrganismTemplates: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
  const additionalImports = require('@tamyla/ui-components');
  InputGroupFactory = additionalImports.InputGroupFactory;
  StatusIndicatorFactory = additionalImports.StatusIndicatorFactory;
  EnhancedSearchApplicationFactory = additionalImports.EnhancedSearchApplicationFactory;
  CampaignSelectorSystem = additionalImports.CampaignSelectorSystem;
  ContentManagerApplicationFactory = additionalImports.ContentManagerApplicationFactory;
  TamylaUISystem = additionalImports.TamylaUISystem;
  // Import Dashboard organism capabilities
  OrganismFactory = additionalImports.OrganismFactory;
  OrganismTemplates = additionalImports.OrganismTemplates;
} catch {
  // Optional imports not available
}// Factory instances - CORRECTED: Handle both classes and instances properly
const factoryInstances = {
  buttonFactory: ButtonFactory, // Already an instance with create method
  inputFactory: InputFactoryClass,
  inputGroupFactory: InputGroupFactory || null, // function
  cardFactory: CardFactoryClass,
  statusIndicatorFactory: StatusIndicatorFactory || null,
  actionCardFactory: ActionCardFactory, // already an instance
  searchBarFactory: SearchBarFactory, // already an instance
  contentCardFactory: ContentCardFactory, // function
  fileListFactory: FileListFactory, // function
  notificationFactory: NotificationFactory, // function
  searchInterfaceFactory: SearchInterfaceFactory, // function
  rewardSystemFactory: RewardSystem || null, // class factory
  // Organism-level factories
  organismFactory: OrganismFactory || null, // function factory
  organismTemplates: OrganismTemplates || null, // template functions
  // These might be functions that return instances
  enhancedSearchFactory: EnhancedSearchApplicationFactory || null,
  campaignSelectorFactory: CampaignSelectorSystem || null,
  contentManagerFactory: ContentManagerApplicationFactory || null,
  tamylaUIFactory: TamylaUISystem || null
} as const;

// Complete factory mapping - covers EVERY component in ui-components
const FACTORY_MAP = {
  // Button variants (using type assertion to bypass incomplete TypeScript definitions)
  Button: factoryInstances.buttonFactory.create.bind(factoryInstances.buttonFactory),

  ButtonPrimary: (factoryInstances.buttonFactory as any).createPrimary.bind(factoryInstances.buttonFactory),

  ButtonSecondary: (factoryInstances.buttonFactory as any).createSecondary.bind(factoryInstances.buttonFactory),

  ButtonGhost: (factoryInstances.buttonFactory as any).createGhost.bind(factoryInstances.buttonFactory),

  ButtonDanger: (factoryInstances.buttonFactory as any).createDanger.bind(factoryInstances.buttonFactory),

  ButtonSuccess: (factoryInstances.buttonFactory as any).createSuccess.bind(factoryInstances.buttonFactory),

  ButtonWithIcon: (factoryInstances.buttonFactory as any).createWithIcon.bind(factoryInstances.buttonFactory),

  ButtonIconOnly: (factoryInstances.buttonFactory as any).createIconOnly.bind(factoryInstances.buttonFactory),

  // Input atoms
  Input: factoryInstances.inputFactory.create.bind(factoryInstances.inputFactory),
  ...(factoryInstances.inputGroupFactory && {
    InputGroup: factoryInstances.inputGroupFactory // function factory
  }),

  // Card
  Card: factoryInstances.cardFactory.create.bind(factoryInstances.cardFactory),

  // Status Indicator (optional)
  ...(factoryInstances.statusIndicatorFactory && {
    StatusIndicator: (factoryInstances.statusIndicatorFactory as any).create.bind(factoryInstances.statusIndicatorFactory)
  }),

  // Molecules
  ActionCard: factoryInstances.actionCardFactory.create.bind(factoryInstances.actionCardFactory),
  SearchBar: factoryInstances.searchBarFactory.create.bind(factoryInstances.searchBarFactory),
  ContentCard: factoryInstances.contentCardFactory,
  FileList: factoryInstances.fileListFactory,
  Notification: factoryInstances.notificationFactory,

  // Organisms
  SearchInterface: factoryInstances.searchInterfaceFactory,

  // Reward System - class factory (RewardSystem)
  ...(factoryInstances.rewardSystemFactory && {
    Reward: factoryInstances.rewardSystemFactory
  }),

  // Dashboard organisms via OrganismFactory and OrganismTemplates
  ...(factoryInstances.organismFactory && {
    // Direct organism factory for search-interface (already covered by SearchInterface above)
    OrganismSearchInterface: (props: any) => factoryInstances.organismFactory('search-interface', props)
  }),

  // Dashboard templates from OrganismTemplates
  ...(factoryInstances.organismTemplates && {
    DashboardSearch: factoryInstances.organismTemplates.searchPage,
    DashboardContent: factoryInstances.organismTemplates.contentDashboard,
    DashboardKnowledge: factoryInstances.organismTemplates.knowledgeBase,
    DashboardMedia: factoryInstances.organismTemplates.mediaLibrary
  }),

  // Applications - optional, these are factory functions
  ...(factoryInstances.enhancedSearchFactory && {
    EnhancedSearch: factoryInstances.enhancedSearchFactory
  }),
  ...(factoryInstances.campaignSelectorFactory && {
    CampaignSelector: factoryInstances.campaignSelectorFactory
  }),
  ...(factoryInstances.contentManagerFactory && {
    ContentManager: factoryInstances.contentManagerFactory
  }),

  // System - optional
  ...(factoryInstances.tamylaUIFactory && {
    TamylaUI: factoryInstances.tamylaUIFactory
  })
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
      console.error(`Factory ${String(factory)} not found. Available factories:`, Object.keys(FACTORY_MAP));
      return null;
    }
    return instance;
  }, [factory]);

  useEffect(() => {
    const container = containerRef.current;
    if (!factoryInstance || !container) return;

    try {
      let element: HTMLElement;

      // Handle different factory types with proper type safety
      if (typeof factoryInstance === 'function') {
        // Function factory - call with config, handle result properly
        const result = (factoryInstance as any)({ ...config, children });
        element = (result as any)?.element || result;
      } else if ((factoryInstance as any)?.create) {
        // Class instance with create method
        const result = (factoryInstance as any).create({ ...config, children });
        element = (result as any)?.element || result;
      } else if ((factoryInstance as any)?.render) {
        // Instance with render method
        const result = (factoryInstance as any).render({ ...config, children });
        element = (result as any)?.element || result;
      } else {
        throw new Error(`Factory ${String(factory)} doesn't have a recognized creation method`);
      }

      if (!element) {
        throw new Error(`Factory ${String(factory)} returned null/undefined`);
      }

      // Store reference for cleanup
      componentRef.current = element;

      // Add to DOM
      container.innerHTML = '';
      if (element.nodeType === Node.ELEMENT_NODE) {
        container.appendChild(element);
      } else if (typeof element === 'string') {
        container.innerHTML = element;
      } else {
        container.innerHTML = String(element);
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
      console.error(`Failed to create factory component ${String(factory)}:`, error);
      if (container) {
        container.innerHTML = `
          <div style="color: red; padding: 10px; border: 1px solid red; border-radius: 4px; background: #fee;">
            <strong>Factory Error: ${String(factory)}</strong><br/>
            ${error}<br/>
            <small>Available: ${Object.keys(FACTORY_MAP).join(', ')}</small>
          </div>
        `;
      }
    }

    // Cleanup
    return () => {
      if (container) {
        container.innerHTML = '';
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
      data-testid={`factory-container-${String(factory)}`}
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
          reject(new Error(`Factory ${String(factory)} not found`));
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
          reject(new Error(`Factory ${String(factory)} doesn't have a creation method`));
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
 * Utility function to create factory-based React components
 * This maintains compatibility with existing component files
 */
export const createFactoryComponent = <T extends object>(
  factoryName: keyof typeof FACTORY_MAP,
  displayName?: string
): React.FC<T & { config?: any; onEvent?: (eventType: string, detail: any) => void }> => {
  const Component: React.FC<T & { config?: any; onEvent?: (eventType: string, detail: any) => void }> = (props) => {
    const { config, onEvent, ...restProps } = props;
    return <FactoryBridge
      factory={factoryName}
      config={{ ...config, ...restProps }}
      onEvent={onEvent}
    />;
  };

  Component.displayName = displayName || `Factory${String(factoryName)}`;
  return Component;
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

export const ReactButtonWithIcon: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="ButtonWithIcon" {...props} />;

export const ReactButtonIconOnly: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="ButtonIconOnly" {...props} />;

// Input Components
export const ReactInput: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="Input" {...props} />;

export const ReactInputGroup: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="InputGroup" {...props} />;

// Card Components
export const ReactCard: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="Card" {...props} />;

// Status Indicator
export const ReactStatusIndicator: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="StatusIndicator" {...props} />;

// Action Card
export const ReactActionCard: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="ActionCard" {...props} />;

// Search Bar
export const ReactSearchBar: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="SearchBar" {...props} />;

// Content Card
export const ReactContentCard: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="ContentCard" {...props} />;

// File List
export const ReactFileList: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="FileList" {...props} />;

// Notification
export const ReactNotification: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="Notification" {...props} />;

// Search Interface
export const ReactSearchInterface: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="SearchInterface" {...props} />;

// Reward System
export const ReactReward: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="Reward" {...props} />;

// Dashboard Templates (Organism-level dashboard components)
export const ReactDashboardSearch: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="DashboardSearch" {...props} />;

export const ReactDashboardContent: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="DashboardContent" {...props} />;

export const ReactDashboardKnowledge: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="DashboardKnowledge" {...props} />;

export const ReactDashboardMedia: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="DashboardMedia" {...props} />;

// Organism Search Interface (direct organism factory version)
export const ReactOrganismSearchInterface: React.FC<Omit<FactoryComponentProps, 'factory'>> = (props) =>
  <FactoryBridge factory="OrganismSearchInterface" {...props} />;

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
