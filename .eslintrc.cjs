module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    quotes: [
      'error',
      'single',
      { allowTemplateLiterals: true }
    ],
    semi: [
      'error',
      'never'
    ],
    indent: [
      'error',
      2
    ],
    camelcase: 'off'
  }
}
