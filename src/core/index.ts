// Central core exports: pick canonical implementations here
export { default as FactoryBridge } from './factory-bridge';
export { useFactoryBridge, createFactoryComponent, ALL_FACTORIES, COMPONENT_AVAILABILITY } from './factory-bridge';

// Compatibility namespace for migrated/legacy implementations
export * as compat from './compat/index';
