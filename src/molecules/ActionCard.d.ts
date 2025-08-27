/**
 * ActionCard Componeexport const ActionCard = createFactoryComponent<ActionCardProps>(
  'ActionCard',
  'ActionCard'
);act wrapper for ui-components ActionCardFactory
 */
/// <reference types="react" />
interface ActionCardProps {
    title?: string;
    description?: string;
    icon?: string;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    interactive?: boolean;
    elevation?: boolean;
    disabled?: boolean;
    loading?: boolean;
    points?: number;
    level?: string;
    progress?: number;
    badge?: string;
    onClick?: (event: MouseEvent) => void;
    onHover?: (event: MouseEvent) => void;
}
export declare const ActionCard: import("react").FC<ActionCardProps>;
export default ActionCard;
//# sourceMappingURL=ActionCard.d.ts.map