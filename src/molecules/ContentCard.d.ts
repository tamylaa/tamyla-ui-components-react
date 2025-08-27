/**
 * ContentCard Component - React wrapper for ContentCardFactory
 */
/// <reference types="react" />
interface ContentCardProps {
    title?: string;
    content?: string;
    image?: string;
    tags?: string[];
    author?: string;
    date?: string;
    readTime?: string;
    variant?: 'default' | 'featured' | 'compact';
    size?: 'sm' | 'md' | 'lg';
    interactive?: boolean;
    onClick?: () => void;
    className?: string;
}
declare const ContentCard: import("react").FC<ContentCardProps>;
export default ContentCard;
//# sourceMappingURL=ContentCard.d.ts.map