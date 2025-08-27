/**
 * Card Component - React wrapper for CardFactory
 */
/// <reference types="react" />
interface CardProps {
    title?: string;
    content?: string;
    variant?: 'default' | 'elevated' | 'outlined';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
declare const Card: import("react").FC<CardProps>;
export default Card;
//# sourceMappingURL=Card.d.ts.map