#!/usr/bin/env node

/**
 * Test script to simulate semantic release TypeScript compilation
 * This will help us understand exactly what happens during the build process
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Testing TypeScript compilation in conditions similar to semantic release...\n');

// Test 1: TypeScript compilation without peer dependencies
console.log('✅ Test 1: TypeScript compilation check');
const tscProcess = spawn('npx', ['tsc', '--noEmit'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

tscProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ TypeScript compilation passed!\n');
    
    // Test 2: Build process
    console.log('✅ Test 2: Build process check');
    const buildProcess = spawn('npm', ['run', 'build'], {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true
    });
    
    buildProcess.on('close', (buildCode) => {
      if (buildCode === 0) {
        console.log('✅ Build process passed!\n');
        console.log('🎉 All tests passed - semantic release should work!');
      } else {
        console.log('❌ Build process failed');
        process.exit(1);
      }
    });
    
  } else {
    console.log('❌ TypeScript compilation failed');
    process.exit(1);
  }
});
