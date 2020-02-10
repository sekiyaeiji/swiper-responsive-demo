'use strict';
const ERROR = 2;

module.exports = {
  extends: [
    'eslint-config-standard',
    'prettier'
  ],
  parser: 'babel-eslint',
  env: {
    'es6': true,
    // 使用環境設定
    browser: true,
  },
  globals: {
    google: true,
  },
  plugins: [
    'prettier'
  ],
  rules: {
    // use strictを許可
    'strict': 0,
    // console メソッドを警告
    'no-console': 0,
    'no-unused-vars': 0
  }
}
