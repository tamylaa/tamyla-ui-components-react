/**
 * Unified Factory Bridge - Central access point for all component layers
 * Integrates: Atoms, Molecules, Organisms, Applications
 */

import React from 'react';
import {
  AtomBridge,
  useAtomFactory,
  ATOM_FACTORIES
} from './atom-bridge';
import {
  MoleculeBridge,
  useMoleculeFactory,
  MOLECULE_FACTORIES
} from './molecule-bridge';
import {
  OrganismBridge,
  useOrganismFactory,
  ORGANISM_FACTORIES
} from './organism-bridge';
import {
  ApplicationBridge,
  useApplicationFactory,
  APPLICATION_FACTORIES
} from './application-bridge';

// Combined factory mapping for easy access
export const ALL_FACTORIES = {
  ...ATOM_FACTORIES,
  ...MOLECULE_FACTORIES,
  ...ORGANISM_FACTORIES,
  ...APPLICATION_FACTORIES
} as const;

// Unified hook for all factory bridges
export function useFactoryBridge() {
  const { createAtomElement } = useAtomFactory();
  const { createMoleculeElement } = useMoleculeFactory();
  const { createOrganismElement } = useOrganismFactory();
  const { createApplicationElement } = useApplicationFactory();

  const createFactoryElement = (factoryType: keyof typeof ALL_FACTORIES, config: any = {}) => {
    // Determine which layer this factory belongs to
    if (factoryType in ATOM_FACTORIES) {
      return createAtomElement(factoryType as keyof typeof ATOM_FACTORIES, config);
    } else if (factoryType in MOLECULE_FACTORIES) {
      return createMoleculeElement(factoryType as keyof typeof MOLECULE_FACTORIES, config);
    } else if (factoryType in ORGANISM_FACTORIES) {
      return createOrganismElement(factoryType as keyof typeof ORGANISM_FACTORIES, config);
    } else if (factoryType in APPLICATION_FACTORIES) {
      return createApplicationElement(factoryType as keyof typeof APPLICATION_FACTORIES, config);
    } else {
      throw new Error(`Factory type ${factoryType} not found in any layer`);
    }
  };

  return {
    createFactoryElement,
    createFactoryComponent,
    createAtomElement,
    createMoleculeElement,
    createOrganismElement,
    createApplicationElement
  };
}

// Generic Factory Bridge Component
interface FactoryBridgeProps {
  factory: keyof typeof ALL_FACTORIES;
  config?: Record<string, any>;
  onMount?: (element: HTMLElement) => void;
  onUnmount?: () => void;
}

export const FactoryBridge: React.FC<FactoryBridgeProps> = ({
  factory,
  config = {},
  onMount,
  onUnmount,
  ...props
}) => {
  // Route to appropriate bridge based on factory type
  if (factory in ATOM_FACTORIES) {
    return (
      <AtomBridge
        atom={factory as keyof typeof ATOM_FACTORIES}
        config={config}
        onMount={onMount}
        onUnmount={onUnmount}
        {...props}
      />
    );
  } else if (factory in MOLECULE_FACTORIES) {
    return (
      <MoleculeBridge
        molecule={factory as keyof typeof MOLECULE_FACTORIES}
        config={config}
        onMount={onMount}
        onUnmount={onUnmount}
        {...props}
      />
    );
  } else if (factory in ORGANISM_FACTORIES) {
    return (
      <OrganismBridge
        organism={factory as keyof typeof ORGANISM_FACTORIES}
        config={config}
        onMount={onMount}
        onUnmount={onUnmount}
        {...props}
      />
    );
  } else if (factory in APPLICATION_FACTORIES) {
    return (
      <ApplicationBridge
        application={factory as keyof typeof APPLICATION_FACTORIES}
        config={config}
        onMount={onMount}
        onUnmount={onUnmount}
        {...props}
      />
    );
  } else {
    throw new Error(`Factory type ${factory} not found in any layer`);
  }
};

// Component availability summary
export const COMPONENT_AVAILABILITY = {
  atoms: Object.keys(ATOM_FACTORIES),
  molecules: Object.keys(MOLECULE_FACTORIES),
  organisms: Object.keys(ORGANISM_FACTORIES),
  applications: Object.keys(APPLICATION_FACTORIES),
  total: Object.keys(ALL_FACTORIES).length
} as const;

// Legacy compatibility function for existing components
export function createFactoryComponent<TProps extends Record<string, any> = Record<string, any>>(
  factory: keyof typeof ALL_FACTORIES,
  displayName: string = factory
) {
  const Component: React.FC<TProps> = (props) => {
    return (
      <FactoryBridge
        factory={factory}
        config={props}
      />
    );
  };

  Component.displayName = displayName;
  return Component;
}

export default FactoryBridge;
