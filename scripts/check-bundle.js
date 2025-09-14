import fs from 'fs';
import path from 'path';

/**
 * Bundle Certification Script
 * Validates that styled-components and other peer dependencies are properly externalized
 * to prevent runtime errors like "z.div is not a function"
 */

const PEER_DEPENDENCIES = ['styled-components', 'react', 'react-dom'];
const MAX_BUNDLE_SIZE_KB = 300; // Alert if bundle exceeds this size
const MIN_EXTERNAL_IMPORTS = 3; // Should have at least react, react-dom, styled-components

function validateBundle() {
  try {
    const bundlePath = path.resolve('dist/index.esm.js');
    
    if (!fs.existsSync(bundlePath)) {
      console.error('❌ Bundle not found. Run "npm run build" first.');
      process.exit(1);
    }

    const content = fs.readFileSync(bundlePath, 'utf8');
    const bundleSizeKB = (content.length / 1024);
    
    console.log('🔍 Bundle Certification Report');
    console.log('================================');
    console.log(`📦 Bundle size: ${bundleSizeKB.toFixed(1)} KB`);
    
    // Check bundle size
    if (bundleSizeKB > MAX_BUNDLE_SIZE_KB) {
      console.log(`⚠️  Warning: Bundle size exceeds ${MAX_BUNDLE_SIZE_KB}KB threshold`);
    } else {
      console.log('✅ Bundle size is within acceptable limits');
    }
    
    // Check peer dependencies externalization
    const externalizedDeps = [];
    const bundledDeps = [];
    
    PEER_DEPENDENCIES.forEach(dep => {
      const hasImport = content.includes(`from"${dep}"`) || 
                       content.includes(`from "${dep}"`) || 
                       content.includes(`from'${dep}'`) ||
                       content.includes(`from '${dep}'`);
      
      const mentions = (content.match(new RegExp(dep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      
      if (hasImport && mentions <= 5) {
        externalizedDeps.push(dep);
        console.log(`✅ ${dep}: Properly externalized (${mentions} mentions)`);
      } else if (mentions > 10) {
        bundledDeps.push(dep);
        console.log(`❌ ${dep}: Appears to be bundled (${mentions} mentions)`);
      } else {
        console.log(`⚠️  ${dep}: Unclear status (${mentions} mentions)`);
      }
    });
    
    // Validation results
    console.log('\n📋 Certification Summary');
    console.log('========================');
    
    if (bundledDeps.length > 0) {
      console.log('❌ CERTIFICATION FAILED');
      console.log(`Bundled dependencies found: ${bundledDeps.join(', ')}`);
      console.log('These should be externalized to prevent runtime errors.');
      process.exit(1);
    }
    
    if (externalizedDeps.length < MIN_EXTERNAL_IMPORTS) {
      console.log('⚠️  Warning: Fewer external imports than expected');
    }
    
    console.log('✅ CERTIFICATION PASSED');
    console.log(`External dependencies: ${externalizedDeps.join(', ')}`);
    console.log('Bundle is ready for production use.');
    
    // Show import sample for verification
    const firstLine = content.split('\n')[0];
    if (firstLine.length > 100) {
      console.log(`\n📄 Import sample: ${firstLine.substring(0, 100)}...`);
    }
    
  } catch (error) {
    console.error('❌ Bundle certification failed:', error.message);
    process.exit(1);
  }
}

// Run validation
validateBundle();
