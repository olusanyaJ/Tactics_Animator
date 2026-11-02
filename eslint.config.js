import { builtinModules } from 'node:module';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier/flat';
import globals from 'globals';

const tests = ['**/*.{test,spec}.{js,ts,tsx}', '**/tests/**/*.{js,ts,tsx}'];
const nodeFiles = [
  '*.config.{js,ts}',
  'apps/web/src/server/**/*.{js,ts,tsx}',
  'apps/worker/src/**/*.{js,ts,tsx}',
  'packages/{parser,db}/src/**/*.{js,ts,tsx}',
  ...tests,
];
const portableFiles = [
  'apps/web/src/**/*.{js,ts,tsx}',
  'packages/{engine,schema}/src/**/*.{js,ts,tsx}',
];
const nodeGlobals = Object.keys(globals.node).filter(
  (name) => !(name in globals.es2023),
);

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.next/**',
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: nodeFiles,
    languageOptions: { globals: globals.node },
  },
  {
    files: ['apps/web/src/**/*.{js,ts,tsx}'],
    ignores: nodeFiles,
    languageOptions: { globals: globals.browser },
  },
  {
    files: portableFiles,
    ignores: nodeFiles,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: builtinModules.filter((name) => !name.startsWith('node:')),
          patterns: ['node:*'],
        },
      ],
    },
  },
  {
    files: ['apps/web/src/**/*.{js,ts,tsx}'],
    ignores: nodeFiles,
    rules: {
      'no-restricted-globals': [
        'error',
        ...nodeGlobals.filter((name) => !(name in globals.browser)),
      ],
    },
  },
  {
    files: ['packages/{engine,schema}/src/**/*.{js,ts,tsx}'],
    ignores: nodeFiles,
    rules: { 'no-restricted-globals': ['error', ...nodeGlobals] },
  },
  prettier,
);
