/**
 * SSR-Safe Utilities
 * Provides consistent, reusable patterns for handling browser APIs in SSR environments
 */

/**
 * Detect if code is running in a browser environment
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

/**
 * Detect if code is running in SSR environment
 */
export const isSSR = (): boolean => {
  return !isBrowser();
};

/**
 * Safe access to window object with fallback
 */
export const safeWindow = <T = any>(
  accessor: (window: Window & typeof globalThis) => T, // eslint-disable-line no-undef
  fallback?: T
): T | undefined => {
  if (isBrowser()) {
    try {
      return accessor(window);
    } catch (error) {
      console.warn('Safe window access failed:', error);
      return fallback;
    }
  }
  return fallback;
};

/**
 * Safe access to document object with fallback
 */
export const safeDocument = <T = any>(
  accessor: (document: Document) => T, // eslint-disable-line no-undef
  fallback?: T
): T | undefined => {
  if (isBrowser()) {
    try {
      return accessor(document);
    } catch (error) {
      console.warn('Safe document access failed:', error);
      return fallback;
    }
  }
  return fallback;
};

/**
 * Safe setTimeout that works in both SSR and browser
 */
export const safeSetTimeout = (
  callback: () => void,
  delay: number
): number | undefined => {
  return safeWindow(w => w.setTimeout(callback, delay));
};

/**
 * Safe setInterval that works in both SSR and browser
 */
export const safeSetInterval = (
  callback: () => void,
  delay: number
): number | undefined => {
  return safeWindow(w => w.setInterval(callback, delay));
};

/**
 * Safe clearTimeout that works in both SSR and browser
 */
export const safeClearTimeout = (id: number | undefined): void => {
  if (id !== undefined) {
    safeWindow(w => w.clearTimeout(id));
  }
};

/**
 * Safe clearInterval that works in both SSR and browser
 */
export const safeClearInterval = (id: number | undefined): void => {
  if (id !== undefined) {
    safeWindow(w => w.clearInterval(id));
  }
};

/**
 * Safe addEventListener for window
 */
export const safeWindowAddEventListener = <K extends keyof WindowEventMap>( // eslint-disable-line no-undef
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any, // eslint-disable-line no-undef
  options?: boolean | AddEventListenerOptions
): void => {
  safeWindow(w => w.addEventListener(type, listener, options));
};

/**
 * Safe removeEventListener for window
 */
export const safeWindowRemoveEventListener = <K extends keyof WindowEventMap>( // eslint-disable-line no-undef
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any, // eslint-disable-line no-undef
  options?: boolean | EventListenerOptions // eslint-disable-line no-undef
): void => {
  safeWindow(w => w.removeEventListener(type, listener, options));
};

/**
 * Safe addEventListener for document
 */
export const safeDocumentAddEventListener = <K extends keyof DocumentEventMap>( // eslint-disable-line no-undef
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => any, // eslint-disable-line no-undef
  options?: boolean | AddEventListenerOptions
): void => {
  safeDocument(d => d.addEventListener(type, listener, options));
};

/**
 * Safe removeEventListener for document
 */
export const safeDocumentRemoveEventListener = <K extends keyof DocumentEventMap>( // eslint-disable-line no-undef
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => any, // eslint-disable-line no-undef
  options?: boolean | EventListenerOptions // eslint-disable-line no-undef
): void => {
  safeDocument(d => d.removeEventListener(type, listener, options));
};

/**
 * Safe createElement
 */
export const safeCreateElement = <K extends keyof HTMLElementTagNameMap>( // eslint-disable-line no-undef
  tagName: K,
  options?: ElementCreationOptions // eslint-disable-line no-undef
): HTMLElementTagNameMap[K] | undefined => { // eslint-disable-line no-undef
  return safeDocument(d => d.createElement(tagName, options));
};

/**
 * Safe querySelector
 */
export const safeQuerySelector = <K extends keyof HTMLElementTagNameMap>( // eslint-disable-line no-undef
  selectors: string
): Element | null => { // eslint-disable-line no-undef
  return safeDocument(d => d.querySelector(selectors)) || null;
};

/**
 * Safe getElementById
 */
export const safeGetElementById = (elementId: string): HTMLElement | null => {
  return safeDocument(d => d.getElementById(elementId)) || null;
};

/**
 * Lazy initialization pattern for browser-dependent singletons
 */
export class SSRSafeLazy<T> {
  private instance: T | undefined;
  private factory: () => T;

  constructor(factory: () => T) {
    this.factory = factory;
  }

  /**
   * Get the instance, creating it lazily on first access in browser
   */
  getInstance(): T | undefined {
    if (isSSR()) {
      return undefined;
    }

    if (this.instance === undefined) {
      this.instance = this.factory();
    }

    return this.instance;
  }

  /**
   * Check if instance is available (browser environment and initialized)
   */
  isAvailable(): boolean {
    return isBrowser() && this.instance !== undefined;
  }

  /**
   * Reset the instance (useful for testing)
   */
  reset(): void {
    this.instance = undefined;
  }

  /**
   * Force initialization in browser environment
   */
  forceInit(): T | undefined {
    if (isBrowser()) {
      this.instance = this.factory();
      return this.instance;
    }
    return undefined;
  }
}

/**
 * Helper for creating SSR-safe singletons
 */
export const createSSRSafeSingleton = <T>(factory: () => T): SSRSafeLazy<T> => {
  return new SSRSafeLazy(factory);
};

/**
 * Safe storage access (localStorage/sessionStorage)
 */
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    return safeWindow(w => w.localStorage?.getItem(key)) || null;
  },
  setItem: (key: string, value: string): void => {
    safeWindow(w => w.localStorage?.setItem(key, value));
  },
  removeItem: (key: string): void => {
    safeWindow(w => w.localStorage?.removeItem(key));
  },
  clear: (): void => {
    safeWindow(w => w.localStorage?.clear());
  }
};

export const safeSessionStorage = {
  getItem: (key: string): string | null => {
    return safeWindow(w => w.sessionStorage?.getItem(key)) || null;
  },
  setItem: (key: string, value: string): void => {
    safeWindow(w => w.sessionStorage?.setItem(key, value));
  },
  removeItem: (key: string): void => {
    safeWindow(w => w.sessionStorage?.removeItem(key));
  },
  clear: (): void => {
    safeWindow(w => w.sessionStorage?.clear());
  }
};

/**
 * Safe navigator access
 */
export const safeNavigator = {
  userAgent: (): string => {
    return safeWindow(w => w.navigator?.userAgent) || '';
  },
  language: (): string => {
    return safeWindow(w => w.navigator?.language) || 'en';
  },
  onLine: (): boolean => {
    return safeWindow(w => w.navigator?.onLine) ?? true;
  }
};

/**
 * Safe location access
 */
export const safeLocation = {
  href: (): string => {
    return safeWindow(w => w.location?.href) || '';
  },
  pathname: (): string => {
    return safeWindow(w => w.location?.pathname) || '/';
  },
  search: (): string => {
    return safeWindow(w => w.location?.search) || '';
  },
  hash: (): string => {
    return safeWindow(w => w.location?.hash) || '';
  }
};
