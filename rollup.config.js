import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

const config = [
  // JavaScript bundle
  {
    input: 'src/index.ts',
    output: {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      commonjs(),
      esbuild({
        include: /\.[jt]sx?$/,
        exclude: [/node_modules/, /src\/demos-backup\//],
        target: 'es2020',
        jsx: 'automatic',
        tsconfig: 'tsconfig.json',
        minify: true, // Re-enable minification
        treeShaking: true, // Re-enable tree-shaking
        define: {
          'process.env.NODE_ENV': '"production"'
        },
        // Preserve exports that might be tree-shaken
        keepNames: true,
        // Ensure side effects are preserved
        pure: []
      })
    ],
    external: ['react', 'react-dom', '@tamyla/ui-components', 'styled-components']
  },
  // TypeScript declarations
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm'
    },
    plugins: [dts()],
    external: ['react', 'react-dom', '@tamyla/ui-components', 'styled-components']
  }
];

export default config;
