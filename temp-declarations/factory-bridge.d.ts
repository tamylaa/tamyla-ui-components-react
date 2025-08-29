/**
 * Comprehensive Factory Bridge - Automatic React wrapper for ALL ui-components
 * Eliminates code duplication by wrapping ALL vanilla components automatically
 */
import React from 'react';
import { ContentCardFactory, FileListFactory, NotificationFactory, SearchInterfaceFactory } from '@tamyla/ui-components';
declare const FACTORY_MAP: {
    readonly TamylaUI: () => any;
    readonly ContentManager: () => any;
    readonly CampaignSelector: () => any;
    readonly EnhancedSearch: () => any;
    readonly ActionCard: () => any;
    readonly SearchBar: () => any;
    readonly ContentCard: () => typeof ContentCardFactory;
    readonly FileList: () => typeof FileListFactory;
    readonly Notification: () => typeof NotificationFactory;
    readonly SearchInterface: () => typeof SearchInterfaceFactory;
    readonly StatusIndicator: () => any;
    readonly Card: () => any;
    readonly InputGroup: () => any;
    readonly Button: () => any;
    readonly ButtonPrimary: () => any;
    readonly ButtonSecondary: () => any;
    readonly ButtonGhost: () => any;
    readonly ButtonDanger: () => any;
    readonly ButtonSuccess: () => any;
    readonly ButtonWithIcon: () => any;
    readonly ButtonIconOnly: () => any;
    readonly Input: () => any;
};
interface FactoryComponentProps {
    factory: keyof typeof FACTORY_MAP;
    config?: Record<string, any>;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onEvent?: (eventType: string, data: any) => void;
}
/**
 * Factory Bridge Component - Universal React wrapper for ui-components
 * This single component replaces ALL individual React components!
 */
export declare const FactoryBridge: React.FC<FactoryComponentProps>;
/**
 * Hook for using Factory Bridge programmatically
 */
export declare const useFactoryBridge: () => {
    createFactoryComponent: (factory: keyof typeof FACTORY_MAP, config?: Record<string, any>) => Promise<HTMLElement | null>;
    FactoryBridge: React.FC<FactoryComponentProps>;
    availableFactories: ("TamylaUI" | "ContentManager" | "CampaignSelector" | "EnhancedSearch" | "ActionCard" | "SearchBar" | "ContentCard" | "FileList" | "Notification" | "SearchInterface" | "StatusIndicator" | "Card" | "InputGroup" | "Button" | "ButtonPrimary" | "ButtonSecondary" | "ButtonGhost" | "ButtonDanger" | "ButtonSuccess" | "ButtonWithIcon" | "ButtonIconOnly" | "Input")[];
};
/**
 * Utility function to create factory-based React components
 * This maintains compatibility with existing component files
 */
export declare const createFactoryComponent: <T extends object>(factoryName: keyof typeof FACTORY_MAP, displayName?: string) => React.FC<T & {
    config?: any;
    onEvent?: (eventType: string, detail: any) => void;
}>;
/**
 * Pre-built React components for every ui-component factory
 * These provide type-safe, specific interfaces while using the universal bridge
 */
export declare const ReactButton: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactButtonPrimary: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactButtonSecondary: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactButtonGhost: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactButtonDanger: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactButtonSuccess: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactButtonWithIcon: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactButtonIconOnly: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactInput: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactInputGroup: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactCard: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactStatusIndicator: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactActionCard: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactSearchBar: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactContentCard: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactFileList: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactNotification: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactSearchInterface: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactEnhancedSearch: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactCampaignSelector: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactContentManager: React.FC<Omit<FactoryComponentProps, 'factory'>>;
export declare const ReactTamylaUI: React.FC<Omit<FactoryComponentProps, 'factory'>>;
/**
 * Master export - comprehensive coverage of ALL ui-components
 */
export default FactoryBridge;
export declare const AVAILABLE_FACTORIES: ("TamylaUI" | "ContentManager" | "CampaignSelector" | "EnhancedSearch" | "ActionCard" | "SearchBar" | "ContentCard" | "FileList" | "Notification" | "SearchInterface" | "StatusIndicator" | "Card" | "InputGroup" | "Button" | "ButtonPrimary" | "ButtonSecondary" | "ButtonGhost" | "ButtonDanger" | "ButtonSuccess" | "ButtonWithIcon" | "ButtonIconOnly" | "Input")[];
