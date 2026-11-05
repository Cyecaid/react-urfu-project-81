import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['dist', 'coverage', 'node_modules']),
  js.configs.recommended,
  tseslint.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    braceStyle: '1tbs',
    arrowParens: true,
  }),
  {
    languageOptions: {
      globals: globals.node,
    },
  },
);
