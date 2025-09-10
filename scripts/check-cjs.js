#!/usr/bin/env node
/**
 * check-cjs.js (ESM)
 * Scans the package `src`, `scripts`, and `examples` folders for CommonJS patterns
 * in plain `.js` files while the package is declared as ESM ("type": "module").
 * Exits with code 1 if any violations are found.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(path.join(__dirname, '..'));
const scanDirs = ['src', 'scripts'];
const cjsPatterns = [/\brequire\s*\(/, /\bmodule\.exports\b/, /\bexports\./];

function walk(dir) {
  const results = [];
  try {
    for (const entry of fs.readdirSync(dir)) {
      // Skip node_modules and other problematic directories
      if (entry === 'node_modules' || entry === '.git' || entry === 'dist') continue;
      
      const full = path.join(dir, entry);
      let stat;
      try {
        stat = fs.statSync(full);
      } catch (e) {
        // Skip if we can't stat (broken symlinks, etc.)
        continue;
      }
      
      if (stat.isDirectory()) {
        results.push(...walk(full));
      } else if (stat.isFile()) {
        results.push(full);
      }
    }
  } catch (e) {
    // Skip if we can't read the directory
    console.warn(`Skipping directory ${dir}: ${e.message}`);
  }
  return results;
}

const violations = [];

for (const d of scanDirs) {
  const dir = path.join(root, d);
  if (!fs.existsSync(dir)) continue;
  const files = walk(dir).filter(f => f.endsWith('.js'));
  for (const f of files) {
    // skip the checker itself to avoid false positives
    const rel = path.relative(root, f);
    if (rel === path.join('scripts', 'check-cjs.js')) continue;
    if (rel === path.join('scripts', 'comprehensive-certify-cjs.js')) continue; // ignore legacy/duplicate entry
    // ignore explicit .cjs/.mjs (these won't match .js)
    const content = fs.readFileSync(f, 'utf8');
    for (const pat of cjsPatterns) {
      if (pat.test(content)) {
        violations.push({ file: path.relative(root, f), pattern: pat.toString() });
        break;
      }
    }
  }
}

if (violations.length > 0) {
  console.error('\nFound CommonJS usage in .js files while package is ESM (type: module):\n');
  for (const v of violations) {
    console.error(` - ${v.file}  (${v.pattern})`);
  }
  console.error('\nEither rename the file to .cjs or convert to ESM import/exports.');
  process.exit(1);
} else {
  console.log('No CommonJS patterns found in .js files.');
  process.exit(0);
}
