/**
 * FileList Component - React wrapper for FileListFactory
 */
/// <reference types="react" />
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
declare const FileList: import("react").FC<FileListProps>;
export default FileList;
//# sourceMappingURL=FileList.d.ts.map