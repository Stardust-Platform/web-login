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
  ignorePatterns: ['example/**'],
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
};
