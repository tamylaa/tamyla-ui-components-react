/**
 * Factory Health Monitor
 * Provides production-ready monitoring and health checks for factory systems
 */

import React from 'react';
import { Logger } from '../utils/logger';
import { safeFetch, safeAsync } from '../utils/async-safety';
import { dynamicImportUIComponents } from '../utils/dynamic-ui-components';
import { 
  isBrowser, 
  safeSetInterval, 
  safeClearInterval, 
  safeWindowAddEventListener, 
  safeWindowRemoveEventListener,
  createSSRSafeSingleton 
} from '../utils/ssr-safe';

// Local interface for AbortSignal to avoid ESLint issues
interface AbortSignalLike {
  readonly aborted: boolean;
  readonly reason?: unknown;
  addEventListener(type: 'abort', listener: () => void, options?: { once?: boolean }): void;
  removeEventListener(type: 'abort', listener: () => void): void;
}

const logger = new Logger({ enableConsole: true });

export interface FactoryHealthStatus {
  available: boolean;
  responsive: boolean;
  version?: string;
  loadTime: number;
  errors: string[];
  lastCheck: number;
  connectivity: 'online' | 'offline' | 'degraded';
}

export interface FactoryHealthConfig {
  checkInterval?: number;
  timeout?: number;
  retries?: number;
  enableOfflineMode?: boolean;
  enableMetrics?: boolean;
}

export class FactoryHealthMonitor {
  private status: FactoryHealthStatus = {
    available: false,
    responsive: false,
    loadTime: 0,
    errors: [],
    lastCheck: 0,
    connectivity: 'offline'
  };

  private config: Required<FactoryHealthConfig>;
  private checkTimer?: number;
  private abortController?: AbortController;
  private listeners: Array<(status: FactoryHealthStatus) => void> = [];

  constructor(config: FactoryHealthConfig = {}) {
    this.config = {
      checkInterval: config.checkInterval || 30000, // 30 seconds
      timeout: config.timeout || 10000,
      retries: config.retries || 2,
      enableOfflineMode: config.enableOfflineMode ?? true,
      enableMetrics: config.enableMetrics ?? true
    };

    // Start health monitoring (SSR-safe)
    this.startMonitoring();

    // Monitor network connectivity using SSR-safe listeners
    safeWindowAddEventListener('online', () => this.handleConnectivityChange('online'));
    safeWindowAddEventListener('offline', () => this.handleConnectivityChange('offline'));
  }

  /**
   * Get current health status
   */
  getStatus(): FactoryHealthStatus {
    return { ...this.status };
  }

  /**
   * Check if factories are available and responsive
   */
  async checkFactoryHealth(signal?: AbortSignalLike): Promise<FactoryHealthStatus> {
    const startTime = Date.now();
    const errors: string[] = [];

    try {
      // Test dynamic import
      const uiComponents = await safeAsync(
        () => dynamicImportUIComponents(signal),
        {
          timeout: this.config.timeout,
          retries: this.config.retries,
          signal,
          onError: (error) => errors.push(`Import failed: ${error.message}`),
          onTimeout: () => errors.push('Import timeout')
        }
      );

      const loadTime = Date.now() - startTime;
      const available = uiComponents !== null;

      let responsive = false;
      let version: string | undefined;

      if (available && uiComponents) {
        // Test responsiveness with a simple factory check
        try {
          // Try to access a known factory
          if ('version' in uiComponents) {
            version = String(uiComponents.version);
          }

          // Test if we can access basic factory methods
          const testFactories = ['ButtonFactory', 'CardFactory', 'InputFactory'];
          let workingFactories = 0;

          for (const factoryName of testFactories) {
            if (factoryName in uiComponents) {
              workingFactories++;
            }
          }

          responsive = workingFactories > 0;

          if (!responsive) {
            errors.push('No working factories found');
          }
        } catch (responsiveError) {
          errors.push(`Responsiveness test failed: ${responsiveError}`);
        }
      }

      // Determine connectivity status
      let connectivity: 'online' | 'offline' | 'degraded' = 'offline';
      if (available && responsive) {
        connectivity = 'online';
      } else if (available && !responsive) {
        connectivity = 'degraded';
      }

      this.status = {
        available,
        responsive,
        version,
        loadTime,
        errors,
        lastCheck: Date.now(),
        connectivity
      };

      // Log status for monitoring
      if (this.config.enableMetrics) {
        logger.info('Factory health check completed', {
          available,
          responsive,
          loadTime,
          errors: errors.length,
          connectivity
        }, 'FactoryHealthMonitor');
      }

      // Notify listeners
      this.notifyListeners();

      return this.status;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      errors.push(`Health check failed: ${errorMessage}`);

      this.status = {
        available: false,
        responsive: false,
        loadTime: Date.now() - startTime,
        errors,
        lastCheck: Date.now(),
        connectivity: 'offline'
      };

      logger.error('Factory health check failed:', error, 'FactoryHealthMonitor');
      this.notifyListeners();

      return this.status;
    }
  }

  /**
   * Start continuous health monitoring
   */
  startMonitoring(): void {
    if (!isBrowser()) {
      logger.warn('Cannot start monitoring in SSR environment', null, 'FactoryHealthMonitor');
      return;
    }

    this.stopMonitoring(); // Ensure no duplicate timers

    // Initial check
    this.checkFactoryHealth();

    // Set up periodic checks using SSR-safe interval
    this.checkTimer = safeSetInterval(() => {
      this.checkFactoryHealth();
    }, this.config.checkInterval);

    logger.info('Factory health monitoring started', {
      interval: this.config.checkInterval
    }, 'FactoryHealthMonitor');
  }

  /**
   * Stop health monitoring
   */
  stopMonitoring(): void {
    if (this.checkTimer !== undefined) {
      safeClearInterval(this.checkTimer);
      this.checkTimer = undefined;
    }

    if (this.abortController) {
      this.abortController.abort();
      this.abortController = undefined;
    }

    logger.info('Factory health monitoring stopped', null, 'FactoryHealthMonitor');
  }

  /**
   * Subscribe to health status changes
   */
  subscribe(listener: (status: FactoryHealthStatus) => void): () => void {
    this.listeners.push(listener);

    // Send current status immediately
    listener(this.status);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Check if offline mode should be activated
   */
  shouldActivateOfflineMode(): boolean {
    return this.config.enableOfflineMode &&
           (!this.status.available || this.status.connectivity === 'offline');
  }

  /**
   * Get health metrics for monitoring dashboards
   */
  getMetrics(): Record<string, number | string | boolean> {
    return {
      factory_available: this.status.available,
      factory_responsive: this.status.responsive,
      factory_load_time_ms: this.status.loadTime,
      factory_errors_count: this.status.errors.length,
      factory_last_check_timestamp: this.status.lastCheck,
      factory_connectivity: this.status.connectivity,
      factory_version: this.status.version || 'unknown'
    };
  }

  private handleConnectivityChange(status: 'online' | 'offline'): void {
    logger.info(`Network connectivity changed: ${status}`, null, 'FactoryHealthMonitor');

    if (status === 'online' && this.status.connectivity === 'offline') {
      // Immediately recheck when coming back online
      this.checkFactoryHealth();
    } else if (status === 'offline') {
      this.status.connectivity = 'offline';
      this.notifyListeners();
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.status);
      } catch (error) {
        logger.error('Health status listener error:', error, 'FactoryHealthMonitor');
      }
    });
  }

  /**
   * Force immediate health check
   */
  async forceCheck(): Promise<FactoryHealthStatus> {
    return this.checkFactoryHealth();
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.stopMonitoring();
    this.listeners = [];

    // Use SSR-safe event listener removal
    safeWindowRemoveEventListener('online', () => this.handleConnectivityChange('online'));
    safeWindowRemoveEventListener('offline', () => this.handleConnectivityChange('offline'));
  }
}

// SSR-safe lazy factory health monitor instance
const factoryHealthMonitorLazy = createSSRSafeSingleton(() => 
  new FactoryHealthMonitor({
    checkInterval: 60000, // 1 minute for production
    timeout: 15000,
    retries: 3,
    enableOfflineMode: true,
    enableMetrics: true
  })
);

/**
 * Get the factory health monitor instance (SSR-safe)
 * Returns undefined in SSR environment, instance in browser
 */
export const getFactoryHealthMonitor = (): FactoryHealthMonitor | undefined => {
  return factoryHealthMonitorLazy.getInstance();
};

/**
 * Legacy export for backward compatibility
 * @deprecated Use getFactoryHealthMonitor() for SSR safety
 */
export const factoryHealthMonitor = {
  getStatus: () => getFactoryHealthMonitor()?.getStatus() ?? {
    available: false,
    responsive: false,
    loadTime: 0,
    errors: ['SSR environment - monitor not available'],
    lastCheck: 0,
    connectivity: 'offline' as const
  },
  subscribe: (listener: (status: FactoryHealthStatus) => void) => {
    const monitor = getFactoryHealthMonitor();
    if (monitor) {
      return monitor.subscribe(listener);
    }
    // Return no-op unsubscribe for SSR
    return () => {};
  },
  startMonitoring: () => getFactoryHealthMonitor()?.startMonitoring(),
  stopMonitoring: () => getFactoryHealthMonitor()?.stopMonitoring(),
  checkFactoryHealth: () => getFactoryHealthMonitor()?.checkFactoryHealth(),
  shouldActivateOfflineMode: () => getFactoryHealthMonitor()?.shouldActivateOfflineMode() ?? true,
  forceCheck: () => getFactoryHealthMonitor()?.forceCheck(),
  getMetrics: () => getFactoryHealthMonitor()?.getMetrics() ?? {},
  destroy: () => getFactoryHealthMonitor()?.destroy()
};

/**
 * Hook for React components to use factory health monitoring (SSR-safe)
 */
export function useFactoryHealth() {
  const [status, setStatus] = React.useState<FactoryHealthStatus>(() => {
    // SSR-safe initial state
    const monitor = getFactoryHealthMonitor();
    return monitor?.getStatus() ?? {
      available: false,
      responsive: false,
      loadTime: 0,
      errors: ['Initializing...'],
      lastCheck: 0,
      connectivity: 'offline'
    };
  });

  React.useEffect(() => {
    const monitor = getFactoryHealthMonitor();
    if (!monitor) {
      // In SSR or monitor not available, set appropriate state
      setStatus({
        available: false,
        responsive: false,
        loadTime: 0,
        errors: ['Monitor not available in current environment'],
        lastCheck: Date.now(),
        connectivity: 'offline'
      });
      return;
    }

    const unsubscribe = monitor.subscribe(setStatus);
    return unsubscribe;
  }, []);

  const monitor = getFactoryHealthMonitor();

  return {
    status,
    isOnline: status.connectivity === 'online',
    isAvailable: status.available,
    isResponsive: status.responsive,
    shouldUseOfflineMode: monitor?.shouldActivateOfflineMode() ?? true,
    forceCheck: () => monitor?.forceCheck(),
    getMetrics: () => monitor?.getMetrics() ?? {}
  };
}

export default FactoryHealthMonitor;
