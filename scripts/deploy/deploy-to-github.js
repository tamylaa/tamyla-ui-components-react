#!/usr/bin/env node
/**
 * GitHub Repository Deployment Script for UI Components React
 * Creates a GitHub repository and pushes the React components
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ReactGitHubDeployment {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.repoName = 'ui-components-react';
    this.repoDescription = 'React component system with Factory Bridge pattern - integrates with @tamyla/ui-components';
  }

  exec(command) {
    try {
      return execSync(command, {
        cwd: this.projectRoot,
        encoding: 'utf8',
        stdio: 'pipe'
      });
    } catch (error) {
      throw error;
    }
  }

  async deploy() {
    console.log('\n🚀 GitHub Repository Deployment for React Components');
    console.log('=' .repeat(60));

    try {
      await this.validateLocalRepo();
      await this.checkExistingRemote();
      await this.createGitHubRepo();
      await this.pushToGitHub();
      await this.displaySuccess();

    } catch (error) {
      console.log('\n❌ Deployment FAILED!');
      console.log(`Error: ${error.message}`);
      console.log('\nNext steps:');
      console.log('1. Make sure you have GitHub CLI installed: gh auth login');
      console.log('2. Or manually create repository on GitHub.com');
      console.log('3. Run the manual setup commands shown above');
      process.exit(1);
    }
  }

  async checkExistingRemote() {
    console.log('\n🔍 Checking existing remotes...');

    try {
      const remotes = this.exec('git remote -v').toString().trim();
      if (remotes) {
        console.log('  ⚠ Existing remotes found:');
        remotes.split('\n').forEach(remote => {
          console.log(`    ${remote}`);
        });

        // Check if origin already points to our target repo
        if (remotes.includes(this.repoName)) {
          console.log('  ✓ Origin already configured for this repository');
          return;
        }

        // If origin exists but points elsewhere, we'll need to handle it
        if (remotes.includes('origin')) {
          console.log('  ⚠ Origin remote exists but points to different repository');
          console.log('  ℹ Will attempt to create repository anyway...');
        }
      } else {
        console.log('  ✓ No existing remotes found');
      }
    } catch (error) {
      console.log('  ✓ No remotes configured yet');
    }
  }

  async validateLocalRepo() {
    console.log('\n🔍 Validating local repository...');

    // Check if we're in a git repo
    try {
      this.exec('git status');
      console.log('  ✓ Git repository found');
    } catch (error) {
      throw new Error('Not in a git repository. Run git init first.');
    }

    // Check if there are commits
    try {
      const commits = this.exec('git log --oneline').toString().trim();
      const commitCount = commits.split('\n').length;
      console.log(`  ✓ Found ${commitCount} commits`);
    } catch (error) {
      throw new Error('No commits found. Create initial commit first.');
    }

    // Commit any pending changes
    try {
      this.exec('git add .');
      this.exec('git commit -m "Final React component updates before GitHub deployment"');
      console.log('  ✓ Latest changes committed');
    } catch (error) {
      console.log('  ⚠ No new changes to commit');
    }
  }

  async createGitHubRepo() {
    console.log('\n📦 Creating GitHub repository...');

    // First check if GitHub CLI is available
    try {
      this.exec('gh --version');
      console.log('  ✓ GitHub CLI detected');
    } catch (error) {
      console.log('  ⚠ GitHub CLI not available, providing manual setup instructions');
      this.showManualSetup();
      throw new Error('Please complete manual setup or install GitHub CLI');
    }

    // Check if user is authenticated
    try {
      this.exec('gh auth status');
      console.log('  ✓ GitHub CLI authenticated');
    } catch (error) {
      console.log('  ⚠ GitHub CLI not authenticated. Run: gh auth login');
      this.showManualSetup();
      throw new Error('Please authenticate GitHub CLI: gh auth login');
    }

    // Try to create the repository
    try {
      // Create repository without --source flag to avoid conflicts
      const createCommand = `gh repo create ${this.repoName} --public --description "${this.repoDescription}"`;
      this.exec(createCommand);
      console.log('  ✓ GitHub repository created using GitHub CLI');

      // Now add the remote if it doesn't exist or update it
      try {
        const remotes = this.exec('git remote -v').toString().trim();
        if (remotes.includes('origin') && !remotes.includes(this.repoName)) {
          // Remove existing origin and add new one
          this.exec('git remote remove origin');
          console.log('  ✓ Removed existing origin remote');
        }

        if (!remotes.includes(this.repoName)) {
          // Get GitHub username and add remote
          const username = this.exec('gh api user --jq .login').toString().trim();
          this.exec(`git remote add origin https://github.com/${username}/${this.repoName}.git`);
          console.log('  ✓ Added new origin remote');
        }
      } catch (remoteError) {
        // Fallback: try to add remote anyway
        try {
          const username = this.exec('gh api user --jq .login').toString().trim();
          this.exec(`git remote add origin https://github.com/${username}/${this.repoName}.git`);
          console.log('  ✓ Added new origin remote (fallback)');
        } catch (fallbackError) {
          console.log('  ⚠ Could not automatically configure remote. Please add manually:');
          console.log(`     git remote add origin https://github.com/YOUR_USERNAME/${this.repoName}.git`);
        }
      }

    } catch (error) {
      console.log(`  ⚠ Failed to create repository: ${error.message}`);

      // Check if repo already exists
      if (error.message.includes('already exists') || error.message.includes('Name already exists')) {
        console.log('  ℹ Repository already exists on GitHub, configuring remote...');

        try {
          // Get GitHub username and add remote
          const username = this.exec('gh api user --jq .login').toString().trim();
          this.exec(`git remote add origin https://github.com/${username}/${this.repoName}.git`);
          console.log(`  ✓ Added remote: https://github.com/${username}/${this.repoName}.git`);
          return;
        } catch (remoteError) {
          console.log('  ⚠ Failed to add remote automatically');
          console.log(`  ℹ Please run: git remote add origin https://github.com/YOUR_USERNAME/${this.repoName}.git`);
          return;
        }
      }

      this.showManualSetup();
      throw new Error('Failed to create GitHub repository. See manual setup instructions above.');
    }
  }

  async pushToGitHub() {
    console.log('\n⬆️ Pushing to GitHub...');

    try {
      // Push to GitHub
      this.exec('git push -u origin main');
      console.log('  ✓ Code pushed to GitHub');

    } catch (error) {
      // Try alternative branch name
      try {
        this.exec('git push -u origin master');
        console.log('  ✓ Code pushed to GitHub (master branch)');
      } catch (altError) {
        throw new Error('Failed to push to GitHub. Check remote configuration.');
      }
    }
  }

  showManualSetup() {
    console.log('\n📋 Manual GitHub Setup Instructions:');
    console.log('=' .repeat(50));
    console.log('1. Go to https://github.com/new');
    console.log(`2. Repository name: ${this.repoName}`);
    console.log(`3. Description: ${this.repoDescription}`);
    console.log('4. Make it Public');
    console.log('5. Do NOT initialize with README (we have files already)');
    console.log('6. Click "Create repository"');
    console.log('');
    console.log('7. Then run these commands:');
    console.log(`   git remote add origin https://github.com/YOUR_USERNAME/${this.repoName}.git`);
    console.log('   git branch -M main');
    console.log('   git push -u origin main');
  }

  async displaySuccess() {
    console.log('\n🎉 SUCCESS: React Components deployed to GitHub!');
    console.log('=' .repeat(50));

    const packagePath = path.join(this.projectRoot, 'package.json');
    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    console.log(`📦 Package: ${packageData.name}@${packageData.version}`);
    console.log(`🔗 Repository: https://github.com/YOUR_USERNAME/${this.repoName}`);
    console.log('');
    console.log('🚀 Next steps:');
    console.log('  • Configure GitHub Pages (if needed)');
    console.log('  • Set up GitHub Actions for CI/CD');
    console.log('  • Add badges to README.md');
    console.log('  • Configure npm publishing (if public)');
    console.log('');
    console.log('✅ Your React components are now on GitHub!');
  }
}

// Run deployment
const deployment = new ReactGitHubDeployment();
deployment.deploy().catch(error => {
  console.error('❌ GitHub deployment failed:', error.message);
  process.exit(1);
});
