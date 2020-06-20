module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': ['plugin:vue/essential','@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': ['error', 'never'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': ['error', { allow: ['error'] }],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
