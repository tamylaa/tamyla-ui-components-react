/**
 * FileList Component - React wrapper for FileListFactory
 */

import { createFactoryComponent } from '../../core/factory/factory-bridge';

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  uploadProgress?: number;
}

interface FileListProps {
  files?: FileItem[];
  allowUpload?: boolean;
  allowDelete?: boolean;
  allowDownload?: boolean;
  maxFiles?: number;
  acceptedTypes?: string[];
  onFileAdd?: (files: FileList) => void;
  onFileRemove?: (fileId: string) => void;
  onFileDownload?: (fileId: string) => void;
  className?: string;
}

const FileList = createFactoryComponent<FileListProps>(
  'FileList',
  'FileListFactory'
);

export default FileList;
