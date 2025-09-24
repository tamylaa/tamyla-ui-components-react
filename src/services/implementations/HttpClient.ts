/**
 * HTTP Client Implementation
 * Enterprise-grade HTTP client with retry, authentication, and error handling
 */

import { 
  IHttpClient, 
  RequestOptions, 
  NetworkError, 
  AuthenticationError, 
  ContentServiceError 
} from '../ContentService.interface';

export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  authToken?: string;
  defaultHeaders?: Record<string, string>;
  debug?: boolean;
}

/**
 * Fetch-based HTTP Client Implementation
 */
export class FetchHttpClient implements IHttpClient {
  private config: Required<HttpClientConfig>;

  constructor(config: HttpClientConfig = {}) {
    this.config = {
      baseURL: config.baseURL || '',
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      retryDelay: config.retryDelay || 1000,
      authToken: config.authToken || '',
      defaultHeaders: {
        'Content-Type': 'application/json',
        ...config.defaultHeaders
      },
      debug: config.debug || false
    };
  }

  async get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('GET', url, undefined, options);
  }

  async post<T>(url: string, data: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('POST', url, data, options);
  }

  async put<T>(url: string, data: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('PUT', url, data, options);
  }

  async delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('DELETE', url, undefined, options);
  }

  async postFormData<T>(
    url: string, 
    formData: FormData, 
    options: RequestOptions & { onProgress?: (progress: number) => void } = {}
  ): Promise<T> {
    const { onProgress, ...requestOptions } = options;
    
    // Remove Content-Type for FormData - let browser set it with boundary
    const headers = { ...this.getHeaders(requestOptions) };
    delete headers['Content-Type'];

    return this.request<T>('POST', url, formData, {
      ...requestOptions,
      headers
    }, onProgress);
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    options: RequestOptions = {},
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const fullUrl = this.buildUrl(url);
    const headers = this.getHeaders(options);
    const timeout = options.timeout || this.config.timeout;
    const retries = options.retries ?? this.config.retries;

    if (this.config.debug) {
      console.log(`[HTTP] ${method} ${fullUrl}`, { headers, data });
    }

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const requestInit: RequestInit = {
          method,
          headers,
          signal: controller.signal
        };

        // Add body for non-GET requests
        if (data !== undefined && method !== 'GET') {
          if (data instanceof FormData) {
            requestInit.body = data;
          } else {
            requestInit.body = JSON.stringify(data);
          }
        }

        const response = await fetch(fullUrl, requestInit);
        clearTimeout(timeoutId);

        // Handle upload progress if supported and callback provided
        if (onProgress && response.body) {
          const contentLength = response.headers.get('content-length');
          if (contentLength) {
            const total = parseInt(contentLength, 10);
            let loaded = 0;

            const reader = response.body.getReader();
            const chunks: Uint8Array[] = [];

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              chunks.push(value);
              loaded += value.length;
              onProgress(Math.round((loaded / total) * 100));
            }

            // Reconstruct response from chunks
            const fullBody = new Uint8Array(loaded);
            let offset = 0;
            for (const chunk of chunks) {
              fullBody.set(chunk, offset);
              offset += chunk.length;
            }

            const textBody = new TextDecoder().decode(fullBody);
            return this.parseResponse<T>(response, textBody);
          }
        }

        // Standard response handling
        const textBody = await response.text();
        return this.parseResponse<T>(response, textBody);

      } catch (error) {
        lastError = error as Error;

        if (this.config.debug) {
          console.warn(`[HTTP] Attempt ${attempt + 1}/${retries + 1} failed:`, error);
        }

        // Don't retry on certain errors
        if (error instanceof AuthenticationError || 
            (error as any)?.name === 'AbortError' ||
            attempt === retries) {
          break;
        }

        // Wait before retry
        if (attempt < retries) {
          await this.delay(this.config.retryDelay * Math.pow(2, attempt));
        }
      }
    }

    // All retries failed
    if (lastError) {
      if (lastError.name === 'AbortError') {
        throw new NetworkError(`Request timeout after ${timeout}ms`, { url: fullUrl, timeout });
      }
      throw lastError;
    }

    throw new NetworkError('Request failed after all retries', { url: fullUrl, retries });
  }

  private buildUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    const baseURL = this.config.baseURL.endsWith('/') 
      ? this.config.baseURL.slice(0, -1) 
      : this.config.baseURL;
    const path = url.startsWith('/') ? url : `/${url}`;
    
    return `${baseURL}${path}`;
  }

  private getHeaders(options: RequestOptions): Record<string, string> {
    const headers = {
      ...this.config.defaultHeaders,
      ...options.headers
    };

    // Add authentication if available
    const authToken = options.authToken || this.config.authToken;
    if (authToken) {
      headers.Authorization = authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`;
    }

    return headers;
  }

  private async parseResponse<T>(response: Response, textBody: string): Promise<T> {
    // Handle non-OK responses
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      let errorDetails: any = { status: response.status, statusText: response.statusText };

      try {
        const errorData = JSON.parse(textBody);
        errorMessage = errorData.message || errorData.error || errorMessage;
        errorDetails = { ...errorDetails, ...errorData };
      } catch {
        // Text body is not JSON, use as-is
        if (textBody) {
          errorMessage = textBody;
        }
      }

      if (response.status === 401) {
        throw new AuthenticationError(errorMessage, errorDetails);
      }

      throw new ContentServiceError(
        errorMessage, 
        `HTTP_${response.status}`, 
        response.status, 
        errorDetails
      );
    }

    // Handle empty responses
    if (!textBody) {
      return {} as T;
    }

    // Parse JSON response
    try {
      return JSON.parse(textBody) as T;
    } catch (error) {
      if (this.config.debug) {
        console.warn('[HTTP] Failed to parse JSON response:', textBody);
      }
      
      // Return text as-is for non-JSON responses
      return textBody as unknown as T;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Update authentication token
   */
  setAuthToken(token: string): void {
    this.config.authToken = token;
  }

  /**
   * Update base URL
   */
  setBaseURL(baseURL: string): void {
    this.config.baseURL = baseURL;
  }

  /**
   * Get current configuration
   */
  getConfig(): HttpClientConfig {
    return { ...this.config };
  }
}

/**
 * Mock HTTP Client for testing
 */
export class MockHttpClient implements IHttpClient {
  private responses = new Map<string, any>();
  private delays = new Map<string, number>();
  private errors = new Map<string, Error>();

  // Mock response setup
  mockResponse(method: string, url: string, response: any, delay = 0): void {
    const key = `${method.toUpperCase()}:${url}`;
    this.responses.set(key, response);
    if (delay > 0) {
      this.delays.set(key, delay);
    }
  }

  mockError(method: string, url: string, error: Error): void {
    const key = `${method.toUpperCase()}:${url}`;
    this.errors.set(key, error);
  }

  clearMocks(): void {
    this.responses.clear();
    this.delays.clear();
    this.errors.clear();
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.mockRequest<T>('GET', url);
  }

  async post<T>(url: string, data: any, options?: RequestOptions): Promise<T> {
    return this.mockRequest<T>('POST', url);
  }

  async put<T>(url: string, data: any, options?: RequestOptions): Promise<T> {
    return this.mockRequest<T>('PUT', url);
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.mockRequest<T>('DELETE', url);
  }

  async postFormData<T>(url: string, formData: FormData, options?: any): Promise<T> {
    return this.mockRequest<T>('POST', url);
  }

  private async mockRequest<T>(method: string, url: string): Promise<T> {
    const key = `${method.toUpperCase()}:${url}`;
    
    // Check for mocked error
    const error = this.errors.get(key);
    if (error) {
      throw error;
    }

    // Add delay if specified
    const delay = this.delays.get(key);
    if (delay) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Return mocked response
    const response = this.responses.get(key);
    if (response !== undefined) {
      return response;
    }

    // Default success response
    return { success: true, message: `Mock response for ${method} ${url}` } as T;
  }
}