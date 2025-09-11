/**
 * FileList Component - Enhanced React wrapper for FileListFactory
 * Features: Drag & drop, Redux integration, file validation, progress tracking
 */

import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { createFactoryComponent } from '../../core/factory/factory-bridge';
import { ComponentEventData } from '../../types/factory';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { responsiveSizes } from '../../utils/responsive-utils';

// Styled components
const FileListContainer = styled.div<{
  isDragOver: boolean;
}>`
  border: 2px dashed ${props => props.isDragOver ? props.theme?.primaryColor || '#3b82f6' : '#d1d5db'};
  border-radius: 8px;
  padding: ${responsiveSizes.card.default};
  background: ${props => props.theme?.mode === 'dark' ? '#1f2937' : '#f9fafb'};
  transition: all 0.3s ease;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${props => props.isDragOver && `
    background: ${props.theme?.primaryColor || '#3b82f6'}10;
    transform: scale(1.02);
  `}
`;

const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.6;
`;

const UploadText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme?.mode === 'dark' ? '#e5e7eb' : '#374151'};
  margin-bottom: 8px;
`;

const UploadSubtext = styled.div`
  font-size: 14px;
  color: ${props => props.theme?.mode === 'dark' ? '#9ca3af' : '#6b7280'};
`;

const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  width: 100%;
  margin-top: 20px;
`;

const FileItem = styled.div<{
  isUploading: boolean;
}>`
  position: relative;
  border: 1px solid ${props => props.theme?.mode === 'dark' ? '#374151' : '#e5e7eb'};
  border-radius: 8px;
  padding: 12px;
  background: ${props => props.theme?.mode === 'dark' ? '#111827' : 'white'};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme?.primaryColor || '#3b82f6'};
  }

  ${props => props.isUploading && `
    opacity: 0.7;
    pointer-events: none;
  `}
`;

const FileIcon = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
  text-align: center;
`;

const FileName = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileSize = styled.div`
  font-size: 12px;
  color: ${props => props.theme?.mode === 'dark' ? '#9ca3af' : '#6b7280'};
`;

const ProgressBar = styled.div<{
  progress: number;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${props => props.theme?.mode === 'dark' ? '#374151' : '#e5e7eb'};
  border-radius: 0 0 8px 8px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: ${props => props.theme?.primaryColor || '#3b82f6'};
    transition: width 0.3s ease;
  }
`;

const FileActions = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
`;

const ActionButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme?.primaryColor || '#3b82f6'};
    outline-offset: 2px;
  }
`;

// Enhanced interfaces
interface FileItemData {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  uploadProgress?: number;
  lastModified?: number;
  error?: string;
}

interface FileListProps {
  files?: FileItemData[];
  allowUpload?: boolean;
  allowDelete?: boolean;
  allowDownload?: boolean;
  maxFiles?: number;
  acceptedTypes?: string[];
  maxFileSize?: number; // in bytes

  // React event handlers
  onFileAdd?: (files: FileList) => void;
  onFileRemove?: (fileId: string) => void;
  onFileDownload?: (fileId: string) => void;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  onUploadProgress?: (fileId: string, progress: number) => void;
  onUploadError?: (fileId: string, error: string) => void;

  // Additional props
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

// Create factory component
const FactoryFileList = createFactoryComponent<FileListProps>(
  'FileList',
  'FileList'
);

// Enhanced FileList component
export const FileList: React.FC<FileListProps> = React.memo(({
  files = [],
  allowUpload = true,
  allowDelete = true,
  allowDownload = true,
  maxFiles = 10,
  acceptedTypes = ['*'],
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  onFileAdd,
  onFileRemove,
  onFileDownload,
  onDragOver,
  onDragLeave,
  onDrop,
  onUploadProgress,
  onUploadError,
  className,
  style,
  'data-testid': testId,
  ...otherProps
}) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());

  // Memoized computed values
  const fileListId = useMemo(() => `file-list-${Math.random().toString(36).substr(2, 9)}`, []);
  const canUpload = useMemo(() =>
    allowUpload && files.length < maxFiles,
    [allowUpload, files.length, maxFiles]
  );

  const acceptedTypesString = useMemo(() =>
    acceptedTypes.join(', '),
    [acceptedTypes]
  );

  // File validation
  const validateFile = useCallback((file: File): string | null => {
    if (file.size > maxFileSize) {
      return `File size exceeds ${Math.round(maxFileSize / 1024 / 1024)}MB limit`;
    }

    if (!acceptedTypes.includes('*') && !acceptedTypes.some(type =>
      file.type.match(type.replace('*', '.*'))
    )) {
      return `File type not allowed. Accepted: ${acceptedTypesString}`;
    }

    return null;
  }, [maxFileSize, acceptedTypes, acceptedTypesString]);

  // Enhanced drag handlers
  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
    onDragOver?.(event);
  }, [onDragOver]);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
    onDragLeave?.(event);
  }, [onDragLeave]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileAdd(droppedFiles);
    }

    onDrop?.(event);
  }, [onDrop]);

  // File handling
  const handleFileAdd = useCallback((fileList: FileList) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(fileList).forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      dispatch(uiActions.addNotification({
        type: 'error',
        title: 'File Upload Error',
        message: errors.join('\n'),
        autoClose: false
      }));
    }

    if (validFiles.length > 0) {
      // Create FileList from valid files
      // Use a fallback for environments where DataTransfer is not available (like jsdom)
      let fileList: FileList;
      if (typeof DataTransfer !== 'undefined') {
        const dt = new DataTransfer();
        validFiles.forEach(file => dt.items.add(file));
        fileList = dt.files;
      } else {
        // Fallback for test environments
        fileList = {
          0: validFiles[0],
          length: validFiles.length,
          item: (index: number) => validFiles[index] || null
        } as unknown as FileList;
      }
      onFileAdd?.(fileList);

      // Show success notification
      dispatch(uiActions.addNotification({
        type: 'success',
        title: 'Files Added',
        message: `${validFiles.length} file(s) ready for upload`,
        autoClose: true,
        duration: 3000
      }));
    }
  }, [validateFile, onFileAdd, dispatch]);

  // File handling
  const handleFileRemove = useCallback((fileId: string) => {
    onFileRemove?.(fileId);

    dispatch(uiActions.addNotification({
      type: 'info',
      title: 'File Removed',
      message: 'File has been removed from the list',
      autoClose: true,
      duration: 2000
    }));
  }, [onFileRemove, dispatch]);

  const handleFileDownload = useCallback((fileId: string) => {
    onFileDownload?.(fileId);

    dispatch(uiActions.addNotification({
      type: 'info',
      title: 'Download Started',
      message: 'File download has been initiated',
      autoClose: true,
      duration: 2000
    }));
  }, [onFileDownload, dispatch]);

  // Factory event handler
  const handleFactoryEvent = useCallback((eventData: ComponentEventData) => {
    switch (eventData.type) {
      case 'file-add':
        if (onFileAdd) onFileAdd(eventData.data as FileList);
        break;
      case 'file-remove':
        if (onFileRemove) onFileRemove(eventData.data as string);
        break;
      case 'file-download':
        if (onFileDownload) onFileDownload(eventData.data as string);
        break;
    }
  }, [onFileAdd, onFileRemove, onFileDownload]);

  // Get file icon based on type
  const getFileIcon = useCallback((fileName: string, fileType: string) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
    if (fileType.includes('text')) return '📝';
    return '📄';
  }, []);

  // Format file size
  const formatFileSize = useCallback((bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  // Render file items
  const renderFiles = useMemo(() => {
    if (!files.length) return null;

    return (
      <FileGrid>
        {files.map((file) => (
          <FileItem
            key={file.id}
            isUploading={uploadingFiles.has(file.id)}
          >
            <FileIcon>{getFileIcon(file.name, file.type)}</FileIcon>
            <FileName title={file.name}>{file.name}</FileName>
            <FileSize>{formatFileSize(file.size)}</FileSize>

            {file.uploadProgress !== undefined && (
              <ProgressBar progress={file.uploadProgress} />
            )}

            <FileActions>
              {allowDownload && file.url && (
                <ActionButton
                  onClick={() => handleFileDownload(file.id)}
                  title="Download file"
                  aria-label={`Download ${file.name}`}
                >
                  ⬇️
                </ActionButton>
              )}
              {allowDelete && (
                <ActionButton
                  onClick={() => handleFileRemove(file.id)}
                  title="Remove file"
                  aria-label={`Remove ${file.name}`}
                >
                  🗑️
                </ActionButton>
              )}
            </FileActions>
          </FileItem>
        ))}
      </FileGrid>
    );
  }, [files, uploadingFiles, theme, allowDownload, allowDelete, getFileIcon, formatFileSize, handleFileDownload, handleFileRemove]);

  return (
    <FileListContainer
      isDragOver={isDragOver}
      className={className}
      style={style}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="region"
      aria-label="File upload area"
      data-testid={testId}
      data-can-upload={canUpload}
    >
      {canUpload ? (
        <>
          <UploadIcon>📁</UploadIcon>
          <UploadText>
            {isDragOver ? 'Drop files here' : 'Drag & drop files here'}
          </UploadText>
          <UploadSubtext>
            or click to browse • Max {maxFiles} files • {acceptedTypesString}
          </UploadSubtext>
        </>
      ) : (
        <>
          <UploadIcon>📁</UploadIcon>
          <UploadText>Maximum files reached</UploadText>
          <UploadSubtext>
            Remove some files to upload more
          </UploadSubtext>
        </>
      )}

      {renderFiles}

      {/* Factory bridge integration */}
      <FactoryFileList
        config={{
          files,
          allowUpload,
          allowDelete,
          allowDownload,
          maxFiles,
          acceptedTypes,
          ...otherProps
        }}
        onEvent={handleFactoryEvent}
        componentType="CardFactory"
        style={{ display: 'none' }} // Hide factory component, use our styled wrapper
      />
    </FileListContainer>
  );
});

FileList.displayName = 'FileList';

export default FileList;
