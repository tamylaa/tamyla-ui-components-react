/**
 * Mock @tamyla/ui-components for build process
 * This allows the React components to build even when the base package isn't available
 */

// Mock exports that match the expected interface
export const RewardSystem = class MockRewardSystem {
  constructor() {}
  initialize() {}
  addReward() {}
  getRewards() { return []; }
};

export const ButtonFactory = {
  create: () => document.createElement('button')
};

export const CardFactory = {
  create: () => document.createElement('div')
};

export const InputFactory = {
  create: () => document.createElement('input')
};

export const ActionCardFactory = {
  create: () => document.createElement('div')
};

export const ContentCardFactory = {
  create: () => document.createElement('div')
};

export const SearchBarFactory = {
  create: () => document.createElement('div')
};

export const FileListFactory = {
  create: () => document.createElement('div')
};

export const NotificationFactory = {
  create: () => document.createElement('div')
};

export const SearchInterfaceFactory = {
  create: () => document.createElement('div')
};

export const DashboardFactory = {
  create: () => document.createElement('div')
};

// Default export for CJS compatibility
export default {
  RewardSystem,
  ButtonFactory,
  CardFactory,
  InputFactory,
  ActionCardFactory,
  ContentCardFactory,
  SearchBarFactory,
  FileListFactory,
  NotificationFactory,
  SearchInterfaceFactory,
  DashboardFactory
};
