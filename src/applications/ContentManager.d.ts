/**
 * Content Manager Application - React wrapper for ui-components ContentManagerApplicationFactory
 */
/// <reference types="react" />
interface ContentManagerProps {
    apiBase?: string;
    selectionMode?: boolean;
    showUpload?: boolean;
    allowedFileTypes?: string[];
    maxFileSize?: number;
    showPreview?: boolean;
    enableBulkActions?: boolean;
    onContentUploaded?: (content: any) => void;
    onContentSelected?: (content: any) => void;
    onContentDeleted?: (contentId: string) => void;
    onContentUpdated?: (content: any) => void;
}
export declare const ContentManager: import("react").FC<ContentManagerProps>;
export default ContentManager;
//# sourceMappingURL=ContentManager.d.ts.map