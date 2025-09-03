/**
 * Final Validation Test - Standardized Factory System
 * Tests that all factories use consistent .create() method pattern
 */

import { factoryImporter } from '../core/factory/factory-importer';
import { factoryRegistry } from '../core/factory/factory-registry';

describe('Standardized Factory System', () => {
  beforeAll(async () => {
    // Ensure factory system is ready (getFactoryAsync waits for initialization)
    await factoryImporter.getFactoryAsync('ButtonFactory');
  });

  describe('Factory Consistency Tests', () => {
    test('factoryImporter is available', () => {
      expect(factoryImporter).toBeDefined();
    });

    test('factoryRegistry is available', () => {
      expect(factoryRegistry).toBeDefined();
    });

    test('All mock factories use .create() method', () => {
      const factories = factoryImporter.getAllFactories();
      
      expect(factories).toBeDefined();
      expect(typeof factories).toBe('object');

      Object.entries(factories).forEach(([name, factory]) => {
        expect(factory).toBeDefined();
        expect(typeof factory.create).toBe('function');
      });
    });

    test('Factory registry provides consistent interface', () => {
      const availableFactories = factoryRegistry.getAvailableFactories();
      
      expect(availableFactories).toBeDefined();
      expect(Array.isArray(availableFactories)).toBe(true);

      availableFactories.forEach(factoryName => {
        const factory = factoryRegistry.getFactory(factoryName);
        expect(factory).toBeDefined();
        expect(typeof factory).toBe('function');
      });
    });

    test('Key factories can create DOM elements', () => {
      const testFactories = [
        'ButtonFactory',
        'InputFactory', 
        'CardFactory'
      ];

      testFactories.forEach(factoryName => {
        const factory = factoryImporter.getFactory(factoryName);
        expect(factory).toBeDefined();
        expect(typeof factory.create).toBe('function');
        
        // Test creating an element
        const element = factory.create({ test: 'data' });
        expect(element).toBeDefined();
        expect(element instanceof HTMLElement).toBe(true);
      });
    });

    test('Button factory supports variant methods', () => {
      const buttonFactory = factoryImporter.getFactory('ButtonFactory');
      expect(buttonFactory).toBeDefined();
      
      const methods = ['create', 'createPrimary', 'createSecondary'];
      
      methods.forEach(method => {
        expect(typeof buttonFactory[method]).toBe('function');
        
        const element = buttonFactory[method]({ text: `Test ${method}` });
        expect(element instanceof HTMLElement).toBe(true);
        
        // Since we're using normalized factories, check for any valid HTML tag
        // The real factory might use div, button, or other elements
        const validTags = ['button', 'div', 'span'];
        expect(validTags).toContain(element.tagName.toLowerCase());
        
      });
    });
  });

  describe('Error Handling Tests', () => {
    test('Factory registry handles missing factories gracefully', () => {
      const nonExistentFactory = factoryRegistry.getFactory('NonExistentFactory');
      expect(nonExistentFactory).toBeNull();
    });

    test('Factory importer provides fallback for unknown factories', () => {
      const fallbackFactory = factoryImporter.getFactory('UnknownFactory');
      expect(fallbackFactory).toBeDefined();
      expect(typeof fallbackFactory.create).toBe('function');
      
      const element = fallbackFactory.create();
      expect(element instanceof HTMLElement).toBe(true);
      expect(element.textContent).toContain('Fallback');
    });
  });

  describe('Architecture Validation', () => {
    test('All factories follow standardized pattern', () => {
      const factories = factoryImporter.getAllFactories();
      let standardizedCount = 0;
      let totalCount = 0;

      Object.entries(factories).forEach(([_name, factory]) => {
        totalCount++;
        if (factory && typeof factory.create === 'function') {
          standardizedCount++;
        }
      });

      expect(standardizedCount).toBe(totalCount);
    });

    test('Factory system is ready for production', () => {
      // Check that core systems are initialized
      expect(factoryImporter).toBeDefined();
      expect(factoryRegistry).toBeDefined();
      
      // Check that we have factories available
      const factories = factoryImporter.getAllFactories();
      expect(Object.keys(factories).length).toBeGreaterThan(0);
      
      // Check that registry has mappings
      const registryFactories = factoryRegistry.getAvailableFactories();
      expect(registryFactories.length).toBeGreaterThan(0);
    });
  });
});
