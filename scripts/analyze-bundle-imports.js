import fs from 'fs';

/**
 * Bundle Import Analysis Script
 * 
 * Detailed analysis of how dependencies are imported in the built bundle.
 * Useful for debugging externalization issues and understanding bundle structure.
 * 
 * Usage: node scripts/analyze-bundle-imports.js
 */

const content = fs.readFileSync('dist/index.esm.js', 'utf8');
const firstLine = content.split('\n')[0];

console.log('=== Detailed Import Analysis ===');
console.log('First line length:', firstLine.length);
console.log('\nFirst 500 characters:');
console.log(firstLine.substring(0, 500));

console.log('\n=== Styled-components Import Pattern ===');
// Look for styled-components import more carefully
const styledRegex = /import[^;]*from"styled-components"/g;
const styledMatch = firstLine.match(styledRegex);

if (styledMatch) {
    console.log('✅ Found styled-components import:');
    styledMatch.forEach(match => console.log('  ', match));
    
    // Extract what's being imported
    const importPattern = /import\s+([^}]+)\s+from"styled-components"/;
    const importMatch = firstLine.match(importPattern);
    if (importMatch) {
        console.log('Imported items:', importMatch[1]);
    }
} else {
    console.log('❌ No styled-components import found');
}

// Look for the specific pattern that might cause z.div errors
console.log('\n=== Potential z.div Error Analysis ===');
if (firstLine.includes('import W,') && firstLine.includes('from"styled-components"')) {
    console.log('✅ styled-components imported as "W" (default import)');
    console.log('This should work correctly - W.div would be the pattern');
} else if (firstLine.includes('import z,') && firstLine.includes('from"styled-components"')) {
    console.log('🚨 FOUND ISSUE: styled-components imported as "z"');
    console.log('This could cause z.div errors if there are naming conflicts');
} else {
    console.log('Need to check the exact import pattern...');
}

// Check for variable conflicts
console.log('\n=== Variable Usage Analysis ===');
const variables = ['W', 'z', 'styled'];
variables.forEach(varName => {
    const regex = new RegExp(`\\b${varName}\\b`, 'g');
    const count = (content.match(regex) || []).length;
    if (count > 0) {
        console.log(`Variable "${varName}" used ${count} times`);
    }
});
