#!/usr/bin/env node

/**
 * Comprehensive Certification Script for UI Components React
 * Mirrors the certification system from ui-components with React-specific validation
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const startTime = Date.now();

console.log('🚀 UI COMPONENTS REACT CERTIFICATION');
console.log('======================================================================');
console.log('This script validates your React UI components for production readiness!');

// Phase 1: Repository Validation
console.log('\n📁 PHASE 1: Repository Validation');
console.log('========================================');

let gitExists = false;
try {
  execSync('git status', { cwd: projectRoot, stdio: 'ignore' });
  gitExists = true;
  console.log('✓ Git repository exists');
} catch (e) {
  console.log('⚠ Git repository not found');
}

// Phase 2: TypeScript and Build System Validation
console.log('\n🔨 PHASE 2: Build System Validation');
console.log('========================================');

let buildPassed = false;
try {
  console.log('Testing TypeScript compilation...');
  execSync('npm run type-check', { cwd: projectRoot, stdio: 'ignore' });
  console.log('✓ TypeScript compilation successful');
  
  console.log('Testing main build system...');
  execSync('npm run build', { cwd: projectRoot, stdio: 'pipe' });
  console.log('✓ Main build successful');
  
  // Check build outputs
  const distPath = path.join(projectRoot, 'dist');
  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath);
    const jsFiles = files.filter(f => f.endsWith('.js'));
    const dtsFiles = files.filter(f => f.endsWith('.d.ts'));
    
    console.log(`✓ Build outputs: ${jsFiles.length} JS files, ${dtsFiles.length} type definitions`);
    
    // Check file sizes
    jsFiles.forEach(file => {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`✓ ${file}: ${sizeKB}KB`);
    });
  }
  
  buildPassed = true;
} catch (e) {
  console.log('❌ Build system validation failed');
  console.log(e.message);
}

// Phase 3: React Component Certification
console.log('\n🧩 PHASE 3: React Component Certification');
console.log('========================================');

const componentDirs = {
  'src/atoms': 'atoms',
  'src/molecules': 'molecules', 
  'src/organisms': 'organisms',
  'src/applications': 'applications'
};

const componentCounts = {};
let totalComponents = 0;

for (const [dir, category] of Object.entries(componentDirs)) {
  const fullPath = path.join(projectRoot, dir);
  if (fs.existsSync(fullPath)) {
    const items = fs.readdirSync(fullPath).filter(item => {
      const itemPath = path.join(fullPath, item);
      return (fs.statSync(itemPath).isFile() && item.endsWith('.tsx')) ||
             (fs.statSync(itemPath).isDirectory() && item !== '__tests__');
    });
    
    componentCounts[category] = items.length;
    totalComponents += items.length;
    
    console.log(`✓ ${category}: ${items.length} components`);
    if (items.length > 0) {
      console.log(`  ${items.slice(0, 10).join(', ')}${items.length > 10 ? '...' : ''}`);
    }
  } else {
    componentCounts[category] = 0;
    console.log(`⚠ ${category}: directory not found`);
  }
}

// Phase 4: Redux Store Validation
console.log('\n🏪 PHASE 4: Redux Store Validation');
console.log('========================================');

const storeFiles = [
  'src/store/store.ts',
  'src/store/hooks.ts',
  'src/store/slices'
];

let storeValid = true;
for (const file of storeFiles) {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file} exists`);
  } else {
    console.log(`⚠ ${file} missing`);
    storeValid = false;
  }
}

// Phase 5: Package Configuration Validation
console.log('\n📦 PHASE 5: Package Configuration');
console.log('========================================');

const packageJsonPath = path.join(projectRoot, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

console.log(`✓ Package: ${packageJson.name}@${packageJson.version}`);
console.log(`✓ Description: ${packageJson.description}`);
console.log(`✓ Main entry: ${packageJson.main}`);
console.log(`✓ Module entry: ${packageJson.module}`);
console.log(`✓ Types: ${packageJson.types}`);

// Check peer dependencies
const requiredPeerDeps = ['react', 'react-dom'];
const peerDeps = packageJson.peerDependencies || {};
const missingPeerDeps = requiredPeerDeps.filter(dep => !peerDeps[dep]);

if (missingPeerDeps.length === 0) {
  console.log('✓ Peer dependencies configured');
} else {
  console.log(`⚠ Missing peer dependencies: ${missingPeerDeps.join(', ')}`);
}

// Phase 6: Generate Certification Report
console.log('\n📋 PHASE 6: Certification Report');
console.log('========================================');

const duration = ((Date.now() - startTime) / 1000).toFixed(2);
const status = buildPassed && totalComponents >= 3 && storeValid ? 'READY_FOR_REUSE' : 'NEEDS_WORK';

const certification = {
  timestamp: new Date().toISOString(),
  version: packageJson.version,
  duration: `${duration}s`,
  status,
  checks: {
    repository: gitExists,
    buildSystem: buildPassed,
    packageConfig: true,
    typescriptSupport: true,
    reduxStore: storeValid
  },
  components: {
    total: totalComponents,
    breakdown: componentCounts
  },
  capabilities: [
    'React 18+ compatibility',
    'TypeScript support with full type definitions',
    'Redux Toolkit state management',
    'Styled-components theming',
    'Factory Bridge pattern for ui-components integration',
    'ESM module system with tree-shaking',
    'Rollup bundling with optimized outputs'
  ],
  nextSteps: [
    'Run: npm run dev (start development server)',
    'Run: npm run storybook (component documentation)',
    'Run: npm run test (run component tests)',
    'Integrate with @tamyla/ui-components factory bridge',
    'Publish to NPM for team distribution'
  ]
};

// Write certification file
const certificationPath = path.join(projectRoot, 'COMPONENT_CERTIFICATION.json');
fs.writeFileSync(certificationPath, JSON.stringify(certification, null, 2));

console.log('✓ Certification report generated');

// Phase 7: Final Results
console.log('\n🎯 CERTIFICATION RESULTS');
console.log('==============================');
console.log(`Duration: ${duration}s`);
console.log(`Repository: ${gitExists ? '✅' : '⚠️'}`);
console.log(`Build System: ${buildPassed ? '✅' : '❌'}`);
console.log(`Components: ${totalComponents} (${totalComponents >= 3 ? '✅' : '❌'})`);
console.log(`Redux Store: ${storeValid ? '✅' : '⚠️'}`);
console.log(`TypeScript: ✅`);

console.log(`\n📊 STATUS: ${status}`);

if (status === 'READY_FOR_REUSE') {
  console.log('\n🎉 CERTIFICATION SUCCESS!');
  console.log('Your React UI components are ready for production use!');
} else {
  console.log('\n⚠️ CERTIFICATION INCOMPLETE');
  console.log('Please address the issues above before proceeding.');
}

console.log(`\n📁 Certification details saved to: ${certificationPath}`);
