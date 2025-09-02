/**
 * Factory Bridge - Main entry point for modular factory system
 * Re-exports from modular components for clean API
 */

// Force static imports to prevent tree-shaking
import { FactoryBridge } from './factory-bridge-core';
import { useFactoryBridge, useFactory } from './factory-hooks';
import * as FactoryComponents from './factory-components';
import { factoryRegistry } from './factory-registry';
import { factoryImporter } from './factory-importer';
import { createFactoryComponent } from './factory-components';

// Simple test export that can't be tree-shaken
export const TEST_EXPORT = 'This should be included';

// Core components
export { FactoryBridge } from './factory-bridge-core';
export type { FactoryComponentProps } from './factory-bridge-core';

// Hooks
export { useFactoryBridge, useFactory } from './factory-hooks';

// Pre-built components
export * from './factory-components';

// Registry access
export { factoryRegistry } from './factory-registry';
export { factoryImporter } from './factory-importer';

// Utility functions
export { createFactoryComponent } from './factory-components';

// Available factories list
export const AVAILABLE_FACTORIES = [];

// Test export to verify inclusion
export const FACTORY_BRIDGE_TEST = 'Factory Bridge is working';

// Legacy compatibility
export default FactoryBridge;
