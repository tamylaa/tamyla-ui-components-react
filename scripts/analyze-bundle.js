#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes the built bundle to identify optimization opportunities
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUNDLE_PATH = path.join(__dirname, '../dist/index.esm.js');
const MAX_RECOMMENDED_SIZE = 500 * 1024; // 500KB
const WARNING_SIZE = 800 * 1024; // 800KB

function analyzeBundle() {
  console.log('🔍 Bundle Analysis Report');
  console.log('========================');

  if (!fs.existsSync(BUNDLE_PATH)) {
    console.error('❌ Bundle not found. Run npm run build first.');
    process.exit(1);
  }

  const stats = fs.statSync(BUNDLE_PATH);
  const sizeInBytes = stats.size;
  const sizeInKB = (sizeInBytes / 1024).toFixed(2);

  console.log(`📦 Bundle size: ${sizeInKB} KB`);

  // Read bundle content for analysis
  const bundleContent = fs.readFileSync(BUNDLE_PATH, 'utf8');

  // Analyze imports
  const importMatches = bundleContent.match(/import.*from.*['"]([^'"]+)['"]/g) || [];
  const externalDeps = importMatches
    .map(match => match.match(/from.*['"]([^'"]+)['"]/)?.[1])
    .filter(dep => dep && !dep.startsWith('.'))
    .reduce((acc, dep) => {
      acc[dep] = (acc[dep] || 0) + 1;
      return acc;
    }, {});

  console.log('\n📋 External Dependencies:');
  Object.entries(externalDeps)
    .sort(([,a], [,b]) => b - a)
    .forEach(([dep, count]) => {
      console.log(`  ${dep}: ${count} references`);
    });

  // Size recommendations
  console.log('\n📏 Size Analysis:');
  if (sizeInBytes > WARNING_SIZE) {
    console.log('🔴 WARNING: Bundle size is quite large');
    console.log('   Consider implementing code splitting');
  } else if (sizeInBytes > MAX_RECOMMENDED_SIZE) {
    console.log('🟡 NOTICE: Bundle size is above recommended limit');
    console.log('   Monitor for potential tree-shaking improvements');
  } else {
    console.log('✅ Bundle size is within recommended limits');
  }

  // Check for common optimization patterns
  console.log('\n🔧 Optimization Opportunities:');
  
  if (bundleContent.includes('webpackIgnore: true')) {
    console.log('✅ Dynamic imports are properly configured');
  }
  
  if (bundleContent.includes('process.env.NODE_ENV')) {
    console.log('⚠️  Found NODE_ENV checks - ensure build optimization removes dev code');
  }

  const cssInJs = bundleContent.match(/styled-components/g)?.length || 0;
  if (cssInJs > 0) {
    console.log(`📝 Found ${cssInJs} styled-components references`);
  }

  console.log('\n🎯 Recommendations:');
  console.log('1. Use code splitting for non-critical components');
  console.log('2. Ensure external dependencies are properly externalized');
  console.log('3. Consider creating a "lite" version with fewer features');
  console.log('4. Implement tree-shaking optimizations if bundle grows significantly');

  return {
    sizeInKB: parseFloat(sizeInKB),
    externalDeps,
    isOptimal: sizeInBytes <= MAX_RECOMMENDED_SIZE
  };
}

// Check if this file is being run directly
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  analyzeBundle();
}

export { analyzeBundle };
