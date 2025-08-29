import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

export default {
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
      exclude: /node_modules/,
      target: 'es2020',
      jsx: 'automatic',
      tsconfig: 'tsconfig.json',
      minify: false
    })
  ],
  external: ['react', 'react-dom', '@tamyla/ui-components']
};
