/**
 * Content Services - Main Export
 * Enterprise service layer for content management
 */

// Export all interfaces and types
export * from './ContentService.interface';

// Export all implementations
export * from './implementations';

// Export core infrastructure  
export { ServiceContainer } from '../core/ServiceContainer';

// Import implementations for convenience functions
import {
  createRestContentService,
  createMockContentService,
  createServiceContainer,
  defaultServiceContainer
} from './implementations';

/**
 * Service Configuration Helper
 * Sets up a complete service container with environment-based configuration
 */
export function configureServices(config?: {
  useMockService?: boolean;
  dataServiceBaseURL?: string;
  contentStoreBaseURL?: string;
  authToken?: string;
  debug?: boolean;
}) {
  const {
    useMockService = process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_MOCK_SERVICE === 'true',
    dataServiceBaseURL = process.env.REACT_APP_DATA_SERVICE_URL || 'https://data-service.tamylatrading.workers.dev',
    contentStoreBaseURL = process.env.REACT_APP_CONTENT_STORE_URL || 'https://content-store.tamylatrading.workers.dev',
    debug = process.env.NODE_ENV === 'development'
  } = config || {};

  if (useMockService) {
    return createMockContentService({
      autoGenerateFiles: true,
      fileCount: 20,
      defaultDelay: 300,
      debug
    });
  }

  return createRestContentService({
    dataServiceBaseURL,
    contentStoreBaseURL,
    debug
  });
}

/**
 * Default configured service instance
 * Use this for simple applications that don't need custom configuration
 */
export const defaultContentService = configureServices();