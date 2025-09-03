/**
 * Dynamic UI Components Importer
 * Provides runtime dynamic import functionality for @tamyla/ui-components
 * This prevents TypeScript compilation errors when the peer dependency is not available
 */

export interface UIComponentsModule {
  // Factory types
  ButtonFactory?: any;
  InputFactory?: any;
  CardFactory?: any;
  SearchBarFactory?: any;
  ActionCardFactory?: any;
  SearchInterfaceFactory?: any;
  StatusIndicatorFactory?: any;
  ContentCardFactory?: any;
  FileListFactory?: any;
  NotificationFactory?: any;
  CampaignSelectorSystem?: any;
  ContentManagerApplicationFactory?: any;
  EnhancedSearchApplicationFactory?: any;
  TamylaUISystem?: any;
  RewardSystem?: any;
  InputGroupFactory?: any;
  OrganismTemplates?: any;
  OrganismFactory?: any;
  
  // Utility functions
  createFactory?: any;
  FactoryRegistry?: any;
  
  // Other exports
  [key: string]: any;
}

/**
 * Dynamically imports @tamyla/ui-components if available
 * Returns null if the module is not available (e.g., in CI environments)
 */
export async function dynamicImportUIComponents(): Promise<UIComponentsModule | null> {
  try {
    // Use dynamic import to avoid static analysis
    const moduleSpecifier = '@tamyla/ui-components';
    const uiComponentsModule = await import(moduleSpecifier);
    
    console.log('✅ Successfully loaded @tamyla/ui-components');
    return uiComponentsModule as UIComponentsModule;
  } catch (error) {
    console.warn('⚠️ @tamyla/ui-components not available:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

/**
 * Gets a specific factory from @tamyla/ui-components with fallback
 */
export async function getUIComponentFactory(factoryName: string): Promise<any | null> {
  try {
    const uiComponents = await dynamicImportUIComponents();
    
    if (!uiComponents) {
      console.warn(`⚠️ Cannot get ${factoryName}: @tamyla/ui-components not available`);
      return null;
    }
    
    const factory = uiComponents[factoryName];
    if (!factory) {
      console.warn(`⚠️ Factory ${factoryName} not found in @tamyla/ui-components`);
      return null;
    }
    
    console.log(`✅ Successfully loaded factory: ${factoryName}`);
    return factory;
  } catch (error) {
    console.error(`❌ Error loading factory ${factoryName}:`, error);
    return null;
  }
}

/**
 * Checks if @tamyla/ui-components is available without importing it
 */
export async function isUIComponentsAvailable(): Promise<boolean> {
  try {
    await dynamicImportUIComponents();
    return true;
  } catch {
    return false;
  }
}

/**
 * Gets multiple factories at once with fallback
 */
export async function getUIComponentFactories(factoryNames: string[]): Promise<Record<string, any>> {
  const factories: Record<string, any> = {};
  
  try {
    const uiComponents = await dynamicImportUIComponents();
    
    if (!uiComponents) {
      console.warn('⚠️ Cannot get factories: @tamyla/ui-components not available');
      return factories;
    }
    
    for (const factoryName of factoryNames) {
      const factory = uiComponents[factoryName];
      if (factory) {
        factories[factoryName] = factory;
        console.log(`✅ Loaded factory: ${factoryName}`);
      } else {
        console.warn(`⚠️ Factory ${factoryName} not found`);
      }
    }
    
    return factories;
  } catch (error) {
    console.error('❌ Error loading factories:', error);
    return factories;
  }
}

/**
 * Creates a mock factory for development/testing when real ones aren't available
 */
export function createMockFactory(factoryName: string): any {
  return {
    create: (config: any = {}) => {
      console.log(`🔧 Mock ${factoryName} create called with:`, config);
      return {
        element: document.createElement('div'),
        destroy: () => console.log(`🔧 Mock ${factoryName} destroyed`),
        update: (newConfig: any) => console.log(`🔧 Mock ${factoryName} updated:`, newConfig)
      };
    },
    
    // Enhanced methods
    enableTradingPortalPatterns: () => {
      console.log(`🔧 Mock ${factoryName} enableTradingPortalPatterns called`);
      return { success: true, patterns: ['mock-pattern'] };
    },
    
    selectionManager: {
      on: (event: string, callback: Function) => {
        console.log(`🔧 Mock ${factoryName} selectionManager.on(${event}) called`);
        return callback;
      }
    },
    
    setResults: (results: any[]) => {
      console.log(`🔧 Mock ${factoryName} setResults called with:`, results);
    },
    
    createSearchInterface: (config: any = {}) => {
      console.log(`🔧 Mock ${factoryName} createSearchInterface called with:`, config);
      return { element: document.createElement('div'), config };
    }
  };
}
