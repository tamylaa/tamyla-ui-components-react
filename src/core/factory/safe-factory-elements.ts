/**
 * Safe Factory Element Creation Utilities
 * Provides SSR-safe element creation with proper fallbacks
 */

import { safeCreateElement } from '../../utils/ssr-safe';
import { Logger } from '../../utils/logger';
import type { FactoryCreatedElement } from '../../types/factory-components';

const logger = new Logger({ enableConsole: true });

/**
 * Create safe fallback element for factory components
 */
export function createFactoryFallback(
  factory: string,
  type: 'fallback' | 'error' = 'fallback',
  errorMessage?: string
): HTMLElement {
  const div = safeCreateElement('div');
  if (!div) {
    // SSR fallback - should not happen but defensive programming
    logger.warn('Could not create fallback element in SSR context', 'createFactoryFallback');
    const fallback = document.createElement('div');
    fallback.className = `factory-bridge-${type} tamyla-${factory.toLowerCase()}`;
    fallback.textContent = `${factory} component ${type}`;
    return fallback;
  }

  div.className = `factory-bridge-${type} tamyla-${factory.toLowerCase()}`;

  if (type === 'error' && errorMessage) {
    div.textContent = `${factory} component error: ${errorMessage}`;
  } else {
    div.textContent = `${factory} component${type === 'error' ? ' error' : ''}`;
  }

  return div;
}

/**
 * Create safe error display element with detailed information
 */
export function createFactoryErrorDisplay(
  factory: string,
  error: Error,
  availableFactories: string[]
): HTMLElement {
  const errorDiv = safeCreateElement('div') || document.createElement('div');
  errorDiv.className = 'factory-bridge-error-detailed';
  errorDiv.style.cssText = 'border: 1px solid #ff6b6b; background: #ffe0e0; padding: 8px; margin: 4px; border-radius: 4px; color: #d63031;';

  const title = safeCreateElement('strong') || document.createElement('strong');
  title.textContent = `Factory Error: ${factory}`;

  const message = safeCreateElement('br') || document.createElement('br');
  const errorText = safeCreateElement('span') || document.createElement('span');
  errorText.textContent = error.message || 'Unknown error';

  const availableText = safeCreateElement('small') || document.createElement('small');
  availableText.style.cssText = 'display: block; margin-top: 4px; color: #636e72;';
  availableText.textContent = `Available factories: ${availableFactories.join(', ')}`;

  errorDiv.appendChild(title);
  errorDiv.appendChild(message);
  errorDiv.appendChild(errorText);
  errorDiv.appendChild(safeCreateElement('br') || document.createElement('br'));
  errorDiv.appendChild(availableText);

  return errorDiv;
}

/**
 * Type-safe cleanup for factory-created elements
 */
export function safeCleanupFactoryElement(element: HTMLElement, logger: Logger): void {
  const factoryElement = element as FactoryCreatedElement;
  if (factoryElement.destroy && typeof factoryElement.destroy === 'function') {
    try {
      factoryElement.destroy();
    } catch (destroyError) {
      logger.error('Component destroy error:', destroyError, 'safeCleanupFactoryElement');
    }
  }
}
