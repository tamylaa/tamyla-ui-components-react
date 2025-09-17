/**
 * Reward System Component - React wrapper for RewardSystem organism
 * Provides gamification with achievements, progress tracking, and notifications
 */

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import logger from '../../utils/logger';
// Dynamic import to avoid SSR issues
// import { RewardSystem } from '@tamyla/ui-components';

// Interface for RewardSystem configuration
interface RewardSystemConfig {
  preset?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  autoInitialize?: boolean;
  enableAchievements?: boolean;
  enableProgress?: boolean;
  enableNotifications?: boolean;
  enableXP?: boolean;
  enableLeveling?: boolean;
}

// Interface for RewardSystem
interface RewardSystemInstance {
  initialize(): void;
  destroy(): void;
  mount(container: HTMLElement): void;
  on(event: string, handler: (data: Record<string, unknown>) => void): void;
  addXP(amount: number): void;
  unlockAchievement(id: string): void;
  updateProgress(metric: string, value: number): void;
  trackAction(action: string, data?: Record<string, unknown>): void;
  showNotification(message: string, type?: string): void;
  resetProgress(): void;
  getCurrentXP(): number;
  getCurrentLevel(): number;
  getAchievements(): Array<{ id: string; name: string; description: string; unlocked: boolean }>;
  getProgress(): Record<string, number>;
}

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
  onXPAwarded?: (data: { amount: number; total: number; source: string }) => void;
  onLevelUp?: (data: { newLevel: number; previousLevel: number; xpRequired: number }) => void;
  onAchievementEarned?: (data: { achievementId: string; name: string; description: string }) => void;
  onProgressUpdated?: (data: { metric: string; value: number; previousValue: number }) => void;
  onActionTracked?: (data: { action: string; data?: Record<string, string | number | boolean> }) => void;

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
  const rewardSystemRef = useRef<RewardSystemInstance | null>(null);

  // State for fallback display
  const [showFallback, setShowFallback] = React.useState(false);
  const [fallbackMessage, setFallbackMessage] = React.useState('Loading rewards and achievements...');

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
        rewardSystemRef.current.trackAction(action, data as Record<string, unknown>);
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
        // Use string concatenation to avoid TypeScript compile-time resolution
        const moduleName = '@tamyla/' + 'ui-components';
        // Handle missing peer dependency gracefully
        let uiComponents: { RewardSystem?: new (config: RewardSystemConfig) => RewardSystemInstance } | null = null;
        try {
          uiComponents = await import(/* webpackIgnore: true */ moduleName);
        } catch (importError) {
          logger.warn('Peer dependency @tamyla/ui-components not available:', importError, 'Reward');
        }

        if (uiComponents?.RewardSystem) {
          // Create RewardSystem instance with proper type handling
          rewardSystemRef.current = new uiComponents.RewardSystem({
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
          if (rewardSystemRef.current && containerRef.current) {
            rewardSystemRef.current.mount(containerRef.current);

            // Set up event listeners
            if (onInitialized) {
              rewardSystemRef.current.on('initialized', onInitialized);
            }
            if (onXPAwarded) {
              rewardSystemRef.current.on('xpAwarded', onXPAwarded as (data: Record<string, unknown>) => void);
            }
            if (onLevelUp) {
              rewardSystemRef.current.on('levelUp', onLevelUp as (data: Record<string, unknown>) => void);
            }
            if (onAchievementEarned) {
              rewardSystemRef.current.on('achievementEarned', onAchievementEarned as (data: Record<string, unknown>) => void);
            }
            if (onProgressUpdated) {
              rewardSystemRef.current.on('progressUpdated', onProgressUpdated as (data: Record<string, unknown>) => void);
            }
            if (onActionTracked) {
              rewardSystemRef.current.on('actionTracked', onActionTracked as (data: Record<string, unknown>) => void);
            }

            // Auto-initialize if enabled
            if (autoInitialize) {
              rewardSystemRef.current.initialize();
            }
          }
        } else {
          // RewardSystem not available, create fallback
          setShowFallback(true);
          setFallbackMessage('Reward system will be available when @tamyla/ui-components is installed');
        }
      } catch (error) {
        logger.warn('RewardSystem could not be loaded, using fallback:', error, 'Reward');

        // Create fallback display
        setShowFallback(true);
        setFallbackMessage('Loading rewards and achievements...');
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
    >
      {showFallback && (
        <div
          className="tamyla-reward-fallback"
          style={{
            padding: '1rem',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            background: '#f8f9fa',
            textAlign: 'center',
            color: '#666',
          }}
        >
          <h3>Reward System</h3>
          <p>{fallbackMessage}</p>
        </div>
      )}
    </div>
  );
});

Reward.displayName = 'Reward';

export default Reward;
