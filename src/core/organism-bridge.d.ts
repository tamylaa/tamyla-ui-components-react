/**
 * Organism Factory Bridge - React wrappers for organism components
 * Handles: Search Interfaces, Modals (when working), Rewards (when working)
 */
import React from 'react';
import { SearchInterfaceFactory, RewardSystem } from '@tamyla/ui-components';
export declare const ORGANISM_FACTORIES: {
    readonly SearchInterface: () => typeof SearchInterfaceFactory;
    readonly Reward: () => typeof RewardSystem;
};
export declare function useOrganismFactory(): {
    createOrganismElement: (organismType: keyof typeof ORGANISM_FACTORIES, config?: any) => HTMLElement;
};
interface OrganismBridgeProps {
    organism: keyof typeof ORGANISM_FACTORIES;
    config?: Record<string, any>;
    onMount?: (element: HTMLElement) => void;
    onUnmount?: () => void;
}
export declare const OrganismBridge: React.FC<OrganismBridgeProps>;
export default OrganismBridge;
//# sourceMappingURL=organism-bridge.d.ts.map