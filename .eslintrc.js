module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'no-unused-vars': 'error',
    'spaced-comment': 'error',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'comma-dangle': 'off',
    'linebreak-style': 'off',
    'newline-per-chained-call': 'off',
    'max-len': [2, 150],
    'func-names': 'off',
    indent: 'off',
    'prefer-template': 'off',
    'eol-last': 'off',
    'no-console': 'off',
    'object-curly-newline': 'off',
    'arrow-parens': 'off',
    'function-paren-newline': 'off',
  },
};
