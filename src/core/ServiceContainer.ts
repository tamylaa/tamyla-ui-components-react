/**
 * Service Container - Enterprise Dependency Injection
 * Provides service registration, resolution, and lifecycle management
 */

export type ServiceFactory<T> = () => T;
export type ServiceInstance<T> = T;

export interface ServiceDefinition<T> {
  factory?: ServiceFactory<T>;
  instance?: ServiceInstance<T>;
  singleton?: boolean;
  dependencies?: string[];
}

/**
 * Dependency Injection Container
 * Manages service registration and resolution with lifecycle support
 */
export class ServiceContainer {
  private static services = new Map<string, ServiceDefinition<any>>();
  private static instances = new Map<string, any>();
  private static initializing = new Set<string>();

  /**
   * Register a service with the container
   */
  static register<T>(
    key: string, 
    factoryOrInstance: ServiceFactory<T> | ServiceInstance<T>,
    options: { singleton?: boolean; dependencies?: string[] } = {}
  ): void {
    if (this.services.has(key)) {
      console.warn(`Service '${key}' is already registered. Overwriting...`);
    }

    const definition: ServiceDefinition<T> = {
      singleton: options.singleton !== false, // Default to singleton
      dependencies: options.dependencies || []
    };

    if (typeof factoryOrInstance === 'function') {
      definition.factory = factoryOrInstance as ServiceFactory<T>;
    } else {
      definition.instance = factoryOrInstance as ServiceInstance<T>;
    }

    this.services.set(key, definition);
    
    // Clear cached instance if re-registering
    if (this.instances.has(key)) {
      this.instances.delete(key);
    }
  }

  /**
   * Resolve a service from the container
   */
  static resolve<T>(key: string): T {
    if (!this.services.has(key)) {
      throw new Error(`Service '${key}' is not registered. Available services: ${Array.from(this.services.keys()).join(', ')}`);
    }

    // Check for circular dependencies
    if (this.initializing.has(key)) {
      throw new Error(`Circular dependency detected for service '${key}'`);
    }

    const definition = this.services.get(key)!;

    // Return existing instance if singleton
    if (definition.singleton && this.instances.has(key)) {
      return this.instances.get(key);
    }

    // Use pre-created instance
    if (definition.instance) {
      if (definition.singleton) {
        this.instances.set(key, definition.instance);
      }
      return definition.instance;
    }

    // Create new instance using factory
    if (definition.factory) {
      this.initializing.add(key);
      
      try {
        // Resolve dependencies first
        const dependencies = definition.dependencies?.map(dep => this.resolve(dep)) || [];
        
        // Call factory with dependencies
        const instance = (definition.factory as any)(...dependencies);
        
        if (definition.singleton) {
          this.instances.set(key, instance);
        }
        
        this.initializing.delete(key);
        return instance;
      } catch (error: any) {
        this.initializing.delete(key);
        throw new Error(`Failed to create service '${key}': ${error?.message || error}`);
      }
    }

    throw new Error(`Service '${key}' has no factory or instance defined`);
  }

  /**
   * Check if a service is registered
   */
  static isRegistered(key: string): boolean {
    return this.services.has(key);
  }

  /**
   * Get all registered service keys
   */
  static getRegisteredServices(): string[] {
    return Array.from(this.services.keys());
  }

  /**
   * Clear all services (useful for testing)
   */
  static clear(): void {
    this.services.clear();
    this.instances.clear();
    this.initializing.clear();
  }

  /**
   * Remove a specific service
   */
  static unregister(key: string): boolean {
    const removed = this.services.delete(key);
    this.instances.delete(key);
    return removed;
  }

  /**
   * Get service information for debugging
   */
  static getServiceInfo(key: string): ServiceDefinition<any> | null {
    return this.services.get(key) || null;
  }

  /**
   * Validate all registered services can be resolved
   */
  static validateServices(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    for (const key of this.services.keys()) {
      try {
        this.resolve(key);
      } catch (error: any) {
        errors.push(`${key}: ${error?.message || error}`);
      }
    }
    
    return { valid: errors.length === 0, errors };
  }
}

/**
 * Service Keys - Centralized service identifiers
 */
export const ServiceKeys = {
  // Core services
  CONTENT_SERVICE: 'content-service',
  HTTP_CLIENT: 'http-client',
  
  // Infrastructure services
  ANALYTICS_SERVICE: 'analytics-service',
  NOTIFICATION_SERVICE: 'notification-service',
  CACHE_SERVICE: 'cache-service',
  LOGGER_SERVICE: 'logger-service',
  
  // Business services
  UPLOAD_SERVICE: 'upload-service',
  SEARCH_SERVICE: 'search-service',
  AUTH_SERVICE: 'auth-service',
  
  // Real-time services
  WEBSOCKET_SERVICE: 'websocket-service',
  REALTIME_SERVICE: 'realtime-service'
} as const;

export type ServiceKey = typeof ServiceKeys[keyof typeof ServiceKeys];

/**
 * Service Configuration Registry
 */
export interface ServiceConfig {
  environment: 'development' | 'staging' | 'production';
  apiBaseUrl: string;
  authToken?: string;
  enableMocking: boolean;
  enableRealtime: boolean;
  debug: boolean;
  timeout: number;
  retries: number;
}

export class ServiceConfigRegistry {
  private static config: Partial<ServiceConfig> = {};

  static setConfig(config: Partial<ServiceConfig>): void {
    this.config = { ...this.config, ...config };
  }

  static getConfig(): Partial<ServiceConfig> {
    return { ...this.config };
  }

  static get<K extends keyof ServiceConfig>(key: K): ServiceConfig[K] | undefined {
    return this.config[key];
  }

  static getRequired<K extends keyof ServiceConfig>(key: K): ServiceConfig[K] {
    const value = this.config[key];
    if (value === undefined) {
      throw new Error(`Required configuration '${key}' is not set`);
    }
    return value;
  }
}

/**
 * Decorator for automatic service injection (for class components)
 */
export function InjectService(serviceKey: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get() {
        return ServiceContainer.resolve(serviceKey);
      },
      enumerable: true,
      configurable: true
    });
  };
}

/**
 * Hook for service injection in React components
 */
export function useService<T>(serviceKey: string): T {
  // This will be implemented when we add React hooks
  return ServiceContainer.resolve<T>(serviceKey);
}