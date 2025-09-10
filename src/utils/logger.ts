/**
 * Centralized Logger Utility
 * Provides environment-aware logging with file output for production
 * and console output for development
 */

import * as fs from 'fs';
import * as path from 'path';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export interface LogConfig {
  level: LogLevel;
  enableFileLogging: boolean;
  logDirectory: string;
  maxFileSize: number; // in bytes
  maxFiles: number;
  enableConsole: boolean;
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
  private isWriting = false;

  constructor(config: Partial<LogConfig> = {}) {
    this.config = {
      level: process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO,
      enableFileLogging: process.env.NODE_ENV === 'production',
      logDirectory: path.join(process.cwd(), 'logs'),
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      enableConsole: process.env.NODE_ENV === 'development',
      ...config
    };

    // Ensure log directory exists in production
    if (this.config.enableFileLogging) {
      this.ensureLogDirectory();
    }
  }

  private ensureLogDirectory(): void {
    try {
      if (!fs.existsSync(this.config.logDirectory)) {
        fs.mkdirSync(this.config.logDirectory, { recursive: true, mode: 0o755 });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to create log directory:', error);
    }
  }

  private getLogFilePath(): string {
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return path.join(this.config.logDirectory, `ui-components-${date}.log`);
  }

  private async writeToFile(entry: LogEntry): Promise<void> {
    if (!this.config.enableFileLogging) return;

    try {
      const logFile = this.getLogFilePath();
      const logLine = JSON.stringify(entry) + '\n';

      // Check file size and rotate if necessary
      if (fs.existsSync(logFile)) {
        const stats = fs.statSync(logFile);
        if (stats.size + logLine.length > this.config.maxFileSize) {
          await this.rotateLogFiles();
        }
      }

      fs.appendFileSync(logFile, logLine, { mode: 0o644 });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to write to log file:', error);
    }
  }

  private async rotateLogFiles(): Promise<void> {
    try {
      const logFile = this.getLogFilePath();

      // Remove oldest file if we have too many
      const oldestFile = path.join(this.config.logDirectory, `ui-components-${new Date(Date.now() - this.config.maxFiles * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}.log`);
      if (fs.existsSync(oldestFile)) {
        fs.unlinkSync(oldestFile);
      }

      // Rename current file with timestamp
      const backupFile = `${logFile}.${Date.now()}`;
      if (fs.existsSync(logFile)) {
        fs.renameSync(logFile, backupFile);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to rotate log files:', error);
    }
  }

  private async processQueue(): Promise<void> {
    if (this.isWriting || this.logQueue.length === 0) return;

    this.isWriting = true;

    while (this.logQueue.length > 0) {
      const entry = this.logQueue.shift()!;
      await this.writeToFile(entry);
    }

    this.isWriting = false;
  }

  private log(level: LogLevel, message: string, data?: any, source?: string): void {
    if (level < this.config.level) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel[level],
      message,
      data,
      source
    };

    // Console output for development
    if (this.config.enableConsole) {
      const consoleMethod = level === LogLevel.ERROR ? 'error' :
                           level === LogLevel.WARN ? 'warn' :
                           level === LogLevel.INFO ? 'info' : 'debug';

      const prefix = source ? `[${source}]` : '';
      // eslint-disable-next-line no-console
      console[consoleMethod](`${prefix} ${message}`, data || '');
    }

    // File output for production
    if (this.config.enableFileLogging) {
      this.logQueue.push(entry);
      this.processQueue();
    }
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

  // Utility method to get current log files
  getLogFiles(): string[] {
    try {
      return fs.readdirSync(this.config.logDirectory)
        .filter(file => file.startsWith('ui-components-') && file.endsWith('.log'))
        .sort()
        .reverse();
    } catch {
      return [];
    }
  }

  // Utility method to read recent logs
  getRecentLogs(lines: number = 100): string[] {
    try {
      const logFile = this.getLogFilePath();
      if (!fs.existsSync(logFile)) return [];

      const content = fs.readFileSync(logFile, 'utf-8');
      return content.split('\n').filter(line => line.trim()).slice(-lines);
    } catch {
      return [];
    }
  }
}

// Create singleton instance
const logger = new Logger();

// Export both the class and instance
export { Logger };
export default logger;
