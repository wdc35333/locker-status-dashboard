import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default defineConfig([
  ...compat.config({
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'airbnb-base',
    ],
    rules: {
      camelcase: 'off',
      'no-console': ['error', { allow: ['assert'] }],
      'no-unused-vars': 'off',
      'no-alert': 'off',
      'linebreak-style': 'off',
      'no-underscore-dangle': 'off',
      'dot-notation': 'off',
      'max-len': ['warn', { code: 120, ignoreComments: true }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      'object-curly-newline': 0,
      'react/no-unknown-property': [2, { ignore: ['jsx'] }],
      'no-use-before-define': [
        'error',
        {
          functions: true,
          classes: true,
          variables: false,
          allowNamedExports: true,
        },
      ],
      'import/no-unresolved': 'error',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', ['parent', 'sibling'], 'index', 'object', 'type'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    globals: {
      JSX: true,
    },
  }),
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'eslint.config.mjs',
    'next.config.ts',
    'postcss.config.mjs',
  ]),
]);
