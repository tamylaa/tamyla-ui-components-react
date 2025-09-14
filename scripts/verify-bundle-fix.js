import fs from 'fs';

/**
 * Bundle Fix Verification Script
 * 
 * Comprehensive analysis to verify that the "z.div is not a function" error
 * has been resolved by ensuring styled-components is properly externalized.
 * 
 * Usage: node scripts/verify-bundle-fix.js
 */

const content = fs.readFileSync('dist/index.esm.js', 'utf8');

console.log('🔍 FINAL VERIFICATION: z.div Error Analysis');
console.log('================================================');

// 1. Check styled-components import
const styledImport = content.match(/import\s+(\w+).*?from"styled-components"/);
if (styledImport) {
    const varName = styledImport[1];
    console.log(`✅ styled-components imported as: "${varName}"`);
    
    if (varName === 'z') {
        console.log('🚨 CRITICAL: styled-components imported as "z" - WILL CAUSE z.div ERROR');
    } else {
        console.log('✅ Safe: styled-components NOT imported as "z"');
    }
}

// 2. Check for z.div patterns specifically
const zDivPattern = /z\.div/g;
const zDivMatches = content.match(zDivPattern);
if (zDivMatches) {
    console.log(`🚨 FOUND z.div patterns: ${zDivMatches.length} occurrences`);
    console.log('This WILL cause "z.div is not a function" errors');
} else {
    console.log('✅ NO z.div patterns found in bundle');
}

// 3. Check styled-components usage patterns
const styledUsagePattern = /\b\w+\.div`/g;
const styledUsageMatches = content.match(styledUsagePattern);
if (styledUsageMatches) {
    const uniquePatterns = [...new Set(styledUsageMatches)];
    console.log('📋 Styled component patterns found:');
    uniquePatterns.slice(0, 5).forEach(pattern => console.log(`   ${pattern}`));
}

// 4. Bundle size check
const sizeKB = (content.length / 1024).toFixed(1);
console.log(`📦 Bundle size: ${sizeKB}KB`);
if (parseFloat(sizeKB) > 300) {
    console.log('⚠️  Large bundle size may indicate bundled dependencies');
} else {
    console.log('✅ Bundle size indicates proper externalization');
}

// 5. Final verdict
console.log('\n🎯 FINAL VERDICT:');
const hasZDiv = content.includes('z.div');
const hasProperImport = content.includes('from"styled-components"');
const isReasonableSize = parseFloat(sizeKB) < 300;

if (!hasZDiv && hasProperImport && isReasonableSize) {
    console.log('✅ SUCCESS: "z.div is not a function" error should be RESOLVED');
    console.log('   - styled-components properly externalized');
    console.log('   - No z.div patterns in bundle');
    console.log('   - Bundle size indicates external dependencies');
} else {
    console.log('❌ ISSUES DETECTED:');
    if (hasZDiv) console.log('   - z.div patterns found');
    if (!hasProperImport) console.log('   - styled-components not externalized');
    if (!isReasonableSize) console.log('   - Bundle size too large');
}
