// Test Redux exports specifically without triggering styled-components
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the built file content
const builtFilePath = path.join(__dirname, 'dist', 'index.esm.js');
const builtContent = fs.readFileSync(builtFilePath, 'utf8');

console.log('Testing Redux exports in built package...\n');

// Check for Redux exports in the built file
const reduxExports = [
  'store',
  'persistor',
  'authActions',
  'uiActions',
  'themeActions',
  'componentActions'
];

let foundExports = [];
let missingExports = [];

reduxExports.forEach(exportName => {
  // Check for exports in the format: export { ..., store, ... }
  if (builtContent.includes(`export {`) && builtContent.includes(`, ${exportName},`)) {
    foundExports.push(exportName);
    console.log(`✓ Found export: ${exportName}`);
  } else if (builtContent.includes(`export {`) && builtContent.includes(`${exportName},`)) {
    foundExports.push(exportName);
    console.log(`✓ Found export: ${exportName}`);
  } else if (builtContent.includes(`export {`) && builtContent.includes(`, ${exportName} `)) {
    foundExports.push(exportName);
    console.log(`✓ Found export: ${exportName}`);
  } else {
    missingExports.push(exportName);
    console.log(`✗ Missing export: ${exportName}`);
  }
});

console.log(`\nSummary:`);
console.log(`Found exports: ${foundExports.length}/${reduxExports.length}`);
console.log(`Missing exports: ${missingExports.length}`);

if (missingExports.length === 0) {
  console.log('\n🎉 SUCCESS: All Redux exports are present in the built package!');
  process.exit(0);
} else {
  console.log('\n❌ FAILURE: Some Redux exports are missing from the built package.');
  console.log('Missing:', missingExports.join(', '));
  process.exit(1);
}
