/**
 * Centralized Logger Utility
 * Browser-compatible logging with console output and optional storage
 */

// Browser environment type declarations
declare const localStorage: {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
};

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export interface LogConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableStorage: boolean;
  maxStorageEntries: number;
  prefix: string;
}

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  data?: any;
  source?: string;
}

class Logger {
  private config: LogConfig;
  private logQueue: LogEntry[] = [];
  private storageKey = 'tamyla-ui-components-logs';

  constructor(config: Partial<LogConfig> = {}) {
    const isProduction = typeof window !== 'undefined' &&
                        (window.location?.hostname !== 'localhost' &&
                         !window.location?.hostname.includes('127.0.0.1'));

    this.config = {
      level: isProduction ? LogLevel.INFO : LogLevel.DEBUG,
      enableConsole: true,
      enableStorage: isProduction && typeof localStorage !== 'undefined',
      maxStorageEntries: 100,
      prefix: '[Tamyla UI]',
      ...config
    };
  }

  private createLogEntry(level: LogLevel, message: string, data?: any, source?: string): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level: LogLevel[level],
      message,
      data,
      source
    };
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level;
  }

  private formatMessage(entry: LogEntry): string {
    const prefix = this.config.prefix;
    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    return `${prefix} [${timestamp}] [${entry.level}] ${entry.message}`;
  }

  private writeToConsole(entry: LogEntry): void {
    if (!this.config.enableConsole || typeof console === 'undefined') return;

    const formattedMessage = this.formatMessage(entry);

    switch (entry.level) {
      case 'DEBUG':
        console.debug(formattedMessage, entry.data || '');
        break;
      case 'INFO':
        console.info(formattedMessage, entry.data || '');
        break;
      case 'WARN':
        console.warn(formattedMessage, entry.data || '');
        break;
      case 'ERROR':
        console.error(formattedMessage, entry.data || '');
        break;
      default:
        console.log(formattedMessage, entry.data || '');
    }
  }

  private writeToStorage(entry: LogEntry): void {
    if (!this.config.enableStorage || typeof localStorage === 'undefined') return;

    try {
      const stored = localStorage.getItem(this.storageKey);
      const logs: LogEntry[] = stored ? JSON.parse(stored) : [];

      logs.push(entry);

      // Keep only the most recent entries
      if (logs.length > this.config.maxStorageEntries) {
        logs.splice(0, logs.length - this.config.maxStorageEntries);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(logs));
    } catch (error) {
      // Storage might be disabled or full, fail silently
      console.warn('Failed to write to localStorage:', error);
    }
  }

  private log(level: LogLevel, message: string, data?: any, source?: string): void {
    if (!this.shouldLog(level)) return;

    const entry = this.createLogEntry(level, message, data, source);

    this.writeToConsole(entry);
    this.writeToStorage(entry);
  }

  debug(message: string, data?: any, source?: string): void {
    this.log(LogLevel.DEBUG, message, data, source);
  }

  info(message: string, data?: any, source?: string): void {
    this.log(LogLevel.INFO, message, data, source);
  }

  warn(message: string, data?: any, source?: string): void {
    this.log(LogLevel.WARN, message, data, source);
  }

  error(message: string, data?: any, source?: string): void {
    this.log(LogLevel.ERROR, message, data, source);
  }

  // Performance logging helpers
  startTimer(label: string): void {
    if (typeof console !== 'undefined' && console.time) {
      console.time(`${this.config.prefix} ${label}`);
    }
  }

  endTimer(label: string): void {
    if (typeof console !== 'undefined' && console.timeEnd) {
      console.timeEnd(`${this.config.prefix} ${label}`);
    }
  }

  // Browser-compatible log retrieval
  getLogs(): LogEntry[] {
    if (!this.config.enableStorage || typeof localStorage === 'undefined') {
      return [];
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Failed to read logs from localStorage:', error);
      return [];
    }
  }

  clearLogs(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }

  // Export logs as JSON (browser-compatible)
  exportLogs(): string {
    const logs = this.getLogs();
    return JSON.stringify(logs, null, 2);
  }

  // Component lifecycle logging
  componentMount(componentName: string): void {
    this.debug(`Component mounted: ${componentName}`, undefined, componentName);
  }

  componentUnmount(componentName: string): void {
    this.debug(`Component unmounted: ${componentName}`, undefined, componentName);
  }

  componentError(componentName: string, error: Error): void {
    this.error(`Component error: ${componentName}`, {
      message: error.message,
      stack: error.stack
    }, componentName);
  }

  // Performance monitoring
  logPerformance(operation: string, duration: number, metadata?: any): void {
    this.info(`Performance: ${operation} took ${duration}ms`, metadata, 'performance');
  }

  // Theme and styling logging
  logThemeChange(themeName: string, changes?: any): void {
    this.info(`Theme changed: ${themeName}`, changes, 'theme');
  }

  // Factory bridge logging
  logFactoryOperation(operation: string, componentType: string, success: boolean): void {
    const level = success ? LogLevel.INFO : LogLevel.WARN;
    this.log(level, `Factory ${operation}: ${componentType}`, { success }, 'factory');
  }
}

// Export singleton instance
export const logger = new Logger();

// Export class for custom instances
export { Logger };

// Export convenience functions
export const logDebug = (message: string, data?: any, source?: string) => logger.debug(message, data, source);
export const logInfo = (message: string, data?: any, source?: string) => logger.info(message, data, source);
export const logWarn = (message: string, data?: any, source?: string) => logger.warn(message, data, source);
export const logError = (message: string, data?: any, source?: string) => logger.error(message, data, source);

// Export default instance
export default logger;
