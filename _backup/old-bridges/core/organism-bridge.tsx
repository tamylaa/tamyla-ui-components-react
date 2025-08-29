/**
 * Organism Factory Bridge - React wrappers for organism components
 * Handles: Search Interfaces, Modals (when working), Rewards (when working)
 */

import React, { useEffect, useRef } from 'react';
import {
  SearchInterfaceFactory,
  RewardSystem
} from '@tamyla/ui-components';

// Organism factory instances
const organismFactories = {
  searchInterface: SearchInterfaceFactory,   // function factory
  reward: RewardSystem                       // class factory
} as const;

// Organism factory mapping
export const ORGANISM_FACTORIES = {
  // Search Interfaces
  SearchInterface: () => organismFactories.searchInterface,

  // Reward System
  Reward: () => organismFactories.reward

  // TODO: Add modal when ModalController is fixed
} as const;

// Hook for organism factory bridge
export function useOrganismFactory() {
  const createOrganismElement = (organismType: keyof typeof ORGANISM_FACTORIES, config: any = {}) => {
    const factoryFn = ORGANISM_FACTORIES[organismType];
    if (!factoryFn) {
      throw new Error(`Organism factory ${organismType} not found`);
    }

    const factory = factoryFn();
    let element: HTMLElement;

    if (typeof factory === 'function') {
      // Function factory
      const result = (factory as any)(config);
      element = (result as any)?.element || result;
    } else if ((factory as any)?.create) {
      // Class instance with create method
      const result = (factory as any).create(config);
      element = (result as any)?.element || result;
    } else {
      throw new Error(`Organism factory ${organismType} has invalid format`);
    }

    return element;
  };

  return { createOrganismElement };
}

// Generic Organism Bridge Component
interface OrganismBridgeProps {
  organism: keyof typeof ORGANISM_FACTORIES;
  config?: Record<string, any>;
  onMount?: (element: HTMLElement) => void;
  onUnmount?: () => void;
}

export const OrganismBridge: React.FC<OrganismBridgeProps> = ({
  organism,
  config = {},
  onMount,
  onUnmount,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { createOrganismElement } = useOrganismFactory();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    try {
      const element = createOrganismElement(organism, { ...config, ...props });
      container.appendChild(element);
      onMount?.(element);

      return () => {
        if (container?.contains(element)) {
          container.removeChild(element);
        }
        onUnmount?.();
      };
    } catch (error) {
      console.error(`Organism bridge error for ${organism}:`, error);
    }
  }, [organism, config, onMount, onUnmount, createOrganismElement, props]);

  return <div ref={containerRef} />;
};

export default OrganismBridge;
