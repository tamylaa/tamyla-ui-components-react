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

// Mock factory classes with setSharedFoundation method
class MockFactory {
  constructor() {
    this.tokens = {};
    this.utilities = {};
  }

  setSharedFoundation(tokens, utilities) {
    this.tokens = tokens;
    this.utilities = utilities;
    return this;
  }

  create() {
    return document.createElement('div');
  }
}

// Factory exports
export const ButtonFactory = MockFactory;
export const InputFactory = MockFactory;
export const CardFactory = MockFactory;
export const StatusIndicatorFactory = MockFactory;

// Molecule factories
export const ActionCardFactory = MockFactory;
export const SearchBarFactory = MockFactory;

// Application-level systems and factories
export const CampaignSelectorSystem = MockFactory;
export const EnhancedSearchApplicationFactory = () => new MockFactory();
export const ContentManagerApplicationFactory = () => new MockFactory();
export const TamylaUISystem = () => new MockFactory();

// Function factory for InputGroup and content components  
export const InputGroupFactory = () => new MockFactory();
export const ContentCardFactory = () => new MockFactory();
export const FileListFactory = () => new MockFactory();
export const AchievementListFactory = () => new MockFactory();

// Legacy function exports
export const createActionCard = () => new MockFactory();
export const createStatusIndicator = () => new MockFactory();
export const createRewardSystem = () => new MockFactory();
export const createButton = () => new MockFactory();
export const createInput = () => new MockFactory();
export const createCard = () => new MockFactory();

// Legacy exports for compatibility
export const ActionCard = RewardSystem;
export const StatusIndicator = RewardSystem;
