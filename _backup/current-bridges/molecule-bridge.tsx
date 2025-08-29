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

// Molecule factory instances
const moleculeFactories = {
  actionCard: new ActionCardFactory(),        // class factory
  searchBar: new SearchBarFactory(),          // class factory
  contentCard: ContentCardFactory,            // function factory
  fileList: FileListFactory,                  // function factory
  notification: NotificationFactory           // function factory
} as const;

// Molecule factory mapping
export const MOLECULE_FACTORIES = {
  // Action Cards
  ActionCard: () => moleculeFactories.actionCard.create.bind(moleculeFactories.actionCard),

  // Search Bars
  SearchBar: () => moleculeFactories.searchBar.create.bind(moleculeFactories.searchBar),

  // Content Cards
  ContentCard: () => moleculeFactories.contentCard,

  // File Lists
  FileList: () => moleculeFactories.fileList,

  // Notifications
  Notification: () => moleculeFactories.notification
} as const;

// Hook for molecule factory bridge
export function useMoleculeFactory() {
  const createMoleculeElement = (moleculeType: keyof typeof MOLECULE_FACTORIES, config: any = {}) => {
    const factoryFn = MOLECULE_FACTORIES[moleculeType];
    if (!factoryFn) {
      throw new Error(`Molecule factory ${moleculeType} not found`);
    }

    const factory = factoryFn();
    let element: HTMLElement;

    if (typeof factory === 'function') {
      // Function factory
      const result = (factory as any)(config);
      element = (result as any)?.element || result;
    } else if ((factory as any)?.create) {
      // Bound method factory
      const result = (factory as any)(config);
      element = (result as any)?.element || result;
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

    try {
      const element = createMoleculeElement(molecule, { ...config, ...props });
      containerRef.current.appendChild(element);
      onMount?.(element);

      return () => {
        if (containerRef.current?.contains(element)) {
          containerRef.current.removeChild(element);
        }
        onUnmount?.();
      };
    } catch (error) {
      console.error(`Molecule bridge error for ${molecule}:`, error);
    }
  }, [molecule, config, onMount, onUnmount, createMoleculeElement]);

  return <div ref={containerRef} />;
};

export default MoleculeBridge;
