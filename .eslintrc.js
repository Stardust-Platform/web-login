module.exports = {
  extends: [
    'react-app',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb-typescript-prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['example/**', 'dist/**'],
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  rules: {
    'import/no-unresolved': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/jsx-props-no-spreading': 'off',
  },
};
