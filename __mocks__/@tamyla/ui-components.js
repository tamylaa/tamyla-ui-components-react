// Mock for @tamyla/ui-components
export const RewardSystem = class {
  constructor(config = {}) {
    this.config = config;
    this.initialized = false;
  }

  initialize() {
    this.initialized = true;
    return Promise.resolve();
  }

  destroy() {
    this.initialized = false;
  }

  trackAction(action, metadata = {}) {
    return { action, metadata, timestamp: Date.now() };
  }

  awardXP(points, source = 'test') {
    return points;
  }

  showNotification(config = {}) {
    return { id: 'mock-notification', config };
  }

  createProgress(containerId, config = {}) {
    return { id: 'mock-progress', containerId, config };
  }

  updateProgress(progressId, current, total) {
    return true;
  }

  createAchievementBadge(containerId, achievementId) {
    return { id: 'mock-badge', containerId, achievementId };
  }

  getUserStats() {
    return {
      level: 1,
      xp: 0,
      achievements: [],
      progress: {}
    };
  }

  reset() {
    this.initialized = false;
  }

  on(event, callback) {
    // Mock event listener
    return this;
  }
};
