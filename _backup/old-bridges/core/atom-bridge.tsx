/**
 * Atom Factory Bridge - React wrappers for atomic components
 * Handles: Buttons, Inputs, Cards
 */

import React, { useEffect, useRef } from 'react';
import {
  ButtonFactory,
  InputFactory,
  CardFactory
} from '@tamyla/ui-components';

// Atom factory instances - CORRECTED: They're already objects!
const atomFactories = {
  button: ButtonFactory,        // object with .create() method
  input: InputFactory,          // object with .create() method
  card: CardFactory            // object with .create() method
} as const;

// Atom factory mapping - simplified to use only available methods
export const ATOM_FACTORIES = {
  Button: 'button',
  Input: 'input',
  Card: 'card'
} as const;

// Hook for atom factory bridge
export function useAtomFactory() {
  const createAtomElement = (atomType: keyof typeof ATOM_FACTORIES, config: Record<string, any> = {}) => {
    const factoryKey = ATOM_FACTORIES[atomType];
    const factory = atomFactories[factoryKey];

    if (!factory) {
      throw new Error(`Atom factory ${atomType} not found`);
    }

    // All atom factories have .create() method
    if (factory && typeof factory === 'object' && 'create' in factory && typeof factory.create === 'function') {
      return factory.create();
    } else {
      throw new Error(`Atom factory ${atomType} has invalid format`);
    }
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

    const container = containerRef.current;

    try {
      const element = createAtomElement(atom, { ...config, ...props });
      container.appendChild(element);
      onMount?.(element);

      return () => {
        if (container?.contains(element)) {
          container.removeChild(element);
        }
        onUnmount?.();
      };
    } catch (error) {
      console.error(`Atom bridge error for ${atom}:`, error);
    }
  }, [atom, config, onMount, onUnmount, createAtomElement, props]);

  return <div ref={containerRef} />;
};

export default AtomBridge;
