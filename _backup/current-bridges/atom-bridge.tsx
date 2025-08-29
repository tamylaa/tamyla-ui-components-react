/**
 * Atom Factory Bridge - React wrappers for atomic components
 * Handles: Buttons, Inputs, Cards, Status Indicators, Input Groups
 */

import React, { useEffect, useRef } from 'react';
import {
  ButtonFactory,
  InputFactory,
  InputGroupFactory,
  CardFactory,
  StatusIndicatorFactory
} from '@tamyla/ui-components';

// Atom factory instances
const atomFactories = {
  button: new ButtonFactory(),
  input: new InputFactory(),
  inputGroup: InputGroupFactory, // function factory
  card: new CardFactory(),
  statusIndicator: new StatusIndicatorFactory()
} as const;

// Atom factory mapping
export const ATOM_FACTORIES = {
  // Button variants
  Button: () => atomFactories.button.create.bind(atomFactories.button),
  ButtonPrimary: () => atomFactories.button.createPrimary.bind(atomFactories.button),
  ButtonSecondary: () => atomFactories.button.createSecondary.bind(atomFactories.button),
  ButtonGhost: () => atomFactories.button.createGhost.bind(atomFactories.button),
  ButtonDanger: () => atomFactories.button.createDanger.bind(atomFactories.button),
  ButtonSuccess: () => atomFactories.button.createSuccess.bind(atomFactories.button),
  ButtonWithIcon: () => atomFactories.button.createWithIcon.bind(atomFactories.button),
  ButtonIconOnly: () => atomFactories.button.createIconOnly.bind(atomFactories.button),

  // Input variants
  Input: () => atomFactories.input.create.bind(atomFactories.input),
  InputGroup: () => atomFactories.inputGroup, // function factory

  // Card variants
  Card: () => atomFactories.card.create.bind(atomFactories.card),

  // Status variants
  StatusIndicator: () => atomFactories.statusIndicator.create.bind(atomFactories.statusIndicator)
} as const;

// Hook for atom factory bridge
export function useAtomFactory() {
  const createAtomElement = (atomType: keyof typeof ATOM_FACTORIES, config: any = {}) => {
    const factoryFn = ATOM_FACTORIES[atomType];
    if (!factoryFn) {
      throw new Error(`Atom factory ${atomType} not found`);
    }

    const factory = factoryFn();
    let element: HTMLElement;

    if (typeof factory === 'function') {
      // Function factory (like InputGroup)
      const result = (factory as any)(config);
      element = (result as any)?.element || result;
    } else if ((factory as any)?.create) {
      // Bound method factory
      const result = (factory as any)(config);
      element = (result as any)?.element || result;
    } else {
      throw new Error(`Atom factory ${atomType} has invalid format`);
    }

    return element;
  };

  return { createAtomElement };
}

// Generic Atom Bridge Component
interface AtomBridgeProps {
  atom: keyof typeof ATOM_FACTORIES;
  config?: Record<string, any>;
  onMount?: (element: HTMLElement) => void;
  onUnmount?: () => void;
}

export const AtomBridge: React.FC<AtomBridgeProps> = ({
  atom,
  config = {},
  onMount,
  onUnmount,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { createAtomElement } = useAtomFactory();

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      const element = createAtomElement(atom, { ...config, ...props });
      containerRef.current.appendChild(element);
      onMount?.(element);

      return () => {
        if (containerRef.current?.contains(element)) {
          containerRef.current.removeChild(element);
        }
        onUnmount?.();
      };
    } catch (error) {
      console.error(`Atom bridge error for ${atom}:`, error);
    }
  }, [atom, config, onMount, onUnmount, createAtomElement]);

  return <div ref={containerRef} />;
};

export default AtomBridge;
