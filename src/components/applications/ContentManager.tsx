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
  onContentUploaded?: (_content: Record<string, unknown>) => void;
  onContentSelected?: (_content: Record<string, unknown>) => void;
  onContentDeleted?: (_contentId: string) => void;
  onContentUpdated?: (_content: Record<string, unknown>) => void;
}

export const ContentManager = createFactoryComponent<ContentManagerProps>(
  'ContentManager',
  'ContentManager'
);

export default ContentManager;
