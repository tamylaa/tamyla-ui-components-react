/**
 * Memory Leak Prevention Utilities
 * Provides systematic cleanup for event listeners, timeouts, and other resources
 */

import { Logger } from './logger';

const logger = new Logger({ enableConsole: true });

export interface ResourceHandle {
  id: string;
  type: 'timeout' | 'interval' | 'listener' | 'observer' | 'animation' | 'dom-element';
  cleanup: () => void;
  created: number;
  metadata?: Record<string, unknown>;
}

export class MemoryLeakPrevention {
  private static instance: MemoryLeakPrevention | null = null;
  private resources = new Map<string, ResourceHandle>();
  private cleanupQueue = new Set<string>();

  private constructor() {
    // Cleanup on page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.cleanupAll();
      });
    }
  }

  static getInstance(): MemoryLeakPrevention {
    if (!MemoryLeakPrevention.instance) {
      MemoryLeakPrevention.instance = new MemoryLeakPrevention();
    }
    return MemoryLeakPrevention.instance;
  }

  /**
   * Register a timeout with automatic cleanup tracking
   */
  setTimeout(callback: () => void, delay: number): string {
    const id = Math.random().toString(36).substr(2, 9);
    const timeoutId = setTimeout(() => {
      callback();
      this.cleanup(id);
    }, delay);

    this.resources.set(id, {
      id,
      type: 'timeout',
      cleanup: () => clearTimeout(timeoutId),
      created: Date.now()
    });

    return id;
  }

  /**
   * Register an interval with automatic cleanup tracking
   */
  setInterval(callback: () => void, delay: number): string {
    const id = Math.random().toString(36).substr(2, 9);
    const intervalId = setInterval(callback, delay);

    this.resources.set(id, {
      id,
      type: 'interval',
      cleanup: () => clearInterval(intervalId),
      created: Date.now()
    });

    return id;
  }

  /**
   * Register an event listener with automatic cleanup tracking
   */
  addEventListener(
    element: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): string {
    const id = Math.random().toString(36).substr(2, 9);
    
    element.addEventListener(type, listener, options);

    this.resources.set(id, {
      id,
      type: 'listener',
      cleanup: () => element.removeEventListener(type, listener, options),
      created: Date.now()
    });

    return id;
  }

  /**
   * Register an event listener with metadata tracking
   */
  trackEventListener(
    element: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    metadata?: Record<string, unknown>,
    options?: boolean | AddEventListenerOptions
  ): string {
    const id = `listener_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    element.addEventListener(type, listener, options);

    this.resources.set(id, {
      id,
      type: 'listener',
      cleanup: () => element.removeEventListener(type, listener, options),
      created: Date.now(),
      metadata
    });

    return id;
  }

  /**
   * Register an observer with automatic cleanup tracking
   */
  registerObserver(observer: { disconnect: () => void }): string {
    const id = Math.random().toString(36).substr(2, 9);

    this.resources.set(id, {
      id,
      type: 'observer',
      cleanup: () => observer.disconnect(),
      created: Date.now()
    });

    return id;
  }

  /**
   * Register an animation frame with automatic cleanup tracking
   */
  requestAnimationFrame(callback: FrameRequestCallback): string {
    const id = Math.random().toString(36).substr(2, 9);
    const frameId = requestAnimationFrame((time) => {
      callback(time);
      this.cleanup(id);
    });

    this.resources.set(id, {
      id,
      type: 'animation',
      cleanup: () => cancelAnimationFrame(frameId),
      created: Date.now()
    });

    return id;
  }

  /**
   * Track a general resource with metadata
   */
  trackResource(config: {
    type: ResourceHandle['type'];
    resource: unknown;
    cleanup: () => void;
    metadata?: Record<string, unknown>;
  }): string {
    const id = `${config.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    this.resources.set(id, {
      id,
      type: config.type,
      cleanup: config.cleanup,
      created: Date.now(),
      metadata: config.metadata
    });

    return id;
  }

  /**
   * Cleanup a specific resource
   */
  cleanup(id: string): void {
    const resource = this.resources.get(id);
    if (resource) {
      try {
        resource.cleanup();
        this.resources.delete(id);
        this.cleanupQueue.delete(id);
      } catch (error) {
        logger.error(`Failed to cleanup resource ${id}:`, error, 'MemoryLeakPrevention');
      }
    }
  }

  /**
   * Cleanup multiple resources
   */
  cleanupMultiple(ids: string[]): void {
    ids.forEach(id => this.cleanup(id));
  }

  /**
   * Queue resource for cleanup
   */
  queueCleanup(id: string): void {
    this.cleanupQueue.add(id);
  }

  /**
   * Process cleanup queue
   */
  processCleanupQueue(): void {
    this.cleanupQueue.forEach(id => this.cleanup(id));
    this.cleanupQueue.clear();
  }

  /**
   * Cleanup all resources
   */
  cleanupAll(): void {
    const startTime = Date.now();
    let cleanedCount = 0;

    for (const [id, resource] of this.resources) {
      try {
        resource.cleanup();
        cleanedCount++;
      } catch (error) {
        logger.error(`Failed to cleanup resource ${id}:`, error, 'MemoryLeakPrevention');
      }
    }

    this.resources.clear();
    this.cleanupQueue.clear();

    logger.info(
      `Cleaned up ${cleanedCount} resources in ${Date.now() - startTime}ms`, 
      null, 
      'MemoryLeakPrevention'
    );
  }

  /**
   * Cleanup resources matching a filter function
   */
  cleanupByFilter(filter: (metadata?: Record<string, unknown>) => boolean): void {
    const startTime = Date.now();
    let cleanedCount = 0;
    const toCleanup: string[] = [];

    for (const [id, resource] of this.resources) {
      if (filter(resource.metadata)) {
        toCleanup.push(id);
      }
    }

    for (const id of toCleanup) {
      try {
        this.cleanup(id);
        cleanedCount++;
      } catch (error) {
        logger.error(`Failed to cleanup filtered resource ${id}:`, error, 'MemoryLeakPrevention');
      }
    }

    logger.debug(
      `Cleaned up ${cleanedCount} filtered resources in ${Date.now() - startTime}ms`, 
      null, 
      'MemoryLeakPrevention'
    );
  }

  /**
   * Get resource statistics
   */
  getStats(): {
    totalResources: number;
    resourcesByType: Record<string, number>;
    oldestResource: number;
    queuedCleanups: number;
  } {
    const resourcesByType: Record<string, number> = {};
    let oldestTimestamp = Date.now();

    for (const resource of this.resources.values()) {
      resourcesByType[resource.type] = (resourcesByType[resource.type] || 0) + 1;
      oldestTimestamp = Math.min(oldestTimestamp, resource.created);
    }

    return {
      totalResources: this.resources.size,
      resourcesByType,
      oldestResource: Date.now() - oldestTimestamp,
      queuedCleanups: this.cleanupQueue.size
    };
  }

  /**
   * Find and cleanup stale resources (older than threshold)
   */
  cleanupStaleResources(maxAge: number = 300000): number { // 5 minutes default
    const now = Date.now();
    const staleIds: string[] = [];

    for (const [id, resource] of this.resources) {
      if (now - resource.created > maxAge) {
        staleIds.push(id);
      }
    }

    this.cleanupMultiple(staleIds);
    return staleIds.length;
  }
}

export const memoryManager = MemoryLeakPrevention.getInstance();
