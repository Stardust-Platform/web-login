module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],
  settings: {
    react: {
      version: 'latest',
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
    'react/jsx-fragments': 'off'
    'linebreak-style': 'off',
    'react/default-props-match-prop-types': 'off',
  },
};
