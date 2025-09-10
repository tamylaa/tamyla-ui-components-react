#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Fix TypeScript errors caused by replacing 'any' with 'unknown'
 * This script addresses the most common patterns that break with unknown types
 */

class TypeScriptFixer {
    constructor() {
        this.fixedCount = 0;
        this.errors = [];
        this.workspaceRoot = process.cwd();
    }

    /**
     * Find all TypeScript files
     */
    findTsFiles(dir) {
        const files = [];

        function scan(directory) {
            const items = fs.readdirSync(directory);

            for (const item of items) {
                const fullPath = path.join(directory, item);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    scan(fullPath);
                } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.tsx'))) {
                    files.push(fullPath);
                }
            }
        }

        scan(dir);
        return files;
    }

    /**
     * Fix common unknown type issues
     */
    fixUnknownTypes(content) {
        let fixedContent = content;

        // Fix type assertions followed by property access: (obj as unknown).prop
        fixedContent = fixedContent.replace(
            /\(([^)]+) as unknown\)\.(\w+)/g,
            '($1 as any).$2'
        );

        // Fix type assertions followed by array access: (obj as unknown)[key]
        fixedContent = fixedContent.replace(
            /\(([^)]+) as unknown\)\[([^\]]+)\]/g,
            '($1 as any)[$2]'
        );

        // Fix type assertions followed by function calls: (obj as unknown).method()
        fixedContent = fixedContent.replace(
            /\(([^)]+) as unknown\)\.(\w+)\(/g,
            '($1 as any).$2('
        );

        // Fix direct property access on unknown parameters: props.prop
        fixedContent = fixedContent.replace(
            /\b(\w+):\s*unknown\s*=\s*\{\}/g,
            '$1: any = {}'
        );

        // Fix function parameters that were any but are used without type guards
        fixedContent = fixedContent.replace(
            /\b(\w+):\s*unknown\s*\)/g,
            '$1: any)'
        );

        // Fix variable declarations that were any
        fixedContent = fixedContent.replace(
            /\b(let|const|var)\s+(\w+):\s*unknown\b/g,
            '$1 $2: any'
        );

        // Fix return types that were any
        fixedContent = fixedContent.replace(
            /\):\s*unknown\s*=>/g,
            '): any =>'
        );

        // Fix interface properties that were any
        fixedContent = fixedContent.replace(
            /\b(\w+):\s*unknown\s*;/g,
            '$1: any;'
        );

        // Fix generic types that were any
        fixedContent = fixedContent.replace(
            /\b(Array|Promise|Map|Set)<unknown>/g,
            '$1<any>'
        );

        // Fix Record types that were any
        fixedContent = fixedContent.replace(
            /\bRecord<string,\s*unknown>/g,
            'Record<string, any>'
        );

        // Fix Map types that were any
        fixedContent = fixedContent.replace(
            /\bMap<string,\s*unknown>/g,
            'Map<string, any>'
        );

        // Fix PayloadAction types
        fixedContent = fixedContent.replace(
            /\bPayloadAction<unknown\[\]>/g,
            'PayloadAction<any[]>'
        );

        return fixedContent;
    }

    /**
     * Process a single file
     */
    processFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const originalContent = content;

            const fixedContent = this.fixUnknownTypes(content);

            if (fixedContent !== originalContent) {
                fs.writeFileSync(filePath, fixedContent, 'utf8');
                this.fixedCount++;
                console.log(`Fixed: ${filePath}`);
            }
        } catch (error) {
            this.errors.push(`Failed to process ${filePath}: ${error.message}`);
        }
    }

    /**
     * Run the fixer
     */
    run() {
        console.log('🔧 Fixing TypeScript unknown type issues...');

        const tsFiles = this.findTsFiles(path.join(this.workspaceRoot, 'src'));
        console.log(`Found ${tsFiles.length} TypeScript files to process`);

        for (const file of tsFiles) {
            this.processFile(file);
        }

        console.log(`\n✅ Fixed ${this.fixedCount} files`);

        if (this.errors.length > 0) {
            console.log('\n❌ Errors:');
            this.errors.forEach(error => console.log(`  - ${error}`));
        }
    }
}

// Run the fixer
const fixer = new TypeScriptFixer();
fixer.run();
