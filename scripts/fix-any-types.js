#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Automated script to fix TypeScript 'any' types in the codebase
 * This script parses ESLint output and applies common fixes for 'any' type warnings
 */

class AnyTypeFixer {
    constructor() {
        this.fixedCount = 0;
        this.errors = [];
        this.workspaceRoot = process.cwd();
    }

    /**
     * Run ESLint and capture output
     */
    runLint() {
        try {
            const output = execSync('npm run lint 2>&1', { encoding: 'utf8' });
            return output;
        } catch (error) {
            return error.stdout || error.stderr;
        }
    }

    /**
     * Parse ESLint output to find 'any' type warnings
     */
    parseLintOutput(output) {
        const lines = output.split('\n');
        const anyWarnings = [];
        let currentFile = null;

        for (const line of lines) {
            // Check if this is a file path line
            if (line.startsWith('C:') && line.includes('.tsx') || line.includes('.ts')) {
                currentFile = line.trim();
                continue;
            }

            // Look for 'any' type warnings in the current file
            if (currentFile && line.includes('@typescript-eslint/no-explicit-any')) {
                // Extract line and column numbers
                const match = line.match(/^\s*(\d+):(\d+)\s+warning\s+(.+?)\s+@typescript-eslint\/no-explicit-any/);
                if (match) {
                    const [, lineNum, colNum, message] = match;
                    anyWarnings.push({
                        file: currentFile,
                        line: parseInt(lineNum),
                        column: parseInt(colNum),
                        message: message.trim()
                    });
                }
            }
        }

        return anyWarnings;
    }

    /**
     * Read file content
     */
    readFile(filePath) {
        try {
            return fs.readFileSync(filePath, 'utf8');
        } catch (error) {
            this.errors.push(`Failed to read ${filePath}: ${error.message}`);
            return null;
        }
    }

    /**
     * Write file content
     */
    writeFile(filePath, content) {
        try {
            fs.writeFileSync(filePath, content, 'utf8');
            return true;
        } catch (error) {
            this.errors.push(`Failed to write ${filePath}: ${error.message}`);
            return false;
        }
    }

    /**
     * Apply common 'any' type fixes
     */
    fixAnyType(content, lineNumber) {
        const lines = content.split('\n');
        const targetLine = lines[lineNumber - 1];

        if (!targetLine) return content;

        let fixedLine = targetLine;
        let fixed = false;

        // Common patterns to fix
        const patterns = [
            // Function parameters: (param: any) => 
            { regex: /\(\s*([^:]+):\s*any\s*\)/g, replacement: '($1: unknown)' },
            // Variable declarations: let/const var: any
            { regex: /\b(let|const|var)\s+([^:]+):\s*any\b/g, replacement: '$1 $2: unknown' },
            // Property types: prop: any
            { regex: /\b([^:]+):\s*any\b/g, replacement: '$1: unknown' },
            // Generic types: Array<any>, Promise<any>
            { regex: /\b(Array|Promise|Map|Set)<any>/g, replacement: '$1<unknown>' },
            // Return types: ): any =>
            { regex: /\):\s*any\s*=>/g, replacement: '): unknown =>' },
            // Interface properties: prop: any;
            { regex: /\b([^:]+):\s*any\s*;/g, replacement: '$1: unknown;' },
            // Type assertions: as any
            { regex: /\s+as\s+any\b/g, replacement: ' as unknown' },
            // Function calls with generics: useRef<any>(null)
            { regex: /\b(\w+)\s*<any>/g, replacement: '$1<unknown>' },
            // Record types: Record<string, any>
            { regex: /\bRecord\s*<\s*string\s*,\s*any\s*>/g, replacement: 'Record<string, unknown>' },
            // Generic function parameters: (config: Record<string, any>)
            { regex: /\(\s*([^:]+):\s*Record\s*<\s*string\s*,\s*any\s*>\s*\)/g, replacement: '($1: Record<string, unknown>)' },
            // Property types with Record: props: Record<string, any>
            { regex: /\b([^:]+):\s*Record\s*<\s*string\s*,\s*any\s*>/g, replacement: '$1: Record<string, unknown>' },
            // Map types: Map<string, any>
            { regex: /\bMap\s*<\s*string\s*,\s*any\s*>/g, replacement: 'Map<string, unknown>' },
            // Arrow function return types: => any
            { regex: /\s*=>\s*any\b/g, replacement: ' => unknown' },
            // Redux PayloadAction: PayloadAction<any[]>
            { regex: /\bPayloadAction\s*<\s*any\[\]\s*>/g, replacement: 'PayloadAction<unknown[]>' },
            // Union types with any: any | null, Promise<any | null>
            { regex: /\bany\s*\|\s*null/g, replacement: 'unknown | null' },
            { regex: /\bPromise\s*<\s*any\s*\|\s*null\s*>/g, replacement: 'Promise<unknown | null>' },
        ];        for (const pattern of patterns) {
            if (pattern.regex.test(fixedLine)) {
                fixedLine = fixedLine.replace(pattern.regex, pattern.replacement);
                fixed = true;
                break; // Only apply one fix per line
            }
        }

        if (fixed) {
            lines[lineNumber - 1] = fixedLine;
            this.fixedCount++;
            console.log(`Fixed line ${lineNumber}: ${targetLine.trim()} -> ${fixedLine.trim()}`);
        }

        return lines.join('\n');
    }

    /**
     * Process a single file
     */
    processFile(warning) {
        console.log(`\nProcessing ${path.relative(this.workspaceRoot, warning.file)}:${warning.line}`);

        const content = this.readFile(warning.file);
        if (!content) return;

        const fixedContent = this.fixAnyType(content, warning.line);

        if (fixedContent !== content) {
            this.writeFile(warning.file, fixedContent);
        } else {
            console.log(`No automatic fix applied for line ${warning.line}`);
        }
    }

    /**
     * Main execution method
     */
    async run() {
        console.log('🔍 Running ESLint to find any type warnings...');

        const lintOutput = this.runLint();
        const warnings = this.parseLintOutput(lintOutput);

        console.log(`Found ${warnings.length} 'any' type warnings`);

        if (warnings.length === 0) {
            console.log('✅ No any type warnings found!');
            return;
        }

        // Process each warning
        for (const warning of warnings) {
            this.processFile(warning);
        }

        console.log(`\n✅ Fixed ${this.fixedCount} 'any' type issues`);

        if (this.errors.length > 0) {
            console.log('\n❌ Errors encountered:');
            this.errors.forEach(error => console.log(`  - ${error}`));
        }

        // Run lint again to verify
        console.log('\n🔍 Verifying fixes...');
        const finalOutput = this.runLint();
        const remainingWarnings = this.parseLintOutput(finalOutput);

        console.log(`Remaining 'any' type warnings: ${remainingWarnings.length}`);

        if (remainingWarnings.length > 0) {
            console.log('\nSome warnings may require manual fixes:');
            remainingWarnings.slice(0, 5).forEach(w => {
                console.log(`  - ${path.relative(this.workspaceRoot, w.file)}:${w.line}`);
            });
        }
    }
}

// Run the fixer
const fixer = new AnyTypeFixer();
fixer.run().catch(console.error);
