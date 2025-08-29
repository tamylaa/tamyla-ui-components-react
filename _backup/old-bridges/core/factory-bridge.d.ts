/**
 * Unified Factory Bridge - Central access point for all component layers
 * Integrates: Atoms, Molecules, Organisms, Applications
 */
import React from 'react';
export declare const ALL_FACTORIES: {
    readonly EnhancedSearch: () => typeof import('packages/ui-components/dist/tamyla-ui.esm').EnhancedSearchApplicationFactory;
    readonly CampaignSelector: () => import('packages/ui-components/dist/tamyla-ui.esm').CampaignSelectorSystem;
    readonly ContentManager: () => typeof import('packages/ui-components/dist/tamyla-ui.esm').ContentManagerApplicationFactory;
    readonly TamylaUI: () => {
        Atom: (type: any, props: any, id: any) => any;
        Button: (props: any, id: any) => any;
        Input: (props: any, id: any) => any;
        Card: (props: any, id: any) => any;
        Molecule: (type: any, props: any, id: any) => any;
        SearchBar: (props: any, id: any) => any;
        ContentCard: (props: any, id: any) => any;
        ContentGrid: (props: any, id: any) => any;
        Organism: (type: any, props: any, id: any) => any;
        SearchInterface: (props: any, id: any) => any;
        Application: (type: any, props: any, id: any) => any;
        EnhancedSearch: (props: any, id: any) => any;
        ContentManager: (props: any, id: any) => any;
    };
    readonly SearchInterface: () => typeof import('packages/ui-components/dist/tamyla-ui.esm').SearchInterfaceFactory;
    readonly Reward: () => typeof import('packages/ui-components/dist/tamyla-ui.esm').RewardSystem;
    readonly ActionCard: () => (props?: {}) => HTMLDivElement;
    readonly SearchBar: () => (props?: {}) => Element | null;
    readonly ContentCard: () => typeof import('packages/ui-components/dist/tamyla-ui.esm').ContentCardFactory;
    readonly FileList: () => typeof import('packages/ui-components/dist/tamyla-ui.esm').FileListFactory;
    readonly Notification: () => typeof import('packages/ui-components/dist/tamyla-ui.esm').NotificationFactory;
    readonly Button: () => (props?: {}) => Element | null;
    readonly ButtonPrimary: () => (props?: {}) => Element | null;
    readonly ButtonSecondary: () => (props?: {}) => Element | null;
    readonly ButtonGhost: () => (props?: {}) => Element | null;
    readonly ButtonDanger: () => (props?: {}) => Element | null;
    readonly ButtonSuccess: () => (props?: {}) => Element | null;
    readonly ButtonWithIcon: () => (iconName: any, props?: {}) => Element | null;
    readonly ButtonIconOnly: () => (iconName: any, props?: {}) => Element | null;
    readonly Input: () => (props?: {}) => Element | null;
    readonly InputGroup: () => typeof import('packages/ui-components/dist/tamyla-ui.esm').InputGroupFactory;
    readonly Card: () => (props?: {}) => Element | null;
    readonly StatusIndicator: () => (props?: {}) => HTMLSpanElement;
};
export declare function useFactoryBridge(): {
    createFactoryElement: (factoryType: keyof typeof ALL_FACTORIES, config?: any) => HTMLElement;
    createFactoryComponent: typeof createFactoryComponent;
    createAtomElement: (atomType: 'Button' | 'Card' | 'Input' | 'StatusIndicator' | 'ButtonPrimary' | 'ButtonSecondary' | 'ButtonGhost' | 'ButtonDanger' | 'ButtonSuccess' | 'ButtonWithIcon' | 'ButtonIconOnly' | 'InputGroup', config?: any) => HTMLElement;
    createMoleculeElement: (moleculeType: 'SearchBar' | 'ActionCard' | 'ContentCard' | 'Notification' | 'FileList', config?: any) => HTMLElement;
    createOrganismElement: (organismType: 'SearchInterface' | 'Reward', config?: any) => HTMLElement;
    createApplicationElement: (applicationType: 'ContentManager' | 'EnhancedSearch' | 'CampaignSelector' | 'TamylaUI', config?: any) => HTMLElement;
};
interface FactoryBridgeProps {
    factory: keyof typeof ALL_FACTORIES;
    config?: Record<string, any>;
    onMount?: (element: HTMLElement) => void;
    onUnmount?: () => void;
}
export declare const FactoryBridge: React.FC<FactoryBridgeProps>;
export declare const COMPONENT_AVAILABILITY: {
    readonly atoms: string[];
    readonly molecules: string[];
    readonly organisms: string[];
    readonly applications: string[];
    readonly total: number;
};
export declare function createFactoryComponent<TProps extends Record<string, any> = Record<string, any>>(factory: keyof typeof ALL_FACTORIES, displayName?: string): React.FC<TProps>;
export default FactoryBridge;
//# sourceMappingURL=factory-bridge.d.ts.map
