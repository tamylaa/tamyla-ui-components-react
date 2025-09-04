#!/usr/bin/env node
/**
 * Workflow Report Generator
 *
 * Generates comprehensive reports from pre-production workflow execution results.
 * Supports multiple output formats and detailed analysis of validation results.
 *
 * Usage:
 * - node scripts/generate-workflow-report.js
 * - node scripts/generate-workflow-report.js --format=html
 * - node scripts/generate-workflow-report.js --latest
 */

import fs from 'fs';
import path from 'path';

// Parse command line arguments
const format = process.argv.find(arg => arg.startsWith('--format='))?.split('=')[1] || 'markdown';
const latest = process.argv.includes('--latest');
const outputDir = process.argv.find(arg => arg.startsWith('--output='))?.split('=')[1] || 'reports';

const REPORT_TYPES = ['json', 'markdown', 'html'];

if (!REPORT_TYPES.includes(format)) {
  console.error(`❌ Invalid format: ${format}`);
  console.error(`   Valid formats: ${REPORT_TYPES.join(', ')}`);
  process.exit(1);
}

console.log('📊 WORKFLOW REPORT GENERATOR');
console.log('=============================');

// Find workflow reports
const tempDir = 'temp';
if (!fs.existsSync(tempDir)) {
  console.error('❌ No temp directory found. Run workflow first.');
  process.exit(1);
}

const reportFiles = fs.readdirSync(tempDir)
  .filter(file => file.startsWith('preprod-report-'))
  .sort((a, b) => {
    const aTime = fs.statSync(path.join(tempDir, a)).mtime;
    const bTime = fs.statSync(path.join(tempDir, b)).mtime;
    return bTime - aTime;
  });

if (reportFiles.length === 0) {
  console.error('❌ No workflow reports found. Run workflow first.');
  process.exit(1);
}

const reportFile = latest ? reportFiles[0] : reportFiles[0];
const reportPath = path.join(tempDir, reportFile);

console.log(`📁 Using report: ${reportFile}`);

// Load and parse report
let report;
try {
  report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
} catch (error) {
  console.error('❌ Failed to parse report file:', error.message);
  process.exit(1);
}

// Load summary if available
let summary = null;
const summaryPath = path.join(tempDir, 'preprod-summary.json');
if (fs.existsSync(summaryPath)) {
  try {
    summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  } catch (error) {
    console.log('⚠️ Could not load summary file');
  }
}

// Load validation results if available
let validationResults = null;
const validationPath = path.join(tempDir, 'validation-results.json');
if (fs.existsSync(validationPath)) {
  try {
    validationResults = JSON.parse(fs.readFileSync(validationPath, 'utf8'));
  } catch (error) {
    console.log('⚠️ Could not load validation results');
  }
}

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate report based on format
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputFileName = `workflow-report-${report.releaseType}-${timestamp}.${format}`;
const outputPath = path.join(outputDir, outputFileName);

let reportContent;
switch (format) {
  case 'json':
    reportContent = generateJsonReport();
    break;
  case 'markdown':
    reportContent = generateMarkdownReport();
    break;
  case 'html':
    reportContent = generateHtmlReport();
    break;
}

fs.writeFileSync(outputPath, reportContent);
console.log(`✅ Report generated: ${outputPath}`);

// Helper functions
function generateJsonReport() {
  return JSON.stringify({
    metadata: {
      generatedAt: new Date().toISOString(),
      reportFormat: 'comprehensive',
      sourceReport: reportFile
    },
    workflow: report,
    summary,
    validation: validationResults,
    analysis: analyzeResults()
  }, null, 2);
}

function generateMarkdownReport() {
  const analysis = analyzeResults();

  return `# Pre-Production Workflow Report

**Generated:** ${new Date().toLocaleString()}
**Release Type:** ${report.releaseType.toUpperCase()}
**Source:** ${reportFile}
**Duration:** ${(report.duration / 1000).toFixed(1)}s

## Executive Summary

${analysis.overallStatus === 'success' ? '✅' : '❌'} **${analysis.overallStatus.toUpperCase()}**
- **Total Steps:** ${report.summary.total}
- **Passed:** ${report.summary.passed}
- **Failed:** ${report.summary.failed}
- **Skipped:** ${report.summary.skipped}
- **Success Rate:** ${((report.summary.passed / (report.summary.total - report.summary.skipped)) * 100).toFixed(1)}%

## Step Details

${Object.entries(report.steps).map(([step, result]) => {
  const status = result.executed ?
    (result.success ? '✅' : '❌') :
    (result.skipped ? '⏭️' : '❓');

  return `### ${status} ${step.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}

- **Status:** ${result.executed ? (result.success ? 'Passed' : 'Failed') : 'Skipped'}
- **Duration:** ${result.duration ? `${(result.duration / 1000).toFixed(1)}s` : 'N/A'}
- **Executed:** ${result.timestamp || 'N/A'}

${result.error ? `**Error:** ${result.error}` : ''}

---`;
}).join('\n')}

## Validation Results

${validationResults ? `
### Component Validation Summary
- **Total Components:** ${validationResults.summary?.total || 0}
- **Valid Components:** ${validationResults.summary?.valid || 0}
- **Invalid Components:** ${validationResults.summary?.invalid || 0}
- **Coverage:** ${validationResults.summary?.coverage || 0}%

### Issues Found
${validationResults.issues?.length > 0 ?
  validationResults.issues.map(issue => `- ${issue.component}: ${issue.message}`).join('\n') :
  'No issues found ✅'
}
` : 'No validation results available'}

## Recommendations

${analysis.recommendations.map(rec => `- ${rec}`).join('\n')}

## Next Steps

${analysis.nextSteps.map(step => `- ${step}`).join('\n')}

---
*Report generated by Pre-Production Workflow System*
`;
}

function generateHtmlReport() {
  const analysis = analyzeResults();

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pre-Production Workflow Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 40px; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .metric { background: white; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef; text-align: center; }
        .metric .value { font-size: 2em; font-weight: bold; }
        .metric .label { color: #6c757d; text-transform: uppercase; font-size: 0.8em; }
        .step { margin: 10px 0; padding: 15px; border-radius: 6px; }
        .step.success { background: #d4edda; border: 1px solid #c3e6cb; }
        .step.error { background: #f8d7da; border: 1px solid #f5c6cb; }
        .step.skipped { background: #fff3cd; border: 1px solid #ffeaa7; }
        .recommendations { background: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 Pre-Production Workflow Report</h1>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Release Type:</strong> ${report.releaseType.toUpperCase()}</p>
        <p><strong>Duration:</strong> ${(report.duration / 1000).toFixed(1)}s</p>
    </div>

    <div class="summary">
        <div class="metric">
            <div class="value ${analysis.overallStatus === 'success' ? 'text-success' : 'text-danger'}">
                ${analysis.overallStatus === 'success' ? '✅' : '❌'}
            </div>
            <div class="label">Overall Status</div>
        </div>
        <div class="metric">
            <div class="value">${report.summary.passed}</div>
            <div class="label">Passed</div>
        </div>
        <div class="metric">
            <div class="value">${report.summary.failed}</div>
            <div class="label">Failed</div>
        </div>
        <div class="metric">
            <div class="value">${((report.summary.passed / (report.summary.total - report.summary.skipped)) * 100).toFixed(1)}%</div>
            <div class="label">Success Rate</div>
        </div>
    </div>

    <h2>Step Details</h2>
    ${Object.entries(report.steps).map(([step, result]) => {
      const statusClass = result.executed ?
        (result.success ? 'success' : 'error') :
        'skipped';

      const statusText = result.executed ?
        (result.success ? '✅ Passed' : '❌ Failed') :
        '⏭️ Skipped';

      return `
        <div class="step ${statusClass}">
            <h3>${step.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
            <p><strong>Status:</strong> ${statusText}</p>
            <p><strong>Duration:</strong> ${result.duration ? `${(result.duration / 1000).toFixed(1)}s` : 'N/A'}</p>
            ${result.error ? `<p><strong>Error:</strong> ${result.error}</p>` : ''}
        </div>
      `;
    }).join('')}

    ${validationResults ? `
    <h2>Validation Results</h2>
    <div class="summary">
        <div class="metric">
            <div class="value">${validationResults.summary?.total || 0}</div>
            <div class="label">Total Components</div>
        </div>
        <div class="metric">
            <div class="value">${validationResults.summary?.valid || 0}</div>
            <div class="label">Valid</div>
        </div>
        <div class="metric">
            <div class="value">${validationResults.summary?.invalid || 0}</div>
            <div class="label">Invalid</div>
        </div>
    </div>
    ` : ''}

    <div class="recommendations">
        <h2>Recommendations</h2>
        <ul>
            ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>

        <h3>Next Steps</h3>
        <ul>
            ${analysis.nextSteps.map(step => `<li>${step}</li>`).join('')}
        </ul>
    </div>

    <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #6c757d; text-align: center;">
        <p>Report generated by Pre-Production Workflow System</p>
    </footer>
</body>
</html>`;
}

function analyzeResults() {
  const analysis = {
    overallStatus: report.summary.failed === 0 ? 'success' : 'failure',
    recommendations: [],
    nextSteps: []
  };

  // Analyze step results
  const failedSteps = Object.entries(report.steps)
    .filter(([_, result]) => result.executed && !result.success)
    .map(([step, _]) => step);

  const skippedSteps = Object.entries(report.steps)
    .filter(([_, result]) => !result.executed && result.skipped)
    .map(([step, _]) => step);

  // Generate recommendations
  if (failedSteps.length > 0) {
    analysis.recommendations.push(`Address failed steps: ${failedSteps.join(', ')}`);
  }

  if (report.summary.failed > 0) {
    analysis.recommendations.push('Review error logs for detailed failure information');
    analysis.recommendations.push('Consider running individual tests to isolate issues');
  }

  if (skippedSteps.length > 0) {
    analysis.recommendations.push(`Consider enabling skipped steps for complete validation: ${skippedSteps.join(', ')}`);
  }

  // Generate next steps
  if (analysis.overallStatus === 'success') {
    analysis.nextSteps.push('✅ Ready for production deployment');
    analysis.nextSteps.push('Create git tag for this release');
    analysis.nextSteps.push('Update changelog with release notes');
    analysis.nextSteps.push('Notify team of successful validation');
  } else {
    analysis.nextSteps.push('❌ Fix identified issues before proceeding');
    analysis.nextSteps.push('Re-run workflow after fixes');
    analysis.nextSteps.push('Consider rollback if issues are critical');
  }

  // Validation-specific analysis
  if (validationResults) {
    if (validationResults.summary?.invalid > 0) {
      analysis.recommendations.push(`Fix ${validationResults.summary.invalid} invalid components`);
    }

    if (validationResults.summary?.coverage < 80) {
      analysis.recommendations.push('Improve component test coverage');
    }
  }

  return analysis;
}

console.log('🎉 Report generation complete!');
