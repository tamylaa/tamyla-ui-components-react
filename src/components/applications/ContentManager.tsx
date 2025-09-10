/**
 * Content Manager Application - React wrapper for ui-components ContentManagerApplicationFactory
 */

import { createFactoryComponent } from '../../core/factory/factory-bridge';

interface _ContentItem {
  id: string;
  title: string;
  type: 'image' | 'video' | 'document' | 'audio';
  url: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  metadata?: Record<string, string | number | boolean>;
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
  onContentUploaded?: (_content: _ContentItem) => void;
  onContentSelected?: (_content: _ContentItem) => void;
  onContentDeleted?: (_contentId: string) => void;
  onContentUpdated?: (_content: _ContentItem) => void;
}

export const ContentManager = createFactoryComponent<ContentManagerProps>(
  'ContentManager',
  'ContentManager'
);

export default ContentManager;
