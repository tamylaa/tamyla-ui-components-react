/**
 * Molecule Factory Bridge - React wrappers for molecular components
 * Handles: Action Cards, Search Bars, Content Cards, File Lists, Notifications
 */
import React from 'react';
import { ContentCardFactory, FileListFactory, NotificationFactory } from '@tamyla/ui-components';
export declare const MOLECULE_FACTORIES: {
    readonly ActionCard: () => (props?: {}) => HTMLDivElement;
    readonly SearchBar: () => (props?: {}) => Element | null;
    readonly ContentCard: () => typeof ContentCardFactory;
    readonly FileList: () => typeof FileListFactory;
    readonly Notification: () => typeof NotificationFactory;
};
export declare function useMoleculeFactory(): {
    createMoleculeElement: (moleculeType: keyof typeof MOLECULE_FACTORIES, config?: any) => HTMLElement;
};
interface MoleculeBridgeProps {
    molecule: keyof typeof MOLECULE_FACTORIES;
    config?: Record<string, any>;
    onMount?: (element: HTMLElement) => void;
    onUnmount?: () => void;
}
export declare const MoleculeBridge: React.FC<MoleculeBridgeProps>;
export default MoleculeBridge;
//# sourceMappingURL=molecule-bridge.d.ts.map
