/**
 * DOM Safety Utilities
 * Provides secure DOM manipulation functions to prevent XSS attacks
 */

import DOMPurify from 'dompurify';
import { Logger } from './logger';

// Initialize logger instance
const logger = new Logger({ enableConsole: true });

// Configuration for different sanitization levels
const SANITIZATION_CONFIGS = {
  strict: {
    ALLOWED_TAGS: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'br'],
    ALLOWED_ATTR: ['class', 'id', 'data-*'],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
    FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover']
  },
  moderate: {
    ALLOWED_TAGS: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'br', 'img', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['class', 'id', 'data-*', 'href', 'src', 'alt', 'title'],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
    FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover']
  },
  permissive: {
    FORBID_TAGS: ['script'],
    FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover']
  }
};

/**
 * Safely sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHTML(
  html: string,
  level: 'strict' | 'moderate' | 'permissive' = 'moderate'
): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  try {
    return DOMPurify.sanitize(html, SANITIZATION_CONFIGS[level]);
  } catch (error) {
    logger.error('HTML sanitization failed:', error, 'sanitizeHTML');
    return ''; // Return empty string on sanitization failure
  }
}

/**
 * Safely set innerHTML with automatic sanitization
 */
export function safeSetInnerHTML(
  element: HTMLElement,
  html: string,
  level: 'strict' | 'moderate' | 'permissive' = 'moderate'
): void {
  if (!element || !html) {
    return;
  }

  try {
    const sanitizedHTML = sanitizeHTML(html, level);
    element.innerHTML = sanitizedHTML;
  } catch (error) {
    logger.error('Safe innerHTML assignment failed:', error, 'safeSetInnerHTML');
    element.textContent = html; // Fallback to safe text content
  }
}

/**
 * Safely create element from HTML string
 */
export function safeCreateElementFromHTML(
  html: string,
  level: 'strict' | 'moderate' | 'permissive' = 'moderate'
): HTMLElement {
  const sanitizedHTML = sanitizeHTML(html, level);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = sanitizedHTML;

  const firstChild = tempDiv.firstElementChild;
  if (firstChild instanceof HTMLElement) {
    return firstChild;
  }

  // Fallback: create safe div with text content
  const fallbackDiv = document.createElement('div');
  fallbackDiv.textContent = html;
  fallbackDiv.className = 'sanitization-fallback';
  return fallbackDiv;
}

/**
 * Validate if HTML content is safe (returns true if safe, false if dangerous)
 */
export function isHTMLSafe(html: string): boolean {
  if (!html || typeof html !== 'string') {
    return true;
  }

  try {
    const original = html.length;
    const sanitized = DOMPurify.sanitize(html, SANITIZATION_CONFIGS.strict).length;

    // If significant content was removed, it was likely dangerous
    return Math.abs(original - sanitized) < (original * 0.1); // Allow 10% difference
  } catch (_error) {
    return false; // Assume unsafe if validation fails
  }
}

/**
 * SSR-safe window/document access
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Safe DOM element creation with validation
 */
export function safeCreateElement(
  tagName: string,
  attributes?: Record<string, string>,
  textContent?: string
): HTMLElement | null {
  if (!isBrowser()) {
    return null;
  }

  try {
    // Validate tag name
    const allowedTags = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'input', 'textarea', 'label', 'a', 'img'];
    if (!allowedTags.includes(tagName.toLowerCase())) {
      logger.warn(`Unsafe tag name: ${tagName}, defaulting to div`, 'safeCreateElement');
      tagName = 'div';
    }

    const element = document.createElement(tagName);

    // Safely set attributes
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        // Validate attribute names
        if (key.startsWith('on') || key.includes('script')) {
          logger.warn(`Unsafe attribute: ${key}, skipping`, 'safeCreateElement');
          return;
        }
        element.setAttribute(key, value);
      });
    }

    // Safely set text content
    if (textContent) {
      element.textContent = textContent;
    }

    return element;
  } catch (error) {
    logger.error('Safe element creation failed:', error, 'safeCreateElement');
    return null;
  }
}

/**
 * Safe event listener management with automatic cleanup
 */
export class SafeEventManager {
  private listeners: Map<HTMLElement, Map<string, EventListener>> = new Map();

  addListener(
    element: HTMLElement,
    eventType: string,
    listener: EventListener,
    options?: AddEventListenerOptions
  ): void {
    if (!element || !eventType || !listener) {
      return;
    }

    try {
      element.addEventListener(eventType, listener, options);

      // Track for cleanup
      if (!this.listeners.has(element)) {
        this.listeners.set(element, new Map());
      }
      this.listeners.get(element)!.set(eventType, listener);
    } catch (error) {
      logger.error('Failed to add event listener:', error, 'SafeEventManager');
    }
  }

  removeListener(element: HTMLElement, eventType: string): void {
    if (!element || !eventType) {
      return;
    }

    try {
      const elementListeners = this.listeners.get(element);
      if (elementListeners && elementListeners.has(eventType)) {
        const listener = elementListeners.get(eventType)!;
        element.removeEventListener(eventType, listener);
        elementListeners.delete(eventType);

        if (elementListeners.size === 0) {
          this.listeners.delete(element);
        }
      }
    } catch (error) {
      logger.error('Failed to remove event listener:', error, 'SafeEventManager');
    }
  }

  cleanupElement(element: HTMLElement): void {
    const elementListeners = this.listeners.get(element);
    if (elementListeners) {
      elementListeners.forEach((listener, eventType) => {
        try {
          element.removeEventListener(eventType, listener);
        } catch (error) {
          logger.error(`Failed to cleanup listener for ${eventType}:`, error, 'SafeEventManager');
        }
      });
      this.listeners.delete(element);
    }
  }

  cleanupAll(): void {
    this.listeners.forEach((listeners, element) => {
      this.cleanupElement(element);
    });
    this.listeners.clear();
  }
}

// Global event manager instance
export const globalEventManager = new SafeEventManager();
