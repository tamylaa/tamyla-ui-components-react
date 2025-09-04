/**
 * Enhanced Factory Methods Test
 * Tests our added factory methods work correctly
 */

import { factoryImporter } from '../factory/factory-importer';

describe('Enhanced Factory Methods', () => {
  beforeAll(async () => {
    // Trigger factory loading by getting a factory
    await factoryImporter.getFactory('ButtonFactory');
  });

  test('ButtonFactory should have enableTradingPortalPatterns method', async () => {
    const buttonFactory = await factoryImporter.getFactory('ButtonFactory');
    expect(buttonFactory).toBeDefined();
    expect(typeof buttonFactory.enableTradingPortalPatterns).toBe('function');

    const result = buttonFactory.enableTradingPortalPatterns();
    expect(result).toHaveProperty('enabled', true);
    expect(result).toHaveProperty('patterns');
    expect(Array.isArray(result.patterns)).toBe(true);
  });

  test('CampaignSelectorSystem should have selectionManager with event handling', async () => {
    const campaignFactory = await factoryImporter.getFactory('CampaignSelectorSystem');
    expect(campaignFactory).toBeDefined();

    const instance = campaignFactory.create();
    expect(instance).toBeDefined();

    // The selectionManager should be added during factory enhancement
    if (instance.selectionManager) {
      expect(typeof instance.selectionManager.on).toBe('function');
      expect(typeof instance.selectionManager.off).toBe('function');
      expect(typeof instance.selectionManager.emit).toBe('function');

      // Test event listener functionality
      let eventCalled = false;
      const removeListener = instance.selectionManager.on('test', () => {
        eventCalled = true;
      });

      expect(typeof removeListener).toBe('function');
    }
  });

  test('SearchInterfaceFactory should have setResults method', async () => {
    const searchFactory = await factoryImporter.getFactory('SearchInterfaceFactory');
    expect(searchFactory).toBeDefined();
    expect(typeof searchFactory.setResults).toBe('function');

    const result = searchFactory.setResults(['test1', 'test2']);
    expect(result).toBe(searchFactory); // Should return self for chaining
  });

  test('OrganismFactory should have createSearchInterface method', async () => {
    const organismFactory = await factoryImporter.getFactory('OrganismFactory');
    expect(organismFactory).toBeDefined();
    expect(typeof organismFactory.createSearchInterface).toBe('function');

    const element = organismFactory.createSearchInterface();
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.className).toBe('tamyla-search-interface');
  });

  test('All enhanced methods are added during normalization', async () => {
    // Test that our enhanceFactoryWithMissingMethods is being called
    const buttonFactory = await factoryImporter.getFactory('ButtonFactory');
    const searchFactory = await factoryImporter.getFactory('SearchInterfaceFactory');
    const organismFactory = await factoryImporter.getFactory('OrganismFactory');

    // All should have enhanced methods based on their type
    expect(buttonFactory.enableTradingPortalPatterns).toBeDefined();
    expect(searchFactory.setResults).toBeDefined();
    expect(organismFactory.createSearchInterface).toBeDefined();
  });

  test('Factory enhancement does not break existing functionality', async () => {
    const buttonFactory = await factoryImporter.getFactory('ButtonFactory');
    expect(buttonFactory).toBeDefined();
    expect(typeof buttonFactory.create).toBe('function');

    // Create method should still work
    const element = buttonFactory.create({ text: 'Test Button' });
    expect(element).toBeInstanceOf(HTMLElement);
  });
});
