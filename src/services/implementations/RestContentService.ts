/**
 * REST Content Service Implementation
 * Enterprise-grade service that connects to our enhanced content-store and data services
 */

import {
  IContentService,
  IHttpClient,
  ContentItem,
  ContentListResponse,
  SessionFilesResponse,
  FileStatsResponse,
  UploadOptions,
  UploadResponse,
  DeleteResponse,
  GetFilesOptions,
  ContentServiceError,
  AuthenticationError
} from '../ContentService.interface';

export interface RestContentServiceConfig {
  dataServiceBaseURL: string;
  contentStoreBaseURL: string;
  authToken?: string;
  debug?: boolean;
}

/**
 * REST-based Content Service Implementation
 * Uses our enhanced backend APIs with database-first queries and session optimization
 */
export class RestContentService implements IContentService {
  private httpClient: IHttpClient;
  private config: RestContentServiceConfig;

  constructor(httpClient: IHttpClient, config: RestContentServiceConfig) {
    this.httpClient = httpClient;
    this.config = config;

    // Set authentication token if provided
    if (config.authToken) {
      this.setAuthToken(config.authToken);
    }
  }

  setAuthToken(token: string): void {
    this.config.authToken = token;
    if ('setAuthToken' in this.httpClient) {
      (this.httpClient as any).setAuthToken(token);
    }
  }

  /**
   * Get files using enhanced database-first queries
   * This uses our optimized /files endpoint that avoids R2 scanning
   */
  async getFiles(options: GetFilesOptions = {}): Promise<ContentListResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      // Pagination
      if (options.page !== undefined) queryParams.set('page', options.page.toString());
      if (options.limit !== undefined) queryParams.set('limit', options.limit.toString());
      
      // Filtering
      if (options.search) queryParams.set('search', options.search);
      if (options.category) queryParams.set('category', options.category);
      if (options.sort) queryParams.set('sortBy', options.sort);
      if (options.period) queryParams.set('period', options.period);

      // Build URL with query parameters
      const url = `${this.config.dataServiceBaseURL}/files?${queryParams.toString()}`;
      
      if (this.config.debug) {
        console.log('[RestContentService] Getting files:', url);
      }

      const response = await this.httpClient.get<{
        files: any[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
        sessionCount?: number;
        historicalCount?: number;
      }>(url, {
        authToken: this.config.authToken
      });

      // Transform backend format to our interface
      const files: ContentItem[] = response.files.map(file => this.transformFileData(file));

      return {
        success: true,
        files,
        pagination: {
          page: response.pagination.page,
          limit: response.pagination.limit,
          total: response.pagination.total,
          hasNext: response.pagination.page < response.pagination.totalPages,
          hasPrev: response.pagination.page > 1
        },
        sessionCount: response.sessionCount || 0,
        historicalCount: response.historicalCount || response.pagination.total,
        count: response.pagination.total
      };

    } catch (error) {
      if (this.config.debug) {
        console.error('[RestContentService] Get files error:', error);
      }
      
      if (error instanceof AuthenticationError) {
        throw error;
      }
      
      throw new ContentServiceError(
        'Failed to get files',
        'GET_FILES_FAILED',
        500,
        { originalError: error, options }
      );
    }
  }

  /**
   * Get session files using enhanced session endpoint
   */
  async getSessionFiles(): Promise<SessionFilesResponse> {
    try {
      const url = `${this.config.dataServiceBaseURL}/files/session`;
      
      if (this.config.debug) {
        console.log('[RestContentService] Getting session files:', url);
      }

      const response = await this.httpClient.get<{
        files: any[];
        sessionKey?: string;
        cached?: boolean;
      }>(url, {
        authToken: this.config.authToken
      });

      const files: ContentItem[] = response.files.map(file => this.transformFileData(file));

      return {
        success: true,
        files,
        count: files.length,
        message: response.cached ? 'Session files retrieved from cache' : 'Session files retrieved successfully'
      };

    } catch (error) {
      if (this.config.debug) {
        console.error('[RestContentService] Get session files error:', error);
      }
      
      if (error instanceof AuthenticationError) {
        throw error;
      }
      
      throw new ContentServiceError(
        'Failed to get session files',
        'GET_SESSION_FILES_FAILED',
        500,
        { originalError: error }
      );
    }
  }

  /**
   * Get file stats using enhanced analytics endpoint
   */
  async getFileStats(): Promise<FileStatsResponse> {
    try {
      const url = `${this.config.dataServiceBaseURL}/files/stats`;
      
      if (this.config.debug) {
        console.log('[RestContentService] Getting file stats:', url);
      }

      const response = await this.httpClient.get<{
        totalFiles: number;
        totalSize: number;
        filesByType: Record<string, number>;
        sizeByType: Record<string, number>;
        uploadTrends: Array<{ date: string; count: number }>;
        sessionUploads?: number;
      }>(url, {
        authToken: this.config.authToken
      });

      return {
        success: true,
        stats: {
          sessionUploads: response.sessionUploads || 0,
          totalFiles: response.totalFiles,
          totalSize: response.totalSize,
          categories: response.filesByType,
          recentActivity: response.uploadTrends.map(trend => ({
            date: trend.date,
            count: trend.count
          }))
        },
        message: 'File statistics retrieved successfully'
      };

    } catch (error) {
      if (this.config.debug) {
        console.error('[RestContentService] Get file stats error:', error);
      }
      
      throw new ContentServiceError(
        'Failed to get file statistics',
        'GET_STATS_FAILED',
        500,
        { originalError: error }
      );
    }
  }

  /**
   * Upload file using content-store service
   */
  async uploadFile(file: File, options: UploadOptions = {}): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', file.name);
      formData.append('type', file.type);
      
      if (options.category) {
        formData.append('category', options.category);
      }
      
      if (options.metadata) {
        formData.append('metadata', JSON.stringify(options.metadata));
      }

      const url = `${this.config.contentStoreBaseURL}/upload`;
      
      if (this.config.debug) {
        console.log('[RestContentService] Uploading file:', file.name);
      }

      // Track upload progress
      const progressCallback = options.onProgress ? (progress: number) => {
        options.onProgress!(progress);
      } : undefined;

      const response = await this.httpClient.postFormData<{
        success: boolean;
        file?: {
          id: string;
          filename: string;
          size: number;
          url: string;
          uploaded_at: string;
          user_id: string;
          contentType?: string;
          category?: string;
        };
        access?: any;
        urls?: any;
        message?: string;
      }>(url, formData, {
        authToken: this.config.authToken,
        onProgress: progressCallback
      });

      // Transform response to our interface
      const uploadedFile: ContentItem | undefined = response.file ? {
        id: response.file.id,
        name: response.file.filename,
        original_filename: response.file.filename,
        size: response.file.size,
        file_size: response.file.size,
        uploadedAt: response.file.uploaded_at,
        created_at: response.file.uploaded_at,
        contentType: response.file.contentType || file.type || this.inferContentType(response.file.filename),
        mime_type: file.type || this.inferContentType(response.file.filename),
        category: response.file.category || options.category,
        url: response.file.url,
        downloadUrl: response.file.url,
        publicUrl: response.file.url,
        isSessionUpload: true
      } : undefined;

      return {
        success: response.success,
        file: uploadedFile,
        access: response.access,
        urls: response.urls,
        message: response.message || 'File uploaded successfully'
      };

    } catch (error) {
      if (this.config.debug) {
        console.error('[RestContentService] Upload file error:', error);
      }
      
      if (error instanceof AuthenticationError) {
        throw error;
      }
      
      throw new ContentServiceError(
        'Failed to upload file',
        'UPLOAD_FAILED',
        500,
        { originalError: error, fileName: file.name }
      );
    }
  }

  /**
   * Delete file
   */
  async deleteFile(id: string): Promise<DeleteResponse> {
    try {
      const url = `${this.config.contentStoreBaseURL}/files/${id}`;
      
      if (this.config.debug) {
        console.log('[RestContentService] Deleting file:', id);
      }

      const response = await this.httpClient.delete<{
        success: boolean;
        message?: string;
      }>(url, {
        authToken: this.config.authToken
      });

      return {
        success: response.success,
        message: response.message || 'File deleted successfully'
      };

    } catch (error) {
      if (this.config.debug) {
        console.error('[RestContentService] Delete file error:', error);
      }
      
      if (error instanceof AuthenticationError) {
        throw error;
      }
      
      throw new ContentServiceError(
        'Failed to delete file',
        'DELETE_FAILED',
        500,
        { originalError: error, fileId: id }
      );
    }
  }

  /**
   * Get file info by ID (optional method)
   */
  async getFileInfo(id: string): Promise<{ success: boolean; file?: ContentItem; message?: string }> {
    try {
      const url = `${this.config.dataServiceBaseURL}/files/${id}`;
      
      if (this.config.debug) {
        console.log('[RestContentService] Getting file info:', id);
      }

      const response = await this.httpClient.get<{
        id: string;
        filename: string;
        type?: string;
        size: number;
        url: string;
        uploaded_at: string;
        user_id: string;
        metadata?: any;
        category?: string;
      }>(url, {
        authToken: this.config.authToken
      });

      const file: ContentItem = this.transformFileData(response);

      return {
        success: true,
        file,
        message: 'File information retrieved successfully'
      };

    } catch (error) {
      if (this.config.debug) {
        console.error('[RestContentService] Get file info error:', error);
      }
      
      // Return unsuccessful response for 404s (file not found)
      if (error instanceof ContentServiceError && error.statusCode === 404) {
        return {
          success: false,
          message: 'File not found'
        };
      }
      
      if (error instanceof AuthenticationError) {
        throw error;
      }
      
      return {
        success: false,
        message: 'Failed to retrieve file information'
      };
    }
  }

  /**
   * Generate signed URL (optional method)
   */
  async generateSignedUrl(id: string, expiresIn = 3600): Promise<{ success: boolean; signedUrl?: string; message?: string }> {
    try {
      const url = `${this.config.contentStoreBaseURL}/files/${id}/signed-url`;
      const queryParams = new URLSearchParams();
      queryParams.set('expiresIn', expiresIn.toString());
      
      if (this.config.debug) {
        console.log('[RestContentService] Generating signed URL:', id);
      }

      const response = await this.httpClient.get<{
        success: boolean;
        signedUrl?: string;
        message?: string;
      }>(`${url}?${queryParams.toString()}`, {
        authToken: this.config.authToken
      });

      return response;

    } catch (error) {
      if (this.config.debug) {
        console.error('[RestContentService] Generate signed URL error:', error);
      }
      
      if (error instanceof AuthenticationError) {
        throw error;
      }
      
      return {
        success: false,
        message: 'Failed to generate signed URL'
      };
    }
  }

  /**
   * Health check for the service
   */
  async healthCheck(): Promise<{ status: 'healthy' | 'unhealthy'; details: any }> {
    try {
      const [dataServiceHealth, contentStoreHealth] = await Promise.allSettled([
        this.httpClient.get(`${this.config.dataServiceBaseURL}/health`),
        this.httpClient.get(`${this.config.contentStoreBaseURL}/health`)
      ]);

      const healthy = dataServiceHealth.status === 'fulfilled' && 
                     contentStoreHealth.status === 'fulfilled';

      return {
        status: healthy ? 'healthy' : 'unhealthy',
        details: {
          dataService: dataServiceHealth.status === 'fulfilled' ? 'healthy' : 'unhealthy',
          contentStore: contentStoreHealth.status === 'fulfilled' ? 'healthy' : 'unhealthy',
          timestamp: new Date().toISOString()
        }
      };

    } catch (error) {
      return {
        status: 'unhealthy',
        details: {
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        }
      };
    }
  }

  // Helper methods

  private transformFileData(file: any): ContentItem {
    return {
      id: file.id,
      name: file.filename || file.name,
      original_filename: file.filename || file.original_filename || file.name,
      size: file.size || file.file_size,
      file_size: file.file_size || file.size,
      uploadedAt: file.uploaded_at || file.uploadedAt || file.created_at,
      created_at: file.created_at || file.uploaded_at || file.uploadedAt,
      contentType: file.type || file.contentType || file.mime_type || this.inferContentType(file.filename || file.name),
      mime_type: file.mime_type || file.type || file.contentType || this.inferContentType(file.filename || file.name),
      category: file.category,
      url: file.url || file.downloadUrl || this.buildFileUrl(file.id),
      downloadUrl: file.downloadUrl || file.url || this.buildFileUrl(file.id),
      publicUrl: file.publicUrl || file.url || this.buildFileUrl(file.id),
      isSessionUpload: file.isSessionUpload || false,
      sessionId: file.sessionId,
      uploadProgress: file.uploadProgress
    };
  }

  private inferContentType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (!ext) return 'application/octet-stream';

    const typeMap: Record<string, string> = {
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'txt': 'text/plain',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'mp4': 'video/mp4',
      'mp3': 'audio/mpeg',
      'zip': 'application/zip'
    };

    return typeMap[ext] || 'application/octet-stream';
  }

  private buildFileUrl(fileId: string): string {
    return `${this.config.contentStoreBaseURL}/files/${fileId}/download`;
  }

  /**
   * Get service configuration
   */
  getConfig(): RestContentServiceConfig {
    return { ...this.config };
  }

  /**
   * Update service configuration
   */
  updateConfig(updates: Partial<RestContentServiceConfig>): void {
    this.config = { ...this.config, ...updates };
    
    if (updates.authToken) {
      this.setAuthToken(updates.authToken);
    }
  }
}