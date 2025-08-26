#!/usr/bin/env node
/**
 * Repository Status and Information Script for UI Components React
 * Shows complete status of the React components repository
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ReactRepositoryStatus {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
  }

  exec(command) {
    try {
      return execSync(command, { 
        cwd: this.projectRoot, 
        encoding: 'utf8' 
      });
    } catch (error) {
      throw error;
    }
  }

  async checkStatus() {
    console.log('\n📊 UI Components React Repository Status');
    console.log('=' .repeat(60));

    await this.checkGitStatus();
    await this.checkFileStructure();
    await this.checkBuildOutputs();
    await this.checkReactComponents();
    await this.showDeploymentOptions();
  }

  async checkGitStatus() {
    console.log('\n📁 Git Repository Status:');
    
    try {
      // Current directory
      const currentDir = process.cwd();
      console.log(`  ✓ Location: ${currentDir}`);
      
      // Git status
      const status = this.exec('git status --porcelain').toString().trim();
      if (status) {
        console.log(`  ⚠ Uncommitted changes: ${status.split('\n').length} files`);
      } else {
        console.log('  ✓ All changes committed');
      }
      
      // Branch info
      const branch = this.exec('git branch --show-current').toString().trim();
      console.log(`  ✓ Current branch: ${branch}`);
      
      // Commit count
      const commits = this.exec('git rev-list --count HEAD').toString().trim();
      console.log(`  ✓ Total commits: ${commits}`);
      
      // Remote status
      try {
        const remotes = this.exec('git remote -v').toString().trim();
        if (remotes) {
          console.log('  ✓ Remote repositories:');
          remotes.split('\n').forEach(remote => {
            console.log(`    ${remote}`);
          });
        } else {
          console.log('  ❌ No remote repositories configured');
          console.log('    Run: npm run deploy (to set up GitHub)');
        }
      } catch (error) {
        console.log('  ❌ No remote repositories');
      }
      
    } catch (error) {
      console.log('  ❌ Not a git repository');
    }
  }

  async checkFileStructure() {
    console.log('\n📂 Project Structure:');
    
    const requiredDirs = [
      'src', 'dist', 'scripts', 'bridges'
    ];
    
    for (const dir of requiredDirs) {
      const dirPath = path.join(this.projectRoot, dir);
      if (fs.existsSync(dirPath)) {
        const items = fs.readdirSync(dirPath);
        console.log(`  ✓ ${dir}/ (${items.length} items)`);
      } else {
        console.log(`  ❌ ${dir}/ - missing`);
      }
    }
    
    // Check important files
    const importantFiles = [
      'package.json', '.gitignore', 'README.md',
      'rollup.config.js', 'tsconfig.json'
    ];
    
    importantFiles.forEach(file => {
      const filePath = path.join(this.projectRoot, file);
      if (fs.existsSync(filePath)) {
        console.log(`  ✓ ${file}`);
      } else {
        console.log(`  ❌ ${file} - missing`);
      }
    });
  }

  async checkBuildOutputs() {
    console.log('\n🏗️ Build Outputs:');
    
    const distPath = path.join(this.projectRoot, 'dist');
    if (fs.existsSync(distPath)) {
      const files = fs.readdirSync(distPath);
      console.log(`  ✓ Distribution files: ${files.length}`);
      
      files.forEach(file => {
        const filePath = path.join(distPath, file);
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        console.log(`    ${file}: ${sizeKB}KB`);
      });
    } else {
      console.log('  ❌ No build outputs found');
      console.log('    Run: npm run build');
    }
  }

  async checkReactComponents() {
    console.log('\n⚛️ React Components:');
    
    const srcPath = path.join(this.projectRoot, 'src');
    const componentTypes = ['atoms', 'molecules', 'organisms', 'applications'];
    let totalComponents = 0;
    
    componentTypes.forEach(type => {
      const typePath = path.join(srcPath, type);
      if (fs.existsSync(typePath)) {
        const components = fs.readdirSync(typePath).filter(item => 
          item.endsWith('.tsx') || item.endsWith('.ts')
        );
        console.log(`  ✓ ${type}: ${components.length} components`);
        totalComponents += components.length;
      } else {
        console.log(`  ❌ ${type}: directory not found`);
      }
    });
    
    console.log(`  📊 Total React components: ${totalComponents}`);

    // Check bridge files
    const bridgesPath = path.join(this.projectRoot, 'bridges');
    if (fs.existsSync(bridgesPath)) {
      const bridges = fs.readdirSync(bridgesPath).filter(item => 
        item.endsWith('.tsx') || item.endsWith('.ts')
      );
      console.log(`  🌉 Bridge files: ${bridges.length}`);
    }
  }

  async showDeploymentOptions() {
    console.log('\n🚀 Deployment Options:');
    
    const packagePath = path.join(this.projectRoot, 'package.json');
    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    console.log('  Available scripts:');
    Object.keys(packageData.scripts || {}).forEach(script => {
      if (script.includes('deploy') || script.includes('publish') || script.includes('certify')) {
        console.log(`    npm run ${script}`);
      }
    });
    
    console.log('\n  📦 Package Information:');
    console.log(`    Name: ${packageData.name}`);
    console.log(`    Version: ${packageData.version}`);
    console.log(`    Private: ${packageData.private || false}`);
  }
}

// Run status check
const status = new ReactRepositoryStatus();
status.checkStatus().catch(error => {
  console.error('❌ Status check failed:', error.message);
  process.exit(1);
});
