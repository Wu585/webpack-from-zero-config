module.exports = {
  extends: ['react-app'],
  rules: {
    'react/jsx-uses-react': [2],
    'react/react-in-jsx-scope': [2]
  },
  overrides: [{
    files: ['*.ts', '*.tsx'],
    parserOptions: {
      project: './tsconfig.json',
    },
    extends: ['airbnb-typescript'],
    rules: {
      '@typescript-eslint/object-curly-spacing': [0],
      'import/prefer-default-export': [0],
      'no-console': [0],
      'import/extensions': [0]
    }
  }]
}
