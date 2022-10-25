const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 开启代理
  devServer: {
    host: 'localhost',
    port:'8080',
    proxy: {
      '/api': {

        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
})
