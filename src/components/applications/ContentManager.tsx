/**
 * Content Manager Application - React wrapper for ui-components ContentManagerApplicationFactory
 */

import { createFactoryComponent } from '../../core/factory/factory-bridge';

interface ContentItem {
  id: string;
  title: string;
  type: 'image' | 'video' | 'document' | 'audio';
  url: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

interface ContentManagerProps {
  apiBase?: string;
  selectionMode?: boolean;
  showUpload?: boolean;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  showPreview?: boolean;
  enableBulkActions?: boolean;
  // Event handlers
  onContentUploaded?: (content: ContentItem) => void;
  onContentSelected?: (content: ContentItem) => void;
  onContentDeleted?: (contentId: string) => void;
  onContentUpdated?: (content: ContentItem) => void;
}

export const ContentManager = createFactoryComponent<ContentManagerProps>(
  'ContentManager',
  'ContentManager'
);

export default ContentManager;
