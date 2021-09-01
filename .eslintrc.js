module.exports = {
  root: true,
  env: {node: true},
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {ecmaVersion: 2020},
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'off',
    '@typescript-eslint/no-var-requires': 0,
    // 允许显式any
    '@typescript-eslint/no-explicit-any': ['off'],
    // 允许非显式返回值类型
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    // 关闭非空断言
    '@typescript-eslint/no-non-null-assertion': 0
  }
}
