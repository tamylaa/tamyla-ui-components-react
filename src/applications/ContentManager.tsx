/**
 * Content Manager Application - React wrapper for ui-components ContentManagerApplicationFactory
 */

import { createFactoryComponent } from '../core/factory-bridge';

interface ContentManagerProps {
  apiBase?: string;
  selectionMode?: boolean;
  showUpload?: boolean;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  showPreview?: boolean;
  enableBulkActions?: boolean;
  // Event handlers
  onContentUploaded?: (content: any) => void;
  onContentSelected?: (content: any) => void;
  onContentDeleted?: (contentId: string) => void;
  onContentUpdated?: (content: any) => void;
}

export const ContentManager = createFactoryComponent<ContentManagerProps>(
  'ContentManager',
  'ContentManager'
);

export default ContentManager;
