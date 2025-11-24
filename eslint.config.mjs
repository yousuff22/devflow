import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  // ESLint recommended rules
  js.configs.recommended,

  // Next.js configurations
  ...nextVitals,
  ...nextTs,

  // Standard-style rules (manually configured for flat config)
  {
    rules: {
      // Standard JavaScript Style rules
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'space-before-function-paren': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'eol-last': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-infix-ops': 'error',
      'space-before-blocks': 'error',
      'no-trailing-spaces': 'error'
    }
  },

  // Ignore patterns
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'node_modules/**'
    ]
  }
])

export default eslintConfig
