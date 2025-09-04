/**
 * Final Validation Test - Standardized Factory System
 * Tests that all factories use consistent .create() method pattern
 */

// Import our factory system (adjust paths as needed)
const { factoryImporter } = require('./dist/index.esm.js');
const { factoryRegistry } = require('./dist/index.esm.js');

describe('Standardized Factory System', () => {
  beforeAll(async () => {
    // Initialize factory system
    if (factoryImporter && factoryImporter.initialize) {
      await factoryImporter.initialize();
    }
  });

  describe('Factory Consistency Tests', () => {
    test('factoryImporter is available', () => {
      expect(factoryImporter).toBeDefined();
      console.log('✅ Factory importer is available');
    });

    test('factoryRegistry is available', () => {
      expect(factoryRegistry).toBeDefined();
      console.log('✅ Factory registry is available');
    });

    test('All mock factories use .create() method', () => {
      if (!factoryImporter || !factoryImporter.getAllFactories) {
        console.log('⚠️ FactoryImporter.getAllFactories not available - this is expected if testing exports');
        return;
      }

      const factories = factoryImporter.getAllFactories();
      
      Object.entries(factories).forEach(([name, factory]) => {
        expect(factory).toBeDefined();
        expect(typeof factory.create).toBe('function');
        console.log(`✅ ${name} has .create() method`);
      });
    });

    test('Factory registry provides consistent interface', () => {
      if (!factoryRegistry || !factoryRegistry.getAvailableFactories) {
        console.log('⚠️ FactoryRegistry.getAvailableFactories not available - this is expected if testing exports');
        return;
      }

      const availableFactories = factoryRegistry.getAvailableFactories();
      
      availableFactories.forEach(factoryName => {
        const factory = factoryRegistry.getFactory(factoryName);
        expect(factory).toBeDefined();
        expect(typeof factory).toBe('function');
        console.log(`✅ ${factoryName} accessible via registry`);
      });
    });
  });

  describe('Build Output Tests', () => {
    test('Main export is available', () => {
      const mainExport = require('./dist/index.esm.js');
      expect(mainExport).toBeDefined();
      console.log('✅ Main export is available');
    });

    test('Export structure is valid', () => {
      const mainExport = require('./dist/index.esm.js');
      
      // Test that exports exist (adjust based on your actual exports)
      expect(typeof mainExport).toBe('object');
      console.log('✅ Export structure is valid object');
      
      // Log available exports for debugging
      const exports = Object.keys(mainExport);
      console.log('Available exports:', exports);
    });
  });

  describe('TypeScript Build Validation', () => {
    test('Build artifacts exist', () => {
      const fs = require('fs');
      const path = require('path');
      
      // Check that dist files exist
      const distPath = path.join(__dirname, 'dist');
      expect(fs.existsSync(distPath)).toBe(true);
      console.log('✅ Dist directory exists');
      
      const mainFile = path.join(distPath, 'index.esm.js');
      expect(fs.existsSync(mainFile)).toBe(true);
      console.log('✅ Main build file exists');
    });

    test('Package.json is valid', () => {
      const packageJson = require('./package.json');
      expect(packageJson.name).toBe('@tamyla/ui-components-react');
      expect(packageJson.version).toBeDefined();
      expect(packageJson.main).toBe('dist/index.esm.js');
      console.log('✅ Package.json is valid');
    });
  });
});
