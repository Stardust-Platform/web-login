module.exports = {
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['example/**', 'lib/**'],
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  rules: {
    'import/no-unresolved': 'off',
    'react/jsx-props-no-spreading': 'off',
    'linebreak-style': 'off',
    'react/default-props-match-prop-types': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/quotes': 'off',
  },
};
