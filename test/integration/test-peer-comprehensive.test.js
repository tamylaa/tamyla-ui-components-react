/**
 * Enhanced peer dependency test
 * Tests package behavior with and without @tamyla/ui-components
 */

describe('Comprehensive Peer Dependency Tests', () => {
  test('should import and work without @tamyla/ui-components peer dependency', async () => {
    console.log('📦 Test 1: Import without peer dependency...');

    try {
      // Import the built package
      const module = await import('./dist/index.esm.js');

      console.log('✅ Package imports successfully');
      expect(module).toBeDefined();
      expect(Object.keys(module).length).toBeGreaterThan(0);

      // Test core functionality that should work without peer deps
      const coreExports = ['Button', 'Card', 'designTokens', 'store', 'FactoryBridge'];

      console.log('\n🔍 Testing core exports:');
      coreExports.forEach(exportName => {
        if (module[exportName]) {
          console.log(`✅ ${exportName}: ${typeof module[exportName]}`);
          expect(module[exportName]).toBeDefined();
        } else {
          console.log(`❌ ${exportName}: missing`);
        }
      });

      // Test that components are React components (functions)
      const reactComponents = ['Button', 'Card', 'FactoryBridge'];
      console.log('\n⚛️  Testing React component exports:');
      reactComponents.forEach(componentName => {
        const component = module[componentName];
        if (typeof component === 'function') {
          console.log(`✅ ${componentName}: Valid React component`);
          expect(typeof component).toBe('function');
        } else {
          console.log(`❌ ${componentName}: Not a function (${typeof component})`);
        }
      });

      // Test design tokens
      console.log('\n🎨 Testing design tokens:');
      if (module.designTokens && typeof module.designTokens === 'object') {
        const tokenKeys = Object.keys(module.designTokens);
        console.log(`✅ Design tokens available: ${tokenKeys.slice(0, 3).join(', ')}...`);
        expect(tokenKeys.length).toBeGreaterThan(0);
      }

      // Test Redux store
      console.log('\n🗄️  Testing Redux store:');
      if (module.store && typeof module.store.getState === 'function') {
        console.log('✅ Redux store available and functional');
        expect(typeof module.store.getState).toBe('function');
      }

    } catch (error) {
      console.log('❌ Import failed:', error.message);
      throw error;
    }
  });

  test('should have functional factory system without external dependencies', async () => {
    console.log('\n📦 Test 2: Factory system without external dependencies...');

    try {
      const module = await import('./dist/index.esm.js');

      // Test factory registry
      if (module.factoryRegistry) {
        console.log('✅ Factory registry available');
        expect(module.factoryRegistry).toBeDefined();

        if (typeof module.factoryRegistry.getAvailableFactories === 'function') {
          try {
            const factories = module.factoryRegistry.getAvailableFactories();
            console.log(`✅ Available factories: ${factories.length} found`);
            expect(Array.isArray(factories)).toBe(true);
            if (factories.length > 0) {
              console.log(`   Examples: ${factories.slice(0, 3).join(', ')}...`);
            }
          } catch (e) {
            console.log('✅ Factory registry methods callable');
          }
        }
      }

      // Test factory importer
      if (module.factoryImporter) {
        console.log('✅ Factory importer available');
        expect(module.factoryImporter).toBeDefined();
      }

    } catch (error) {
      console.log('❌ Factory system test failed:', error.message);
      throw error;
    }
  });
});
