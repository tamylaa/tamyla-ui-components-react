#!/usr/bin/env node

/**
 * Development Utilities for @tamyla/ui-components-react
 *
 * This script provides utilities for developers to explore and work with
 * the component library more effectively.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load component registry
function loadComponentRegistry() {
  try {
    const registryPath = path.resolve(__dirname, '../../component-registry.json');
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    return registry;
  } catch (error) {
    console.error('Error loading component registry:', error.message);
    return null;
  }
}

// Component discovery utility
function discoverComponents(category = null) {
  const registry = loadComponentRegistry();
  if (!registry) return;

  console.log('🔍 Component Discovery\n');

  if (category) {
    console.log(`📂 ${category.toUpperCase()} COMPONENTS\n`);
    const components = Object.entries(registry.components)
      .filter(([_, config]) => config.category === category)
      .map(([name, config]) => ({ name, ...config }));

    if (components.length === 0) {
      console.log(`No components found in category: ${category}`);
      return;
    }

    components.forEach(comp => {
      console.log(`• ${comp.name}`);
      console.log(`  Description: ${comp.description}`);
      console.log(`  Props: ${Object.keys(comp.props).length} available`);
      console.log('');
    });
  } else {
    // Show all categories
    const categories = {};
    Object.values(registry.components).forEach(comp => {
      categories[comp.category] = (categories[comp.category] || 0) + 1;
    });

    console.log('📊 COMPONENT CATEGORIES\n');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`• ${cat}: ${count} components`);
    });
    console.log('\nUse: node dev-utils.js discover <category>');
  }
}

// Design tokens explorer
function exploreDesignTokens(type = null) {
  const registry = loadComponentRegistry();
  if (!registry) return;

  console.log('🎨 Design Tokens Explorer\n');

  if (type) {
    if (registry.designTokens[type]) {
      console.log(`${type.toUpperCase()} TOKENS\n`);
      if (typeof registry.designTokens[type] === 'object') {
        Object.entries(registry.designTokens[type]).forEach(([key, value]) => {
          if (typeof value === 'object') {
            console.log(`${key}:`);
            Object.entries(value).forEach(([subKey, subValue]) => {
              console.log(`  ${subKey}: ${subValue}`);
            });
          } else {
            console.log(`${key}: ${value}`);
          }
        });
      }
    } else {
      console.log(`Token type not found: ${type}`);
      console.log('Available types: colors, spacing, borderRadius, fontSize, shadows');
    }
  } else {
    console.log('Available token types:');
    console.log('• colors - Color palette');
    console.log('• spacing - Spacing scale');
    console.log('• borderRadius - Border radius values');
    console.log('• fontSize - Font size scale');
    console.log('• shadows - Box shadow values');
    console.log('\nUse: node dev-utils.js tokens <type>');
  }
}

// Usage patterns explorer
function exploreUsagePatterns(pattern = null) {
  const registry = loadComponentRegistry();
  if (!registry) return;

  console.log('📝 Usage Patterns\n');

  if (pattern) {
    if (registry.usagePatterns[pattern]) {
      const patternData = registry.usagePatterns[pattern];
      console.log(`${pattern.toUpperCase()} PATTERN\n`);
      console.log(`Description: ${patternData.description}`);
      console.log('\nComponents:');
      patternData.components.forEach(comp => console.log(`• ${comp}`));
      console.log('\nExamples:');
      patternData.examples.forEach(example => console.log(`  ${example}`));
    } else {
      console.log(`Pattern not found: ${pattern}`);
      console.log('Available patterns:', Object.keys(registry.usagePatterns).join(', '));
    }
  } else {
    console.log('Available usage patterns:');
    Object.keys(registry.usagePatterns).forEach(pattern => {
      console.log(`• ${pattern}`);
    });
    console.log('\nUse: node dev-utils.js patterns <pattern>');
  }
}

// Migration helper
function showMigrationGuide(fromComponent = null) {
  const registry = loadComponentRegistry();
  if (!registry) return;

  console.log('🔄 Migration Guide\n');

  if (fromComponent) {
    if (registry.migrationGuides[fromComponent]) {
      const migration = registry.migrationGuides[fromComponent];
      console.log(`MIGRATING FROM ${fromComponent.toUpperCase()}\n`);
      console.log(`To: ${migration.to}`);
      console.log(`Reason: ${migration.reason}`);
      console.log('\nBEFORE:');
      console.log(migration.before);
      console.log('\nAFTER:');
      console.log(migration.after);
      console.log('\nBenefits:');
      migration.benefits.forEach(benefit => console.log(`• ${benefit}`));
    } else {
      console.log(`No migration guide found for: ${fromComponent}`);
      console.log('Available migrations:', Object.keys(registry.migrationGuides).join(', '));
    }
  } else {
    console.log('Available migration guides:');
    Object.keys(registry.migrationGuides).forEach(comp => {
      console.log(`• ${comp} → ${registry.migrationGuides[comp].to}`);
    });
    console.log('\nUse: node dev-utils.js migrate <component>');
  }
}

// Troubleshooting helper
function showTroubleshooting(issue = null) {
  const registry = loadComponentRegistry();
  if (!registry) return;

  console.log('🔧 Troubleshooting\n');

  if (issue) {
    if (registry.troubleshooting[issue]) {
      const problem = registry.troubleshooting[issue];
      console.log(`${issue.replace(/([A-Z])/g, ' $1').toUpperCase()}\n`);
      console.log('Symptoms:');
      problem.symptoms.forEach(symptom => console.log(`• ${symptom}`));
      console.log('\nSolutions:');
      problem.solutions.forEach((solution, index) => {
        console.log(`${index + 1}. ${solution.description}`);
        console.log(`   ${solution.code}`);
        console.log('');
      });
    } else {
      console.log(`Issue not found: ${issue}`);
      console.log('Available issues:', Object.keys(registry.troubleshooting).join(', '));
    }
  } else {
    console.log('Common troubleshooting topics:');
    Object.keys(registry.troubleshooting).forEach(issue => {
      console.log(`• ${issue.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
    });
    console.log('\nUse: node dev-utils.js troubleshoot <issue>');
  }
}

// Main CLI handler
function main() {
  const command = process.argv[2];
  const argument = process.argv[3];

  switch (command) {
    case 'discover':
      discoverComponents(argument);
      break;
    case 'tokens':
      exploreDesignTokens(argument);
      break;
    case 'patterns':
      exploreUsagePatterns(argument);
      break;
    case 'migrate':
      showMigrationGuide(argument);
      break;
    case 'troubleshoot':
      showTroubleshooting(argument);
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
}

function showHelp() {
  console.log(`
🚀 @tamyla/ui-components-react Development Utilities

USAGE:
  node dev-utils.js <command> [argument]

COMMANDS:
  discover [category]     Discover components by category
  tokens [type]          Explore design tokens
  patterns [pattern]     Show usage patterns
  migrate [component]    Show migration guides
  troubleshoot [issue]   Show troubleshooting help
  help                   Show this help message

EXAMPLES:
  node dev-utils.js discover atoms
  node dev-utils.js tokens colors
  node dev-utils.js patterns buttons
  node dev-utils.js migrate ButtonSuccess
  node dev-utils.js troubleshoot buttonIssues

For more information, see:
• API_REFERENCE.md
• MIGRATION_GUIDE.md
• TROUBLESHOOTING.md
• component-registry.json
`);
}

// Export functions for programmatic use
export {
  discoverComponents,
  exploreDesignTokens,
  exploreUsagePatterns,
  showMigrationGuide,
  showTroubleshooting,
  loadComponentRegistry
};

// Run CLI if called directly
const normalizedMetaUrl = import.meta.url.replace(/^file:\/\/\//, '').replace(/\//g, '\\');
const normalizedArgv1 = process.argv[1];

if (normalizedMetaUrl === normalizedArgv1) {
  main();
}
