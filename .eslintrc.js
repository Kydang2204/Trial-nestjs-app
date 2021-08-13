module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'airbnb-typescript',
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module',
    },
    plugins: [
      '@typescript-eslint',
    ],
    rules: {
      'no-return-assign':'off',
      'no-param-reassign': 'off',
      'import/prefer-default-export':'off',
      'class-methods-use-this':'off',
      "@typescript-eslint/naming-convention": [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          leadingUnderscore: 'allow'
        },
      ],
      'brace-style': ['error', '1tbs', {
        allowSingleLine: false,
      }],
      'nonblock-statement-body-position': ['error', 'beside'],
  
      'no-multiple-empty-lines': ['error', {
        max: 1,
      }],
      'object-curly-newline': ['error', {
        minProperties: 1,
      }],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: [
            'function',
            'multiline-expression',
            'multiline-block-like',
            'class',
            'export',
            'import',
            'block',
            'block-like',
            'expression',
            'const',
            'let',
          ],
        },
        {
          blankLine: 'always',
          prev: [
            'function',
            'multiline-expression',
            'multiline-block-like',
            'class',
            'export',
            'import',
            'block',
            'block-like',
            'expression',
            'const',
            'let',
          ],
          next: '*',
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
    },
  };
  