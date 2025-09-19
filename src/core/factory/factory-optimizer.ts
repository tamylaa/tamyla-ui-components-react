/**
 * Factory Performance Optimizer
 * Implements caching and performance optimizations for factory creation
 */

import { Logger } from '../../utils/logger';

const logger = new Logger({ enableConsole: true });

export interface FactoryMetrics {
  creationTime: number;
  renderTime: number;
  memoryUsage: number;
  cacheHits: number;
  cacheMisses: number;
}

export class FactoryPerformanceOptimizer {
  private static instance: FactoryPerformanceOptimizer | null = null;
  private elementCache = new Map<string, HTMLElement>();
  private templateCache = new Map<string, DocumentFragment>();
  private metricsCache = new Map<string, FactoryMetrics>();
  private maxCacheSize = 100;

  private constructor() {}

  static getInstance(): FactoryPerformanceOptimizer {
    if (!FactoryPerformanceOptimizer.instance) {
      FactoryPerformanceOptimizer.instance = new FactoryPerformanceOptimizer();
    }
    return FactoryPerformanceOptimizer.instance;
  }

  /**
   * Create or retrieve cached factory element
   */
  createOptimizedElement(
    factoryName: string,
    config: Record<string, unknown>,
    createFn: () => HTMLElement
  ): HTMLElement {
    const cacheKey = this.generateCacheKey(factoryName, config);
    const startTime = performance.now();

    // Check cache first
    const cachedElement = this.elementCache.get(cacheKey);
    if (cachedElement) {
      this.updateMetrics(factoryName, 'cacheHit', performance.now() - startTime);
      return cachedElement.cloneNode(true) as HTMLElement;
    }

    // Create new element
    const element = createFn();
    
    // Cache if within limits
    if (this.elementCache.size < this.maxCacheSize) {
      this.elementCache.set(cacheKey, element.cloneNode(true) as HTMLElement);
    }

    this.updateMetrics(factoryName, 'cacheMiss', performance.now() - startTime);
    return element;
  }

  /**
   * Create optimized template fragment for reuse
   */
  createTemplate(
    templateName: string,
    htmlContent: string
  ): DocumentFragment {
    if (this.templateCache.has(templateName)) {
      const template = this.templateCache.get(templateName)!;
      return template.cloneNode(true) as DocumentFragment;
    }

    const template = document.createDocumentFragment();
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    
    while (div.firstChild) {
      template.appendChild(div.firstChild);
    }

    this.templateCache.set(templateName, template.cloneNode(true) as DocumentFragment);
    return template;
  }

  /**
   * Generate cache key based on factory name and config
   */
  private generateCacheKey(factoryName: string, config: Record<string, unknown>): string {
    const configString = JSON.stringify(config, (key, value) => {
      // Exclude functions and DOM references from cache key
      if (typeof value === 'function' || value instanceof HTMLElement) {
        return '[Function/DOM]';
      }
      return value;
    });
    return `${factoryName}:${configString}`;
  }

  /**
   * Update performance metrics
   */
  private updateMetrics(
    factoryName: string,
    type: 'cacheHit' | 'cacheMiss',
    duration: number
  ): void {
    const existing = this.metricsCache.get(factoryName) || {
      creationTime: 0,
      renderTime: 0,
      memoryUsage: 0,
      cacheHits: 0,
      cacheMisses: 0
    };

    if (type === 'cacheHit') {
      existing.cacheHits++;
    } else {
      existing.cacheMisses++;
      existing.creationTime = (existing.creationTime + duration) / 2; // Running average
    }

    this.metricsCache.set(factoryName, existing);
  }

  /**
   * Get performance metrics for a factory
   */
  getMetrics(factoryName?: string): FactoryMetrics | Map<string, FactoryMetrics> {
    if (factoryName) {
      return this.metricsCache.get(factoryName) || {
        creationTime: 0,
        renderTime: 0,
        memoryUsage: 0,
        cacheHits: 0,
        cacheMisses: 0
      };
    }
    return new Map(this.metricsCache);
  }

  /**
   * Clear caches to free memory
   */
  clearCaches(): void {
    this.elementCache.clear();
    this.templateCache.clear();
    logger.info('Factory caches cleared', null, 'FactoryPerformanceOptimizer');
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    elementCacheSize: number;
    templateCacheSize: number;
    totalMetrics: number;
    hitRate: number;
  } {
    const totalHits = Array.from(this.metricsCache.values()).reduce((sum, m) => sum + m.cacheHits, 0);
    const totalMisses = Array.from(this.metricsCache.values()).reduce((sum, m) => sum + m.cacheMisses, 0);
    const hitRate = totalHits + totalMisses > 0 ? totalHits / (totalHits + totalMisses) : 0;

    return {
      elementCacheSize: this.elementCache.size,
      templateCacheSize: this.templateCache.size,
      totalMetrics: this.metricsCache.size,
      hitRate: Math.round(hitRate * 100) / 100
    };
  }
}

export const factoryOptimizer = FactoryPerformanceOptimizer.getInstance();
