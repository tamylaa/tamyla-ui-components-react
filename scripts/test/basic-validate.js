#!/usr/bin/env node

/**
 * Basic Validation Script for UI Components React
 * Mirrors the validation system from ui-components
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🔍 UI Components React Basic Validation');
console.log('==================================================');
console.log(`📁 Working directory: ${projectRoot}`);

// Check project structure
console.log('\n🔍 Checking project structure...');

const expectedDirs = {
  'src/components/atoms': 'Atomic components',
  'src/components/molecules': 'Molecule components',
  'src/components/organisms': 'Organism components',
  'src/components/applications': 'Application components',
  'src/core': 'Core utilities',
  'src/store': 'Redux store setup',
  'scripts': 'Build and validation scripts'
};

let foundDirs = 0;
const componentCounts = {};

for (const [dir, description] of Object.entries(expectedDirs)) {
  const fullPath = path.join(projectRoot, dir);
  if (fs.existsSync(fullPath)) {
    const items = fs.readdirSync(fullPath);
    const componentCount = items.filter(item => {
      const itemPath = path.join(fullPath, item);
      return fs.statSync(itemPath).isFile() &&
             (item.endsWith('.tsx') || item.endsWith('.ts')) &&
             !item.includes('.test.') &&
             !item.includes('.spec.');
    }).length;

    componentCounts[dir] = componentCount;
    console.log(`  ✓ ${dir}/ (${componentCount} components)`);
    foundDirs++;
  } else {
    console.log(`  ✗ ${dir}/ - Missing`);
  }
}

// Check package configuration
console.log('\n📋 Checking package configuration...');
const packageJsonPath = path.join(projectRoot, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  console.log(`  ✓ package.json - ${packageJson.name}@${packageJson.version}`);
  console.log(`  ✓ Type: ${packageJson.type || 'CommonJS (default)'}`);

  const scripts = Object.keys(packageJson.scripts || {});
  console.log(`  ✓ Scripts: ${scripts.join(', ')}`);

  // Check for required dependencies
  const requiredDeps = ['react', 'react-dom', '@reduxjs/toolkit', 'styled-components'];
  const missingDeps = requiredDeps.filter(dep =>
    !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]
  );

  if (missingDeps.length === 0) {
    console.log('  ✓ Required dependencies present');
  } else {
    console.log(`  ⚠ Missing dependencies: ${missingDeps.join(', ')}`);
  }
} else {
  console.log('  ✗ package.json - Missing');
}

// Check TypeScript configuration
const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
  console.log('  ✓ TypeScript configuration found');
} else {
  console.log('  ⚠ tsconfig.json - Missing');
}

// Check build configuration
const rollupConfigPath = path.join(projectRoot, 'rollup.config.js');
if (fs.existsSync(rollupConfigPath)) {
  console.log('  ✓ Rollup build configuration found');
} else {
  console.log('  ⚠ rollup.config.js - Missing');
}

console.log('\n📊 Summary');
console.log('==============================');
console.log(`Found directories: ${foundDirs}/${Object.keys(expectedDirs).length}`);

const totalComponents = Object.values(componentCounts).reduce((sum, count) => sum + count, 0);
console.log(`Total components: ${totalComponents}`);

if (foundDirs >= 5 && totalComponents >= 3) {
  console.log('\n✅ Basic structure validation PASSED!');
  console.log('Your React UI components structure is ready for development.');
} else {
  console.log('\n❌ Basic structure validation FAILED!');
  console.log('Please ensure you have the required directory structure and components.');
}

console.log('\n🚀 Next steps:');
console.log('  • Run: npm run build (to test build system)');
console.log('  • Run: npm run dev (to start development server)');
console.log('  • Run: npm run certify (for detailed validation)');

console.log('\nValidation completed successfully! 🎯');
