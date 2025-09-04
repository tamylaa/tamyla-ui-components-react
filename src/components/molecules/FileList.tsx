/**
 * FileList Component - React wrapper for FileListFactory
 */

import React from 'react';
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
  // React-specific event handlers
  onFileAdd?: (_files: FileList) => void;
  onFileRemove?: (_fileId: string) => void;
  onFileDownload?: (_fileId: string) => void;
  onDragOver?: (_event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (_event: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (_event: React.DragEvent<HTMLDivElement>) => void;
  className?: string;
}

export const FileList: React.FC<FileListProps> = ({
  onFileAdd,
  onFileRemove,
  onFileDownload,
  onDragOver,
  onDragLeave,
  onDrop,
  ...props
}) => {
  const handleEvent = (eventType: string, detail: FileList | string) => {
    switch (eventType) {
      case 'file-add':
        if (onFileAdd) onFileAdd(detail as FileList);
        break;
      case 'file-remove':
        if (onFileRemove) onFileRemove(detail as string);
        break;
      case 'file-download':
        if (onFileDownload) onFileDownload(detail as string);
        break;
    }
  };

  return createFactoryComponent<FileListProps>('FileList', 'FileListFactory')({
    ...props,
    onEvent: handleEvent,
    onFileAdd,
    onFileRemove,
    onFileDownload,
    onDragOver,
    onDragLeave,
    onDrop
  });
};

export default FileList;
