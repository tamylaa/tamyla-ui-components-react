/**
 * Application Factory Bridge - React wrappers for application components
 * Handles: Enhanced Search, Campaign Selector, Content Manager, TamylaUI System
 */
import React from 'react';
import { EnhancedSearchApplicationFactory, CampaignSelectorSystem, ContentManagerApplicationFactory } from '@tamyla/ui-components';
export declare const APPLICATION_FACTORIES: {
    readonly EnhancedSearch: () => typeof EnhancedSearchApplicationFactory;
    readonly CampaignSelector: () => CampaignSelectorSystem;
    readonly ContentManager: () => typeof ContentManagerApplicationFactory;
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
};
export declare function useApplicationFactory(): {
    createApplicationElement: (applicationType: keyof typeof APPLICATION_FACTORIES, config?: any) => HTMLElement;
};
interface ApplicationBridgeProps {
    application: keyof typeof APPLICATION_FACTORIES;
    config?: Record<string, any>;
    onMount?: (element: HTMLElement) => void;
    onUnmount?: () => void;
}
export declare const ApplicationBridge: React.FC<ApplicationBridgeProps>;
export default ApplicationBridge;
//# sourceMappingURL=application-bridge.d.ts.map
