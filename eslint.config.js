import js from '@eslint/js';
import globals from 'globals';
import eslintReact from 'eslint-plugin-react';

import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import typesafe from "eslint-plugin-typesafe";
import importPlugin from "eslint-plugin-import";
import { resolve as tsResolver } from "eslint-import-resolver-typescript";
import perfectionist from "eslint-plugin-perfectionist";
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'eslint.config.js', 'vite.config.ts'] },
  js.configs.recommended,
	...tseslint.configs.recommended,
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.node.json"],
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react': eslintReact,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      "typesafe": typesafe,
			prettier: prettierPlugin,
      import: importPlugin,
			perfectionist: perfectionist,
    },
    settings: {
			react: {
				version: "detect",
			},
			"import/parsers": {
				"@typescript-eslint/parser": [".ts", ".tsx"],
			},
			"import/resolver": {
				typescript: tsResolver,
			},
		},
    rules: {
      ...js.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      ...perfectionist.configs["recommended-natural"].rules,
      ...eslintReact.configs["jsx-runtime"].rules,
			...eslintReact.configs["recommended"].rules,
      ...reactHooks.configs.recommended.rules,
       "react/react-in-jsx-scope": "off",
      'react/jsx-boolean-value': ['error'],
      'react/jsx-curly-brace-presence': ['error'],
      'react/self-closing-comp': ['error'],
      'import/exports-last': ['error'],
      'import/namespace': ['off', { allowComputed: true }],
			'import/newline-after-import': ['error'],
			'import/no-duplicates': ['error'],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': 'off',
      "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            "args": "none",
            "ignoreRestSiblings": true,
          },
        ],
      'prefer-const': 'error',
      'prettier/prettier': 'warn',
      'no-console': 'error',
      'typesafe/no-await-without-trycatch': 'error',
      '@typescript-eslint/no-explicit-any': 'error',	
      'no-warning-comments': [
				'warn',
				{ 'terms': ['todo', 'fixme', 'xxx'], 'location': 'anywhere' },
			],
      '@typescript-eslint/no-magic-numbers': [
				'error',
				{
					ignoreEnums: true,
					ignoreReadonlyClassProperties: true,
					ignoreNumericLiteralTypes: true,
				},
			],
      'react-hooks/rules-of-hooks': 'error',
      'typesafe/no-await-without-trycatch': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      'prefer-destructuring': [
				"warn",
				{
					"object": true,
					"array": false,
				},
			],
      "perfectionist/sort-imports": [
				"error",
				{
					"type": "natural",
					"order": "asc",
					"groups": [
						["builtin", "external"],
						"internal",
						["parent", "sibling", "index",],
					],
				},
			],
    },
  },
)
