/**
 * Reward System Component - React wrapper for RewardSystem organism
 * Provides gamification with achievements, progress tracking, and notifications
 */

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
// Dynamic import to avoid SSR issues
// import { RewardSystem } from '@tamyla/ui-components';

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
  onXPAwarded?: (data: unknown) => void;
  onLevelUp?: (data: unknown) => void;
  onAchievementEarned?: (data: unknown) => void;
  onProgressUpdated?: (data: unknown) => void;
  onActionTracked?: (data: unknown) => void;

  // Container options
  className?: string;
  style?: React.CSSProperties;
}

export interface RewardHandle {
  // Core system methods
  initialize: () => Promise<void>;
  destroy: () => void;

  // Data access methods
  getRewardSystem: () => unknown;
  getCurrentXP: () => number;
  getCurrentLevel: () => number;
  getAchievements: () => unknown[];
  getProgress: () => unknown;

  // Action methods
  addXP: (amount: number) => void;
  unlockAchievement: (id: string) => void;
  updateProgress: (metric: string, value: number) => void;
  trackAction: (action: string, data?: unknown) => void;
  showNotification: (message: string, type?: string) => void;
  resetProgress: () => void;

  // DOM access
  getElement: () => HTMLDivElement | null;
}

const Reward = forwardRef<RewardHandle, RewardProps>((props, ref) => {
  const {
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
    ...otherProps
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const rewardSystemRef = useRef<any>(null);

  // Serialize otherProps for dependency array
  const otherPropsKey = JSON.stringify(otherProps);

  useImperativeHandle(ref, () => ({
    // Core system methods
    initialize: async () => {
      if (rewardSystemRef.current) {
        await rewardSystemRef.current.initialize();
      }
    },

    destroy: () => {
      if (rewardSystemRef.current) {
        rewardSystemRef.current.destroy();
        rewardSystemRef.current = null;
      }
    },

    // Data access methods
    getRewardSystem: () => rewardSystemRef.current,
    getCurrentXP: () => rewardSystemRef.current?.getCurrentXP() || 0,
    getCurrentLevel: () => rewardSystemRef.current?.getCurrentLevel() || 1,
    getAchievements: () => rewardSystemRef.current?.getAchievements() || [],
    getProgress: () => rewardSystemRef.current?.getProgress() || {},

    // Action methods
    addXP: (amount: number) => {
      if (rewardSystemRef.current) {
        rewardSystemRef.current.addXP(amount);
      }
    },

    unlockAchievement: (id: string) => {
      if (rewardSystemRef.current) {
        rewardSystemRef.current.unlockAchievement(id);
      }
    },

    updateProgress: (metric: string, value: number) => {
      if (rewardSystemRef.current) {
        rewardSystemRef.current.updateProgress(metric, value);
      }
    },

    trackAction: (action: string, data?: unknown) => {
      if (rewardSystemRef.current) {
        rewardSystemRef.current.trackAction(action, data);
      }
    },

    showNotification: (message: string, type?: string) => {
      if (rewardSystemRef.current) {
        rewardSystemRef.current.showNotification(message, type);
      }
    },

    resetProgress: () => {
      if (rewardSystemRef.current) {
        rewardSystemRef.current.resetProgress();
      }
    },

    // DOM access
    getElement: () => containerRef.current
  }), []);

  useEffect(() => {
    const initializeReward = async () => {
      if (!containerRef.current) return;

      try {
        // Dynamic import to avoid SSR issues
        const { RewardSystem } = await import('@tamyla/ui-components');
        
        // Create RewardSystem instance with proper type handling
        rewardSystemRef.current = new (RewardSystem as any)({
          preset,
          autoInitialize,
          enableAchievements,
          enableProgress,
          enableNotifications,
          enableXP,
          enableLeveling,
          ...otherProps
        });

        // Mount to the container
        rewardSystemRef.current.mount(containerRef.current);

        // Set up event listeners
        if (onInitialized) {
          rewardSystemRef.current.on('initialized', onInitialized);
        }
        if (onXPAwarded) {
          rewardSystemRef.current.on('xpAwarded', onXPAwarded);
        }
        if (onLevelUp) {
          rewardSystemRef.current.on('levelUp', onLevelUp);
        }
        if (onAchievementEarned) {
          rewardSystemRef.current.on('achievementEarned', onAchievementEarned);
        }
        if (onProgressUpdated) {
          rewardSystemRef.current.on('progressUpdated', onProgressUpdated);
        }
        if (onActionTracked) {
          rewardSystemRef.current.on('actionTracked', onActionTracked);
        }

        // Auto-initialize if enabled
        if (autoInitialize) {
          rewardSystemRef.current.initialize();
        }
      } catch (error) {
        console.warn('RewardSystem could not be loaded, using fallback:', error);
        
        // Create fallback display
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="tamyla-reward-fallback" style="
              padding: 1rem;
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              background: #f8f9fa;
              text-align: center;
              color: #666;
            ">
              <h3>Reward System</h3>
              <p>Loading rewards and achievements...</p>
            </div>
          `;
        }
      }
    };

    initializeReward();

    // Cleanup function
    return () => {
      if (rewardSystemRef.current) {
        rewardSystemRef.current.destroy();
        rewardSystemRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    preset,
    autoInitialize,
    enableAchievements,
    enableProgress,
    enableNotifications,
    enableXP,
    enableLeveling,
    onInitialized,
    onXPAwarded,
    onLevelUp,
    onAchievementEarned,
    onProgressUpdated,
    onActionTracked,
    otherPropsKey
  ]);

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
