// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

export default {
    input: 'script.js', // Entry point of your app
    output: {
        file: 'dist/bundle.js', // Output file
        format: 'es', // Output format: 'es' for ES modules, 'cjs' for CommonJS, 'iife' for browsers
        sourcemap: true, // Enable source maps for debugging
    },
    plugins: [
        resolve(), // Help Rollup find external modules in node_modules
        commonjs(), // Convert CommonJS modules to ES6
        babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }), // Transpile ES6+ code
    ],
};
