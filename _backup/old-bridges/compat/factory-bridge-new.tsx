/**
 * Comprehensive Factory Bridge - Automatic React wrapper for ALL ui-components
 * (Compatibility copy moved to compat/ to avoid being the canonical implementation)
 */

import React, { useEffect, useRef, useCallback, useMemo } from 'react';

// Import what's actually exported from ui-components
import {
  ButtonFactory,
  InputFactory,
  InputGroupFactory,
  CardFactory,
  StatusIndicatorFactory,
  actionCardFactory,
  searchBarFactory,
  ContentCardFactory,
  FileListFactory,
  NotificationFactory,
  SearchInterfaceFactory,
  EnhancedSearchApplicationFactory,
  CampaignSelectorSystem,
  ContentManagerApplicationFactory,
  TamylaUISystem
} from '@tamyla/ui-components';

const factoryInstances = {
  buttonFactory: new ButtonFactory(),
  inputFactory: new InputFactory(),
  inputGroupFactory: InputGroupFactory,
  cardFactory: new CardFactory(),
  statusIndicatorFactory: new StatusIndicatorFactory(),
  actionCardFactory: actionCardFactory,
  searchBarFactory: searchBarFactory,
  contentCardFactory: ContentCardFactory,
  fileListFactory: FileListFactory,
  notificationFactory: NotificationFactory,
  searchInterfaceFactory: SearchInterfaceFactory,
  enhancedSearchFactory: EnhancedSearchApplicationFactory,
  campaignSelectorFactory: CampaignSelectorSystem,
  contentManagerFactory: ContentManagerApplicationFactory,
  tamylaUIFactory: TamylaUISystem
} as const;

const FACTORY_MAP = {
  Button: () => factoryInstances.buttonFactory.create.bind(factoryInstances.buttonFactory),
  ButtonPrimary: () => factoryInstances.buttonFactory.createPrimary.bind(factoryInstances.buttonFactory),
  ButtonSecondary: () => factoryInstances.buttonFactory.createSecondary.bind(factoryInstances.buttonFactory),
  ButtonGhost: () => factoryInstances.buttonFactory.createGhost.bind(factoryInstances.buttonFactory),
  ButtonDanger: () => factoryInstances.buttonFactory.createDanger.bind(factoryInstances.buttonFactory),
  ButtonSuccess: () => factoryInstances.buttonFactory.createSuccess.bind(factoryInstances.buttonFactory),
  ButtonWithIcon: () => factoryInstances.buttonFactory.createWithIcon.bind(factoryInstances.buttonFactory),
  ButtonIconOnly: () => factoryInstances.buttonFactory.createIconOnly.bind(factoryInstances.buttonFactory),

  Input: () => factoryInstances.inputFactory.create.bind(factoryInstances.inputFactory),
  InputGroup: () => factoryInstances.inputGroupFactory,

  Card: () => factoryInstances.cardFactory.create.bind(factoryInstances.cardFactory),

  StatusIndicator: () => factoryInstances.statusIndicatorFactory.create.bind(factoryInstances.statusIndicatorFactory),

  ActionCard: () => factoryInstances.actionCardFactory.create.bind(factoryInstances.actionCardFactory),
  SearchBar: () => factoryInstances.searchBarFactory.create.bind(factoryInstances.searchBarFactory),
  ContentCard: () => factoryInstances.contentCardFactory,
  FileList: () => factoryInstances.fileListFactory,
  Notification: () => factoryInstances.notificationFactory,

  SearchInterface: () => factoryInstances.searchInterfaceFactory,

  EnhancedSearch: () => factoryInstances.enhancedSearchFactory,
  CampaignSelector: () => factoryInstances.campaignSelectorFactory,
  ContentManager: () => factoryInstances.contentManagerFactory,

  TamylaUI: () => factoryInstances.tamylaUIFactory
} as const;

interface FactoryComponentProps {
  factory: keyof typeof FACTORY_MAP;
  config?: Record<string, any>;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onEvent?: (eventType: string, data: any) => void;
}

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

    const container = containerRef.current;

    try {
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
        throw new Error(`Factory ${factory} doesn't have a recognized creation method`);
      }

      if (!element) {
        throw new Error(`Factory ${factory} returned null/undefined`);
      }

      componentRef.current = element;
      container.innerHTML = '';
      if (element.nodeType === Node.ELEMENT_NODE) {
        container.appendChild(element);
      } else if (typeof element === 'string') {
        container.innerHTML = element;
      } else {
        container.innerHTML = String(element);
      }

      if (onEvent && element.addEventListener) {
        const handleEvent = (event: Event) => {
          onEvent(event.type, (event as any).detail || event);
        };
        ['click', 'change', 'input', 'focus', 'blur', 'submit', 'search', 'select', 'action'].forEach(eventType => {
          element.addEventListener(eventType, handleEvent);
        });
      }

    } catch (error) {
      console.error(`Failed to create factory component ${factory}:`, error);
      if (container) {
        container.innerHTML = `
          <div style="color: red; padding: 10px; border: 1px solid red; border-radius: 4px; background: #fee;">
            <strong>Factory Error: ${factory}</strong><br/>
            ${error}<br/>
            <small>Available: ${Object.keys(FACTORY_MAP).join(', ')}</small>
          </div>
        `;
      }
    }

    return () => {
      if (container) {
        container.innerHTML = '';
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

export default FactoryBridge;

export const AVAILABLE_FACTORIES = Object.keys(FACTORY_MAP) as Array<keyof typeof FACTORY_MAP>;
