/**
 * Mock Content Service Implementation
 * Enterprise-grade testing service with configurable responses and behaviors
 */

import {
  IContentService,
  ContentItem,
  ContentListResponse,
  SessionFilesResponse,
  FileStatsResponse,
  UploadOptions,
  UploadResponse,
  DeleteResponse,
  GetFilesOptions
} from '../ContentService.interface';

export interface MockContentServiceConfig {
  autoGenerateFiles?: boolean;
  defaultDelay?: number;
  debug?: boolean;
  fileCount?: number;
  failureRate?: number; // 0-1, probability of operations failing
}

/**
 * Mock Content Service for Testing and Development
 * Provides configurable responses, delays, and error conditions
 */
export class MockContentService implements IContentService {
  private config: MockContentServiceConfig;
  private mockFiles: ContentItem[] = [];
  private fileIdCounter = 1;
  private uploadDelays = new Map<string, number>();
  private operationDelays = new Map<string, number>();
  private forcedErrors = new Map<string, Error>();

  constructor(config: MockContentServiceConfig = {}) {
    this.config = {
      autoGenerateFiles: config.autoGenerateFiles ?? true,
      defaultDelay: config.defaultDelay ?? 100,
      debug: config.debug ?? false,
      fileCount: config.fileCount ?? 10,
      failureRate: config.failureRate ?? 0
    };

    if (this.config.autoGenerateFiles) {
      this.generateMockFiles();
    }
  }

  /**
   * Get files with configurable pagination and filtering
   */
  async getFiles(options: GetFilesOptions = {}): Promise<ContentListResponse> {
    await this.simulateDelay('getFiles');
    this.simulateFailure('getFiles');

    if (this.config.debug) {
      console.log('[MockContentService] Getting files with options:', options);
    }

    // Apply filtering
    let filteredFiles = [...this.mockFiles];

    if (options.search) {
      const searchTerm = options.search.toLowerCase();
      filteredFiles = filteredFiles.filter(file => 
        file.name.toLowerCase().includes(searchTerm) ||
        file.original_filename.toLowerCase().includes(searchTerm)
      );
    }

    if (options.category) {
      filteredFiles = filteredFiles.filter(file => file.category === options.category);
    }

    if (options.period && options.period !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (options.period) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      filteredFiles = filteredFiles.filter(file => 
        new Date(file.uploadedAt) >= filterDate
      );
    }

    // Apply sorting
    if (options.sort) {
      switch (options.sort) {
        case 'recent':
          filteredFiles.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
          break;
        case 'oldest':
          filteredFiles.sort((a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime());
          break;
        case 'name':
          filteredFiles.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'size':
          filteredFiles.sort((a, b) => b.size - a.size);
          break;
      }
    }

    // Apply pagination
    const page = options.page || 1;
    const limit = options.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedFiles = filteredFiles.slice(startIndex, endIndex);

    const sessionFiles = filteredFiles.filter(file => file.isSessionUpload);

    return {
      success: true,
      files: paginatedFiles,
      pagination: {
        page,
        limit,
        total: filteredFiles.length,
        hasNext: endIndex < filteredFiles.length,
        hasPrev: page > 1
      },
      sessionCount: sessionFiles.length,
      historicalCount: filteredFiles.length - sessionFiles.length,
      count: filteredFiles.length
    };
  }

  /**
   * Get session files (recently uploaded)
   */
  async getSessionFiles(): Promise<SessionFilesResponse> {
    await this.simulateDelay('getSessionFiles');
    this.simulateFailure('getSessionFiles');

    if (this.config.debug) {
      console.log('[MockContentService] Getting session files');
    }

    const sessionFiles = this.mockFiles.filter(file => file.isSessionUpload);

    return {
      success: true,
      files: sessionFiles,
      count: sessionFiles.length,
      message: 'Session files retrieved successfully (mock)'
    };
  }

  /**
   * Get file statistics
   */
  async getFileStats(): Promise<FileStatsResponse> {
    await this.simulateDelay('getFileStats');
    this.simulateFailure('getFileStats');

    if (this.config.debug) {
      console.log('[MockContentService] Getting file stats');
    }

    const sessionUploads = this.mockFiles.filter(file => file.isSessionUpload).length;
    const totalFiles = this.mockFiles.length;
    const totalSize = this.mockFiles.reduce((sum, file) => sum + file.size, 0);

    // Categorize files by type
    const categories: Record<string, number> = {};
    this.mockFiles.forEach(file => {
      const category = file.category || 'uncategorized';
      categories[category] = (categories[category] || 0) + 1;
    });

    // Generate mock upload trends (last 7 days)
    const recentActivity = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 10) + 1
      };
    }).reverse();

    return {
      success: true,
      stats: {
        sessionUploads,
        totalFiles,
        totalSize,
        categories,
        recentActivity
      },
      message: 'File statistics retrieved successfully (mock)'
    };
  }

  /**
   * Upload file with progress simulation
   */
  async uploadFile(file: File, options: UploadOptions = {}): Promise<UploadResponse> {
    await this.simulateDelay('uploadFile');
    this.simulateFailure('uploadFile');

    if (this.config.debug) {
      console.log('[MockContentService] Uploading file:', file.name);
    }

    // Simulate upload progress
    if (options.onProgress) {
      const progressInterval = setInterval(() => {
        const progress = Math.min(100, Math.floor(Math.random() * 20) + 10);
        options.onProgress!(progress);
      }, 100);

      // Complete progress after delay
      setTimeout(() => {
        clearInterval(progressInterval);
        options.onProgress!(100);
      }, this.config.defaultDelay || 500);
    }

    const uploadedFile: ContentItem = {
      id: `mock_${this.fileIdCounter++}`,
      name: file.name,
      original_filename: file.name,
      size: file.size,
      file_size: file.size,
      uploadedAt: new Date().toISOString(),
      created_at: new Date().toISOString(),
      contentType: file.type,
      mime_type: file.type,
      category: options.category || 'uploads',
      url: `mock://files/${file.name}`,
      downloadUrl: `mock://download/${file.name}`,
      publicUrl: `mock://public/${file.name}`,
      isSessionUpload: true,
      sessionId: 'mock-session-' + Date.now()
    };

    // Add to mock files
    this.mockFiles.unshift(uploadedFile);

    return {
      success: true,
      file: uploadedFile,
      access: {
        canRead: true,
        canWrite: true,
        canDelete: true
      },
      urls: {
        download: uploadedFile.downloadUrl,
        public: uploadedFile.publicUrl
      },
      message: 'File uploaded successfully (mock)'
    };
  }

  /**
   * Delete file
   */
  async deleteFile(id: string): Promise<DeleteResponse> {
    await this.simulateDelay('deleteFile');
    this.simulateFailure('deleteFile');

    if (this.config.debug) {
      console.log('[MockContentService] Deleting file:', id);
    }

    const fileIndex = this.mockFiles.findIndex(file => file.id === id);
    
    if (fileIndex === -1) {
      return {
        success: false,
        message: 'File not found (mock)'
      };
    }

    this.mockFiles.splice(fileIndex, 1);

    return {
      success: true,
      message: 'File deleted successfully (mock)'
    };
  }

  /**
   * Get file info by ID
   */
  async getFileInfo(id: string): Promise<{ success: boolean; file?: ContentItem; message?: string }> {
    await this.simulateDelay('getFileInfo');
    this.simulateFailure('getFileInfo');

    if (this.config.debug) {
      console.log('[MockContentService] Getting file info:', id);
    }

    const file = this.mockFiles.find(f => f.id === id);

    if (!file) {
      return {
        success: false,
        message: 'File not found (mock)'
      };
    }

    return {
      success: true,
      file,
      message: 'File information retrieved successfully (mock)'
    };
  }

  /**
   * Generate signed URL
   */
  async generateSignedUrl(id: string, expiresIn = 3600): Promise<{ success: boolean; signedUrl?: string; message?: string }> {
    await this.simulateDelay('generateSignedUrl');
    this.simulateFailure('generateSignedUrl');

    if (this.config.debug) {
      console.log('[MockContentService] Generating signed URL for:', id);
    }

    const file = this.mockFiles.find(f => f.id === id);

    if (!file) {
      return {
        success: false,
        message: 'File not found (mock)'
      };
    }

    const signedUrl = `mock://signed/${id}?expires=${Date.now() + expiresIn * 1000}`;

    return {
      success: true,
      signedUrl,
      message: 'Signed URL generated successfully (mock)'
    };
  }

  // Configuration and control methods

  /**
   * Set custom delay for specific operation
   */
  setOperationDelay(operation: string, delay: number): void {
    this.operationDelays.set(operation, delay);
  }

  /**
   * Force an error for specific operation
   */
  setOperationError(operation: string, error: Error): void {
    this.forcedErrors.set(operation, error);
  }

  /**
   * Clear all forced errors
   */
  clearErrors(): void {
    this.forcedErrors.clear();
  }

  /**
   * Add mock files manually
   */
  addMockFile(file: Partial<ContentItem>): ContentItem {
    const mockFile: ContentItem = {
      id: file.id || `mock_${this.fileIdCounter++}`,
      name: file.name || `mock_file_${this.fileIdCounter}.txt`,
      original_filename: file.original_filename || file.name || `mock_file_${this.fileIdCounter}.txt`,
      size: file.size || Math.floor(Math.random() * 1000000),
      file_size: file.file_size || file.size || Math.floor(Math.random() * 1000000),
      uploadedAt: file.uploadedAt || new Date().toISOString(),
      created_at: file.created_at || file.uploadedAt || new Date().toISOString(),
      contentType: file.contentType || 'text/plain',
      mime_type: file.mime_type || file.contentType || 'text/plain',
      category: file.category || 'mock',
      url: file.url || `mock://files/${file.name}`,
      downloadUrl: file.downloadUrl || file.url || `mock://download/${file.name}`,
      publicUrl: file.publicUrl || file.url || `mock://public/${file.name}`,
      isSessionUpload: file.isSessionUpload ?? false,
      sessionId: file.sessionId,
      uploadProgress: file.uploadProgress
    };

    this.mockFiles.push(mockFile);
    return mockFile;
  }

  /**
   * Clear all mock files
   */
  clearFiles(): void {
    this.mockFiles = [];
    this.fileIdCounter = 1;
  }

  /**
   * Get current mock files
   */
  getMockFiles(): ContentItem[] {
    return [...this.mockFiles];
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<MockContentServiceConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  // Private helper methods

  private async simulateDelay(operation: string): Promise<void> {
    const delay = this.operationDelays.get(operation) || this.config.defaultDelay || 0;
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  private simulateFailure(operation: string): void {
    // Check for forced errors first
    const forcedError = this.forcedErrors.get(operation);
    if (forcedError) {
      throw forcedError;
    }

    // Check for random failure
    if (this.config.failureRate && Math.random() < this.config.failureRate) {
      throw new Error(`Mock failure for operation: ${operation}`);
    }
  }

  private generateMockFiles(): void {
    const fileTypes = [
      { ext: 'pdf', type: 'application/pdf', category: 'documents' },
      { ext: 'jpg', type: 'image/jpeg', category: 'images' },
      { ext: 'png', type: 'image/png', category: 'images' },
      { ext: 'docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', category: 'documents' },
      { ext: 'txt', type: 'text/plain', category: 'documents' },
      { ext: 'mp4', type: 'video/mp4', category: 'videos' },
      { ext: 'zip', type: 'application/zip', category: 'archives' }
    ];

    const sampleNames = [
      'Annual Report', 'Presentation Slides', 'Project Proposal', 'Meeting Notes',
      'Budget Analysis', 'User Manual', 'Design Mockup', 'Data Export',
      'Training Material', 'Invoice Template', 'Product Catalog', 'Research Paper'
    ];

    for (let i = 0; i < (this.config.fileCount || 10); i++) {
      const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
      const baseName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
      const fileName = `${baseName.replace(/\s+/g, '_')}_${i + 1}.${fileType.ext}`;
      
      const uploadDate = new Date();
      uploadDate.setDate(uploadDate.getDate() - Math.floor(Math.random() * 30)); // Random date within last 30 days

      this.addMockFile({
        name: fileName,
        original_filename: fileName,
        size: Math.floor(Math.random() * 5000000) + 1000, // 1KB to 5MB
        contentType: fileType.type,
        mime_type: fileType.type,
        category: fileType.category,
        uploadedAt: uploadDate.toISOString(),
        isSessionUpload: Math.random() < 0.3 // 30% chance of being a session upload
      });
    }

    if (this.config.debug) {
      console.log(`[MockContentService] Generated ${this.mockFiles.length} mock files`);
    }
  }
}