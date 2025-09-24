/**
 * Content Service Interface
 * Enterprise-grade abstraction for content management operations
 */

export interface GetFilesOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: 'recent' | 'oldest' | 'name' | 'size';
  period?: 'all' | 'today' | 'week' | 'month';
}

export interface ContentItem {
  id: string;
  name: string;
  original_filename: string;
  size: number;
  file_size: number;
  uploadedAt: string;
  created_at: string;
  contentType: string;
  mime_type: string;
  category?: string;
  url?: string;
  downloadUrl?: string;
  publicUrl?: string;
  isSessionUpload?: boolean;
  sessionId?: string;
  uploadProgress?: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ContentListResponse {
  success: boolean;
  files: ContentItem[];
  pagination: PaginationInfo;
  sessionCount: number;
  historicalCount: number;
  count: number; // Backward compatibility
}

export interface SessionFilesResponse {
  success: boolean;
  files: ContentItem[];
  count: number;
  message: string;
}

export interface FileStatsResponse {
  success: boolean;
  stats: {
    sessionUploads: number;
    totalFiles: number;
    totalSize: number;
    categories: Record<string, number>;
    recentActivity: Array<{
      date: string;
      count: number;
    }>;
  };
  message: string;
}

export interface UploadOptions {
  category?: string;
  metadata?: Record<string, string | number | boolean>;
  onProgress?: (progress: number) => void;
}

export interface UploadResponse {
  success: boolean;
  file?: ContentItem;
  access?: any;
  urls?: any;
  message?: string;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

export interface ContentUpdateEvent {
  type: 'upload' | 'delete' | 'update';
  content: ContentItem;
  userId: string;
}

export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  stage: 'uploading' | 'processing' | 'complete' | 'error';
  message?: string;
}

/**
 * Core Content Service Interface
 * All content service implementations must conform to this contract
 */
export interface IContentService {
  // Core file operations
  getFiles(options?: GetFilesOptions): Promise<ContentListResponse>;
  getSessionFiles(): Promise<SessionFilesResponse>;
  getFileStats(): Promise<FileStatsResponse>;
  uploadFile(file: File, options?: UploadOptions): Promise<UploadResponse>;
  deleteFile(id: string): Promise<DeleteResponse>;
  
  // File information
  getFileInfo?(id: string): Promise<{ success: boolean; file?: ContentItem; message?: string }>;
  generateSignedUrl?(id: string, expiresIn?: number): Promise<{ success: boolean; signedUrl?: string; message?: string }>;
  
  // Bulk operations
  makeFilesPublic?(fileIds: string[]): Promise<{ success: boolean; results: any[]; message?: string }>;
  
  // Real-time capabilities (optional)
  onContentUpdate?(callback: (event: ContentUpdateEvent) => void): () => void; // Returns unsubscribe function
  onUploadProgress?(callback: (progress: UploadProgress) => void): () => void; // Returns unsubscribe function
  
  // Health and status
  checkHealth?(): Promise<{ success: boolean; status: string; message: string }>;
}

/**
 * HTTP Client Interface
 * Abstraction for HTTP communication
 */
export interface IHttpClient {
  get<T>(url: string, options?: RequestOptions): Promise<T>;
  post<T>(url: string, data: any, options?: RequestOptions): Promise<T>;
  put<T>(url: string, data: any, options?: RequestOptions): Promise<T>;
  delete<T>(url: string, options?: RequestOptions): Promise<T>;
  
  // For file uploads
  postFormData<T>(url: string, formData: FormData, options?: RequestOptions & { onProgress?: (progress: number) => void }): Promise<T>;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  authToken?: string;
}

/**
 * Service Error Types
 */
export class ContentServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode?: number,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'ContentServiceError';
  }
}

export class NetworkError extends ContentServiceError {
  constructor(message: string, details?: any) {
    super(message, 'NETWORK_ERROR', undefined, details);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends ContentServiceError {
  constructor(message: string = 'Authentication failed', details?: any) {
    super(message, 'AUTH_ERROR', 401, details);
    this.name = 'AuthenticationError';
  }
}

export class ValidationError extends ContentServiceError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

/**
 * Service Configuration
 */
export interface ContentServiceConfig {
  apiBase: string;
  timeout?: number;
  retries?: number;
  authToken?: string;
  enableRealtime?: boolean;
  debug?: boolean;
}

/**
 * Type Guards
 */
export function isContentListResponse(obj: any): obj is ContentListResponse {
  return obj && typeof obj === 'object' && 
         typeof obj.success === 'boolean' &&
         Array.isArray(obj.files) &&
         obj.pagination && typeof obj.pagination === 'object';
}

export function isContentItem(obj: any): obj is ContentItem {
  return obj && typeof obj === 'object' &&
         typeof obj.id === 'string' &&
         typeof obj.name === 'string' &&
         typeof obj.size === 'number';
}