/**
 * Content API Adapter
 * Service-aware wrapper that maintains backward compatibility with existing API calls
 * while using the new enterprise service layer underneath
 */

import { 
  IContentService, 
  GetFilesOptions,
  UploadOptions,
  configureServices 
} from '../index';

/**
 * Legacy API option types for backward compatibility
 */
interface LegacyUploadOptions {
  category?: string;
  metadata?: Record<string, any>;
  onProgress?: (progress: number) => void;
}

interface LegacyGetFilesOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: 'recent' | 'oldest' | 'name' | 'size';
  period?: 'all' | 'today' | 'week' | 'month';
}

/**
 * ContentApiAdapter - Provides backward compatibility for existing content API calls
 * while utilizing the new enterprise service layer underneath
 */
class ContentApiAdapter {
  private contentService: IContentService;

  /**
   * @param contentService - Optional service instance, uses default if not provided
   */
  constructor(contentService?: IContentService) {
    this.contentService = contentService || configureServices();
  }

  /**
   * Upload a file to the content service
   * @param file - File to upload
   * @param options - Upload options
   * @returns Promise<{success: boolean, file: Object}>
   */
  async uploadFile(file: File, options: LegacyUploadOptions = {}) {
    try {
      const uploadOptions: UploadOptions = {
        category: options.category,
        metadata: options.metadata,
        onProgress: options.onProgress
      };

      const result = await this.contentService.uploadFile(file, uploadOptions);

      return {
        success: result.success,
        file: result.file,
        message: result.message || 'File uploaded successfully'
      };
    } catch (error) {
      console.error('ContentApiAdapter.uploadFile error:', error);
      return {
        success: false,
        file: null,
        message: error instanceof Error ? error.message : 'Upload failed',
        error
      };
    }
  }

  /**
   * Get user's files with enhanced pagination and filtering
   * @param options - Query options
   * @returns Promise<{success: boolean, files: Array, pagination: Object}>
   */
  async getUserFiles(options: LegacyGetFilesOptions = {}) {
    try {
      const getFilesOptions: GetFilesOptions = {
        page: options.page,
        limit: Math.min(options.limit || 20, 100),
        search: options.search,
        category: options.category && options.category !== 'all' ? options.category : undefined,
        sort: (options.sort && options.sort !== 'recent' ? options.sort : 'recent') as 'recent' | 'oldest' | 'name' | 'size',
        period: (options.period && options.period !== 'all' ? options.period : 'all') as 'all' | 'today' | 'week' | 'month'
      };

      const result = await this.contentService.getFiles(getFilesOptions);

      return {
        success: result.success,
        files: result.files || [],
        pagination: result.pagination || {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0
        },
        message: 'Files retrieved successfully'
      };
    } catch (error) {
      console.error('ContentApiAdapter.getUserFiles error:', error);
      return {
        success: false,
        files: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0
        },
        message: error instanceof Error ? error.message : 'Failed to retrieve files',
        error
      };
    }
  }

  /**
   * Get file information
   * @param fileId - File ID
   * @returns Promise<{success: boolean, file: Object}>
   */
  async getFileInfo(fileId: string) {
    try {
      if ('getFileInfo' in this.contentService) {
        const result = await (this.contentService as any).getFileInfo(fileId);
        
        return {
          success: result.success,
          file: result.file,
          message: result.message || 'File info retrieved successfully'
        };
      }

      // Fallback: find the file in the files list
      const filesResult = await this.contentService.getFiles({ search: fileId });
      if (filesResult.success && filesResult.files) {
        const file = filesResult.files.find((f: any) => f.id === fileId);
        if (file) {
          return {
            success: true,
            file,
            message: 'File info retrieved successfully'
          };
        }
      }

      return {
        success: false,
        file: null,
        message: 'File not found'
      };
    } catch (error) {
      console.error('ContentApiAdapter.getFileInfo error:', error);
      return {
        success: false,
        file: null,
        message: error instanceof Error ? error.message : 'Failed to get file info',
        error
      };
    }
  }

  /**
   * Delete a file
   * @param fileId - File ID to delete
   * @returns Promise<{success: boolean}>
   */
  async deleteFile(fileId: string) {
    try {
      const result = await this.contentService.deleteFile(fileId);
      
      return {
        success: result.success,
        message: result.message || 'File deleted successfully'
      };
    } catch (error) {
      console.error('ContentApiAdapter.deleteFile error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete file',
        error
      };
    }
  }

  /**
   * Generate a signed URL for file access
   * @param fileId - File ID
   * @param expiresIn - Expiration time in seconds (default: 3600)
   * @returns Promise<{success: boolean, url: string}>
   */
  async generateSignedUrl(fileId: string, expiresIn: number = 3600) {
    try {
      if ('generateSignedUrl' in this.contentService) {
        const result = await (this.contentService as any).generateSignedUrl(fileId, expiresIn);
        
        return {
          success: result.success,
          url: result.url,
          message: result.message || 'Signed URL generated successfully'
        };
      }

      // Fallback: try to construct a basic URL
      const fileInfo = await this.getFileInfo(fileId);
      if (fileInfo.success && fileInfo.file) {
        return {
          success: true,
          url: (fileInfo.file as any).url || (fileInfo.file as any).downloadUrl || '',
          message: 'URL retrieved successfully'
        };
      }

      return {
        success: false,
        url: '',
        message: 'Unable to generate signed URL'
      };
    } catch (error) {
      console.error('ContentApiAdapter.generateSignedUrl error:', error);
      return {
        success: false,
        url: '',
        message: error instanceof Error ? error.message : 'Failed to generate signed URL',
        error
      };
    }
  }

  /**
   * Toggle file public/private status
   * @param fileId - File ID
   * @param isPublic - Whether the file should be public
   * @returns Promise<{success: boolean}>
   */
  async toggleFilePublic(fileId: string, isPublic: boolean) {
    try {
      if ('toggleFilePublic' in this.contentService) {
        const result = await (this.contentService as any).toggleFilePublic(fileId, isPublic);
        
        return {
          success: result.success,
          message: result.message || `File ${isPublic ? 'made public' : 'made private'} successfully`
        };
      }

      return {
        success: false,
        message: 'Public/private toggle not supported by current service'
      };
    } catch (error) {
      console.error('ContentApiAdapter.toggleFilePublic error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to toggle file visibility',
        error
      };
    }
  }

  /**
   * Update the underlying service (for testing or service switching)
   * @param newService - New service instance
   */
  updateService(newService: IContentService) {
    this.contentService = newService;
  }
}

// Create singleton instance for backward compatibility
const contentApiAdapter = new ContentApiAdapter();

// Export backward-compatible API functions
export const contentApi = {
  uploadFile: (file: File, options?: LegacyUploadOptions) => contentApiAdapter.uploadFile(file, options),
  getUserFiles: (options?: LegacyGetFilesOptions) => contentApiAdapter.getUserFiles(options),
  getFileInfo: (fileId: string) => contentApiAdapter.getFileInfo(fileId),
  deleteFile: (fileId: string) => contentApiAdapter.deleteFile(fileId),
  generateSignedUrl: (fileId: string, expiresIn?: number) => contentApiAdapter.generateSignedUrl(fileId, expiresIn),
  toggleFilePublic: (fileId: string, isPublic: boolean) => contentApiAdapter.toggleFilePublic(fileId, isPublic)
};

// Export the adapter class for advanced usage
export { ContentApiAdapter };

// Default export for maximum compatibility
export default contentApi;