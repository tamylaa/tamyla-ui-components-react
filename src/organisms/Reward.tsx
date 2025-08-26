/**
 * Reward System Component - React wrapper for RewardSystem organism
 * Provides gamification with achievements, progress tracking, and notifications
 */

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { RewardSystem } from '@tamyla/ui-components';

export interface RewardProps {
  // Configuration options
  preset?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  autoInitialize?: boolean;
  enableAchievements?: boolean;
  enableProgress?: boolean;
  enableNotifications?: boolean;
  enableXP?: boolean;
  enableLeveling?: boolean;

  // Event handlers
  onInitialized?: () => void;
  onXPAwarded?: (data: any) => void;
  onLevelUp?: (data: any) => void;
  onAchievementEarned?: (data: any) => void;
  onProgressUpdated?: (data: any) => void;
  onActionTracked?: (data: any) => void;

  // Container options
  className?: string;
  style?: React.CSSProperties;
}

export interface RewardHandle {
  // Core system methods
  initialize: () => Promise<void>;
  destroy: () => void;
  
  // User interaction methods
  trackAction: (action: string, metadata?: any) => void;
  awardXP: (points: number, source?: string) => number;
  showNotification: (config: any) => any;
  
  // Progress and achievement methods
  createProgress: (containerId: string, config: any) => any;
  updateProgress: (progressId: string, current: number, total?: number) => boolean;
  createAchievementBadge: (containerId: string, achievementId: string) => any;
  
  // State methods
  getUserStats: () => any;
  reset: () => void;
  
  // Access to underlying system
  getRewardSystem: () => any;
}

export const Reward = forwardRef<RewardHandle, RewardProps>(({
  preset = 'beginner',
  autoInitialize = true,
  enableAchievements = true,
  enableProgress = true,
  enableNotifications = true,
  enableXP = true,
  enableLeveling = true,
  onInitialized,
  onXPAwarded,
  onLevelUp,
  onAchievementEarned,
  onProgressUpdated,
  onActionTracked,
  className,
  style,
  ...props
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rewardSystemRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Create RewardSystem instance
      rewardSystemRef.current = new RewardSystem({
        preset,
        autoInitialize,
        enableAchievements,
        enableProgress,
        enableNotifications,
        enableXP,
        enableLeveling,
        ...props
      });

      // Set up event listeners
      if (onInitialized) {
        rewardSystemRef.current.on('system:initialized', onInitialized);
      }
      if (onXPAwarded) {
        rewardSystemRef.current.on('xp:awarded', onXPAwarded);
      }
      if (onLevelUp) {
        rewardSystemRef.current.on('level:up', onLevelUp);
      }
      if (onAchievementEarned) {
        rewardSystemRef.current.on('achievement:earned', onAchievementEarned);
      }
      if (onProgressUpdated) {
        rewardSystemRef.current.on('progress:updated', onProgressUpdated);
      }
      if (onActionTracked) {
        rewardSystemRef.current.on('action:tracked', onActionTracked);
      }

    } catch (error) {
      console.error('Failed to create Reward system:', error);
    }

    return () => {
      if (rewardSystemRef.current) {
        rewardSystemRef.current.destroy?.();
        rewardSystemRef.current = null;
      }
    };
  }, [preset, autoInitialize, enableAchievements, enableProgress, enableNotifications, 
      enableXP, enableLeveling, onInitialized, onXPAwarded, onLevelUp, 
      onAchievementEarned, onProgressUpdated, onActionTracked]);

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    // Core system methods
    initialize: async () => {
      if (rewardSystemRef.current) {
        return rewardSystemRef.current.initialize();
      }
    },
    destroy: () => {
      if (rewardSystemRef.current) {
        rewardSystemRef.current.destroy();
      }
    },
    
    // User interaction methods
    trackAction: (action: string, metadata?: any) => {
      if (rewardSystemRef.current) {
        rewardSystemRef.current.trackAction(action, metadata);
      }
    },
    awardXP: (points: number, source?: string) => {
      if (rewardSystemRef.current) {
        return rewardSystemRef.current.awardXP(points, source);
      }
      return 0;
    },
    showNotification: (config: any) => {
      if (rewardSystemRef.current) {
        return rewardSystemRef.current.showNotification(config);
      }
      return null;
    },
    
    // Progress and achievement methods
    createProgress: (containerId: string, config: any) => {
      if (rewardSystemRef.current) {
        return rewardSystemRef.current.createProgress(containerId, config);
      }
      return null;
    },
    updateProgress: (progressId: string, current: number, total?: number) => {
      if (rewardSystemRef.current) {
        return rewardSystemRef.current.updateProgress(progressId, current, total);
      }
      return false;
    },
    createAchievementBadge: (containerId: string, achievementId: string) => {
      if (rewardSystemRef.current) {
        return rewardSystemRef.current.createAchievementBadge(containerId, achievementId);
      }
      return null;
    },
    
    // State methods
    getUserStats: () => {
      if (rewardSystemRef.current) {
        return rewardSystemRef.current.getUserStats();
      }
      return {};
    },
    reset: () => {
      if (rewardSystemRef.current) {
        rewardSystemRef.current.reset();
      }
    },
    
    // Access to underlying system
    getRewardSystem: () => rewardSystemRef.current
  }), []);

  return (
    <div 
      ref={containerRef} 
      className={`tmyl-reward-system-container ${className || ''}`}
      style={style}
    />
  );
});

Reward.displayName = 'Reward';

export default Reward;
