#!/usr/bin/env node
/**
 * Workflow Dashboard
 *
 * Provides a quick overview of workflow status, recent runs, and key metrics.
 * Useful for monitoring the health of the pre-production validation process.
 *
 * Usage:
 * - node scripts/workflow-dashboard.js
 * - node scripts/workflow-dashboard.js --recent=5
 * - node scripts/workflow-dashboard.js --status
 */

import fs from 'fs';
import path from 'path';

// Parse command line arguments
const recent = parseInt(process.argv.find(arg => arg.startsWith('--recent='))?.split('=')[1]) || 10;
const showStatus = process.argv.includes('--status');
const json = process.argv.includes('--json');

console.log('📊 WORKFLOW DASHBOARD');
console.log('=====================');

// Check if temp directory exists
const tempDir = 'temp';
if (!fs.existsSync(tempDir)) {
  console.log('❌ No workflow data found. Run a workflow first.');
  process.exit(1);
}

// Get all workflow reports
const reportFiles = fs.readdirSync(tempDir)
  .filter(file => file.startsWith('preprod-report-'))
  .sort((a, b) => {
    const aTime = fs.statSync(path.join(tempDir, a)).mtime;
    const bTime = fs.statSync(path.join(tempDir, b)).mtime;
    return bTime - aTime;
  });

if (reportFiles.length === 0) {
  console.log('❌ No workflow reports found.');
  process.exit(1);
}

// Load recent reports
const recentReports = reportFiles.slice(0, recent).map(file => {
  try {
    const content = JSON.parse(fs.readFileSync(path.join(tempDir, file), 'utf8'));
    return {
      file,
      ...content,
      timestamp: new Date(content.timestamp)
    };
  } catch (error) {
    console.warn(`⚠️ Could not parse ${file}: ${error.message}`);
    return null;
  }
}).filter(Boolean);

// Calculate metrics
const metrics = calculateMetrics(recentReports);

// Display dashboard
if (json) {
  console.log(JSON.stringify({
    metrics,
    recentRuns: recentReports.slice(0, 5)
  }, null, 2));
} else {
  displayDashboard(metrics, recentReports);
}

function calculateMetrics(reports) {
  const totalRuns = reports.length;
  const successfulRuns = reports.filter(r => r.summary.failed === 0).length;
  const failedRuns = totalRuns - successfulRuns;

  const avgDuration = reports.reduce((sum, r) => sum + r.duration, 0) / totalRuns;
  const successRate = totalRuns > 0 ? (successfulRuns / totalRuns) * 100 : 0;

  // Step success rates
  const stepStats = {};
  reports.forEach(report => {
    Object.entries(report.steps).forEach(([step, result]) => {
      if (!stepStats[step]) {
        stepStats[step] = { total: 0, passed: 0, failed: 0, skipped: 0 };
      }
      stepStats[step].total++;
      if (result.executed) {
        if (result.success) stepStats[step].passed++;
        else stepStats[step].failed++;
      } else if (result.skipped) {
        stepStats[step].skipped++;
      }
    });
  });

  // Release type distribution
  const releaseTypes = {};
  reports.forEach(report => {
    releaseTypes[report.releaseType] = (releaseTypes[report.releaseType] || 0) + 1;
  });

  return {
    totalRuns,
    successfulRuns,
    failedRuns,
    successRate: successRate.toFixed(1),
    avgDuration: avgDuration.toFixed(1),
    stepStats,
    releaseTypes,
    lastRun: reports[0]?.timestamp || null
  };
}

function displayDashboard(metrics, reports) {
  console.log('');
  console.log('📈 OVERVIEW METRICS');
  console.log('===================');
  console.log(`Total Runs:     ${metrics.totalRuns}`);
  console.log(`Success Rate:   ${metrics.successRate}%`);
  console.log(`Successful:     ${metrics.successfulRuns}`);
  console.log(`Failed:         ${metrics.failedRuns}`);
  console.log(`Avg Duration:   ${(metrics.avgDuration / 1000).toFixed(1)}s`);
  console.log(`Last Run:       ${metrics.lastRun ? metrics.lastRun.toLocaleString() : 'N/A'}`);

  console.log('');
  console.log('🏷️  RELEASE TYPE DISTRIBUTION');
  console.log('============================');
  Object.entries(metrics.releaseTypes).forEach(([type, count]) => {
    const percentage = ((count / metrics.totalRuns) * 100).toFixed(1);
    console.log(`${type.toUpperCase().padEnd(8)} ${count.toString().padStart(3)} runs (${percentage}%)`);
  });

  console.log('');
  console.log('🔄 STEP SUCCESS RATES');
  console.log('====================');
  Object.entries(metrics.stepStats).forEach(([step, stats]) => {
    const successRate = stats.total > 0 ? ((stats.passed / stats.total) * 100).toFixed(1) : '0.0';
    const status = parseFloat(successRate) >= 90 ? '🟢' :
                   parseFloat(successRate) >= 70 ? '🟡' : '🔴';
    console.log(`${status} ${step.padEnd(15)} ${successRate}% (${stats.passed}/${stats.total})`);
  });

  console.log('');
  console.log('📋 RECENT RUNS');
  console.log('==============');
  reports.slice(0, 5).forEach((report, index) => {
    const status = report.summary.failed === 0 ? '✅' : '❌';
    const duration = (report.duration / 1000).toFixed(1);
    const timeAgo = getTimeAgo(report.timestamp);

    console.log(`${index + 1}. ${status} ${report.releaseType.toUpperCase().padStart(6)} | ${duration}s | ${timeAgo}`);
    console.log(`   ${report.file}`);
  });

  // Show status if requested
  if (showStatus) {
    console.log('');
    console.log('🔍 CURRENT STATUS');
    console.log('=================');

    // Check for uncommitted changes
    try {
      const gitStatus = require('child_process').execSync('git status --porcelain', { encoding: 'utf8' });
      if (gitStatus.trim()) {
        console.log('⚠️  Uncommitted changes detected');
      } else {
        console.log('✅ Working directory is clean');
      }
    } catch (error) {
      console.log('❓ Could not check git status');
    }

    // Check if build artifacts exist
    const buildExists = fs.existsSync('dist/index.esm.js');
    console.log(`${buildExists ? '✅' : '❌'} Build artifacts ${buildExists ? 'present' : 'missing'}`);

    // Check if validation results exist
    const validationExists = fs.existsSync(path.join(tempDir, 'validation-results.json'));
    console.log(`${validationExists ? '✅' : '❌'} Validation results ${validationExists ? 'available' : 'missing'}`);
  }

  console.log('');
  console.log('💡 QUICK ACTIONS');
  console.log('================');
  console.log('• Run workflow:    npm run preprod:patch');
  console.log('• View reports:    npm run workflow:report');
  console.log('• Check status:    node scripts/workflow-dashboard.js --status');
  console.log('• Recent runs:     node scripts/workflow-dashboard.js --recent=3');
}

function getTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}
