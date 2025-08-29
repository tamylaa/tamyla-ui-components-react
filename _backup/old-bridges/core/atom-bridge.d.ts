/**
 * Atom Factory Bridge - React wrappers for atomic components
 * Handles: Buttons, Inputs, Cards, Status Indicators, Input Groups
 */
import React from 'react';
import { InputGroupFactory } from '@tamyla/ui-components';
export declare const ATOM_FACTORIES: {
    readonly Button: () => (props?: {}) => Element | null;
    readonly ButtonPrimary: () => (props?: {}) => Element | null;
    readonly ButtonSecondary: () => (props?: {}) => Element | null;
    readonly ButtonGhost: () => (props?: {}) => Element | null;
    readonly ButtonDanger: () => (props?: {}) => Element | null;
    readonly ButtonSuccess: () => (props?: {}) => Element | null;
    readonly ButtonWithIcon: () => (iconName: any, props?: {}) => Element | null;
    readonly ButtonIconOnly: () => (iconName: any, props?: {}) => Element | null;
    readonly Input: () => (props?: {}) => Element | null;
    readonly InputGroup: () => typeof InputGroupFactory;
    readonly Card: () => (props?: {}) => Element | null;
    readonly StatusIndicator: () => (props?: {}) => HTMLSpanElement;
};
export declare function useAtomFactory(): {
    createAtomElement: (atomType: keyof typeof ATOM_FACTORIES, config?: any) => HTMLElement;
};
interface AtomBridgeProps {
    atom: keyof typeof ATOM_FACTORIES;
    config?: Record<string, any>;
    onMount?: (element: HTMLElement) => void;
    onUnmount?: () => void;
}
export declare const AtomBridge: React.FC<AtomBridgeProps>;
export default AtomBridge;
//# sourceMappingURL=atom-bridge.d.ts.map
