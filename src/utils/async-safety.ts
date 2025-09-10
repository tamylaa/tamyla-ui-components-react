/**
 * Async Safety Utilities
 * Provides safe async operation handling with timeouts and proper error management
 */

import { Logger } from './logger';

// Local interface for AbortSignal to avoid ESLint issues
interface AbortSignalLike {
  readonly aborted: boolean;
  readonly reason?: unknown;
  addEventListener(type: 'abort', listener: () => void, options?: { once?: boolean }): void;
  removeEventListener(type: 'abort', listener: () => void): void;
}

// Initialize logger instance
const logger = new Logger({ enableConsole: true });

export interface AsyncOperationOptions {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  onError?: (error: Error) => void;
  onTimeout?: () => void;
  signal?: AbortSignalLike;
}

/**
 * Safely execute async operations with timeout and error handling
 */
export async function safeAsync<T>(
  operation: () => Promise<T>,
  options: AsyncOperationOptions = {}
): Promise<T | null> {
  const {
    timeout = 10000,
    retries = 0,
    retryDelay = 1000,
    onError,
    onTimeout,
    signal
  } = options;

  // Check if already aborted
  if (signal?.aborted) {
    return null;
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Create internal abort controller that combines with external signal
      const controller = new AbortController();
      const internalSignal = controller.signal;

      // If external signal provided, abort internal when external aborts
      if (signal) {
        const externalAbortHandler = () => controller.abort();
        signal.addEventListener('abort', externalAbortHandler, { once: true });

        // Clean up listener if internal completes first
        internalSignal.addEventListener('abort', () => {
          signal.removeEventListener('abort', externalAbortHandler);
        }, { once: true });
      }

      const timeoutPromise = new Promise<never>((_, reject) => {
        const timeoutId = setTimeout(() => {
          controller.abort();
          reject(new Error(`Operation timed out after ${timeout}ms`));
        }, timeout);

        // Clear timeout if aborted externally
        internalSignal.addEventListener('abort', () => {
          clearTimeout(timeoutId);
        });
      });

      const operationPromise = operation();

      // Race between operation and timeout
      const result = await Promise.race([operationPromise, timeoutPromise]);

      return result;
    } catch (error) {
      const isTimeout = error instanceof Error && error.message.includes('timed out');
      const isAborted = signal?.aborted || (error instanceof Error && error.name === 'AbortError');

      if (isAborted) {
        logger.info('Async operation aborted', null, 'safeAsync');
        return null;
      }

      if (isTimeout && onTimeout) {
        onTimeout();
      } else if (onError) {
        onError(error instanceof Error ? error : new Error(String(error)));
      }

      // If this was the last attempt, return null
      if (attempt === retries) {
        logger.error(`Async operation failed after ${retries + 1} attempts:`, error, 'safeAsync');
        return null;
      }

      // Wait before retrying
      if (retryDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  return null;
}

/**
 * Safe fetch with timeout and proper error handling
 */
export async function safeFetch(
  url: string,
  options: RequestInit & AsyncOperationOptions = {}
): Promise<Response | null> {
  const { timeout = 10000, retries = 1, ...fetchOptions } = options;

  return safeAsync(
    async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === 'AbortError') {
          throw new Error(`Request to ${url} timed out after ${timeout}ms`);
        }
        throw error;
      }
    },
    { timeout, retries, ...options }
  );
}

/**
 * Safe dynamic import with timeout and fallback
 */
export async function safeDynamicImport<T = any>(
  moduleSpecifier: string,
  options: AsyncOperationOptions = {}
): Promise<T | null> {
  return safeAsync(
    async () => {
      const module = await import(/* @vite-ignore */ moduleSpecifier);
      return module as T;
    },
    {
      timeout: 5000,
      retries: 2,
      retryDelay: 500,
      ...options
    }
  );
}

/**
 * Safe JSON parsing with error handling
 */
export function safeJSONParse<T = any>(
  jsonString: string,
  fallback: T | null = null
): T | null {
  if (!jsonString || typeof jsonString !== 'string') {
    return fallback;
  }

  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    logger.error('JSON parsing failed:', error, 'safeJSONParse');
    return fallback;
  }
}

/**
 * Safe JSON stringify with error handling
 */
export function safeJSONStringify(
  value: any,
  fallback: string = ''
): string {
  try {
    return JSON.stringify(value);
  } catch (error) {
    logger.error('JSON stringify failed:', error, 'safeJSONStringify');
    return fallback;
  }
}

/**
 * Debounced async operation to prevent rapid successive calls
 */
export class DebouncedAsync<T> {
  private timeoutId: number | null = null;
  private lastPromise: Promise<T | null> | null = null;

  constructor(
    private operation: (...args: any[]) => Promise<T>,
    private delay: number = 300
  ) {}

  async execute(...args: any[]): Promise<T | null> {
    // Clear existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Create new promise
    this.lastPromise = new Promise<T | null>((resolve) => {
      this.timeoutId = window.setTimeout(async () => {
        try {
          const result = await this.operation(...args);
          resolve(result);
        } catch (error) {
          logger.error('Debounced async operation failed:', error, 'AsyncDebouncer');
          resolve(null);
        }
      }, this.delay);
    });

    return this.lastPromise;
  }

  cancel(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}

/**
 * Promise queue for managing sequential async operations
 */
export class AsyncQueue {
  private queue: Array<() => Promise<any>> = [];
  private running = false;

  async add<T>(operation: () => Promise<T>): Promise<T | null> {
    return new Promise((resolve) => {
      this.queue.push(async () => {
        try {
          const result = await operation();
          resolve(result);
        } catch (error) {
          logger.error('Queued async operation failed:', error, 'AsyncQueue');
          resolve(null);
        }
      });

      this.process();
    });
  }

  private async process(): Promise<void> {
    if (this.running || this.queue.length === 0) {
      return;
    }

    this.running = true;

    while (this.queue.length > 0) {
      const operation = this.queue.shift();
      if (operation) {
        await operation();
      }
    }

    this.running = false;
  }

  clear(): void {
    this.queue = [];
  }

  get length(): number {
    return this.queue.length;
  }
}

// Global async queue instance
export const globalAsyncQueue = new AsyncQueue();
