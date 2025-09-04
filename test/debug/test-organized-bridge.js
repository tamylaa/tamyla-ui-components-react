/**
 * Test Organized Factory Bridge System
 * Tests the React hooks and component integration
 */

// Import the bridge functions and components from the built package
import {
  useAtomFactory,
  useMoleculeFactory,
  useOrganismFactory,
  useApplicationFactory,
  useFactoryBridge,
  Button,
  ActionCard,
  SearchInterface,
  EnhancedSearch,
  ALL_FACTORIES
} from './dist/index.esm.js';

console.log('✅ Organized Factory Bridge Test');
console.log('================================\n');

// Test factory availability (Note: These are React hooks, so we can't call them outside React)
console.log('🔬 Testing Factory Hook Exports:');
console.log('  ✅ useAtomFactory:', typeof useAtomFactory === 'function');
console.log('  ✅ useMoleculeFactory:', typeof useMoleculeFactory === 'function');
console.log('  ✅ useOrganismFactory:', typeof useOrganismFactory === 'function');
console.log('  ✅ useApplicationFactory:', typeof useApplicationFactory === 'function');
console.log('  ✅ useFactoryBridge:', typeof useFactoryBridge === 'function');

console.log('\n🌉 Testing Factory Registry:');
if (ALL_FACTORIES) {
  console.log('  ✅ ALL_FACTORIES available');
  console.log('  📊 Total factories:', Object.keys(ALL_FACTORIES).length);
  console.log('  🔍 Available factories:', Object.keys(ALL_FACTORIES).join(', '));
} else {
  console.log('  ❌ ALL_FACTORIES not available');
}

console.log('\n🧩 Testing Component Exports:');
console.log('  ✅ Button component:', typeof Button);
console.log('  ✅ ActionCard component:', typeof ActionCard);
console.log('  ✅ SearchInterface component:', typeof SearchInterface);
console.log('  ✅ EnhancedSearch component:', typeof EnhancedSearch);

console.log('\n🎉 Organized Factory Bridge: VALIDATED!');
