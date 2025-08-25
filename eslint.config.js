// @ts-check
import js from '@eslint/js';
import globals from 'globals';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

// Configuração base para TypeScript
const typescriptConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  ignores: [
    '**/*.config.ts',
    '**/vite.config.ts',
    '**/vitest.config.ts',
    '**/eslint.config.js',
  ],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': typescriptEslint,
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};

// Configuração para arquivos de declaração TypeScript
const typeDeclarationConfig = {
  files: ['**/*.d.ts'],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  rules: {
    'no-var': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
  },
};

// Configuração para arquivos de configuração TypeScript
const configFileRules = {
  'no-undef': 'off',
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/no-non-null-assertion': 'off',
  'no-console': 'off',
};

// Configuração para arquivos de configuração específicos
const configFiles = [
  'vite.config.ts',
  'vitest.config.ts',
  '**/*.config.ts',
  '**/vite.config.ts',
  '**/vitest.config.ts',
];

export default [
  // Ignorar pastas e arquivos desnecessários
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.next/**',
      '**/out/**',
      '**/public/**',
      '**/*.js.map',
      '**/*.d.ts',
      // Ignorar arquivos de configuração explicitamente
      ...configFiles.map(file => `!${file}`),
    ],
  },
  // Configuração base para JavaScript e TypeScript
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      ...configFiles,
      '**/types/**',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn',
    },
  },
  // Aplicar configuração do TypeScript
  {
    ...typescriptConfig,
    ignores: ['**/types/**', ...configFiles],
  },
  // Configuração para arquivos de declaração TypeScript
  {
    ...typeDeclarationConfig,
    files: ['**/types/**/*.d.ts'],
  },
  // Configuração para arquivos de teste
  {
    files: ['**/*.test.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  // Configuração para arquivos de configuração TypeScript
  {
    files: configFiles,
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: configFileRules,
  },
  // Configuração para outros arquivos de configuração
  {
    files: ['**/vite.config.js', '**/vitest.config.js', '**/*.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];
