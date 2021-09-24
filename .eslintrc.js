module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],
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
  },
};
