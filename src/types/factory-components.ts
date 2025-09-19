/**
 * Factory Component Type Definitions
 * Provides proper typing for factory-created components
 */

export interface FactoryCreatedElement extends HTMLElement {
  /**
   * Optional destroy method for cleanup
   */
  destroy?: () => void;

  /**
   * Optional data property for component state
   */
  data?: Record<string, unknown>;

  /**
   * Optional configuration
   */
  config?: Record<string, unknown>;
}

export interface FactoryWithCreate {
  create: (config: unknown) => FactoryCreatedElement | HTMLElement | { element: HTMLElement };
}

export interface FactoryFunction {
  (config: unknown): FactoryCreatedElement | HTMLElement | { element: HTMLElement };
}

export type Factory = FactoryFunction | FactoryWithCreate | null;

export interface ComponentData {
  cleanup?: () => void;
  instance?: FactoryCreatedElement | HTMLElement;
  listeners?: Array<{ type: string; handler: EventListener }>;
}

export interface FactoryEventData {
  type: string;
  target: string;
  data: {
    event: Event;
    factory: string;
    config: Record<string, unknown>;
  };
  timestamp: number;
}

export type ComponentEventHandler = (event: FactoryEventData) => void;

/**
 * General props interface for factory components
 */
export interface FactoryProps extends Record<string, unknown> {
  label?: string;
  placeholder?: string;
  value?: string | number;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  variant?: string;
  size?: string;
  children?: string | unknown;
  className?: string;
  style?: Record<string, unknown>;
  text?: string;
  onClick?: EventListener | ((event: Event) => void);
}
