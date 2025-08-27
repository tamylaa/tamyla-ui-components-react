/**
 * Comprehensive Factory Bridge - Automatic React wrapper for ALL ui-components
 * (Compatibility copy moved to compat/ to avoid being the canonical implementation)
 */
import React from 'react';
import { InputGroupFactory, ContentCardFactory, FileListFactory, NotificationFactory, SearchInterfaceFactory, EnhancedSearchApplicationFactory, CampaignSelectorSystem, ContentManagerApplicationFactory } from '@tamyla/ui-components';
declare const FACTORY_MAP: {
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
    readonly ActionCard: () => (props?: {}) => HTMLDivElement;
    readonly SearchBar: () => (props?: {}) => Element | null;
    readonly ContentCard: () => typeof ContentCardFactory;
    readonly FileList: () => typeof FileListFactory;
    readonly Notification: () => typeof NotificationFactory;
    readonly SearchInterface: () => typeof SearchInterfaceFactory;
    readonly EnhancedSearch: () => typeof EnhancedSearchApplicationFactory;
    readonly CampaignSelector: () => typeof CampaignSelectorSystem;
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
interface FactoryComponentProps {
    factory: keyof typeof FACTORY_MAP;
    config?: Record<string, any>;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onEvent?: (eventType: string, data: any) => void;
}
export declare const FactoryBridge: React.FC<FactoryComponentProps>;
export declare const useFactoryBridge: () => {
    createFactoryComponent: (factory: keyof typeof FACTORY_MAP, config?: Record<string, any>) => Promise<HTMLElement | null>;
    FactoryBridge: React.FC<FactoryComponentProps>;
    availableFactories: ("Button" | "Card" | "Input" | "SearchBar" | "ActionCard" | "ContentCard" | "Notification" | "FileList" | "SearchInterface" | "ContentManager" | "EnhancedSearch" | "CampaignSelector" | "StatusIndicator" | "TamylaUI" | "ButtonPrimary" | "ButtonSecondary" | "ButtonGhost" | "ButtonDanger" | "ButtonSuccess" | "ButtonWithIcon" | "ButtonIconOnly" | "InputGroup")[];
};
export default FactoryBridge;
export declare const AVAILABLE_FACTORIES: ("Button" | "Card" | "Input" | "SearchBar" | "ActionCard" | "ContentCard" | "Notification" | "FileList" | "SearchInterface" | "ContentManager" | "EnhancedSearch" | "CampaignSelector" | "StatusIndicator" | "TamylaUI" | "ButtonPrimary" | "ButtonSecondary" | "ButtonGhost" | "ButtonDanger" | "ButtonSuccess" | "ButtonWithIcon" | "ButtonIconOnly" | "InputGroup")[];
//# sourceMappingURL=factory-bridge-new.d.ts.map