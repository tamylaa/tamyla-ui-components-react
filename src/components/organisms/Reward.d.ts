/**
 * Reward System Component - React wrapper for RewardSystem organism
 * Provides gamification with achievements, progress tracking, and notifications
 */
import React from 'react';
export interface RewardProps {
    preset?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    autoInitialize?: boolean;
    enableAchievements?: boolean;
    enableProgress?: boolean;
    enableNotifications?: boolean;
    enableXP?: boolean;
    enableLeveling?: boolean;
    onInitialized?: () => void;
    onXPAwarded?: (data: any) => void;
    onLevelUp?: (data: any) => void;
    onAchievementEarned?: (data: any) => void;
    onProgressUpdated?: (data: any) => void;
    onActionTracked?: (data: any) => void;
    className?: string;
    style?: React.CSSProperties;
}
export interface RewardHandle {
    initialize: () => Promise<void>;
    destroy: () => void;
    trackAction: (action: string, metadata?: any) => void;
    awardXP: (points: number, source?: string) => number;
    showNotification: (config: any) => any;
    createProgress: (containerId: string, config: any) => any;
    updateProgress: (progressId: string, current: number, total?: number) => boolean;
    createAchievementBadge: (containerId: string, achievementId: string) => any;
    getUserStats: () => any;
    reset: () => void;
    getRewardSystem: () => any;
}
export declare const Reward: React.ForwardRefExoticComponent<RewardProps & React.RefAttributes<RewardHandle>>;
export default Reward;
//# sourceMappingURL=Reward.d.ts.map