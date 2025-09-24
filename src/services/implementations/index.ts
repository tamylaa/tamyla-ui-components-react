/**
 * Service Implementations Index
 * Central export point for all content service implementations
 */

export { FetchHttpClient, MockHttpClient } from './HttpClient';
export type { HttpClientConfig } from './HttpClient';

export { RestContentService } from './RestContentService';
export type { RestContentServiceConfig } from './RestContentService';

export { MockContentService } from './MockContentService';
export type { MockContentServiceConfig } from './MockContentService';

/**
 * Service Factory Functions
 * Convenient factory functions for creating service instances
 */

import { FetchHttpClient, MockHttpClient } from './HttpClient';
import { RestContentService, RestContentServiceConfig } from './RestContentService';
import { MockContentService, MockContentServiceConfig } from './MockContentService';
import { ServiceContainer } from '../../core/ServiceContainer';
import { IContentService } from '../ContentService.interface';

/**
 * Create a production REST content service with HTTP client
 */
export function createRestContentService(config: RestContentServiceConfig): IContentService {
  const httpClient = new FetchHttpClient({
    timeout: 30000,
    retries: 3,
    authToken: config.authToken,
    debug: config.debug
  });

  return new RestContentService(httpClient, config);
}

/**
 * Create a mock content service for testing/development
 */
export function createMockContentService(config: MockContentServiceConfig = {}): IContentService {
  return new MockContentService(config);
}

/**
 * Create a service container with common service registrations
 */
export function createServiceContainer(): ServiceContainer {
  // Register HTTP client factory
  ServiceContainer.register('httpClient', () => {
    return new FetchHttpClient({
      timeout: 30000,
      retries: 3,
      debug: process.env.NODE_ENV === 'development'
    });
  });

  // Register content service factory (production)
  ServiceContainer.register('contentService', () => {
    const httpClient = ServiceContainer.resolve<FetchHttpClient>('httpClient');
    
    // These would typically come from environment variables
    const config: RestContentServiceConfig = {
      dataServiceBaseURL: process.env.REACT_APP_DATA_SERVICE_URL || 'http://localhost:8081',
      contentStoreBaseURL: process.env.REACT_APP_CONTENT_STORE_URL || 'http://localhost:8080',
      debug: process.env.NODE_ENV === 'development'
    };

    return new RestContentService(httpClient, config);
  }, { dependencies: ['httpClient'] });

  // Register mock content service for testing
  ServiceContainer.register('mockContentService', () => {
    return new MockContentService({
      autoGenerateFiles: true,
      fileCount: 15,
      defaultDelay: 200,
      debug: process.env.NODE_ENV === 'development'
    });
  });

  return new ServiceContainer();
}

/**
 * Default service container instance
 * Can be imported and used directly in applications
 */
export const defaultServiceContainer = createServiceContainer();