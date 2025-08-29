/**
 * Molecule Factory Bridge - React wrappers for molecular components
 * Handles: Action Cards, Search Bars, Content Cards, File Lists, Notifications
 */

import React, { useEffect, useRef } from 'react';
import {
  ActionCardFactory,
  SearchBarFactory,
  ContentCardFactory,
  FileListFactory,
  NotificationFactory
} from '@tamyla/ui-components';

// Molecule factory instances - CORRECTED: They're already objects!
const moleculeFactories = {
  actionCard: ActionCardFactory,                      // object with .create() method
  searchBar: SearchBarFactory,                        // object with .create() method
  contentCard: ContentCardFactory,                    // function factory
  fileList: FileListFactory,                          // function factory
  notification: NotificationFactory                   // function factory
} as const;

// Molecule factory mapping - simplified
export const MOLECULE_FACTORIES = {
  ActionCard: 'actionCard',
  SearchBar: 'searchBar',
  ContentCard: 'contentCard',
  FileList: 'fileList',
  Notification: 'notification'
} as const;

// Hook for molecule factory bridge
export function useMoleculeFactory() {
  const createMoleculeElement = (moleculeType: keyof typeof MOLECULE_FACTORIES, config: Record<string, any> = {}) => {
    const factoryKey = MOLECULE_FACTORIES[moleculeType];
    const factory = moleculeFactories[factoryKey];

    if (!factory) {
      throw new Error(`Molecule factory ${moleculeType} not found`);
    }

    let element: HTMLElement;

    // Handle different factory types based on actual API with proper type narrowing
    if (typeof factory === 'function') {
      // Function factory (ContentCard, FileList, etc.)
      const functionFactory = factory as (config: Record<string, any>) => any;
      const result = functionFactory(config);
      element = result?.element || result;
    } else if (factory && typeof factory === 'object' && 'create' in factory && typeof factory.create === 'function') {
      // Object factory with .create() method (ActionCard, SearchBar)
      // API: factory.create() - no arguments, returns HTMLElement directly
      element = factory.create();
    } else {
      throw new Error(`Molecule factory ${moleculeType} has invalid format`);
    }

    return element;
  };

  return { createMoleculeElement };
}

// Generic Molecule Bridge Component
interface MoleculeBridgeProps {
  molecule: keyof typeof MOLECULE_FACTORIES;
  config?: Record<string, any>;
  onMount?: (element: HTMLElement) => void;
  onUnmount?: () => void;
}

export const MoleculeBridge: React.FC<MoleculeBridgeProps> = ({
  molecule,
  config = {},
  onMount,
  onUnmount,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { createMoleculeElement } = useMoleculeFactory();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    try {
      const element = createMoleculeElement(molecule, { ...config, ...props });
      container.appendChild(element);
      onMount?.(element);

      return () => {
        if (container?.contains(element)) {
          container.removeChild(element);
        }
        onUnmount?.();
      };
    } catch (error) {
      console.error(`Molecule bridge error for ${molecule}:`, error);
    }
  }, [molecule, config, onMount, onUnmount, createMoleculeElement, props]);

  return <div ref={containerRef} />;
};

export default MoleculeBridge;
