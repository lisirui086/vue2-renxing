module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭eslint检查文件名是否为驼峰命名
    'vue/multi-word-component-names': 'off',
    // 定义未使用
    'no-unused-vars': 'off',
    'space-before-function-paren': ['error', 'ignore'],
    'vue/no-v-for-template-key': 'off'
  },
}
